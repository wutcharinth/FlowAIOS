import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default function StaffSystemPage() {
  const env = {
    supabase_url: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    supabase_anon: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    supabase_service: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    gemini: Boolean(process.env.GEMINI_API_KEY),
    anthropic: Boolean(process.env.ANTHROPIC_API_KEY),
    cron_secret: Boolean(process.env.CRON_SECRET),
  };

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">System health</h1>
        <p className="mt-1 text-sm text-mute">
          Live runtime + provider status.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Environment</CardTitle>
          <CardDescription>What this Vercel deployment has configured.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-2 gap-3 text-sm">
            {Object.entries(env).map(([k, v]) => (
              <li
                key={k}
                className={`flex items-center justify-between rounded-md border px-3 py-2 ${v ? 'border-mint/30 bg-mint-soft/30' : 'border-rose/30 bg-[hsl(var(--rose)/0.05)]'}`}
              >
                <span className="font-mono text-xs">{k}</span>
                <span className={`font-mono text-[11px] ${v ? 'text-mint' : 'text-rose'}`}>
                  {v ? 'set' : 'missing'}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cron jobs</CardTitle>
          <CardDescription>Scheduled runtime work.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-md border bg-paper px-3 py-2">
              <div>
                <p className="font-mono text-xs">/api/cron/memory-lifecycle</p>
                <p className="mt-0.5 text-xs text-mute">
                  daily 19:00 UTC · dedup, scoring, archive, promotion detection
                </p>
              </div>
              <span className="font-mono text-[11px] text-mint">active</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Live signals</CardTitle>
          <CardDescription>For deeper telemetry.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-mute">
          <p>
            ·{' '}
            <a href="/api/health" className="text-warm hover:underline">
              /api/health
            </a>{' '}
            — JSON probe with commit SHA + region
          </p>
          <p>· Vercel dashboard for build / function metrics</p>
          <p>· Supabase dashboard for DB + auth metrics</p>
        </CardContent>
      </Card>
    </main>
  );
}
