import Item from "../../models/Item.js";

class ItemService {
  async getAllItems() {
    return await Item.find({});
  }
  async createItem(item) {
    const newItem = new Item(item);
    await newItem.save();
  }
  async getItemsByUser(id) {
    return await Item.find({ author: id });
  }
  async getItemsByCollection(id) {
    return await Item.find({ collectionId: id });
  }
  async getItemById(id) {
    return await Item.findOne({ _id: id });
  }
  async removeItem(id) {
    const item = await Item.findOneAndDelete({ _id: id });
    return item;
  }
  async updateItem(req) {
    const { id } = req.params;
    await Item.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
  }
}

export default new ItemService();
