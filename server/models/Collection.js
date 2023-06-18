import { Schema, model } from "mongoose";

const Collection = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  topic: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String },
  customFields: { type: Array },
});

export default model("Collection", Collection);
