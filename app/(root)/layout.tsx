import StreamVideoProvider from '@/providers/StreamClientProvider';
import { ReactNode } from 'react';

//NOT BEING PICKED UP - no idea why

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;