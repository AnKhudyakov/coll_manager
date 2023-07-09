import TagService from "../tagService.js";

class TagController {
  async getTags(req, res) {
    try {
      const tags = await TagService.getAllTags();
      if (!tags) {
        return res.status(404).json({ message: "Tags not found" });
      }
      return res.status(200).json(tags);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async getTagById(req, res) {
    try {
      const tag = await TagService.getTagById(
        req.params.id
      );
      if (!tag) {
        return res
          .status(404)
          .json({ message: "Tag doesn't exist" });
      }
      return res.status(200).json(tag);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async createTag(req, res) {
    try {
      await TagService.createTag(req.body);
      return res.status(200).json({ message: "Tag was created" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async removeTag(req, res) {
    try {
      const item = await TagService.removeTag(
        req.params.id
      );
      return res.status(200).json(item);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async updateTag(req, res) {
    try {
      await TagService.updateTag(req);
      return res.status(200).json({ message: "Tag has been updated" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

export default new TagController();
