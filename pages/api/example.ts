// pages/api/example.ts

import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  // Dummy data
  const data = {
    message: 'This is a fake API endpoint',
    items: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ],
  };

  // Send JSON response
  res.status(200).json(data);
};
