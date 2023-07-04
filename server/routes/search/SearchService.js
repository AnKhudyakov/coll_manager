import Item from "../../models/Item.js";
import Tag from "../../models/Tag.js";
class SearchService {
  async getItems(search) {
    const tag = await Tag.findOne({ content: search });
    const itemsWithTag = await Item.find({ tags: tag._id });
    const items = await Item.aggregate([
      {
        $search: {
          index: "items",
          text: {
            query: [search, tag._id.toString()],
            path: {
              wildcard: "*",
            },
            fuzzy: { maxEdits: 1 },
          },
        },
      },
      // {
      //   $project: {
      //     "_id": 0,
      //     "title": 1,

      //     score: { $meta: "searchScore" }
      //   }
      // },
      {
        $limit: 10,
      },
    ]);
    return [...new Set(items.concat(itemsWithTag).map(JSON.stringify))].map(
      JSON.parse
    );
  }
}

export default new SearchService();
