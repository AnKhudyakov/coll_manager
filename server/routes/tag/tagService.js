import Tag from "../../models/Tag.js";

class TagService {
  async getAllTags() {
    return await Tag.find({});
  }
  async createTag(tag) {
    const exist = await Tag.findOne({ content: tag.content });
    if (exist) return;
    const newTag = new Tag(tag);
    return await newTag.save();
  }
  async createTags(tags) {
    return await Promise.all(
      tags.map(async (tag) => {
        await this.createTag({ content: tag });
        const newTag = await this.getTagIdByContent(tag);
        return newTag._id;
      })
    );
  }
  async getTagById(id) {
    return await Tag.findOne({ _id: id });
  }
  async getTagId(tags) {
    return await Tag.find({ content: { $in: tags } });
  }
  async getTagIdByContent(tag) {
    return await Tag.findOne({ content: tag });
  }
  async getTagContent(tags) {
    return await Tag.find({ _id: { $in: tags } }).select({
      content: 1,
      _id: 0,
    });
  }
  async removeTag(id) {
    const tag = await Tag.findOneAndDelete({ _id: id });
    return tag;
  }
  async updateTag(req) {
    const { id } = req.params;
    await Tag.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
  }
}

export default new TagService();