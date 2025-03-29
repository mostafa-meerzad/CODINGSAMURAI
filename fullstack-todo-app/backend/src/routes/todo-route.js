import { Router } from "express";
import { auth } from "../middlewares/auth-middleware.js";
import {
  addTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo-controller.js";

const router = Router();

router.get("/", auth, getTodos);
router.get("/:id", auth, getTodo);
router.post("/", auth, addTodo);
router.put("/:id", auth, updateTodo);
router.delete("/:id", auth, deleteTodo);

export default router;
