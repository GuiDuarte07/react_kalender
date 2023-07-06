import { IKalendEvent } from '@/interfaces/Kalend'
import Kalend, { CalendarView } from 'kalend'
import { NewEventClickData } from 'kalend/common/interface'
import 'kalend/dist/styles/index.css'

interface ICalendar {
  startNewEvent: (e: NewEventClickData) => void
  events: IKalendEvent[]
}

export const Calendar = ({startNewEvent, events}: ICalendar) => {
  return <Kalend
      onEventClick={(e) => console.log(e, "onEventClick")}
      onNewEventClick={(newEvent) => startNewEvent(newEvent)}
      events={events}
      initialDate={new Date().toISOString()}
      hourHeight={60}
      initialView={CalendarView.WEEK}
      disabledViews={[CalendarView.DAY]}
      onSelectView={(e) => console.log(e, "onSelectView")}
      onPageChange={(e) => console.log(e, "onPageChange")}
      timeFormat={'24'}
      weekDayStart={'Monday'}
      calendarIDsHidden={['work']}
      language={'ptBR'}
    />
}