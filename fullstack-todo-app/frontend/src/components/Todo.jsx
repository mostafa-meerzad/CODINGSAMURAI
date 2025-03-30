import React from "react";
import check from "../assets/icon-check.svg";
import cross from "../assets/icon-cross.svg";

const Todo = ({ isCompleted, task, id }) => {
  return (
    <div className=" flex justify-between items-center p-4 rounded-md bg-very-dark-grayish-blue ">
      <div
        className={`w-6 h-6 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center transition-all duration-300 cursor-pointer 
          ${
            isCompleted
              ? "border-transparent bg-radial-[at_50%_75%] from-check-background-from  to-check-background-to to-90%"
              : ""
          } `}
      >
        <img src={check} alt="isCompleted" />
      </div>

      <p className="w-4/5 ">{task}</p>

      <div className="cursor-pointer">
        <img src={cross} alt="delete" />
      </div>
    </div>
  );
};

export default Todo;
