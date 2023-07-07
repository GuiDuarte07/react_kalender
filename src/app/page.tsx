"use client"
import { Calendar } from '@/components/Calendar'
import KalendEventDialog from '@/components/KalendEventDialog';
import MiniDrawer from '@/components/Drawer';
import { Container } from '@mui/material'
import { useContext, useRef, useState } from 'react'
import { CalendarEvent, NewEventClickData } from 'kalend/common/interface';
import { IKalendEvent } from '@/interfaces/Kalend';
import EventContext, { IEventContext } from '@/context/EventContext';


type EventChanger = 
  | {id: number, startAt: string, endAt: string, summary: string}
  | {startAt: string, endAt: string}

type DialogEvent = {active: boolean; mode: "NEW" | "EDIT"}

export default function Home() {
  const [eventDialogOpen, setEventDialogOpen] = useState<DialogEvent>({active: false, mode: 'NEW'})
  const { eventState, createEvent, editEvent, deleteEvent } = useContext(EventContext) as IEventContext;
  const eventData = useRef<EventChanger>();

  function closeDialog() {
    setEventDialogOpen(prev => ({...prev, active: false}))
    eventData.current = undefined
  }

  function startNewEvent(kalendEventClick: NewEventClickData) {
    const {startAt, endAt} = kalendEventClick
    if (!startAt || !endAt) return;

    eventData.current = {startAt, endAt}
    setEventDialogOpen({active: true, mode: 'NEW'})
  }

  function startEditEvent(kalendEditClick: CalendarEvent) {
    const {id, startAt, endAt, summary} = kalendEditClick

    eventData.current = {id, summary, startAt, endAt}
    setEventDialogOpen({active: true, mode: 'EDIT'})
  }

  function executeCreateEvent(startAt: string, endAt: string, summary: string) {
    createEvent(startAt, endAt, summary)
    closeDialog()
  }

  function executeEditEvent(id: number, startAt: string, endAt: string, summary: string) {
    editEvent(id, startAt, endAt, summary)
    closeDialog()
  }

  function executeDeleteEvent(id: number) {
    deleteEvent(id)
    closeDialog()
  }

  return (
    <main className='min-w-full min-h-screen flex'>
      {
        eventDialogOpen.active && eventDialogOpen.mode === 'NEW' ? 
          eventData.current && 
            <KalendEventDialog 
              onSubmitEvent={executeCreateEvent} 
              newEvent={true} 
              event={eventData.current} 
              onCancelEvent={closeDialog} 
            /> 
          : 
          eventData.current && ("id" in eventData.current) &&
            <KalendEventDialog
              onDeleteEvent={executeDeleteEvent}
              event={eventData.current} 
              newEvent={false} 
              onCancelEvent={closeDialog}
              onEditEvent={executeEditEvent}
            />
      }
      <MiniDrawer/>
      <Container maxWidth="xl">
      <section className='w-full h-screen'><Calendar startNewEvent={startNewEvent} startEditEvent={startEditEvent} events={eventState} /></section>
      </Container>
    </main>
    
  )
}
