'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
  pending?: boolean;
}

export function WidgetChat({
  org,
  brand,
  greeting,
}: {
  org: string;
  brand: string;
  greeting: string;
}) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: greeting },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages.length]);

  async function send(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setSending(true);
    setInput('');
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: text },
      { role: 'assistant', content: '', pending: true },
    ]);

    try {
      const res = await fetch('/api/widget/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ org, message: text }),
      });
      const data = (await res.json()) as { reply?: string };
      const reply = data.reply ?? "Sorry, I'm having trouble reaching the team. Try again?";
      setMessages((prev) => {
        const list = [...prev];
        for (let i = list.length - 1; i >= 0; i--) {
          if (list[i]?.pending) {
            list[i] = { role: 'assistant', content: reply };
            break;
          }
        }
        return list;
      });
    } catch {
      setMessages((prev) => {
        const list = [...prev];
        for (let i = list.length - 1; i >= 0; i--) {
          if (list[i]?.pending) {
            list[i] = { role: 'assistant', content: 'Network hiccup. Please try again.' };
            break;
          }
        }
        return list;
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-paper">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-hairline bg-paper-2 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-warm to-warm-2 font-mono text-xs font-bold text-paper">
            F
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-ink">{brand}</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-mint">
              <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
              Online · powered by FlowAIOS
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => window.parent?.postMessage({ source: 'flowaios-widget', type: 'close' }, '*')}
          aria-label="Close chat"
          className="text-ink-2 transition-colors hover:text-ink"
        >
          ✕
        </button>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-[14px]">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 leading-relaxed ${
                m.role === 'user'
                  ? 'rounded-br-sm bg-warm text-paper'
                  : m.pending
                    ? 'rounded-bl-sm bg-paper-2 text-mute italic'
                    : 'rounded-bl-sm bg-paper-2 text-ink'
              }`}
            >
              {m.pending ? (
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mute" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mute [animation-delay:0.15s]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mute [animation-delay:0.3s]" />
                </span>
              ) : (
                m.content
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Composer */}
      <form
        onSubmit={send}
        className="flex items-end gap-2 border-t border-hairline px-3 py-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
          placeholder="Type a message…"
          className="flex-1 rounded-md border border-hairline bg-paper px-3 py-2 text-[14px] text-ink placeholder:text-mute focus:border-warm focus:outline-none"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="rounded-md bg-warm px-3.5 py-2 text-[12.5px] font-medium text-paper transition-colors hover:bg-warm-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}
