import { createTheme, GlobalStyles, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Filter, Todo } from "./@types/Todo";
import { FormDialog } from "./FormDialog";
import { ActionButton } from "./ActionButton";
import { SideBar } from "./SideBar";
import { TodoItem } from "./TodoItem";
import { AppToolbar } from "./AppToolbar";
import { indigo, pink } from "@mui/material/colors";
import { QR } from "./QR";
import { AlertDialog } from "./AlertDialog";
import localforage from "localforage";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003a',
    },
  }
});

export const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      value: "TODO #1",
      checked: false,
      removed: false,
    }
  ]);
  const [filter, setFilter] = useState<Filter>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleToggleQr = () => {
    setQrOpen(b => !b);
  };

  const handleToggleFormDialog = () => {
    setDialogOpen(b => !b);
    setText('');
  };

  const handleToggleDrawer = () => {
    setDrawerOpen((b) => !b);
  };

  const handleSubmit = () => {
    if (!text) {
      setDialogOpen(b => !b);
      return;
    }

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos((todos) => [...todos, newTodo]);
    setText("");
    setDialogOpen(b => !b);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleAlert = (b: boolean) => {
    if (b) {
      handleEmpty();
    }
    setAlertOpen(b => !b);
  };

  useEffect(() => {
    localforage.getItem('todo-20240909')
      .then((values) => setTodos(values as Todo[]));
  }, [])

  useEffect(() => {
    localforage.setItem('todo-20240909', todos);
  }, [todos]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <AppToolbar filter={filter} onToggleDrawer={handleToggleDrawer} />
      <SideBar onSort={handleSort} drawerOpen={drawerOpen} onToggleDrawer={handleToggleDrawer} onToggleQR={handleToggleQr} />
      <FormDialog dialogOpen={dialogOpen} text={text} onChange={handleChange} onSubmit={handleSubmit} onToggleDialog={handleToggleFormDialog} />

      <TodoItem filter={filter} todos={todos} onTodo={handleTodo} />
      <ActionButton onEmpty={() => setAlertOpen(true)} todos={todos} onToggleDialog={handleToggleFormDialog} filter={filter} />
      <QR open={qrOpen} onClose={handleToggleQr} />
      <AlertDialog open={alertOpen} onClose={handleAlert} />

    </ThemeProvider>
  );
};
