import React from "react";
import Todo from "../Todo";

const Todos = () => {
  const todos = [
    { isCompleted: false, task: "complete the todo project", id: "123456789" },
    {
      isCompleted: false,
      task: "complete the todo project 1",
      id: "1234567891",
    },
    {
      isCompleted: true,
      task: "complete the todo project 2",
      id: "1234567892",
    },
  ];
  return (
    <section className="flex flex-col gap-1">
      {todos.map((todo) => {
        return <Todo {...todo} key={todo.id} />;
      })}
    </section>
  );
};

export default Todos;
