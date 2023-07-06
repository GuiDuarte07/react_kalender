"use client"
import { Calendar } from '@/components/Calendar'
import KalendEventDialog from '@/components/KalendEventDialog';
import MiniDrawer from '@/components/Drawer';
import { Container } from '@mui/material'
import { useState } from 'react'
import { NewEventClickData } from 'kalend/common/interface';
import { IKalendEvent } from '@/interfaces/Kalend';

const eventsExample: IKalendEvent[] = [
  {
      id: 1,
      startAt: '2023-07-21T18:00:00.000Z',
      endAt: '2023-07-21T19:00:00.000Z',
      summary: 'test',
      color: 'blue',
  },
  {
      id: 2,
      startAt: '2023-07-21T18:00:00.000Z',
      endAt: '2023-07-21T19:00:00.000Z',
      summary: 'test',
      color: 'blue',
  }
]


export default function Home() {
  const [eventDialogOpen, setEventDialogOpen] = useState(false)
  const [newEventClickData, SetNewEventClickData] = useState<NewEventClickData>()
  const [events, setEvents] = useState(eventsExample);

  function startNewEvent(newEvent: NewEventClickData) {
    SetNewEventClickData(newEvent)
    setEventDialogOpen(true)
  }
  
  function closeDialog() {
    setEventDialogOpen(false)
    SetNewEventClickData(undefined)
  }

  function createNewEvent(startAt: string, endAt: string, summary: string) {
    setEvents(prev => {
      return [...prev, {id: prev.length+1, color: 'red', endAt, startAt, summary}]
    })
    setEventDialogOpen(false)
    console.log(events)
  }


  return (
    <main className='min-w-full min-h-screen flex'>
      {eventDialogOpen && newEventClickData && <KalendEventDialog onSubmitEvent={createNewEvent} onCancelEvent={closeDialog} newEvent={newEventClickData} />}
      <MiniDrawer/>
      <Container maxWidth="xl">
      <section className='w-full h-screen'><Calendar events={events} startNewEvent={startNewEvent}/></section>
      </Container>
    </main>
    
  )
}
