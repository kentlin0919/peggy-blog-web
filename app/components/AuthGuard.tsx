'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for authentication (mock implementation for now)
    // In a real app, you would check Supabase session or a specific cookie
    const checkAuth = () => {
      // For now, we simulate checking for a cookie named 'auth-token' or 'sb-access-token'
      // or check localStorage if that's where you store it.
      // Since we haven't fully implemented the login logic to SET this yet,
      // this guard will block access until we do.
      
      const hasAuthCookie = document.cookie.split(';').some((item) => {
        const name = item.trim().split('=')[0];
        return name === 'auth-token' || name === 'sb-access-token';
      });
      
      // Also check localStorage as a fallback/alternative
      const hasLocalStorage = typeof window !== 'undefined' && (
        localStorage.getItem('auth-token') || localStorage.getItem('sb-access-token')
      );

      if (hasAuthCookie || hasLocalStorage) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        // Redirect to login with return URL
        const loginUrl = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
        router.push(loginUrl);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router, pathname]);

  if (isLoading) {
    // Render a loading state while checking auth
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated
  // If not authenticated, the useEffect hook will have triggered a redirect
  // preventing the protected content from flashing.
  return isAuthenticated ? <>{children}</> : null;
}
