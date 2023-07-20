import Item from "../../models/Item.js";
import Collection from "../../models/Collection.js";
import User from "../../models/User.js";

class CollectionService {
  async getAllCollections(query) {
    const { page, limit, sort_by, sort_order } = query;
    const totalCount = await Collection.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    const offset = (page - 1) * limit;
    const collections = await Collection.find({})
      .skip(offset)
      .limit(limit)
      .sort({ [sort_by]: sort_order })
      .select({ password: 0 });
    return { collections, totalPages };
  }
  async getTopCollections(query) {
    const { limit, sort_by, sort_order } = query;
    const order = sort_order === "desc" ? -1 : 1;
    const sortCollection = await Collection.aggregate([
      {
        $addFields: {
          itemLength: { $size: `$${sort_by}` },
        },
      },
      {
        $sort: {
          itemLength: order,
        },
      },
      {
        $limit: +limit,
      },
    ]);
    return sortCollection;
  }
  async createCollection(collection) {
    const newCollection = new Collection(collection);
    await User.updateOne(
      { _id: collection.author },
      { $push: { collections: newCollection } }
    );
    return await newCollection.save();
  }
  async getCollectionsByUser(id, query) {
    const { page, limit, sort_by, sort_order } = query;
    const totalCount = await Collection.countDocuments({ author: id });
    const totalPages = Math.ceil(totalCount / limit);
    const offset = (page - 1) * limit;
    const collections = await Collection.find({ author: id })
      .skip(offset)
      .limit(limit)
      .sort({ [sort_by]: sort_order })
      .select({ password: 0 });
    return { collections, totalPages: totalPages ? totalPages : 1 };
  }
  async getCollectionById(id) {
    return await Collection.findOne({ _id: id });
  }
  async removeCollection(id) {
    const collection = await Collection.findOneAndDelete({ _id: id });
    if (collection.items)
      await Item.deleteMany({ _id: { $in: collection.items } });
    return collection;
  }
  async updateCollection(req) {
    const { id } = req.params;
    const collection = await Collection.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (collection.customFields.length) {
      const customFields = collection.customFields.map((customField) => {
        if (customField.type !== "checkbox") {
          return {
            [customField.name]: "",
            fieldType: customField.type,
          };
        } else {
          return {
            [customField.name]: false,
            fieldType: customField.type,
          };
        }
      });
      const keysToKeep = collection.customFields.map((field) => field.name);
      const itemIds = collection.items;
      const mapCustomFields = await Promise.all(
        customFields.map(async (field) => {
          const item = await Item.findOne({
            _id: { $in: itemIds },
          });
          const currentKey = Object.keys(field)[0];
          const existKeys = Object.values(item.customFields).map(
            (key) => Object.keys(key)[0]
          );
          return { ...field, existField: existKeys.includes(currentKey) };
        })
      );
      const resultFieldToAdd = mapCustomFields.filter(
        (field) => !field.existField
      );
      await Item.updateMany(
        { _id: { $in: itemIds } },
        {
          $addToSet: {
            customFields: {
              $each: resultFieldToAdd,
            },
          },
        }
      );
      await Item.updateMany(
        { _id: { $in: collection.items } },
        {
          $pull: {
            customFields: {
              $nor: keysToKeep.map((key) => ({ [key]: { $exists: true } })),
            },
          },
        }
      );
    } else {
      await Item.updateMany(
        { _id: { $in: collection.items } },
        {
          $set: {
            customFields: [],
          },
        }
      );
    }
  }
  async addItemInCollection(item, newItem) {
    await Collection.findOneAndUpdate(
      { _id: item.collectionId },
      { $push: { items: newItem._id } }
    );
  }
  async removeItemFromCollection(item, id) {
    await Collection.findOneAndUpdate(
      { _id: item.collectionId },
      { $pull: { items: id } }
    );
  }
}

export default new CollectionService();
