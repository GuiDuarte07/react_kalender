import { IKalendEvent } from '@/interfaces/Kalend'
import Kalend, { CalendarView } from 'kalend'
import { CalendarEvent, NewEventClickData } from 'kalend/common/interface'
import 'kalend/dist/styles/index.css'

interface ICalendar {
  startNewEvent: (e: NewEventClickData) => void
  startEditEvent: (e: CalendarEvent) => void
  events: IKalendEvent[]
}

export const Calendar = ({ startNewEvent, startEditEvent, events }: ICalendar) => {
  return <Kalend
      onEventClick={startEditEvent}
      onNewEventClick={startNewEvent}
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