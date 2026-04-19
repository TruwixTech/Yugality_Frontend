<<<<<<< HEAD
// import { createClient } from '@/lib/supabase/server';
// import { NextResponse } from 'next/server';
=======
import { NextResponse } from 'next/server';
>>>>>>> 241dac6 (final)

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const code = searchParams.get('code');
//   const next = searchParams.get('next') ?? '/dashboard';
  
//   // Use environment variable for site URL instead of origin
//   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

//   if (code) {
//     const supabase = await createClient();
//     const { error } = await supabase.auth.exchangeCodeForSession(code);
//     if (!error) {
//       return NextResponse.redirect(`${siteUrl}${next}`);
//     }
//   }

//   // Return the user to an error page with instructions
//   return NextResponse.redirect(`${siteUrl}/login?error=auth_failed`);
// }
