import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from '@/types/database.types'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  // Fallback to ANON_KEY or PUBLISHABLE_KEY. 
  // Note: For server-side middleware, we can also use SERVICE_ROLE_KEY if needed, 
  // but for auth session management, ANON_KEY is correct.
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
                      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

  if (!supabaseUrl || !supabaseKey) {
     // If env vars are missing during build time or misconfiguration, 
     // we just return original response to avoid crash, but auth won't work.
     return response;
  }

  const supabase = createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set({
              name,
              value,
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value,
              ...options,
            })
          })
        },
      },
    }
  )

  const { data: { user }, error } = await supabase.auth.getUser()

  // Protect routes logic
  const path = request.nextUrl.pathname;
  
  // Protected Routes Prefixes
  const isProtectedRoute = 
    path.startsWith('/student') || 
    path.startsWith('/teacher') || 
    path.startsWith('/admin');

  // Auth Routes (Login, Signup, etc.) - redirect to dashboard if logged in?
  // Maybe later. For now focus on blocking unauthenticated access.
  const isAuthRoute = path.startsWith('/auth/login') || path.startsWith('/auth/signup');

  if (isProtectedRoute && !user && !error) {
     // Redirect to login
     const url = request.nextUrl.clone()
     url.pathname = '/auth/login'
     url.searchParams.set('redirect', path); // keep the original path
     return NextResponse.redirect(url)
  }

  // Optional: Redirect logged in users away from login page?
  // if (isAuthRoute && user) {
  //    // Determine dashboard based on role? Or just default.
  //    // This requires fetching user_info which might be expensive here. 
  //    // Let's keep it simple for now.
  // }

  return response
}
