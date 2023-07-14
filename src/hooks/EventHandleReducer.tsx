import { IKalendEvent } from '@/interfaces/Kalend';

export enum EventReducerActionTypes {
  NewEvent,
  EditEvent,
  DeleteEvent,
  UpdateEvent
}

type Action =
  | {type: EventReducerActionTypes.NewEvent, newEvent: {endAt: string, startAt: string, summary: string}}
  | {type: EventReducerActionTypes.EditEvent, editEvent: {id: number, endAt: string, startAt: string, summary: string}}
  | {type: EventReducerActionTypes.DeleteEvent, id: number}
  | {type: EventReducerActionTypes.UpdateEvent, events: IKalendEvent[], prevEventData: React.MutableRefObject<IKalendEvent[] | undefined>}

function eventHandleReducer(state: IKalendEvent[], action: Action) {
  let newState = structuredClone(state)

  switch (action.type) {
    case EventReducerActionTypes.NewEvent:
      newState.push({id: newState.length+1, color: 'red', endAt: action.newEvent.endAt, startAt: action.newEvent.startAt, summary: action.newEvent.summary})
      break
    
    case EventReducerActionTypes.EditEvent:
      const index = newState.findIndex((event) => event.id === action.editEvent?.id)
      if (index === -1) break

      newState[index].startAt = action.editEvent.startAt
      newState[index].endAt = action.editEvent.endAt
      newState[index].summary = action.editEvent.summary
      break

    case EventReducerActionTypes.DeleteEvent:
      const idx = newState.findIndex((event) => event.id === action.id)
      if (idx === -1) break

      newState.splice(idx, 1)
      break
    
    case EventReducerActionTypes.UpdateEvent:
      action.prevEventData.current = newState
      newState = action.events
    }
  console.log(newState)
  return newState
}

export default eventHandleReducer