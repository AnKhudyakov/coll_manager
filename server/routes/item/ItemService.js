import Item from "../../models/Item.js";
import TagService from "../tag/tagService.js";
import CollectionService from "../collection/CollectionService.js";
import UserService from "../user/UserService.js";

class ItemService {
  async getAllItems(query) {
    const { limit, sort_by, sort_order } = query;
    const items = await Item.find({})
      .populate("author")
      .populate("collectionId")
      .limit(limit)
      .sort({ [sort_by]: sort_order });
    return items;
  }
  async createItem(item) {
    const idsTag = await TagService.createTags(item.tags);
    const newItem = new Item({ ...item, tags: idsTag });
    await CollectionService.addItemInCollection(item, newItem);
    await newItem.save();
  }

  async getItemsByUser(id) {
    return await Item.find({ author: id });
  }
  async getItemsByCollection(id) {
    return await Item.find({ collectionId: id }).populate("tags");
  }
  async getItemById(id) {
    return await Item.findOne({ _id: id }).populate("tags").populate("collectionId");
  }
  async getItemByTag(id) {
    return await Item.findOne({ tags: id });
  }
  async removeItem(id) {
    const item = await Item.findOneAndDelete({ _id: id });
    await CollectionService.removeItemFromCollection(item, id);
    return item;
  }
  async updateItem(req) {
    const { id } = req.params;
    const idsTag = req.body.tags
      ? await TagService.createTags(req.body.tags)
      : null;
    const update = idsTag
      ? {
          ...req.body,
          tags: idsTag,
        }
      : { ...req.body };
    await Item.findOneAndUpdate({ _id: id }, update, { new: true });
  }
  async addLike(req) {
    const { id } = req.params;
    await Item.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: { likes: req.body.like },
      },
      { new: true }
    );
  }
  async addCommentInItem(comment, newComment) {
    await Item.findOneAndUpdate(
      { _id: comment.itemId },
      { $push: { comments: newComment._id } }
    );
  }
  async addCustomFieldsInItem(comment, newComment) {
    await Item.findOneAndUpdate(
      { _id: comment.itemId },
      { $push: { comments: newComment._id } }
    );
  }
}
export default new ItemService();
