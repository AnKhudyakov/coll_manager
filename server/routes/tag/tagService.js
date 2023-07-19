import Tag from "../../models/Tag.js";

class TagService {
  async getAllTags(query) {
    const { limit, sort_by, sort_order } = query;
    return await Tag.find({})
      .limit(limit)
      .sort({ [sort_by]: sort_order });
  }
  async createTag(tag, action) {
    const exist = await Tag.findOne({ content: tag.content });
    if (exist && action === "create") {
      await Tag.updateOne(
        { content: exist.content },
        { count: exist.count + 1 }
      );
      return;
    } else if (exist && action === "update") {
      return;
    }
    const newTag = new Tag(tag);
    return await newTag.save();
  }
  async createTags(tags, action) {
    return await Promise.all(
      tags.map(async (tag) => {
        await this.createTag({ content: tag }, action);
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
