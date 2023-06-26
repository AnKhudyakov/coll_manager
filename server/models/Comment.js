import { Schema, model } from "mongoose";

const Comment = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Comment", Comment);
