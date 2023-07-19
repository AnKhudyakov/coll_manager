import CollectionService from "../CollectionService.js";

class CollectionController {
  async getCollections(req, res) {
    try {
      const collections = await CollectionService.getAllCollections(req.query);
      if (!collections) {
        return res.status(404).json({ message: "Collections not found" });
      }
      return res.status(200).json(collections);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async getTopCollections(req, res) {
    try {
      const collections = await CollectionService.getTopCollections(req.query);
      if (!collections) {
        return res.status(404).json({ message: "Collections not found" });
      }
      return res.status(200).json(collections);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async getCollectionById(req, res) {
    try {
      const collection = await CollectionService.getCollectionById(
        req.params.id
      );
      if (!collection) {
        return res.status(404).json({ message: "Collection doesn't exist" });
      }
      return res.status(200).json(collection);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async getCollectionsByUser(req, res) {
    try {
      const collections = await CollectionService.getCollectionsByUser(
        req.params.id, req.query
      );
      if (!collections) {
        return res
          .status(404)
          .json({ message: "No collections found for user" });
      }
      return res.status(200).json(collections);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async createCollection(req, res) {
    try {
      await CollectionService.createCollection(req.body);
      return res.status(200).json({ message: "Collection was created" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async removeCollection(req, res) {
    try {
      const collection = await CollectionService.removeCollection(
        req.params.id
      );
      return res.status(200).json(collection);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async updateCollection(req, res) {
    try {
      await CollectionService.updateCollection(req);
      return res.status(200).json({ message: "Collection has been updated" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

export default new CollectionController();
