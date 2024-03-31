import StreamVideoProvider from '@/providers/StremClientProvider';
import { ReactNode } from 'react';

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamVideoProvider>FECKKKK {children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;