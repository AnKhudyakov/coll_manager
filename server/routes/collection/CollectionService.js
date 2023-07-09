import Item from "../../models/Item.js";
import Collection from "../../models/Collection.js";
import User from "../../models/User.js";

class CollectionService {
  async getAllCollections(query) {
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
  async getCollectionsByUser(id) {
    return await Collection.find({ author: id });
  }
  async getCollectionById(id) {
    return await Collection.findOne({ _id: id });
  }
  async removeCollection(id) {
    const collection = await Collection.findOneAndDelete({ _id: id });
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
      await Item.updateMany(
        { _id: { $in: collection.items } },
        {
          $addToSet: {
            customFields: {
              $each: customFields,
            },
          },
        }
      );
      await Item.updateMany(
        { _id: { $in: collection.items } },
        {
          $pull: {
            customFields: {
              $or: keysToKeep.map((key) => ({ [key]: { $in: keysToKeep } })),
            },
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
