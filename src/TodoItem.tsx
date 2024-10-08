import TextField from "@mui/material/TextField";
import { Filter, Todo } from "./@types/Todo";
import { Card, Icon, styled, Typography } from "@mui/material";
import grey from "@mui/material/colors/grey";
import lightBlue from "@mui/material/colors/lightBlue";
import pink from "@mui/material/colors/pink";

type Props = {
  todos: Todo[];
  filter: Filter;
  onTodo: <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => void;
};

const Container = styled('div')(() => ({
  margin: '0 auto',
  maxWidth: '640px',
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

const TodoCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  padding: theme.spacing(1),
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

const Form = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  fontSize: '16px',
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

const Button = styled('button')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
}));

const Trash = styled('button')(() => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
}));

export const TodoItem = (props: Props) => {
  const filteredTodos = props.todos.filter((todo) => {
    switch (props.filter) {
      case "all":
        return !todo.removed;
      case "checked":
        return todo.checked && !todo.removed;
      case "unchecked":
        return !todo.checked;
      case "removed":
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
    <>
      {filteredTodos.map((todo) => {
        return (
          <Container key={todo.id}>
            <Form>
              <TodoCard>
                <TextField
                  fullWidth
                  disabled={todo.checked || todo.removed}
                  variant="standard"
                  value={todo.value}
                  onChange={(e) => props.onTodo(todo.id, "value", e.target.value)}
                />
                <ButtonContainer>
                  <Button
                    aria-label={`todo-check-${todo.value}`}
                    onClick={() => props.onTodo(todo.id, 'checked', !todo.checked)}
                    disabled={props.filter === 'removed'}
                  >
                    {todo.checked ? (
                      <Icon
                        aria-label={`todo-removed-${todo.value}`}
                        style={{
                          color: props.filter !== 'removed' ? pink.A200 : grey[500],
                        }}
                      >
                        check_circle_outline
                      </Icon>
                    ) : (
                      <Icon
                        aria-label={`todo-uncheck-${todo.value}`}
                        style={{
                          color:
                            props.filter !== 'removed' ? lightBlue[500] : grey[500],
                        }}
                      >
                        radio_button_unchecked
                      </Icon>
                    )}
                    <Typography
                      style={{
                        userSelect: 'none',
                        color:
                          todo.checked && props.filter !== 'removed'
                            ? pink.A200
                            : grey[500],
                      }}
                    >
                      Done
                    </Typography>
                  </Button>
                  <Trash
                    onClick={() => props.onTodo(todo.id, 'removed', !todo.removed)}
                    disabled={!todo.checked}
                  >
                    {todo.removed
                      ? (<Icon>undo</Icon>)
                      : (<Icon style={{ color: todo.checked ? grey[500] : grey[200] }}>delete</Icon>)
                    }
                  </Trash>
                </ButtonContainer>
              </TodoCard>
            </Form>
          </Container>
        );
      })}
    </>
  );
};
