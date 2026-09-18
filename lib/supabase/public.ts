import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/supabase/config";

/**
 * An unauthenticated client for published website content. The publishable
 * key is intentionally safe to expose; database grants and RLS remain the
 * authorization boundary. No service-role client exists in this app.
 */
export function createPublicClient() {
  const { url, publishableKey } = getSupabaseConfig();

  return createClient(url, publishableKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
