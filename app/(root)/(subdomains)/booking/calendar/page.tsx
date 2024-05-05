
import { fetchGoogleCalendarEvents } from '@/services/googleCalendarService';
import React from 'react'

const CalendarPage = async () => {

  const events = await fetchGoogleCalendarEvents();
  console.log("EVENTS : ", events);
  return (
    <div>
      Bomm

      <ul>
        {events.map(event => (
         <li key={event.id}>{event.description}</li>
        ))}
      </ul>
    </div>
  )
}

export default CalendarPage
