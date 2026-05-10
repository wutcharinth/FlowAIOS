import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

interface ProfileRow {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

export default async function StaffUsersPage() {
  const admin = createAdminClient();
  const { data: profiles } = await admin
    .from('user_profiles')
    .select('id, email, full_name, created_at')
    .order('created_at', { ascending: false })
    .limit(500);

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="mt-1 text-sm text-mute">
          {profiles?.length ?? 0} users across all organizations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {((profiles ?? []) as ProfileRow[]).map((p) => (
              <li key={p.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-3 text-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium">{p.full_name ?? '—'}</p>
                  <p className="truncate text-xs text-mute">{p.email}</p>
                </div>
                <span className="font-mono text-[11px] text-mute">
                  {p.id.slice(0, 8)}
                </span>
                <time className="text-xs text-mute">
                  {new Date(p.created_at).toLocaleDateString()}
                </time>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
