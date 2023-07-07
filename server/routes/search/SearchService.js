import Collection from "../../models/Collection.js";
import Comment from "../../models/Comment.js";
import Item from "../../models/Item.js";
import Tag from "../../models/Tag.js";
class SearchService {
  async getItems(search) {
    const items = await Item.aggregate([
      {
        $search: {
          index: "items",
          text: {
            query: search,
            path: {
              wildcard: "*",
            },
            fuzzy: { maxEdits: 1 },
          },
        },
      },
      {
        $limit: 20,
      },
    ]);
    const comments = await Comment.aggregate([
      {
        $search: {
          index: "comments",
          text: {
            query: search,
            path: {
              wildcard: "*",
            },
            fuzzy: { maxEdits: 1 },
          },
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
      {
        $limit: 10,
      },
    ]);
    const collections = await Collection.aggregate([
      {
        $search: {
          index: "collections",
          text: {
            query: search,
            path: {
              wildcard: "*",
            },
            fuzzy: { maxEdits: 1 },
          },
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
      {
        $limit: 10,
      },
    ]);
    const itemsFromComments = comments
      ? await Item.find({
          comments: { $in: comments.map((comment) => comment._id) },
        })
      : [];
    const itemsFromCollections = collections
      ? await Item.find({
          collectionId: {
            $in: collections.map((collection) => collection._id),
          },
        })
      : [];
    const tag = await Tag.findOne({ content: search });
    const itemsFromTag = tag ? await Item.find({ tags: tag._id }) : [];
    return [
      ...new Set(
        items
          .concat(itemsFromTag)
          .concat(itemsFromComments)
          .concat(itemsFromCollections)
          .map(JSON.stringify)
      ),
    ].map(JSON.parse);
  }
}

export default new SearchService();
