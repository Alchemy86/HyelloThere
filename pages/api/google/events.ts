import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGoogleCalendarEvents } from '@/services/googleCalendarService';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    
    const events = await fetchGoogleCalendarEvents();

    // Send response
    res.status(200).json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
