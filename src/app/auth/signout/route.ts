import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  return await handleSignOut(request);
}

export async function GET(request: Request) {
  return await handleSignOut(request);
}

async function handleSignOut(request: Request) {
  const { origin } = new URL(request.url);
  const supabase = await createClient();
  
  // Check if we have a session
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(`${origin}/login`);
}
