import ItemService from "../ItemService.js";
import TagService from "../../tag/tagService.js";

class ItemController {
  async getItems(req, res) {
    try {
      const items = await ItemService.getAllItems(req.query);
      if (!items) {
        return res.status(404).json({ message: "DB is empty" });
      }
      return res.status(200).json(items);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  
  async getItemById(req, res) {
    try {
      const item = await ItemService.getItemById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Item doesn't exist" });
      }
      const tags = (await TagService.getTagContent(item.tags)).map((tag) => tag.content);
      const resultItem = {
        ...item._doc,
        tags,
      };
      return res.status(200).json(resultItem);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async getItemsByCollection(req, res) {
    try {
      const items = await ItemService.getItemsByCollection(req.params.id);
      if (!items) {
        return res
          .status(404)
          .json({ message: "No items found for collection" });
      }
      const resultItems = await Promise.all(
        items.map(async (item) => {
          const tags = await TagService.getTagContent(item.tags);
          const tagContent = tags.map((tag) => tag.content);
          return {
            ...item._doc,
            tags: tagContent,
          };
        })
      );
      return res.status(200).json(resultItems);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async getItemsByUser(req, res) {
    try {
      const items = await ItemService.getItemsByUser(req.params.id);
      if (!items) {
        return res.status(404).json({ message: "No items found for user" });
      }
      return res.status(200).json(items);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async createItem(req, res) {
    try {
      await ItemService.createItem(req.body);
      return res.status(200).json({ message: "Item was created" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async removeItem(req, res) {
    try {
      const item = await ItemService.removeItem(req.params.id);
      return res.status(200).json(item);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async updateItem(req, res) {
    try {
      await ItemService.updateItem(req);
      return res.status(200).json({ message: "Item has been updated" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async addLike(req, res) {
    try {
      await ItemService.addLike(req);
      return res.status(200).json({ message: "Item has been updated" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

export default new ItemController();
