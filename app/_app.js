import { Console } from 'console';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /booking if the host is booking.hyello.co.uk and the path is /
    if (router.asPath === '/' && window.location.hostname === 'booking.hyello.co.uk') {
      router.push('/booking');
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
