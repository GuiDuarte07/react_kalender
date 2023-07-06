import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { NewEventClickData } from 'kalend/common/interface';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputDateTimeRangeField';
import {useState} from 'react'

interface IKalendEventDialog {
  newEvent: NewEventClickData
  onSubmitEvent: (startAt: string, endAt: string, summary: string) => void
  onCancelEvent: () => void
}

export default function KalendEventDialog({newEvent, onSubmitEvent, onCancelEvent}: IKalendEventDialog) {

  const [startDate, setStartDate] = useState(dayjs(newEvent.startAt))
  const [endDate, setEndDate] = useState(dayjs(newEvent.endAt))
  const [summary, setSummary] = useState('');
  
  return (
      <Dialog open={true}>
        <form onSubmit={(e) => {e.preventDefault(); onSubmitEvent(startDate.toISOString(), endDate.toISOString(), summary)}}>
          <DialogTitle>Novo evento</DialogTitle>
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

          </DialogContent>
          <DialogActions>
            <Button onClick={onCancelEvent}>Cancelar</Button>
            <Button type='submit'>Confirmar</Button>
          </DialogActions>
        </form>
      </Dialog>
  );
}
