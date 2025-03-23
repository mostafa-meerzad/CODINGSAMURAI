import { Schema, model, Types } from "mongoose";

const todoSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    task: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps }
);

export const Todo = model("Todo", todoSchema);
