import Item from "../../models/Item.js";
//import { Client } from '@elastic/elasticsearch';

// const client = new Client({
//   node: 'http://localhost:9200',
//   log: 'trace'
// })

class SearchService {
  async getItems(search) {
    console.log("SEARCH", search);
    return await Item.find({name: {$regex: search}})
    // const results = await Item.search({
    //   query_string: {
    //     query: search
    //   }
    // });
    // console.log("RES",results);
    //return await Item.search({query_string: {query: search}})
    // return new Promise((resolve, reject) => {
    //   Item.search(
    //     {
    //       query_string: {
    //         query: search,
    //         //analyzer: "keyword",
    //       },
    //     },
    //     async (err, results) => {
    //       console.log("ERROR",err);
    //       console.log("RES",results);
    //       if (!results || !results.hits || results.hits.total <= 0) {
    //         return resolve([]);
    //       }
    //       let itemIds = results.hits.hits.map((r) => r["_id"]);
    //       resolve(await Item.find({ _id: { $in: itemIds } }));
    //     }
    //   );
    // });
  }
}

export default new SearchService();
