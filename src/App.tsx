import { useState } from "react";
import { Filter, Todo } from "./@types/Todo";
import { FormDialog } from "./FormDialog";
import { ActionButton } from "./ActionButton";
import { SideBar } from "./SideBar";
import { TodoItem } from "./TodoItem";

export const App = () => {
  const [text, setText] = useState("");

  const [todos, setTodos] = useState<Todo[]>([]);

  const [filter, setFilter] = useState<Filter>("all");

  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos((todos) => [...todos, newTodo]);

    setText("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, [key]: value } : todo))
    );
  };

  const handleSort = (filter: Filter) => {
    setFilter(filter);
  };

  const handleEmpty = () => {
    setTodos((todos) => {
      return todos.filter((todo) => !todo.removed);
    });
  };

  return (
    <div>
      <SideBar onSort={handleSort} />
      <FormDialog text={text} onChange={handleChange} onSubmit={handleSubmit} />

      <TodoItem filter={filter} todos={todos} onTodo={handleTodo} />
      <ActionButton onEmpty={handleEmpty} todos={todos} />

      <p>{text}</p>
    </div>
  );
};
