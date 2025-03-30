import React from "react";

import { useForm } from "react-hook-form";
import check from "../assets/icon-check.svg";

const TodoInput = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("form data: ", data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-between md:gap-5 px-5 py-4 rounded-md mt-12 mb-8 bg-very-dark-grayish-blue "
    >
      <label className="relative flex items-center cursor-pointer">
        <input type="checkbox" {...register("isCompleted")} className="peer hidden" />
        <div className="w-6 h-6 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center transition-all duration-300 peer-checked:border-transparent peer-checked:bg-radial-[at_50%_75%] from-check-background-from  to-check-background-to to-90%  ">
          <img src={check} alt="check" className="" />
        </div>
      </label>

      <label className="w-2/3">
        <input
          type="text"
          {...register("task", { required: true })}
          placeholder="your todo..."
          className="text-xl outline-1 outline-gray-500 px-3 py-1 rounded-md w-full "
        />
      </label>

      <button type="submit" className="capitalize hover:text-indigo-400 p-3">add</button>
    </form>
  );
};

export default TodoInput;
