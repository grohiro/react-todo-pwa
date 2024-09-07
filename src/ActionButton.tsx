import { Filter, Todo } from "./@types/Todo";
import Fab from "@mui/material/Fab";
import Icon from "@mui/material/Icon";
import { styled } from "@mui/material";

type Props = {
  onEmpty: () => void;
  onToggleDialog: () => void;
  todos: Todo[];
  filter: Filter;
};

const ButtonFab = styled(Fab)(() => ({
  position: 'fixed',
  right: 15,
  bottom: 15,
}));

export const ActionButton = (props: Props) => {
  return (
    <>
      {props.filter !== 'removed'
        ? (
          <ButtonFab color="secondary" onClick={props.onToggleDialog}>
            <Icon sx={{ color: '#fff' }}>add</Icon>
          </ButtonFab>
        ) : (
          <ButtonFab
            color="secondary"
            onClick={() => props.onEmpty()}
            disabled={props.todos.filter((todo) => todo.removed).length === 0}
          >
            <Icon>delete</Icon>
          </ButtonFab>
        )}
    </>
  );
};
