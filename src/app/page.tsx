"use client"
import { Calendar } from '@/components/Calendar'
import KalendEventDialog from '@/components/KalendEventDialog';
import MiniDrawer from '@/components/Drawer';
import { Container } from '@mui/material'
import { useState } from 'react'
import { NewEventClickData } from 'kalend/common/interface';
import { IKalendEvent } from '@/interfaces/Kalend';




export default function Home() {
  const [eventDialogOpen, setEventDialogOpen] = useState(false)

  function closeDialog() {
    setEventDialogOpen(false)
  }

  function openDialog() {
    setEventDialogOpen(true)
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
