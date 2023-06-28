import Item from "../../models/Item.js";

class SearchService {
  async getItems(search) {
    return await Item.aggregate([
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
  }
}

export default new SearchService();
