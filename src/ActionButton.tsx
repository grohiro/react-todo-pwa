import Button from "@mui/material/Button";
import { Todo } from "./@types/Todo";

type Props = {
  onEmpty: () => void;
  onClickAdd: () => void;
  todos: Todo[];
};

export const ActionButton = (props: Props) => {
  return (
    <>
      <button
        onClick={() => props.onEmpty()}
        disabled={props.todos.filter((todo) => todo.removed).length === 0}
      >
        ごみ箱を空にする
      </button>
      <Button
        onClick={props.onClickAdd}
      >
        +
      </Button>
    </>
  );
};
