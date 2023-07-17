import { Schema, model } from "mongoose";

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: { type: Boolean, required: true },
  blocked: { type: Boolean, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  collections: [
    {
      type: Schema.Types.ObjectId,
      ref: "Collection",
    },
  ],
});

export default model("User", User);
