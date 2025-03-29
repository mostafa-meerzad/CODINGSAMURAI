import { Todo } from "../models/todo-model.js";
import { todoSchema, todoUpdateSchema } from "../validators/todo-validator.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json(todos);
  } catch (error) {
    console.log("error in todo-router ", error);
    res.status(500).json({ message: "server error" });
  }
};

export const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "todo not found" });
    }
    return res.status(200).json(todo);
  } catch (error) {
    console.log("error in getTodo controller, ", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const addTodo = async (req, res) => {
  try {
    const { error, value } = todoSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        errors:  error.message ,
      });
    }

    const todo = new Todo({ task: value.task, user: req.user._id });
    await todo.save();

    return res.status(201).json(todo);
  } catch (error) {
    console.log("error in addTodo controller", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findByIdAndDelete(todoId);

    if (!todo) {
      return res.status(404).json({ message: "todo not found" });
    }

    return res.status(200).json({ message: "todo successfully deleted" });
  } catch (error) {
    console.log("error in removeTodo controller", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { error, value } = todoUpdateSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((error) => ({ message: error.message })),
      });
    }

    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "todo not found" });
    }

    todo.task = value.task && value.task;
    todo.isCompleted = value.isCompleted;

    await todo.save();

    return res.status(200).json(todo);
  } catch (error) {
    console.log("error in updateTodo controller", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
