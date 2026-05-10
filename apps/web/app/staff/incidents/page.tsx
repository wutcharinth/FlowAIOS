import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default function StaffIncidentsPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Incidents</h1>
        <p className="mt-1 text-sm text-mute">
          Recent platform incidents with post-mortems.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">No active incidents</CardTitle>
          <CardDescription>Last 30 days clean.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-mute">
            When something does go wrong, file a post-mortem here:{' '}
            <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-xs">
              date, severity, blast radius, root cause, mitigation, follow-ups
            </code>
            . Public summary goes to a status page (TBD); internal detail stays here.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Useful runbooks</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm text-mute">
            <li>· LINE webhook returning 5xx — verify signature secret in integrations table.</li>
            <li>· Gemini quota exhausted — check fallback rate in /admin/ai-logs.</li>
            <li>· Cron not firing — check Vercel cron status + CRON_SECRET.</li>
            <li>· Memory governance broken — re-run nightly job manually from /admin/memory.</li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
