'use client'

import eventHandleReducer, { EventReducerActionTypes } from "@/hooks/EventHandleReducer";
import useUndo from "@/hooks/useUndo";
import { IKalendEvent } from "@/interfaces/Kalend";
import { CalendarEvent, NewEventClickData } from "kalend/common/interface";
import React, { createContext, useReducer, useRef, useState, useEffect } from "react"

interface IEventContextProvider {
  children: React.ReactNode
}

type DialogEvent = {active: boolean; mode: "NEW" | "EDIT"}

type EventChanger = 
  | {id: number, startAt: string, endAt: string, summary: string}
  | {startAt: string, endAt: string}

export interface IEventContext {
  eventState: IKalendEvent[]
  undo: string
  eventDialogOpen: DialogEvent
  eventData: EventChanger | undefined
  startUndo: (message: string) => void
  clearUndo: () => void
  closeDialog: () => void
  executeUndoEvent: () => void
  startNewEvent: (kalendEventClick: NewEventClickData) => void
  startEditEvent: (kalendEditClick: CalendarEvent) => void
  executeCreateEvent: (startAt: string, endAt: string, summary: string) => void
  executeEditEvent: (id: number, startAt: string, endAt: string, summary: string) => void
  executeDeleteEvent: (id: number) => void
  executeUpdateEvent: (events: IKalendEvent[]) => void
}

const EventContext = createContext<IEventContext>({} as IEventContext)

export const EventContextProvider = ({ children }: IEventContextProvider) => {
  const [eventState, eventDispatch] = useReducer(eventHandleReducer, JSON.parse(localStorage.getItem("events") ?? "[]") as IKalendEvent[])
  const prevEventData = useRef<IKalendEvent[]>()
  const eventData = useRef<EventChanger>()
  const [eventDialogOpen, setEventDialogOpen] = useState<DialogEvent>({active: false, mode: 'NEW'})
  const { undo, startUndo, clearUndo } = useUndo(5000)

  useEffect(() => {
    if (eventState.length)
      localStorage.setItem("events", JSON.stringify(eventState))
  }, [eventState])

  function closeDialog() {
    setEventDialogOpen(prev => ({...prev, active: false}))
    eventData.current = undefined
  }

  function startNewEvent(kalendEventClick: NewEventClickData) {
    const {startAt, endAt} = kalendEventClick
    if (!startAt || !endAt) return

    eventData.current = {startAt, endAt}
    setEventDialogOpen({active: true, mode: 'NEW'})
  }

  function startEditEvent(kalendEditClick: CalendarEvent) {
    const {id, startAt, endAt, summary} = kalendEditClick

    eventData.current = {id, summary, startAt, endAt}
    setEventDialogOpen({active: true, mode: 'EDIT'})
  }

  function executeCreateEvent(startAt: string, endAt: string, summary: string) {
    clearUndo()
    eventDispatch({type: EventReducerActionTypes.NewEvent, newEvent: {startAt, endAt, summary}, prevEventData})
    closeDialog()
    startUndo('Deseja desfazer a criação desse evento?')
  }

  function executeEditEvent(id: number, startAt: string, endAt: string, summary: string) {
    clearUndo()
    eventDispatch({type: EventReducerActionTypes.EditEvent, editEvent: {startAt, endAt, summary, id}, prevEventData})
    closeDialog()
    startUndo('Deseja desfazer a alteração desse evento?')
  }

  function executeDeleteEvent(id: number) {
    clearUndo()
    eventDispatch({type: EventReducerActionTypes.DeleteEvent, id, prevEventData})
    closeDialog()
    startUndo('Deseja desfazer a removação desse evento?')
  }

  function executeUpdateEvent (events: IKalendEvent[]) {
    clearUndo()
    eventDispatch({type: EventReducerActionTypes.UpdateEvent, events, prevEventData})
    startUndo('Deseja desfazer a alteração desse evento?')
  }

  function executeUndoEvent() {
    prevEventData.current && eventDispatch({type: EventReducerActionTypes.UpdateEvent, events: prevEventData.current, prevEventData})
    clearUndo()
  }

  return (
    <EventContext.Provider 
      value={{
        eventData: eventData.current,
        eventState,
        eventDialogOpen,
        closeDialog,
        executeCreateEvent,
        executeDeleteEvent,
        executeEditEvent,
        executeUpdateEvent,
        startEditEvent,
        startNewEvent,
        undo,
        startUndo,
        clearUndo,
        executeUndoEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}

export default EventContext