import Link from 'next/link';
import { ChannelBadge } from '@/components/app/channel-badge';
import { demoConversations } from '@/lib/demo-merchant/seed';

export const dynamic = 'force-dynamic';

const PILL_CLASS: Record<string, string> = {
  auto: 'bg-mint-soft text-mint',
  approval: 'bg-warm-soft text-warm',
  escalate: 'bg-[#FFF1F2] text-[#BE123C]',
  growth: 'bg-[#EEF2FF] text-[#4338CA]',
};

function relative(iso: string): string {
  const m = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

export default function TryInboxPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Inbox</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {demoConversations.length} conversations · 5 channels active
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            disabled
            className="rounded-md border bg-background px-2 py-1.5 text-sm text-muted-foreground"
            defaultValue="open"
          >
            <option>open</option>
            <option>pending</option>
            <option>resolved</option>
          </select>
          <select
            disabled
            className="rounded-md border bg-background px-2 py-1.5 text-sm text-muted-foreground"
            defaultValue=""
          >
            <option value="">all channels</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border bg-background">
        <ul className="divide-y">
          {demoConversations.map((c) => (
            <li key={c.id}>
              <Link
                href={`/try/inbox/${c.id}`}
                className="block px-4 py-3 transition-colors hover:bg-accent"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-warm-soft text-sm font-medium text-warm">
                    {c.customerName[0]?.toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium">{c.customerName}</p>
                      <ChannelBadge channel={c.channel} />
                      {c.autoReply && (
                        <span className="rounded-full bg-mint-soft px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-mint">
                          auto
                        </span>
                      )}
                      {c.pill && (
                        <span
                          className={`rounded-full px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${PILL_CLASS[c.pill]}`}
                        >
                          {c.pill}
                        </span>
                      )}
                      {c.unread > 0 && (
                        <span className="rounded-full bg-warm px-1.5 py-0.5 font-mono text-[9px] text-paper">
                          {c.unread}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                      {c.lastMessage}
                    </p>
                  </div>
                  <time className="flex-shrink-0 text-xs text-muted-foreground">
                    {relative(c.lastMessageAt)}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
