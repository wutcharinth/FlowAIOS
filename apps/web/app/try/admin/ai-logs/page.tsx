import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { demoAiLogs } from '@/lib/demo-merchant/seed';

export const dynamic = 'force-dynamic';

export default function TryAiLogsPage() {
  const total = demoAiLogs.length;
  const avg = Math.round(demoAiLogs.reduce((a, l) => a + l.latency, 0) / total);
  const accepted = demoAiLogs.filter((l) => l.accepted).length;
  const acceptRate = Math.round((accepted / total) * 100);
  const models = [...new Set(demoAiLogs.map((l) => l.model))].length;

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">AI logs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Recent AI generations: replies, memory extracts, escalations.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Total events" value={total} />
        <Stat label="Avg latency" value={`${avg}ms`} />
        <Stat label="Acceptance" value={`${acceptRate}%`} />
        <Stat label="Models" value={models} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent events</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {demoAiLogs.map((l) => (
              <li key={l.id} className="px-4 py-2.5 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                      {l.kind}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{l.model}</span>
                    <span className="font-mono text-xs text-warm">#{l.conversationId}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{l.latency}ms</span>
                    <time>{new Date(l.createdAt).toLocaleString()}</time>
                  </div>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">{l.body}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        <Link href="/help/observability" className="text-warm hover:underline">
          What every ai_logs row means →
        </Link>
      </p>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}
