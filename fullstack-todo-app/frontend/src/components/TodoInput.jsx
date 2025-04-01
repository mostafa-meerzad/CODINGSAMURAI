import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useTodo } from "../contexts/TodoContext";

const TodoInput = () => {
  const { register, handleSubmit, reset } = useForm();
  const { isAuthenticated } = useAuth();
  const { addTodo, getAllTodos } = useTodo();

  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      toast.error("you need to login first!");
      return;
    }

    addTodo(data.task);
    reset();
    getAllTodos();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-between md:gap-5 px-5 py-4 rounded-md mt-12 mb-8 bg-very-dark-grayish-blue "
    >
      <label className="w-full">
        <input
          type="text"
          {...register("task", { required: true })}
          placeholder="your todo..."
          className="text-xl outline-1 outline-gray-500 px-3 py-1 rounded-md w-full "
        />
      </label>

      <button type="submit" className="capitalize hover:text-indigo-400 p-3">
        add
      </button>
    </form>
  );
};

export default TodoInput;
