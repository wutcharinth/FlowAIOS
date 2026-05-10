import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export default async function StaffOverviewPage() {
  const admin = createAdminClient();

  const [
    { count: totalOrgs },
    { count: totalUsers },
    { count: convosThisMonth },
    { count: messagesToday },
    { count: aiLogsToday },
  ] = await Promise.all([
    admin.from('organizations').select('id', { count: 'exact', head: true }),
    admin.from('user_profiles').select('id', { count: 'exact', head: true }),
    admin
      .from('conversations')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 30 * 86400_000).toISOString()),
    admin
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .gte('sent_at', new Date(Date.now() - 86400_000).toISOString()),
    admin
      .from('ai_logs')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 86400_000).toISOString()),
  ]);

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Platform overview</h1>
        <p className="mt-1 text-sm text-mute">
          Cross-tenant view — every org, every user, system-wide health.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Stat label="Organizations" value={totalOrgs ?? 0} />
        <Stat label="Users" value={totalUsers ?? 0} />
        <Stat label="Conversations · 30d" value={convosThisMonth ?? 0} />
        <Stat label="Messages · 24h" value={messagesToday ?? 0} />
        <Stat label="AI events · 24h" value={aiLogsToday ?? 0} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <NavCard
          href="/staff/orgs"
          title="Organizations"
          description="Browse every tenant. Per-org volume, plan, AI usage, contact."
        />
        <NavCard
          href="/staff/users"
          title="Users"
          description="All FlowAIOS user accounts. Search, role, last seen."
        />
        <NavCard
          href="/staff/system"
          title="System health"
          description="Uptime, error rates, AI provider status, queue lag."
        />
        <NavCard
          href="/staff/billing"
          title="Billing"
          description="Plan distribution, MRR, expiring trials."
        />
        <NavCard
          href="/staff/feature-flags"
          title="Global flags"
          description="Feature flags applied across all orgs (canary rollouts)."
        />
        <NavCard
          href="/staff/incidents"
          title="Incidents"
          description="Recent platform incidents with post-mortems."
        />
      </div>

      <Card className="border-warm/20 bg-warm-soft/20">
        <CardHeader>
          <CardTitle className="text-base">Staff console — what this is</CardTitle>
          <CardDescription>Read this once when you onboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Cross-tenant access.</strong> This console can read any org&rsquo;s
            data. Only do so when (a) a merchant has filed a support ticket, or (b) a
            platform incident requires it. Every read is logged in
            <code className="mx-1 rounded bg-paper px-1.5 py-0.5 font-mono text-xs">audit_logs</code>
            with{' '}
            <code className="font-mono text-xs">actor_type=&apos;system&apos;</code> and{' '}
            <code className="font-mono text-xs">action=&apos;staff.view&apos;</code>.
          </p>
          <p>
            <strong>Don&rsquo;t edit merchant data.</strong> If a merchant needs a fix,
            walk them through it via support, or pair-screen. Direct DB writes break trust.
          </p>
          <p>
            <strong>Distinguish from /admin/*.</strong> /admin is each merchant&rsquo;s
            in-tenant admin (their team, their integrations, their KB). /staff is the
            FlowAIOS team&rsquo;s view across all tenants.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border bg-paper p-4">
      <p className="font-mono text-[10px] uppercase tracking-wider text-mute">{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums text-ink">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

function NavCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <a href={href}>
      <Card className="h-full transition-colors hover:border-warm/40 hover:bg-warm-soft/30">
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </a>
  );
}
