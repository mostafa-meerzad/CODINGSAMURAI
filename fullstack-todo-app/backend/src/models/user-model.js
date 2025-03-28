import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, minlength: 6, maxlength: 155 },
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
