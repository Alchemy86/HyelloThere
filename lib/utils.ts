import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== 'undefined') {
    // On the client side, get the host from window
    host = window.location.host;
  }
  if (host && host.includes('.') && !host.startsWith('www') && !host.startsWith('localhost')) {
    // Check if host contains a dot (.) and not starting with 'www' or 'localhost'
    const parts = host.split('.');
    if (parts.length > 2) {
      // Ensure host consists of more than two parts to confirm it's a valid subdomain
      subdomain = parts[0];
    }
  }
  return subdomain;
};
