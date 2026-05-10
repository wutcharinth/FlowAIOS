import {
  knowledgeBaseItems,
  lessonItems,
  memoryLifecycleItems,
  harnessItems,
} from '@/lib/marketing/data';
import { T } from './lang-text';

export function SelfImproving() {
  return (
    <section className="border-t border-hairline bg-paper-2 py-28">
      <div className="mx-auto w-[min(1240px,calc(100%-48px))]">
        <div className="mb-14 grid items-end gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="label-mono mb-4 inline-block text-warm">Self-improving AI</span>
            <h2 className="display-md text-ink">
              <span className="th-only">
                AI ที่เรียนรู้จากธุรกิจของคุณ
                <br />
                ไม่ใช่ AI ทั่วไปที่ตอบเหมือนกันทุกแบรนด์
              </span>
              <span className="en-only">
                AI that learns from your business —
                <br />
                not a generic AI that sounds the same for every brand.
              </span>
            </h2>
          </div>
          <p className="lead">
            <span className="th-only">
              FlowAIOS ใช้ Knowledge Base เป็น source of truth, Lesson System เป็น
              playbook ที่พัฒนาจากการทำงานจริง และ Memory Lifecycle ที่ตัดสินว่า
              อะไรควรจำ อะไรควรลืม โดยอัตโนมัติ ทุก lesson ผ่านการอนุมัติของ
              manager เพื่อให้ automation ฉลาดขึ้นโดยไม่เสียการควบคุม
            </span>
            <span className="en-only">
              FlowAIOS uses the Knowledge Base as source of truth, the Lesson
              System as a playbook that grows from real work, and a Memory
              Lifecycle that decides what to keep and what to forget — automatically.
              Every lesson passes manager approval, so automation gets smarter
              without giving up control.
            </span>
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          <article className="rounded-2xl border border-hairline bg-paper p-7 shadow-soft">
            <h3 className="text-[20px] font-semibold tracking-tight text-ink">
              Knowledge Base
            </h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink-2">
              <span className="th-only">
                แหล่งความรู้หลักของธุรกิจที่ AI ใช้อ้างอิงก่อนตอบลูกค้า
              </span>
              <span className="en-only">
                The primary knowledge source AI consults before replying.
              </span>
            </p>
            <div className="mt-5 flex flex-col divide-y divide-hairline">
              {knowledgeBaseItems.map((it) => (
                <span key={it.en} className="py-3 text-[13px] leading-relaxed text-ink-2">
                  <T value={it} />
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-hairline bg-paper p-7 shadow-soft">
            <h3 className="text-[20px] font-semibold tracking-tight text-ink">
              Lesson System
            </h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink-2">
              <span className="th-only">
                บทเรียนจากการใช้งานจริง เช่น คำตอบที่ทีมแก้ไข คำตอบที่ถูกอนุมัติ
                และเคสที่ถูกส่งต่อ
              </span>
              <span className="en-only">
                Lessons from real work — replies the team edited, replies that
                were approved, and cases that were escalated.
              </span>
            </p>
            <div className="mt-5 flex flex-col divide-y divide-hairline">
              {lessonItems.map((it) => (
                <span key={it.en} className="py-3 text-[13px] leading-relaxed text-ink-2">
                  <T value={it} />
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-warm/30 bg-paper p-7 shadow-soft">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-warm">
              New
            </span>
            <h3 className="mt-1.5 text-[20px] font-semibold tracking-tight text-ink">
              Memory Lifecycle
            </h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink-2">
              <span className="th-only">
                ระบบตัดสินว่าอะไรควรจำ ลืม supersede หรือ promote เป็น lesson
                อัตโนมัติทุกคืน
              </span>
              <span className="en-only">
                A system that decides what to remember, forget, supersede, or
                promote into a lesson — automatically, every night.
              </span>
            </p>
            <div className="mt-5 flex flex-col divide-y divide-hairline">
              {memoryLifecycleItems.map((it) => (
                <span key={it.en} className="py-3 text-[13px] leading-relaxed text-ink-2">
                  <T value={it} />
                </span>
              ))}
            </div>
          </article>
        </div>

        {/* Harness / observability strip — small but important trust signal */}
        <div className="mt-12 rounded-2xl border border-hairline bg-paper p-6">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-warm">
                Under the hood · Harness + Observability
              </span>
              <h3 className="mt-1.5 text-[18px] font-semibold tracking-tight text-ink">
                <span className="th-only">AI ที่คุม debug ได้ ไม่ใช่ black box</span>
                <span className="en-only">AI you can debug — not a black box.</span>
              </h3>
            </div>
            <p className="max-w-[36ch] text-[12.5px] leading-relaxed text-ink-2">
              <span className="th-only">
                ทุก AI reply เก็บ trace, sources, latency, provider, confidence — review
                ได้ใน /admin/ai-logs
              </span>
              <span className="en-only">
                Every AI reply stores trace, sources, latency, provider, confidence —
                reviewable in /admin/ai-logs.
              </span>
            </p>
          </div>
          <ul className="mt-5 grid gap-x-8 gap-y-2 text-[12.5px] leading-relaxed text-ink-2 md:grid-cols-2 lg:grid-cols-3">
            {harnessItems.map((it) => (
              <li key={it.en} className="flex items-baseline gap-2">
                <span aria-hidden className="font-mono text-[10px] text-warm">
                  →
                </span>
                <span><T value={it} /></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
