import {
  knowledgeBaseItems,
  lessonItems,
  memoryLifecycleItems,
  harnessItems,
} from '@/lib/marketing/data';

export function SelfImproving() {
  return (
    <section className="border-t border-hairline bg-paper-2 py-28">
      <div className="mx-auto w-[min(1240px,calc(100%-48px))]">
        <div className="mb-14 grid items-end gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="label-mono mb-4 inline-block text-warm">Self-improving AI</span>
            <h2 className="display-md text-ink">
              AI ที่เรียนรู้จากธุรกิจของคุณ
              <br />
              ไม่ใช่ AI ทั่วไปที่ตอบเหมือนกันทุกแบรนด์
            </h2>
          </div>
          <p className="lead">
            FlowAIOS ใช้ Knowledge Base เป็น source of truth, Lesson System เป็น
            playbook ที่พัฒนาจากการทำงานจริง และ Memory Lifecycle ที่ตัดสินว่า
            อะไรควรจำ อะไรควรลืม โดยอัตโนมัติ ทุก lesson ผ่านการอนุมัติของ
            manager เพื่อให้ automation ฉลาดขึ้นโดยไม่เสียการควบคุม
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          <article className="rounded-2xl border border-hairline bg-paper p-7 shadow-soft">
            <h3 className="text-[20px] font-semibold tracking-tight text-ink">
              Knowledge Base
            </h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink-2">
              แหล่งความรู้หลักของธุรกิจที่ AI ใช้อ้างอิงก่อนตอบลูกค้า
            </p>
            <div className="mt-5 flex flex-col divide-y divide-hairline">
              {knowledgeBaseItems.map((it) => (
                <span key={it} className="py-3 text-[13px] leading-relaxed text-ink-2">
                  {it}
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-hairline bg-paper p-7 shadow-soft">
            <h3 className="text-[20px] font-semibold tracking-tight text-ink">
              Lesson System
            </h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink-2">
              บทเรียนจากการใช้งานจริง เช่น คำตอบที่ทีมแก้ไข คำตอบที่ถูกอนุมัติ
              และเคสที่ถูกส่งต่อ
            </p>
            <div className="mt-5 flex flex-col divide-y divide-hairline">
              {lessonItems.map((it) => (
                <span key={it} className="py-3 text-[13px] leading-relaxed text-ink-2">
                  {it}
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
              ระบบตัดสินว่าอะไรควรจำ ลืม supersede หรือ promote เป็น lesson
              อัตโนมัติทุกคืน
            </p>
            <div className="mt-5 flex flex-col divide-y divide-hairline">
              {memoryLifecycleItems.map((it) => (
                <span key={it} className="py-3 text-[13px] leading-relaxed text-ink-2">
                  {it}
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
                AI ที่คุม debug ได้ ไม่ใช่ black box
              </h3>
            </div>
            <p className="max-w-[36ch] text-[12.5px] leading-relaxed text-ink-2">
              ทุก AI reply เก็บ trace, sources, latency, provider, confidence — review
              ได้ใน /admin/ai-logs
            </p>
          </div>
          <ul className="mt-5 grid gap-x-8 gap-y-2 text-[12.5px] leading-relaxed text-ink-2 md:grid-cols-2 lg:grid-cols-3">
            {harnessItems.map((it) => (
              <li key={it} className="flex items-baseline gap-2">
                <span aria-hidden className="font-mono text-[10px] text-warm">
                  →
                </span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
