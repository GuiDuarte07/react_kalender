import { IKalendEvent } from '@/interfaces/Kalend';
import { useReducer } from 'react';

export enum EventReducerActionTypes {
  NewEvent,
  EditEvent,
  DeleteEvent,
}

type Action =
  | {type: EventReducerActionTypes.NewEvent, newEvent: {endAt: string, startAt: string, summary: string} }
  | {type: EventReducerActionTypes.EditEvent, editEvent: {id: number, endAt: string, startAt: string, summary: string}}

function eventHandleReducer(state: IKalendEvent[], action: Action) {
  const newState = structuredClone(state);

  switch (action.type) {
    case EventReducerActionTypes.NewEvent:
      newState.push({id: newState.length+1, color: 'red', endAt: action.newEvent.endAt, startAt: action.newEvent.startAt, summary: action.newEvent.summary})
      break;
    
    case EventReducerActionTypes.EditEvent:
      const index = newState.findIndex((event) => event.id === action.editEvent?.id)
      if (-1) break;
      newState[index].startAt = action.editEvent.startAt
      newState[index].endAt = action.editEvent.endAt
      newState[index].summary = action.editEvent.summary
      break;
  } 

  return newState
}

export default eventHandleReducer;