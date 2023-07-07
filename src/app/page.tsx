"use client"
import { Calendar } from '@/components/Calendar'
import KalendEventDialog from '@/components/KalendEventDialog';
import MiniDrawer from '@/components/Drawer';
import { Container } from '@mui/material'
import { useContext, useState } from 'react'
import { NewEventClickData } from 'kalend/common/interface';
import { IKalendEvent } from '@/interfaces/Kalend';
import EventContext, { IEventContext } from '@/context/EventContext';




export default function Home() {
  const [eventDialogOpen, setEventDialogOpen] = useState(false)
  const { eventState } = useContext(EventContext) as IEventContext;

  function closeDialog() {
    setEventDialogOpen(false)
  }

  function openDialog() {
    setEventDialogOpen(true)
  }

  return (
    <main className='min-w-full min-h-screen flex'>
      {eventDialogOpen && <KalendEventDialog onSubmitEvent={createNewEvent} onCancelEvent={closeDialog} newEvent={newEventClickData} />}
      <MiniDrawer/>
      <Container maxWidth="xl">
      <section className='w-full h-screen'><Calendar events={eventState} startNewEvent={startNewEvent}/></section>
      </Container>
    </main>
    
  )
}
