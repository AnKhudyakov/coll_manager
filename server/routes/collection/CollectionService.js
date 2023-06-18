import Collection from "../../models/Collection.js";

class CollectionService {
  async getAllCollections() {
    return await Collection.find({});
  }
  async createCollection(collection) {
    const newCollection = new Collection(collection);
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
