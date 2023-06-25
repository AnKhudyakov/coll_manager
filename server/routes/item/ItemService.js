import Item from "../../models/Item.js";
import TagService from "../tag/tagService.js";
import CollectionService from "../collection/CollectionService.js";
import UserService from "../user/UserService.js";

class ItemService {
  async getAllItems(query) {
    const { limit, sort_by, sort_order } = query;
    const items = await Item.find({})
      .limit(limit)
      .sort({ [sort_by]: sort_order });
    const resultItems = await Promise.all(
      items.map(async (item) => {
        const collection = await CollectionService.getCollectionById(
          item.collectionId
        );
        const user = await UserService.getUserById(item.author);
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
    const idsTag = await TagService.createTags(item.tags);
    const newItem = new Item({ ...item, tags: idsTag });
    await CollectionService.addItemInCollection(item,newItem);
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
    await CollectionService.removeItemFromCollection(item,id);
    return item;
  }
  async updateItem(req) {
    const { id } = req.params;
    const idsTag = req.body.tags
      ? await TagService.createTags(req.body.tags)
      : null;
    const update= idsTag?{
      ...req.body,
      tags: idsTag,
    }:{ ...req.body }
    console.log("UPDATE", update);
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
}
export default new ItemService();
