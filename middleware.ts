import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
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

const clerkMiddlewareInstance = clerkMiddleware((auth, req) => {
  // Clone the URL
  const url = req.nextUrl.clone();

  // Skip public files
  const PUBLIC_FILE = /\.(.*)$/; // Files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return NextResponse.next();

  // Check if the request matches a protected route
  if (protectedRoute(req)) auth().protect();

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