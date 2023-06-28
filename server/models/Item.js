import { Schema, model } from "mongoose";
//import mongoosastic from "mongoosastic";
//import elasticsearch from "elasticsearch";

const Item = new Schema(
  {
    name: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    customFields: { type: Array },
  },
  { timestamps: true }
);

// Item.plugin(
//   mongoosastic,
//   // {
//   //   host: process.env.ES_URL || "localhost:9200",
//   //   port: 9200,
//   // }

//   //,
//     {
//     esClient: elasticsearch.Client({
//       host: process.env.ES_URL || "localhost:9200",
//     }),
//   }
// );

export default model("Item", Item);
