'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { ChannelBadge } from '@/components/app/channel-badge';
import { ChannelIcon, type ChannelKey } from '@/components/ui/channel-icon';
import { demoConversations } from '@/lib/demo-merchant/seed';

const STATUSES = ['open', 'pending', 'resolved', 'closed'] as const;
type Status = (typeof STATUSES)[number];

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

function buildHref(params: URLSearchParams, patch: Record<string, string | null>): string {
  const next = new URLSearchParams(params);
  for (const [k, v] of Object.entries(patch)) {
    if (v === null) next.delete(k);
    else next.set(k, v);
  }
  const qs = next.toString();
  return `/try/inbox${qs ? `?${qs}` : ''}`;
}

export function InboxColumns({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = (searchParams.get('status') ?? 'open') as Status | 'all';
  const channel = searchParams.get('channel');

  const activeConvoId = pathname?.startsWith('/try/inbox/')
    ? pathname.split('/')[3]
    : null;

  // Counts per status / channel — computed off the raw data (so badges
  // show totals across filters, like Outlook does).
  const statusCounts = useMemo(() => {
    const out: Record<string, number> = { all: demoConversations.length };
    for (const s of STATUSES) {
      out[s] = demoConversations.filter((c) => c.status === s).length;
    }
    return out;
  }, []);

  const channelCounts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const c of demoConversations) out[c.channel] = (out[c.channel] ?? 0) + 1;
    return out;
  }, []);

  const filtered = demoConversations.filter((c) => {
    if (status !== 'all' && c.status !== status) return false;
    if (channel && c.channel !== channel) return false;
    return true;
  });

  const channels = Object.keys(channelCounts) as ChannelKey[];

  return (
    <div className="grid h-[calc(100vh-180px)] min-h-[560px] grid-cols-1 overflow-hidden border-y bg-background lg:grid-cols-[220px_minmax(280px,360px)_1fr]">
      {/* LEFT — filter tree */}
      <aside className="overflow-y-auto border-r bg-paper-2/40 px-3 py-4 lg:block">
        <div className="px-2 pb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Status
        </div>
        <ul className="mb-5 space-y-0.5">
          <TreeItem
            href={buildHref(searchParams, { status: null })}
            active={status === 'all'}
            label="All"
            count={statusCounts.all ?? 0}
          />
          {STATUSES.map((s) => (
            <TreeItem
              key={s}
              href={buildHref(searchParams, { status: s })}
              active={status === s}
              label={s}
              count={statusCounts[s] ?? 0}
            />
          ))}
        </ul>

        <div className="px-2 pb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Channels
        </div>
        <ul className="space-y-0.5">
          <TreeItem
            href={buildHref(searchParams, { channel: null })}
            active={!channel}
            label="All channels"
            count={demoConversations.length}
          />
          {channels.map((ch) => (
            <TreeItem
              key={ch}
              href={buildHref(searchParams, { channel: ch })}
              active={channel === ch}
              icon={<ChannelIcon channel={ch} size={13} className="text-muted-foreground" />}
              label={ch}
              count={channelCounts[ch] ?? 0}
            />
          ))}
        </ul>
      </aside>

      {/* MIDDLE — conversation list */}
      <div className="overflow-y-auto border-r bg-background">
        <div className="sticky top-0 z-10 flex items-baseline justify-between border-b bg-background/95 px-4 py-3 backdrop-blur">
          <div>
            <h1 className="text-[15px] font-semibold">Inbox</h1>
            <p className="text-[11px] text-muted-foreground">
              {filtered.length} of {demoConversations.length} · {status}
              {channel ? ` · ${channel}` : ''}
            </p>
          </div>
        </div>
        {filtered.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-muted-foreground">
            No conversations match this filter.
          </p>
        ) : (
          <ul className="divide-y">
            {filtered.map((c) => {
              const selected = activeConvoId === c.id;
              return (
                <li key={c.id}>
                  <Link
                    href={`/try/inbox/${c.id}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`}
                    className={`block px-4 py-3 transition-colors ${
                      selected ? 'bg-warm-soft/50' : 'hover:bg-accent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                          selected ? 'bg-warm text-paper' : 'bg-warm-soft text-warm'
                        }`}
                      >
                        {c.customerName[0]?.toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="truncate text-[13.5px] font-medium">
                            {c.customerName}
                          </p>
                          <time className="flex-shrink-0 text-[11px] text-muted-foreground">
                            {relative(c.lastMessageAt)}
                          </time>
                        </div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <ChannelBadge channel={c.channel} />
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
                        <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-muted-foreground">
                          {c.lastMessage}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* RIGHT — thread / empty state */}
      <div className="overflow-y-auto bg-background">{children}</div>
    </div>
  );
}

function TreeItem({
  href,
  active,
  label,
  count,
  icon,
}: {
  href: string;
  active: boolean;
  label: string;
  count: number;
  icon?: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-[13px] capitalize transition-colors ${
          active
            ? 'bg-warm/12 font-medium text-warm'
            : 'text-foreground hover:bg-accent'
        }`}
      >
        <span className="flex items-center gap-2 truncate">
          {icon}
          {label}
        </span>
        <span
          className={`flex-shrink-0 font-mono text-[10.5px] ${
            active ? 'text-warm' : 'text-muted-foreground'
          }`}
        >
          {count}
        </span>
      </Link>
    </li>
  );
}
