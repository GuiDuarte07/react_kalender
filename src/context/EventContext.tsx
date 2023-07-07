'use client'

import eventHandleReducer, { EventReducerActionTypes } from "@/hooks/EventHandleReducer";
import { IKalendEvent } from "@/interfaces/Kalend";
import React, { createContext, useReducer } from "react"

interface IEventContextProvider {
  children: React.ReactNode
}

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

export interface IEventContext {
  eventState: IKalendEvent[]
  createEvent: (startAt: string, endAt: string, summary: string) => void
  editEvent: (id: number, startAt: string, endAt: string, summary: string) => void
}

const EventContext = createContext<IEventContext | null>(null);


export const EventContextProvider = ({ children }: IEventContextProvider) => {

  const [eventState, eventDispatch] = useReducer(eventHandleReducer, eventsExample)
 
  function createEvent(startAt: string, endAt: string, summary: string) {
    eventDispatch({type: EventReducerActionTypes.NewEvent, newEvent: {startAt, endAt, summary}})
  }

  function editEvent(id: number, startAt: string, endAt: string, summary: string) {
    eventDispatch({type: EventReducerActionTypes.EditEvent, editEvent: {startAt, endAt, summary, id}})
  }

  return (
    <EventContext.Provider value={{eventState, createEvent, editEvent}}>
      {children}
    </EventContext.Provider>
  )
}

export default EventContext