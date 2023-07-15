import { useContext } from 'react'
import EventContext from '@/context/EventContext'
import { IKalendEvent } from '@/interfaces/Kalend'
import Kalend, { CalendarView } from 'kalend'
import { CalendarEvent, NewEventClickData } from 'kalend/common/interface'
import 'kalend/dist/styles/index.css'

export const Calendar = () => {
  const {
    eventState,
    startNewEvent,
    startEditEvent,
    executeUpdateEvent,
  } = useContext(EventContext)

  return <Kalend
      onEventClick={startEditEvent}
      onNewEventClick={startNewEvent}
      onEventDragFinish={(_, __, events,) => executeUpdateEvent(events)}
      events={eventState}
      initialDate={new Date().toISOString()}
      hourHeight={60}
      initialView={CalendarView.WEEK}
      disabledViews={[CalendarView.DAY]}
      timeFormat={'24'}
      weekDayStart={'Monday'}
      calendarIDsHidden={['work']}
      language={'ptBR'}
    />
}