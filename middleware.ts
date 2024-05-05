import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';
import { getValidSubdomain } from './lib/utils';

const protectedRoute = createRouteMatcher([
  '/',
  '/upcoming',
  '/meeting(.*)',
  '/previous',
  '/recordings',
  '/personal-room',
  '/booking(.*)'
]);

const clerkMiddlewareInstance = clerkMiddleware(async (auth, req) => {
  // Clone the URL
  const url = req.nextUrl.clone();

  // Skip public files
  const PUBLIC_FILE = /\.(.*)$/; // Files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next') || url.pathname.includes('api/') || url.pathname.includes('sign-')) return NextResponse.next();

  // Check if the request matches a protected route
  if (protectedRoute(req)) auth().protect();


  // Assuming this code is within a function or component
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 403 })
  }

  // only let me hit the apis directly. haha.
  if (url.pathname.includes('api/')) {
    const user = await clerkClient.users.getUser(userId);
    const email = user.emailAddresses[0].emailAddress;
  
    if (!email) return NextResponse.json({ error: 'Internal Server Error' }, { status: 403 })
    // Add a guard clause to ensure `email` is not an empty object
    if (typeof email !== 'string') {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 403 })
    }
  
    const allowedEmails = ['codebyexample@gmail.com']; // Add your allowed email(s) here
    if (!allowedEmails.includes(email)) {
      // Return a 403 Forbidden response if the user's email is not allowed
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 403 })
    }
  }

  // Extract subdomain from host
  const host = req.headers.get('host');
  const subdomain = getValidSubdomain(host);

  // Rewrite URL if subdomain exists
  if (subdomain) {
    console.log(`>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`);
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // No subdomain detected, proceed with the original request
  return NextResponse.next();
});

export default clerkMiddlewareInstance;