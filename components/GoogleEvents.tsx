'use client';

// Import the hook
import { useGetGoogleEvents } from '../hooks/useGetGoogleEvents';

// Your page component
const EventsPage = () => {
  // Call the hook to get events and loading state
  const { events, isLoading } = useGetGoogleEvents();

  return (
    <div>
      <h1>My Google Calendar Events</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <strong>{event.summary}</strong> - 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventsPage;
