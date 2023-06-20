import Item from "../../models/Item.js";
import Collection from "../../models/Collection.js";
import User from "../../models/User.js";

class CollectionService {
  async getAllCollections(query) {
    const { limit, sort_by, sort_order } = query;
    return await Collection.find({})
      .limit(limit)
      .sort({ [sort_by]: sort_order });
  }
  async createCollection(collection) {
    const newCollection = new Collection(collection);
    await User.findOneAndUpdate(
      { _id: collection.author },
      { $push: { collections: newCollection } }
    );
    await newCollection.save();
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
    await Collection.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
  }
}

export default new CollectionService();
