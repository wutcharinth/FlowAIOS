import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export default async function StaffBillingPage() {
  const admin = createAdminClient();
  const { data: orgs } = await admin
    .from('organizations')
    .select('plan')
    .order('created_at', { ascending: false })
    .limit(2000);

  const planCount = new Map<string, number>();
  for (const o of orgs ?? []) {
    const plan = (o as { plan: string }).plan ?? 'unknown';
    planCount.set(plan, (planCount.get(plan) ?? 0) + 1);
  }

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="mt-1 text-sm text-mute">
          Plan distribution. Stripe + invoicing wires in a later phase.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Plan distribution</CardTitle>
          <CardDescription>Across {orgs?.length ?? 0} orgs.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {[...planCount.entries()]
              .sort((a, b) => b[1] - a[1])
              .map(([plan, count]) => (
                <li key={plan} className="flex items-center justify-between rounded-md border bg-paper px-3 py-2 text-sm">
                  <span className="font-mono text-xs uppercase tracking-wider">{plan}</span>
                  <span className="font-semibold tabular-nums">{count}</span>
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Coming soon</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm text-mute">
            <li>· MRR snapshot + month-over-month delta</li>
            <li>· Trials expiring this week</li>
            <li>· Failed payments queue</li>
            <li>· Per-org usage vs plan limits</li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
