import { Schema, model } from "mongoose";

const Tag = new Schema({
  content: {
    type: String,
    required: true,
    unique: true
  },
});

export default model("Tag", Tag);