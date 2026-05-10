import { notFound } from 'next/navigation';
import { ChannelBadge } from '@/components/app/channel-badge';
import { ChatBody } from '@/components/ui/chat-body';
import {
  demoConversations,
  demoCustomers,
  demoMemory,
  demoThread,
} from '@/lib/demo-merchant/seed';

export const dynamic = 'force-dynamic';

export default async function TryInboxThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const convo = demoConversations.find((c) => c.id === id);
  if (!convo) notFound();

  const customer = demoCustomers.find((c) => c.id === convo.customerId);
  const messages = demoThread[id] ?? [];
  const memory = demoMemory.filter(
    (m) => m.customerId === convo.customerId && m.status === 'active',
  );

  return (
    <div className="grid h-full grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px]">
      {/* Thread column */}
      <div className="flex flex-col">
        {/* Thread header */}
        <header className="flex items-start justify-between gap-3 border-b bg-background px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-warm-soft text-base font-medium text-warm">
              {convo.customerName[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-[14px] font-semibold">{convo.customerName}</p>
              <div className="mt-0.5 flex items-center gap-2">
                <ChannelBadge channel={convo.channel} />
                <span className="text-[11px] text-muted-foreground">
                  status: {convo.status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-[12px]">
              <input
                type="checkbox"
                checked={convo.autoReply}
                disabled
                className="h-3.5 w-3.5"
              />
              <span>Auto-reply</span>
            </label>
            <select
              disabled
              defaultValue={convo.status}
              className="rounded-md border bg-background px-2 py-1 text-[12px]"
            >
              <option value="open">open</option>
              <option value="pending">pending</option>
              <option value="resolved">resolved</option>
              <option value="closed">closed</option>
            </select>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto bg-paper-2/30 px-5 py-5">
          {messages.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No messages yet.
            </p>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-2 text-[13.5px] ${
                    m.direction === 'outbound'
                      ? 'bg-warm text-paper'
                      : 'bg-background text-foreground shadow-soft'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">
                    <ChatBody text={m.body} />
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] opacity-60">
                    <time>
                      {new Date(m.sentAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </time>
                    {m.aiGenerated && (
                      <span className="rounded bg-paper/30 px-1 font-mono">AI</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Composer */}
        <div className="border-t bg-background p-3">
          <div className="flex items-end gap-2">
            <textarea
              disabled
              rows={2}
              placeholder="Demo mode — composer disabled. Sign up to send real replies."
              className="flex-1 resize-none rounded-md border bg-background px-3 py-2 text-[13px] text-muted-foreground"
            />
            <div className="flex flex-col gap-1.5">
              <button
                disabled
                className="rounded-md border border-hairline bg-paper px-2.5 py-1.5 text-[12px] text-muted-foreground"
              >
                ✨ AI
              </button>
              <button
                disabled
                className="rounded-md bg-warm/40 px-2.5 py-1.5 text-[12px] text-paper"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right detail rail — customer + memory */}
      <aside className="overflow-y-auto border-l bg-paper-2/30 px-4 py-4 xl:block">
        <div className="rounded-lg border bg-background p-4">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Customer
          </h3>
          <dl className="mt-3 space-y-2 text-[13px]">
            <div>
              <dt className="text-[11px] text-muted-foreground">Name</dt>
              <dd>{customer?.name ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-[11px] text-muted-foreground">
                {convo.channel.toUpperCase()} ID
              </dt>
              <dd className="break-all font-mono text-[11px]">
                {customer?.channelIds[convo.channel] ?? '—'}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] text-muted-foreground">Tags</dt>
              <dd className="mt-1 flex flex-wrap gap-1">
                {customer?.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-paper-2 px-1.5 py-0.5 text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-4 rounded-lg border bg-background p-4">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Memory
          </h3>
          {memory.length === 0 ? (
            <p className="mt-3 text-[12px] text-muted-foreground">
              No memory yet.
            </p>
          ) : (
            <ul className="mt-3 space-y-2 text-[13px]">
              {memory.map((m) => (
                <li
                  key={m.id}
                  className="rounded border-l-2 border-warm bg-paper-2/60 px-2.5 py-1.5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-warm">
                    {m.kind} · conf {Math.round(m.confidence * 100)}% · used{' '}
                    {m.useCount}×
                  </span>
                  <p className="mt-0.5 text-[12px] leading-snug">{m.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
