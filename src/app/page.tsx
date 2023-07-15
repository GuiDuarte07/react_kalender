"use client"
import { Calendar } from '@/components/Calendar'
import KalendEventDialog from '@/components/KalendEventDialog'
import MiniDrawer from '@/components/Drawer'
import { Container } from '@mui/material'
import { useContext } from 'react'
import EventContext from '@/context/EventContext'
import { UndoSnackbar } from '@/components/UndoSnackbar'

export default function Home() {
  const { 
    eventDialogOpen,
    eventData,
    executeCreateEvent,
    executeDeleteEvent,
    executeEditEvent,
    undo,
    closeDialog
  } = useContext(EventContext)

  return (
    <main className='min-w-full min-h-screen flex'>
      {undo && <UndoSnackbar />}
      {
        eventDialogOpen.active && eventDialogOpen.mode === 'NEW' && eventData ? 
            <KalendEventDialog 
              onSubmitEvent={executeCreateEvent} 
              newEvent={true} 
              event={eventData} 
              onCancelEvent={closeDialog} 
            /> 
          : 
          eventData && ("id" in eventData) &&
            <KalendEventDialog
              onDeleteEvent={executeDeleteEvent}
              event={eventData} 
              newEvent={false} 
              onCancelEvent={closeDialog}
              onEditEvent={executeEditEvent}
            />
      }
      <MiniDrawer/>
      <Container maxWidth="xl">
        <section className='w-full h-screen'>
          <Calendar />
        </section>
      </Container>
    </main>
    
  )
}
