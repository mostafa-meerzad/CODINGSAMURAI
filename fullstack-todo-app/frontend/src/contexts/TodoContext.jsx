import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { axiosInstance } from "../axios";
import toast from "react-hot-toast";

const todoContext = createContext(undefined);

export const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState();
  const { isAuthenticated } = useAuth();

  const getAllTodos = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await axiosInstance.get("/todo");
      setTodos(response.data);
    } catch (error) {
      console.log("can't get all your todos: ", error);
      toast.error("something went wrong!");
    }
  };

  const addTodo = async (task) => {
    if (!isAuthenticated) return;

    try {
      const response = await axiosInstance.post("/todo", { task });
      if (response.status >= 200 && response.status < 300) {
        const todo = response.data;
        setTodos((prev) => [todo, ...prev]);
        toast.success("new todo added");
      }
    } catch (error) {
      console.log("can't add todo: ", error);
      toast.error("can't add todo!");
    }
  };

  const updateTodo = async (isCompleted, task, id) => {
    if (!isAuthenticated) return;

    try {
      const response = await axiosInstance.put(`/todo/${id}`, {
        isCompleted,
        task,
      });

      if (response.status >= 200 && response.status < 300) {
        getAllTodos();
      }

      return toast.success("todo updated");
    } catch (error) {
      console.log("something went wrong: ", error);
      toast.error("can't update todo!");
    }
  };

  const removeTodo = async (id) => {
    if (!isAuthenticated) return;

    try {
      const response = await axiosInstance.delete(`/todo/${id}`);

      if (response.status >= 200 && response.status < 300) {
        getAllTodos();
      }

      return toast.error("todo deleted!");
    } catch (error) {
      console.log("something went wrong: ", error);
      toast.error("can't delete todo!");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getAllTodos();
    }
    setTodos([]);
  }, [isAuthenticated]);

  return (
    <todoContext.Provider
      value={{ todos, updateTodo, getAllTodos, addTodo, removeTodo }}
    >
      {children}
    </todoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(todoContext);
  if (!context) {
    throw new Error("useTodo must only be used within an TodoContextProvider");
  }
  return context;
};
