import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChannelBadge } from '@/components/app/channel-badge';
import { demoCustomers } from '@/lib/demo-merchant/seed';

export const dynamic = 'force-dynamic';

export default function TryCustomersPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Customers</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {demoCustomers.length} customers in this demo workspace
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All customers</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {demoCustomers.map((c) => (
              <li key={c.id}>
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-warm-soft text-sm font-medium text-warm">
                    {c.name[0]?.toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{c.name}</p>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      {Object.keys(c.channelIds).map((ch) => (
                        <ChannelBadge key={ch} channel={ch} />
                      ))}
                      <span className="font-mono">
                        {c.inbound}/{c.outbound} msgs
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {c.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded bg-paper-2 px-1.5 py-0.5 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <time className="text-xs text-muted-foreground">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
