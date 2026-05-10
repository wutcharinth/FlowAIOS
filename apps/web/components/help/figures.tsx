/**
 * Inline visual diagrams for /help articles. Each is a server-renderable
 * SVG with light CSS-keyframe motion (respects prefers-reduced-motion).
 *
 * Embedded by the help renderer when the article body contains a line like
 *   <Figure name="three-tier-flow" />
 *
 * Adding a new figure: implement here, add to FIGURES, and reference by name.
 */

const SHARED_CSS = `
  @keyframes help-fig-pulse {
    0%, 100% { opacity: 0.5; }
    50%      { opacity: 1; }
  }
  @keyframes help-fig-arrow {
    from { stroke-dashoffset: 0; }
    to   { stroke-dashoffset: -16; }
  }
  @keyframes help-fig-grow {
    0%   { transform: scale(0.92); opacity: 0.6; }
    50%  { transform: scale(1);    opacity: 1; }
    100% { transform: scale(0.92); opacity: 0.6; }
  }
  .help-fig-arrow { animation: help-fig-arrow 2.4s linear infinite; }
  .help-fig-pulse { animation: help-fig-pulse 1.8s ease-in-out infinite; }
  .help-fig-grow  { animation: help-fig-grow 3s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    .help-fig-arrow, .help-fig-pulse, .help-fig-grow { animation: none !important; }
  }
`;

function FigureFrame({
  caption,
  captionEn,
  lang,
  children,
}: {
  caption: string;
  captionEn: string;
  lang: 'th' | 'en';
  children: React.ReactNode;
}) {
  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-hairline bg-paper">
      <style dangerouslySetInnerHTML={{ __html: SHARED_CSS }} />
      <div className="bg-paper-2/40 p-4 sm:p-6">{children}</div>
      <figcaption className="border-t border-hairline px-4 py-2 text-[12px] text-mute">
        {lang === 'en' ? captionEn : caption}
      </figcaption>
    </figure>
  );
}

/* ---------- Figure 1: Three-tier flow (auto / approval / escalate) ---------- */

function ThreeTierFlow({ lang }: { lang: 'th' | 'en' }) {
  const labels =
    lang === 'th'
      ? {
          inbound: 'ข้อความเข้า',
          gate: 'AI ประเมินความมั่นใจ',
          auto: 'ตอบเอง',
          autoSub: 'มั่นใจ ≥ 90%',
          approval: 'รอ approve',
          approvalSub: '70 – 90%',
          escalate: 'ส่งต่อทีม',
          escalateSub: 'ต่ำกว่านั้น หรือ keyword สำคัญ',
        }
      : {
          inbound: 'Inbound message',
          gate: 'AI confidence gate',
          auto: 'Auto-reply',
          autoSub: 'confidence ≥ 90%',
          approval: 'Drafted for approval',
          approvalSub: '70 – 90%',
          escalate: 'Escalated to human',
          escalateSub: 'below 70%, or sensitive keywords',
        };

  return (
    <FigureFrame
      caption="ทุกข้อความผ่าน confidence gate ก่อนเลือก path"
      captionEn="Every message passes the confidence gate before routing"
      lang={lang}
    >
      <svg
        role="img"
        aria-label={labels.gate}
        viewBox="0 0 600 230"
        className="h-auto w-full"
      >
        {/* Inbound bubble */}
        <g transform="translate(20, 95)">
          <rect width="120" height="40" rx="10" fill="hsl(var(--paper-2))" stroke="hsl(var(--hairline))" />
          <text x="60" y="25" textAnchor="middle" className="fill-ink-2" style={{ fontSize: 13 }}>
            {labels.inbound}
          </text>
        </g>

        {/* Animated arrow → gate */}
        <line
          x1="140" y1="115" x2="220" y2="115"
          stroke="hsl(var(--warm))" strokeWidth="2" strokeDasharray="3 3"
          className="help-fig-arrow"
        />

        {/* Gate (diamond-ish) */}
        <g transform="translate(220, 75)">
          <rect width="160" height="80" rx="14"
                fill="hsl(var(--warm-soft))" stroke="hsl(var(--warm))" strokeOpacity="0.3" />
          <text x="80" y="36" textAnchor="middle" className="fill-warm" style={{ fontSize: 12, fontWeight: 600 }}>
            {labels.gate}
          </text>
          <text x="80" y="56" textAnchor="middle" className="fill-mute" style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace' }}>
            confidence + sentiment + keyword
          </text>
        </g>

        {/* Three branches */}
        {/* AUTO (top-right, mint) */}
        <line x1="380" y1="95" x2="450" y2="40" stroke="hsl(var(--mint))" strokeWidth="2" />
        <g transform="translate(450, 16)">
          <rect width="140" height="48" rx="10" fill="hsl(var(--mint-soft))" stroke="hsl(var(--mint))" strokeOpacity="0.3" />
          <text x="70" y="22" textAnchor="middle" className="fill-mint" style={{ fontSize: 13, fontWeight: 600 }}>
            {labels.auto}
          </text>
          <text x="70" y="38" textAnchor="middle" className="fill-mute" style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace' }}>
            {labels.autoSub}
          </text>
        </g>

        {/* APPROVAL (mid-right, warm) */}
        <line x1="380" y1="115" x2="450" y2="115" stroke="hsl(var(--warm))" strokeWidth="2" />
        <g transform="translate(450, 91)">
          <rect width="140" height="48" rx="10" fill="hsl(var(--warm-soft))" stroke="hsl(var(--warm))" strokeOpacity="0.3" />
          <text x="70" y="22" textAnchor="middle" className="fill-warm" style={{ fontSize: 13, fontWeight: 600 }}>
            {labels.approval}
          </text>
          <text x="70" y="38" textAnchor="middle" className="fill-mute" style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace' }}>
            {labels.approvalSub}
          </text>
        </g>

        {/* ESCALATE (bottom-right, rose) */}
        <line x1="380" y1="135" x2="450" y2="190" stroke="#BE123C" strokeWidth="2" />
        <g transform="translate(450, 166)">
          <rect width="140" height="48" rx="10" fill="#FFF1F2" stroke="#BE123C" strokeOpacity="0.3" />
          <text x="70" y="22" textAnchor="middle" fill="#BE123C" style={{ fontSize: 13, fontWeight: 600 }}>
            {labels.escalate}
          </text>
          <text x="70" y="38" textAnchor="middle" className="fill-mute" style={{ fontSize: 9, fontFamily: 'ui-monospace, monospace' }}>
            {labels.escalateSub}
          </text>
        </g>
      </svg>
    </FigureFrame>
  );
}

/* ---------- Figure 2: Connect LINE — 5 step pipeline ---------- */

function ConnectLineSteps({ lang }: { lang: 'th' | 'en' }) {
  const steps =
    lang === 'th'
      ? [
          { n: '1', title: 'สร้าง Channel', sub: 'LINE Developers' },
          { n: '2', title: 'คัดลอก secret + token', sub: '2 ค่า' },
          { n: '3', title: 'วางใน FlowAIOS', sub: 'Admin → Channels' },
          { n: '4', title: 'วาง webhook URL', sub: 'LINE → Use webhook' },
          { n: '5', title: 'ปิด auto-reply ของ LINE', sub: 'หลีกเลี่ยงชน' },
        ]
      : [
          { n: '1', title: 'Create channel', sub: 'LINE Developers' },
          { n: '2', title: 'Copy secret + token', sub: '2 values' },
          { n: '3', title: 'Paste into FlowAIOS', sub: 'Admin → Channels' },
          { n: '4', title: 'Paste webhook URL', sub: 'LINE → Use webhook' },
          { n: '5', title: 'Disable LINE auto-reply', sub: 'avoid double-replies' },
        ];

  return (
    <FigureFrame
      caption="ขั้นตอน 5 ขั้นตอน · ใช้เวลาประมาณ 30 นาที"
      captionEn="5 steps · about 30 minutes end-to-end"
      lang={lang}
    >
      <ol className="grid gap-3 sm:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.n} className="relative">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-soft font-mono text-sm font-semibold text-warm help-fig-grow"
                   style={{ animationDelay: `${i * 0.4}s` }}>
                {s.n}
              </div>
              <p className="mt-2 text-[12.5px] font-medium text-ink">{s.title}</p>
              <p className="mt-0.5 font-mono text-[10px] text-mute">{s.sub}</p>
            </div>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[calc(50%+22px)] top-5 hidden h-px w-[calc(100%-44px)] bg-warm/30 sm:block"
              />
            )}
          </li>
        ))}
      </ol>
    </FigureFrame>
  );
}

/* ---------- Figure 3: Memory lifecycle state machine ---------- */

function MemoryLifecycle({ lang }: { lang: 'th' | 'en' }) {
  const labels =
    lang === 'th'
      ? {
          extracted: 'extracted',
          active: 'Active',
          activeSub: 'AI ใช้',
          merged: 'Merged',
          mergedSub: 'duplicate',
          contradicted: 'Contradicted',
          contradictedSub: 'newer wins',
          archived: 'Archived',
          archivedSub: 'unused 60d',
          lesson: 'Org-wide lesson',
          lessonSub: '≥ 4 customers',
          tBoosted: 'used → score↑',
          tDup: 'cosine ≥ 0.92',
          tConflict: 'AI judges conflict',
          tStale: 'no use 60d + low conf',
          tPromote: 'pattern across customers',
        }
      : {
          extracted: 'extracted',
          active: 'Active',
          activeSub: 'AI uses it',
          merged: 'Merged',
          mergedSub: 'duplicate',
          contradicted: 'Contradicted',
          contradictedSub: 'newer wins',
          archived: 'Archived',
          archivedSub: 'unused 60 d',
          lesson: 'Org-wide lesson',
          lessonSub: '≥ 4 customers',
          tBoosted: 'cited → score boost',
          tDup: 'cosine ≥ 0.92',
          tConflict: 'AI judges conflict',
          tStale: 'no use 60 d + low conf',
          tPromote: 'same fact ≥ 4 customers',
        };

  const Node = ({
    x, y, w, h, color, title, sub, animateOn,
  }: {
    x: number; y: number; w: number; h: number;
    color: 'mint' | 'warm' | 'rose' | 'mute' | 'ink';
    title: string; sub: string; animateOn?: boolean;
  }) => {
    const fill = {
      mint: 'hsl(var(--mint-soft))',
      warm: 'hsl(var(--warm-soft))',
      rose: '#FFF1F2',
      mute: 'hsl(var(--paper-2))',
      ink: '#EEF2FF',
    }[color];
    const stroke = {
      mint: 'hsl(var(--mint))',
      warm: 'hsl(var(--warm))',
      rose: '#BE123C',
      mute: 'hsl(var(--mute))',
      ink: '#4338CA',
    }[color];
    const text = stroke;
    return (
      <g transform={`translate(${x},${y})`} className={animateOn ? 'help-fig-pulse' : ''}>
        <rect width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeOpacity="0.32" />
        <text x={w / 2} y={h / 2 - 2} textAnchor="middle" fill={text} style={{ fontSize: 12, fontWeight: 600 }}>
          {title}
        </text>
        <text x={w / 2} y={h / 2 + 14} textAnchor="middle" className="fill-mute" style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace' }}>
          {sub}
        </text>
      </g>
    );
  };

  const Arrow = ({
    from, to, label, color = 'hsl(var(--ink-2))',
  }: {
    from: [number, number];
    to: [number, number];
    label: string;
    color?: string;
  }) => {
    const midX = (from[0] + to[0]) / 2;
    const midY = (from[1] + to[1]) / 2;
    return (
      <>
        <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={color} strokeWidth="1.4" strokeDasharray="3 3" />
        <text x={midX} y={midY - 4} textAnchor="middle" className="fill-mute" style={{ fontSize: 9, fontFamily: 'ui-monospace, monospace' }}>
          {label}
        </text>
      </>
    );
  };

  return (
    <FigureFrame
      caption="memory ทุกแถวอยู่ใน 1 ใน 5 สถานะ · เปลี่ยนสถานะอัตโนมัติทุกคืน"
      captionEn="Every memory row sits in one of 5 states · transitions run nightly"
      lang={lang}
    >
      <svg role="img" aria-label="memory lifecycle" viewBox="0 0 640 320" className="h-auto w-full">
        {/* Source */}
        <g transform="translate(20, 140)">
          <rect width="100" height="40" rx="10" fill="hsl(var(--paper-2))" stroke="hsl(var(--hairline))" />
          <text x="50" y="25" textAnchor="middle" className="fill-ink-2" style={{ fontSize: 12 }}>
            {labels.extracted}
          </text>
        </g>

        {/* Active (centre) */}
        <Node x={170} y={140} w={130} h={48} color="mint" title={labels.active} sub={labels.activeSub} animateOn />

        {/* Merged (top) */}
        <Node x={350} y={20}  w={130} h={48} color="mute"  title={labels.merged}       sub={labels.mergedSub} />
        {/* Contradicted (mid-right) */}
        <Node x={350} y={140} w={130} h={48} color="rose"  title={labels.contradicted} sub={labels.contradictedSub} />
        {/* Archived (bottom) */}
        <Node x={350} y={260} w={130} h={48} color="warm"  title={labels.archived}     sub={labels.archivedSub} />
        {/* Lesson (far right) */}
        <Node x={510} y={140} w={120} h={48} color="ink"   title={labels.lesson}       sub={labels.lessonSub} />

        {/* Source → Active */}
        <line x1="120" y1="160" x2="170" y2="164" stroke="hsl(var(--warm))" strokeWidth="2" strokeDasharray="3 3" className="help-fig-arrow" />

        {/* Active → Merged */}
        <Arrow from={[260, 140]} to={[400, 70]}  label={labels.tDup} />
        {/* Active → Contradicted */}
        <Arrow from={[300, 164]} to={[350, 164]} label={labels.tConflict} />
        {/* Active → Archived */}
        <Arrow from={[260, 188]} to={[400, 260]} label={labels.tStale} />
        {/* Active → Lesson (promote) */}
        <Arrow from={[300, 152]} to={[510, 156]} label={labels.tPromote} color="hsl(var(--mint))" />
      </svg>
    </FigureFrame>
  );
}

const FIGURES: Record<string, (props: { lang: 'th' | 'en' }) => React.ReactElement> = {
  'three-tier-flow': ThreeTierFlow,
  'connect-line-steps': ConnectLineSteps,
  'memory-lifecycle': MemoryLifecycle,
};

export function Figure({ name, lang }: { name: string; lang: 'th' | 'en' }) {
  const Comp = FIGURES[name];
  if (!Comp) return null;
  return <Comp lang={lang} />;
}

export const FIGURE_NAMES = Object.keys(FIGURES);
