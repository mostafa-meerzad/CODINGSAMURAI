import { useState } from "react";
import check from "../assets/icon-check.svg";
import cross from "../assets/icon-cross.svg";
import { useTodo } from "../contexts/TodoContext";

const Todo = ({ isCompleted, task, id }) => {
  const { updateTodo, removeTodo } = useTodo();
  const [isDone, setIsDone] = useState(isCompleted);

  const handleUpdate = () => {
    updateTodo((isCompleted = !isDone), task, id);
    setIsDone(!isDone);
  };

  const handleDelete = () => {
    removeTodo(id);
  };

  return (
    <div className=" flex justify-between items-center p-4 rounded-md bg-very-dark-grayish-blue ">
      <button
        type="button"
        onClick={handleUpdate}
        className={`w-6 h-6 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center transition-all duration-300 cursor-pointer 
          ${
            isCompleted
              ? "border-transparent bg-radial-[at_50%_75%] from-check-background-from  to-check-background-to to-90%"
              : ""
          } `}
      >
        <img src={check} alt="isCompleted" />
      </button>

      <p className="w-4/5 ">{task}</p>

      <button type="button" className="cursor-pointer" onClick={handleDelete}>
        <img src={cross} alt="delete" />
      </button>
    </div>
  );
};

export default Todo;
