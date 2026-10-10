import { createClient } from '@supabase/supabase-js';

// STRICT SECURITY RULE:
// The admin client uses SUPABASE_SERVICE_ROLE_KEY and must ONLY be used
// in server-side API routes or Server Actions. It MUST NEVER be exported
// or used in any client-side component.
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase admin environment variables');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
