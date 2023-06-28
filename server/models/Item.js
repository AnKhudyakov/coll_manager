import { Schema, model } from "mongoose";

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

export default model("Item", Item);
