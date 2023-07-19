import { Schema, model } from "mongoose";

const Tag = new Schema({
  content: {
    type: String,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    default: 1
  },
});

export default model("Tag", Tag);