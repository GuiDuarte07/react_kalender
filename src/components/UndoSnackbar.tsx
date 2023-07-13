import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface IUndoSnackbar {
  message: string
  handleClose: () => void
  handleUndo: () => void
}

export const UndoSnackbar = ({ message, handleClose, handleUndo }: IUndoSnackbar) => {
  const action = (
    <>
      <Button size="small" onClick={handleUndo}>
        Desfazer
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  
  return (
  <Snackbar
    open={true}
    action={action}
    message={message}
    anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
  />
  )
}