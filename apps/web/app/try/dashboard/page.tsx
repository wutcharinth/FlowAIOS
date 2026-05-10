import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChannelBadge } from '@/components/app/channel-badge';
import { demoStats, DEMO_BRAND, demoConversations } from '@/lib/demo-merchant/seed';

export const dynamic = 'force-dynamic';

export default function TryDashboardPage() {
  const total = demoStats.channelBreakdown.reduce((a, b) => a + b.count, 0);
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Good morning, Pim</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&rsquo;s what&rsquo;s happening at {DEMO_BRAND.name} today.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Conversations (24h)" value={demoStats.conversations24h} />
        <Kpi label="Inbound messages" value={demoStats.inboundMessages24h} />
        <Kpi
          label="AI auto-replies"
          value={demoStats.aiReplies24h}
          sub={`${Math.round(demoStats.autoReplyRate * 100)}% of outbound`}
        />
        <Kpi label="Open conversations" value={demoStats.openConversations} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Channels (7d)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {demoStats.channelBreakdown.map(({ channel, count }) => {
                const pct = Math.round((count / total) * 100);
                return (
                  <li key={channel}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <ChannelBadge channel={channel} />
                      <span className="font-mono text-xs">
                        {count} · {pct}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-paper-2">
                      <div className="h-full bg-warm" style={{ width: `${pct}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Onboarding</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint text-paper">
                  ✓
                </span>
                LINE OA connected
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint text-paper">
                  ✓
                </span>
                12 KB articles
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint text-paper">
                  ✓
                </span>
                4 teammates
              </li>
              <li className="flex items-center gap-2 text-mute">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-hairline-2 bg-paper" />
                Connect Shopee &amp; TikTok Shop
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {demoConversations.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/try/inbox/${c.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm hover:bg-accent/50"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <ChannelBadge channel={c.channel} />
                    <span className="font-medium">{c.customerName}</span>
                    <span className="truncate text-muted-foreground">{c.lastMessage}</span>
                  </div>
                  <time className="font-mono text-[11px] text-muted-foreground">
                    {new Date(c.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function Kpi({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tabular-nums">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}
