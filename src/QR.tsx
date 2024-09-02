import { Backdrop, styled } from "@mui/material";
import { type ReactElement } from "react"
import { QRCode } from "react-qrcode-logo";

export interface QRProps {
  open: boolean;
  onClose: () => void;
}

const TodoBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
}));

export function QR(props: QRProps): ReactElement {
  return (
    <TodoBackdrop open={props.open} onClick={props.onClose}>
      <QRCode value="https://localhost:3000" />
    </TodoBackdrop>
  );
}
