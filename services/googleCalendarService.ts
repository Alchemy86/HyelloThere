// services/googleCalendarService.ts

import { google } from 'googleapis';

export async function fetchGoogleCalendarEvents(): Promise<any[]> {
  try {
    // Load Google Calendar API using service account credentials
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CALENDAR_USER_JSON || ''),
      scopes: ['https://www.googleapis.com/auth/calendar'], // Specify necessary scopes
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Determine the start and end of the current month
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Fetch events from the user's primary calendar for the current month
    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary', // Use 'primary' for the primary calendar
      timeMin: firstDayOfMonth.toISOString(),
      timeMax: lastDayOfMonth.toISOString(),
      maxResults: 100, // Example: Limit to 10 events
      singleEvents: true,
      orderBy: 'startTime',
    });

    // Extract event data
    const events = response.data.items || [];
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Error fetching events');
  }
}
