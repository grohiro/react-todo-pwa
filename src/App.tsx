import { useState } from 'react';

type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
}

export const App = () => {

  const [text, setText] = useState('');

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos((todos) => [...todos, newTodo]);

    setText('');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const handleEdit = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return { ...todo, value: e.target.value };
      });

      return newTodos;
    });
  }

  const handleCheck = (id: number, checked: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return { ...todo, checked, };
      });

      return newTodos;
    });
  }

  const handleRemove = (id: number, removed: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return { ...todo, removed, };
      });

      return newTodos;
    });
  }

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit();
      }}>
        <input type="text" value={text} onChange={(e) => handleChange(e)} />
        <input
          type="submit"
          value="追加"
          onSubmit={handleSubmit}
        />
      </form>

      <ul>
        {todos.map((todo) => {
          return (<li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.checked}
              disabled={todo.removed}
              onChange={() => handleCheck(todo.id, !todo.checked)}
            />
            <input type="text" disabled={todo.checked || todo.removed} value={todo.value} onChange={(e) => handleEdit(todo.id, e)} />
            <button
              onClick={() => handleRemove(todo.id, !todo.removed)}>
              {todo.removed ? "復元" : "削除"}
            </button>
          </li>)
        })}
      </ul>

      <p>{text}</p>

    </div>
  );
};
