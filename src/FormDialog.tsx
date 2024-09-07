import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";

type Props = {
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onToggleDialog: () => void;
  text: string;
  dialogOpen: boolean;
};

export const FormDialog = (props: Props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit();
      }}
    >
      <Dialog open={props.dialogOpen}
        fullWidth={true}
        onClose={props.onToggleDialog}
      >
        <DialogContent>
          <TextField
            fullWidth
            value={props.text}
            onChange={(e) => props.onChange(e)}
            multiline={false}
            rows={1}
            size="small"
            label="タスクを入力..."
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onSubmit}>追加</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
