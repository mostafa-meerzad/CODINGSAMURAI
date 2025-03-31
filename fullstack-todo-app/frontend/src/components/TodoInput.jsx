import React from "react";
import { useForm } from "react-hook-form";
import check from "../assets/icon-check.svg";
import { axiosInstance } from "../axios";
import toast from "react-hot-toast";

const TodoInput = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("form data: ", data);
      const response = await axiosInstance.post("/todo", data)
      console.log("response from adding a todo: ", response)
    } catch (error) {
      console.log("something went wrong, ", error)
      toast.error("can't add Todo!")
    }
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
