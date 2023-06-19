import Item from "../../models/Item.js";
import Collection from "../../models/Collection.js";
import TagService from "../tag/tagService.js";

class ItemService {
  async getAllItems() {
    return await Item.find({});
  }
  async createItem(item) {
    item.tags.forEach(async (tag) => {
      await TagService.createTag({ content: tag });
    });
    const idsTag = await TagService.getTagId(item.tags);
    const newItem = new Item({ ...item, tags: idsTag });
    await Collection.findOneAndUpdate(
      { _id: item.collectionId },
      { $push: { items: newItem } }
    );
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
    await Item.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
  }
}

export default new ItemService();
