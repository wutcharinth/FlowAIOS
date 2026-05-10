import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { demoAuditLog } from '@/lib/demo-merchant/seed';

export const dynamic = 'force-dynamic';

export default function TryAuditPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Audit log</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Recent AI, system, and human actions in this workspace.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Latest events</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {demoAuditLog.map((r) => (
              <li key={r.id} className="px-4 py-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                        r.type === 'ai'
                          ? 'bg-warm-soft text-warm'
                          : r.type === 'system'
                            ? 'bg-paper-2 text-mute'
                            : 'bg-mint-soft text-mint'
                      }`}
                    >
                      {r.type}
                    </span>
                    <span className="font-medium">{r.action}</span>
                  </div>
                  <time className="text-xs text-muted-foreground">
                    {new Date(r.at).toLocaleString()}
                  </time>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">by {r.actor}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
