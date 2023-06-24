import Item from "../../models/Item.js";
import Collection from "../../models/Collection.js";
import TagService from "../tag/tagService.js";
import User from "../../models/User.js";

class ItemService {
  async getAllItems(query) {
    const { limit, sort_by, sort_order } = query;
    const items = await Item.find({})
      .limit(limit)
      .sort({ [sort_by]: sort_order });
    const resultItems = await Promise.all(
      items.map(async (item) => {
        const collection = await Collection.findOne({ _id: item.collectionId });
        const user = await User.findOne({ _id: item.author });
        return {
          ...item._doc,
          collectionId: collection.name,
          author: user.username,
        };
      })
    );
    return resultItems;
  }
  async createItem(item) {
    const idsTag = await Promise.all(
      item.tags.map(async (tag) => {
        const newTag = await TagService.createTag({ content: tag });
        return newTag._id;
      })
    );
    const newItem = new Item({ ...item, tags: idsTag });
    await Collection.findOneAndUpdate(
      { _id: item.collectionId },
      { $push: { items: newItem._id } }
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
    await Collection.findOneAndUpdate(
      { _id: item.collectionId },
      { $pull: { items: id } }
    );
    return item;
  }
  async updateItem(req) {
    const { id } = req.params;
    if (req.body.tags) {
      req.body.tags.forEach(async (tag) => {
        await TagService.createTag({ content: tag });
      });
    }
    const idsTag = await TagService.getTagId(req.body.tags);
    if (req.body.like) {
      await Item.findOneAndUpdate(
        { _id: id },
        { ...req.body, tags: idsTag, $addToSet: { likes: req.body.like } },
        { new: true }
      );
    } else {
      await Item.findOneAndUpdate(
        { _id: id },
        { ...req.body, tags: idsTag },
        { new: true }
      );
    }
  }
}
export default new ItemService();
