import { Schema, model } from "mongoose";

const Item = new Schema({
  name: { type: String, required: true },
  tags: { type: Array, required: true },
  author: { type: String, required: true },
  collectionId: { type: String, required: true },
  likes: { type: Array },
  customFields: { type: Array },
});

export default model("Item", Item);
