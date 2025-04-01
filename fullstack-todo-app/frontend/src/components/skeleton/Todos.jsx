import Todo from "../Todo";
import { useTodo } from "../../contexts/TodoContext";

const Todos = () => {
  const { todos } = useTodo();

  return (
    <section className="flex flex-col gap-1">
      {todos?.map(({ _id, isCompleted, task }) => {
        return (
          <Todo id={_id} isCompleted={isCompleted} task={task} key={_id} />
        );
      })}
    </section>
  );
};

export default Todos;
