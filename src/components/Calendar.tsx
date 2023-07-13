import { IKalendEvent } from '@/interfaces/Kalend'
import Kalend, { CalendarView } from 'kalend'
import { CalendarEvent, NewEventClickData } from 'kalend/common/interface'
import 'kalend/dist/styles/index.css'

interface ICalendar {
  startNewEvent: (e: NewEventClickData) => void
  startEditEvent: (e: CalendarEvent) => void
  updateEvent: (events: IKalendEvent[]) => void
  events: IKalendEvent[]
}

export const Calendar = ({ startNewEvent, startEditEvent, updateEvent, events }: ICalendar) => {
  return <Kalend
      onEventClick={startEditEvent}
      onNewEventClick={startNewEvent}
      onEventDragFinish={(_, __, events) => updateEvent(events)}
      events={events}
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