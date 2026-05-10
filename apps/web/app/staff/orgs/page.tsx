import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

interface OrgRow {
  id: string;
  name: string;
  slug: string;
  plan: string;
  created_at: string;
}

export default async function StaffOrgsPage() {
  const admin = createAdminClient();

  const { data: orgs } = await admin
    .from('organizations')
    .select('id, name, slug, plan, created_at')
    .order('created_at', { ascending: false })
    .limit(200);

  const orgIds = (orgs ?? []).map((o) => (o as OrgRow).id);

  // Counts per org. Doing 4 separate aggregate queries keeps the SQL simple
  // even though it's chattier than a join. Switch to a view once we cross
  // ~500 orgs.
  const [{ data: members }, { data: convos }, { data: aiEvents }] = await Promise.all([
    admin.from('org_members').select('org_id').in('org_id', orgIds),
    admin
      .from('conversations')
      .select('org_id, created_at')
      .in('org_id', orgIds)
      .gte('created_at', new Date(Date.now() - 30 * 86400_000).toISOString()),
    admin
      .from('ai_logs')
      .select('org_id, created_at')
      .in('org_id', orgIds)
      .gte('created_at', new Date(Date.now() - 7 * 86400_000).toISOString()),
  ]);

  const memberByOrg = new Map<string, number>();
  for (const m of members ?? []) {
    memberByOrg.set((m as { org_id: string }).org_id, (memberByOrg.get((m as { org_id: string }).org_id) ?? 0) + 1);
  }
  const convosByOrg = new Map<string, number>();
  for (const c of convos ?? []) {
    convosByOrg.set((c as { org_id: string }).org_id, (convosByOrg.get((c as { org_id: string }).org_id) ?? 0) + 1);
  }
  const aiByOrg = new Map<string, number>();
  for (const a of aiEvents ?? []) {
    aiByOrg.set((a as { org_id: string }).org_id, (aiByOrg.get((a as { org_id: string }).org_id) ?? 0) + 1);
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Organizations</h1>
        <p className="mt-1 text-sm text-mute">
          {orgs?.length ?? 0} orgs · cross-tenant view
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All organizations</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {((orgs ?? []) as OrgRow[]).map((o) => (
              <li key={o.id}>
                <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 px-4 py-3 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{o.name}</p>
                    <p className="font-mono text-[11px] text-mute">{o.slug}</p>
                  </div>
                  <span className="rounded bg-paper-2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                    {o.plan}
                  </span>
                  <span className="font-mono text-xs text-mute">
                    {memberByOrg.get(o.id) ?? 0} members
                  </span>
                  <span className="font-mono text-xs text-mute">
                    {convosByOrg.get(o.id) ?? 0} convos / 30d
                  </span>
                  <span className="font-mono text-xs text-mute">
                    {aiByOrg.get(o.id) ?? 0} AI / 7d
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
