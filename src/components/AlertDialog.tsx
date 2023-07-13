import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IAlertDialog {
  handleClose: () => void,
  handleConfirm: () => void
  title: string
  description?: string
}

export default function AlertDialog({ title, description, handleClose, handleConfirm }: IAlertDialog) {
  return (
    <Dialog
      onClose={handleClose}
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      {description && <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>}
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleConfirm} autoFocus>
          Aceitar
        </Button>
      </DialogActions>
    </Dialog>
  );
}