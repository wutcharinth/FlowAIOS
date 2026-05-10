import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { demoMemory, demoMemorySummary } from '@/lib/demo-merchant/seed';

export const dynamic = 'force-dynamic';

export default function TryMemoryPage() {
  const s = demoMemorySummary;
  const active = demoMemory.filter((m) => m.status === 'active');
  const contradicted = demoMemory.filter((m) => m.status === 'contradicted');

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Memory governance</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          What FlowAIOS remembers about your customers. Lifecycle is automatic — these
          controls are for review, dedup, and exception handling.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Stat label="Active" value={s.active_count} sub={`${s.total_customers_with_memory} customers`} />
        <Stat label="Avg confidence" value={`${Math.round(s.avg_confidence * 100)}%`} sub={`avg use ${s.avg_use_count.toFixed(1)}×`} />
        <Stat label="Low confidence" value={s.low_confidence_count} sub="aging out" />
        <Stat label="Contradicted" value={s.contradicted_count} sub="superseded" />
        <Stat label="Merged" value={s.merged_count} sub="dedup hidden" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top-scored active memories</CardTitle>
          <CardDescription>The highest-scoring rows your AI relies on right now.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {active.map((m) => (
              <li key={m.id} className="flex items-start justify-between gap-3 px-4 py-2.5 text-sm">
                <div className="min-w-0 flex-1">
                  <p>
                    <span className="mr-2 rounded bg-paper-2 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-mute">
                      {m.kind}
                    </span>
                    {m.content}
                  </p>
                  <p className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>conf {Math.round(m.confidence * 100)}%</span>
                    <span>used {m.useCount}×</span>
                    <span>score {m.score.toFixed(2)}</span>
                    {m.lastUsedAt && <span>last {new Date(m.lastUsedAt).toLocaleDateString()}</span>}
                  </p>
                </div>
                <button
                  disabled
                  className="rounded border border-hairline px-2 py-1 text-[11px] uppercase tracking-wider text-muted-foreground"
                >
                  archive
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {contradicted.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recently contradicted</CardTitle>
            <CardDescription>
              Newer customer info overrode these. Restore if the AI got it wrong.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y">
              {contradicted.map((m) => (
                <li key={m.id} className="flex items-start justify-between gap-3 px-4 py-2.5 text-sm">
                  <div className="min-w-0 flex-1">
                    <p className="text-mute line-through">
                      <span className="mr-2 rounded bg-paper-2 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider no-underline">
                        {m.kind}
                      </span>
                      {m.content}
                    </p>
                  </div>
                  <button
                    disabled
                    className="rounded border border-hairline px-2 py-1 text-[11px] uppercase tracking-wider text-muted-foreground"
                  >
                    restore
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground">
        <Link href="/help/memory-lifecycle" className="text-warm hover:underline">
          How does the memory lifecycle work? →
        </Link>
      </p>
    </main>
  );
}

function Stat({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}
