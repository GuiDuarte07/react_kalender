import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputDateTimeRangeField';
import { useState, useContext, useEffect } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import AlertDialog from './AlertDialog';
import EventContext, { IEventContext } from '@/context/EventContext';


type IOnEditEvent = (id: number, startAt: string, endAt: string, summary: string) => void
type IOnSubmitEvent = (startAt: string, endAt: string, summary: string) => void
type IOnDelteEvent = (id: number) => void

type IKalendEventDialog = 
  | {
  newEvent: true;
  event: {startAt: string, endAt: string};
  onSubmitEvent: IOnSubmitEvent;
  onCancelEvent: () => void;
  } 
  | {
    newEvent: false;
    event: {id: number, startAt: string, endAt: string, summary: string};
    onEditEvent: IOnEditEvent
    onCancelEvent: () => void;
    onDeleteEvent: IOnDelteEvent
  }

export default function KalendEventDialog({ newEvent, event, onCancelEvent, ...rest}: IKalendEventDialog) {
  const [startDate, setStartDate] = useState(dayjs(event.startAt))
  const [endDate, setEndDate] = useState(dayjs(event.endAt))
  const [summary, setSummary] = useState((!newEvent ? event.summary : ''))
  const [deleteAlert, setDeleteAlert] = useState(false)

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (summary.length < 3) return;
    
    if ('onSubmitEvent' in rest) {
      const onSubmitEvent = rest.onSubmitEvent;
      
      onSubmitEvent(startDate.toISOString(), endDate.toISOString(), summary)
    }
    else if ('onEditEvent' in rest && !newEvent) {
      const onEditEvent = rest.onEditEvent;
      onEditEvent(event.id, startDate.toISOString(), endDate.toISOString(), summary)
    } else {
      throw new Error("invalid props returned")
    }
  }

  function handleDeleteEvent() {
    setDeleteAlert(false)
    if (!newEvent && 'onDeleteEvent' in rest) {
      rest.onDeleteEvent(event.id)
    }  
  }
  
  return (
      <Dialog open={true} onClose={onCancelEvent}>
        {deleteAlert && !newEvent &&
          <AlertDialog 
            title='Deseja excluir esse evento' 
            handleClose={() => setDeleteAlert(false)}
            handleConfirm={handleDeleteEvent}
          />
        }
        <form onSubmit={(e) => submit(e)}>
          <DialogTitle>{newEvent ? 'Novo Evento' : 'Editar Evento'}</DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  'MultiInputDateTimeRangeField'
                ]}
              >
                <DemoItem
                  label={"Insira a data de começo e a data de fim"}
                  component="MultiInputDateTimeRangeField"
                >
                  <MultiInputDateTimeRangeField
                    ampm={false}
                    defaultValue={[startDate, endDate]}
                    onChange={dateArray => {
                      dateArray[0] && setStartDate(dateArray[0])
                      dateArray[1] && setEndDate(dateArray[1])
                    }}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>

            <TextField autoFocus  className='w-full mt-8' placeholder='Insira um resumo para esse evento' value={summary} onChange={e => setSummary(e.target.value)} />

            {!newEvent && <Button onClick={() => setDeleteAlert(true)} className='mt-4' variant="text"><ClearIcon/> Excluir esse evento</Button>}

          </DialogContent>
          <DialogActions>
            <Button onClick={onCancelEvent}>Cancelar</Button>
            <Button type='submit'>Confirmar</Button>
          </DialogActions>
        </form>
      </Dialog>
  );
}
