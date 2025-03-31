import React, { useEffect, useState } from "react";
import Todo from "../Todo";
import { axiosInstance } from "../../axios";


const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const response = await axiosInstance.get(`/todo`);

      // setTodos((prev) => [...prev, response.data]);
      console.log(response.data)
      setTodos(response.data)
    };

    getTodos();
  }, []);
  return (
    <section className="flex flex-col gap-1">
      {todos.map((todo) => {
        return <Todo {...todo} key={todo._id} />;
      })}
    </section>
  );
};

export default Todos;
