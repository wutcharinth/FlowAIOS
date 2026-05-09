'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { SCENARIOS, type ScenarioId } from '@/lib/demo/scenarios';

/**
 * Interactive demo with 5 ecommerce scenarios, each highlighting a
 * distinct AI capability. User picks a category tab; the chat boots
 * with the brand's greeting + 3 starter prompts. Replies hit
 * /api/demo/scenario which loads the per-scenario system prompt
 * server-side (brand catalog, policies, special-behavior rules).
 *
 * Per-scenario turn limit (4 turns each) keeps cost predictable;
 * switching tabs resets the conversation but not the global limit.
 */
interface Message {
  role: 'user' | 'assistant';
  content: string;
  pending?: boolean;
}

const TURNS_PER_SCENARIO = 4;

export function ScenarioPlayground({ initialLang = 'th' }: { initialLang?: 'th' | 'en' }) {
  const [activeId, setActiveId] = useState<ScenarioId>(SCENARIOS[0]!.id);
  const [lang, setLang] = useState<'th' | 'en'>(initialLang);
  const [messagesByScenario, setMessagesByScenario] = useState<
    Record<ScenarioId, Message[]>
  >(() =>
    Object.fromEntries(
      SCENARIOS.map((s) => [s.id, [{ role: 'assistant', content: s.greeting[initialLang] }]]),
    ) as Record<ScenarioId, Message[]>,
  );
  const [turnsByScenario, setTurnsByScenario] = useState<Record<ScenarioId, number>>(
    () => Object.fromEntries(SCENARIOS.map((s) => [s.id, 0])) as Record<ScenarioId, number>,
  );
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Mirror the user's lang cookie if it changes (toggling TH/EN in nav).
  useEffect(() => {
    const read = () => {
      const m = document.cookie.match(/(?:^|; )flowaios-lang=([^;]*)/);
      const v = m?.[1];
      setLang(v === 'en' ? 'en' : 'th');
    };
    read();
    const id = window.setInterval(read, 1500);
    return () => window.clearInterval(id);
  }, []);

  const active = SCENARIOS.find((s) => s.id === activeId)!;
  const messages = messagesByScenario[activeId] ?? [];
  const turns = turnsByScenario[activeId] ?? 0;
  const limitReached = turns >= TURNS_PER_SCENARIO;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages.length, activeId]);

  // When a user switches tabs, if the chat for that tab still has only
  // the greeting, re-seed it with the current language version so the
  // intro line follows the user's TH/EN preference.
  useEffect(() => {
    setMessagesByScenario((prev) => {
      const next = { ...prev };
      for (const s of SCENARIOS) {
        const existing = next[s.id] ?? [];
        if (existing.length === 1 && existing[0]?.role === 'assistant') {
          next[s.id] = [{ role: 'assistant', content: s.greeting[lang] }];
        }
      }
      return next;
    });
  }, [lang]);

  const send = async (text: string) => {
    if (!text.trim() || sending || limitReached) return;
    setSending(true);

    const historyForApi = messages
      .filter((m) => !m.pending)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessagesByScenario((prev) => ({
      ...prev,
      [activeId]: [
        ...(prev[activeId] ?? []),
        { role: 'user', content: text },
        { role: 'assistant', content: '', pending: true },
      ],
    }));
    setInput('');

    try {
      const res = await fetch('/api/demo/scenario', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          scenarioId: activeId,
          message: text,
          history: historyForApi,
        }),
      });
      const data = (await res.json()) as { reply?: string };
      const reply = data.reply ?? "Sorry, I couldn't reach the model. Try again?";
      setMessagesByScenario((prev) => {
        const list = [...(prev[activeId] ?? [])];
        for (let i = list.length - 1; i >= 0; i--) {
          if (list[i]?.pending) {
            list[i] = { role: 'assistant', content: reply };
            break;
          }
        }
        return { ...prev, [activeId]: list };
      });
      setTurnsByScenario((prev) => ({ ...prev, [activeId]: (prev[activeId] ?? 0) + 1 }));
    } catch {
      setMessagesByScenario((prev) => {
        const list = [...(prev[activeId] ?? [])];
        for (let i = list.length - 1; i >= 0; i--) {
          if (list[i]?.pending) {
            list[i] = { role: 'assistant', content: 'Network hiccup. Please try again.' };
            break;
          }
        }
        return { ...prev, [activeId]: list };
      });
    } finally {
      setSending(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="rounded-2xl border border-hairline bg-paper">
      {/* Scenario tabs */}
      <div
        className="flex shrink-0 gap-1 overflow-x-auto border-b border-hairline px-3 py-3 sm:gap-1.5"
        role="tablist"
      >
        {SCENARIOS.map((s) => {
          const on = s.id === activeId;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActiveId(s.id)}
              className={`shrink-0 rounded-lg px-3 py-2 text-left transition-colors ${
                on
                  ? 'bg-warm-soft text-warm'
                  : 'text-ink-2 hover:bg-paper-2 hover:text-ink'
              }`}
            >
              <div className="flex items-center gap-2">
                <span aria-hidden className="text-base">
                  {s.emoji}
                </span>
                <span className="text-[12.5px] font-medium">
                  {lang === 'th' ? s.category.th : s.category.en}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
        {/* Chat panel */}
        <div className="flex flex-col">
          {/* Brand header */}
          <header className="flex items-center justify-between gap-3 border-b border-hairline bg-paper-2 px-5 py-3">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-[14px] font-semibold text-ink">
                <span aria-hidden>{active.emoji}</span>
                {active.brand}
              </p>
              <p className="truncate text-[12px] text-mute">
                {lang === 'th' ? active.tagline.th : active.tagline.en}
              </p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-mute">
              {turns}/{TURNS_PER_SCENARIO}
            </span>
          </header>

          {/* Capability callout */}
          <div className="border-b border-hairline bg-warm-soft/40 px-5 py-2.5">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-warm">
              AI capability
            </p>
            <p className="mt-0.5 text-[12.5px] leading-snug text-ink-2">
              {lang === 'th' ? active.capability.th : active.capability.en}
            </p>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="h-[420px] space-y-3 overflow-y-auto px-5 py-4 text-[14px]"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-sm bg-warm text-paper'
                      : m.pending
                        ? 'rounded-bl-sm bg-paper-2 text-mute italic'
                        : 'rounded-bl-sm bg-paper-2 text-ink'
                  }`}
                >
                  {m.pending ? '…' : m.content}
                </div>
              </div>
            ))}
          </div>

          {/* Composer */}
          {limitReached ? (
            <div className="border-t border-hairline bg-warm-soft/50 px-5 py-3 text-[12.5px] text-warm">
              Turn limit reached for this scenario. Try a different category tab, or
              <a href="/signup" className="ml-1 underline hover:text-warm-2">
                start a free trial
              </a>
              .
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="flex items-end gap-2 border-t border-hairline px-4 py-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={sending}
                placeholder={
                  lang === 'th'
                    ? 'พิมพ์คำถามถึงร้าน · type a question'
                    : 'Type a question to the store...'
                }
                className="flex-1 rounded-md border border-hairline bg-paper px-3 py-2 text-[16px] text-ink placeholder:text-mute focus:border-warm focus:outline-none sm:text-[14px]"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="rounded-md bg-warm px-3.5 py-2 text-[12.5px] font-medium text-paper transition-colors hover:bg-warm-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Send
              </button>
            </form>
          )}
        </div>

        {/* Side rail with starters */}
        <aside className="border-t border-hairline lg:border-l lg:border-t-0 lg:bg-paper-2/30">
          <p className="px-5 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
            Try a question
          </p>
          <ul className="mt-2 px-2 pb-4">
            {active.starters.map((s, i) => {
              const text = lang === 'th' ? s.th : s.en;
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => send(text)}
                    disabled={sending || limitReached}
                    className="group flex w-full items-baseline gap-2 rounded-md px-3 py-2 text-left text-[13px] leading-snug text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink disabled:opacity-40"
                  >
                    <span
                      aria-hidden
                      className="font-mono text-[10px] text-mute group-hover:text-warm"
                    >
                      →
                    </span>
                    <span>{text}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mx-3 mb-4 rounded-lg border border-dashed border-hairline bg-paper-2/40 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
              {lang === 'th' ? 'ทำไมแต่ละหมวดต่างกัน' : 'Why each category differs'}
            </p>
            <p className="mt-1.5 text-[12px] leading-snug text-ink-2">
              {lang === 'th'
                ? 'แต่ละ tab มี catalog, policy, และกฎ "ตอบไม่ได้" ของตัวเอง — AI ใช้ system prompt ของ tab นั้นๆ ในการตอบลูกค้า'
                : "Each tab loads its own catalog, policies, and 'do-not-answer' rules. The AI uses that tab's system prompt to reply as that store's agent."}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
