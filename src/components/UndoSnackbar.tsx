import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import EventContext from '@/context/EventContext';

export const UndoSnackbar = () => {
  const {
    undo,
    clearUndo,
    executeUndoEvent,
  } = useContext(EventContext)

  const action = (
    <>
      <Button size="small" onClick={executeUndoEvent}>
        Desfazer
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={clearUndo}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  
  return (
  <Snackbar
    open={true}
    action={action}
    message={undo}
    anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
  />
  )
}