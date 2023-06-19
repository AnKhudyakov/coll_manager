import { Schema, model } from "mongoose";

const Collection = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  topic: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: String },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  customFields: { type: Array },
});

export default model("Collection", Collection);
