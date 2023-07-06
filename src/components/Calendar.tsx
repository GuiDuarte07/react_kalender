import Kalend, { CalendarView } from 'kalend'
import 'kalend/dist/styles/index.css'

const events = [
  {
      id: 1,
      startAt: '2023-07-21T18:00:00.000Z',
      endAt: '2023-07-21T19:00:00.000Z',
      summary: 'test',
      color: 'blue',
      calendarID: 'work'
  },
  {
      id: 2,
      startAt: '2023-07-21T18:00:00.000Z',
      endAt: '2023-07-21T19:00:00.000Z',
      summary: 'test',
      color: 'blue',
  }
]

export const Calendar = () => {
  return <Kalend
      onEventClick={(e) => console.log(e, "onEventClick")}
      onNewEventClick={(e) => console.log(e, "onNewEventClick")}
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