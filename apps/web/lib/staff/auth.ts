import 'server-only';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * Staff = FlowAIOS internal team (cross-tenant). Distinct from a merchant
 * "admin" who is the highest role within ONE org (owner / admin).
 *
 * Gated by an env-var allowlist for now: STAFF_ALLOWLIST is a comma-separated
 * list of email addresses or user UUIDs that should see the /staff/* routes.
 * Move to a `staff_users` table once we have more than ~10 staff.
 */

function getAllowlist(): Set<string> {
  const raw = process.env.STAFF_ALLOWLIST ?? '';
  return new Set(
    raw
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );
}

export interface StaffUser {
  id: string;
  email: string;
}

export async function requireStaff(): Promise<StaffUser> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/staff');

  const allow = getAllowlist();
  const email = (user.email ?? '').toLowerCase();
  const isAllowed = allow.has(email) || allow.has(user.id);
  if (!isAllowed) {
    // Reveal nothing — pretend the route doesn't exist.
    redirect('/dashboard');
  }
  return { id: user.id, email: user.email ?? '' };
}
