import { Schema, model } from "mongoose";

const User = new Schema({
  user_name: {
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
});

export default model("User", User);
