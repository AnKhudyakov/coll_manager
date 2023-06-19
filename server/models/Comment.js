import { Schema, model } from "mongoose";

const Comment = new Schema({
  content: {
    type: String,
    required: true,
  },
});

export default model("Comment", Comment);
