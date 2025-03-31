import React from "react";
import Header from "./components/skeleton/Header";
import TodoInput from "./components/TodoInput";
import Todos from "./components/skeleton/Todos";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <main className="max-w-xl mx-auto mt-20 px-5 md:px-auto text-very-light-gray">
      <Toaster />
      <Header />

      <TodoInput />
      <Todos />
    </main>
  );
};

export default App;
