import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export interface AlertDialogProps {
  open: boolean;
  onClose: (b: boolean) => void;
}

export function AlertDialog(props: AlertDialogProps) {
  return (
    <Dialog open={props.open}>
      <DialogTitle>
        アラート
      </DialogTitle>
      <DialogContent>
        本当にごみ箱を完全に空にしますか？<br />
        この操作は取り消しできません。
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose(false)}>いいえ</Button>
        <Button onClick={() => props.onClose(true)} autoFocus>
          はい
        </Button>
      </DialogActions>
    </Dialog>
  );
}
