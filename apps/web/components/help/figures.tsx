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

/* ---------- Figure 3: Memory lifecycle (3-outcome flow) ---------- */

function MemoryLifecycle({ lang }: { lang: 'th' | 'en' }) {
  const labels =
    lang === 'th'
      ? {
          chat: 'ลูกค้าคุย',
          saved: 'AI จำสิ่งสำคัญไว้',
          savedSub: 'เช่น “แพ้ paraben”',
          o1: 'ใช้ตอบลูกค้าครั้งหน้า',
          o1Sub: 'จำชอบ จำไม่ชอบ จำประวัติ',
          o2: 'กลายเป็นบทเรียนของทีม',
          o2Sub: 'เมื่อหลายลูกค้าพูดเรื่องเดียวกัน',
          o3: 'ลืมไปเองเมื่อเก่า',
          o3Sub: 'ถ้าไม่ใช้แล้ว หรือลูกค้าเปลี่ยนใจ',
        }
      : {
          chat: 'Customer chats',
          saved: 'AI saves a useful fact',
          savedSub: 'e.g. “allergic to paraben”',
          o1: 'Used to personalize next time',
          o1Sub: 'preferences, history, tone',
          o2: 'Becomes a team-wide lesson',
          o2Sub: 'when many customers share it',
          o3: 'Forgotten over time',
          o3Sub: 'if unused, or customer changes',
        };

  const Card = ({
    x, y, w, h, color, title, sub, animateOn,
  }: {
    x: number; y: number; w: number; h: number;
    color: 'mint' | 'warm' | 'ink' | 'mute' | 'paper';
    title: string; sub: string; animateOn?: boolean;
  }) => {
    const fill = {
      mint: 'hsl(var(--mint-soft))',
      warm: 'hsl(var(--warm-soft))',
      ink: '#EEF2FF',
      mute: 'hsl(var(--paper-2))',
      paper: 'hsl(var(--paper))',
    }[color];
    const stroke = {
      mint: 'hsl(var(--mint))',
      warm: 'hsl(var(--warm))',
      ink: '#4338CA',
      mute: 'hsl(var(--mute))',
      paper: 'hsl(var(--hairline))',
    }[color];
    const titleColor = color === 'mute' || color === 'paper' ? 'hsl(var(--ink))' : stroke;
    return (
      <g transform={`translate(${x},${y})`} className={animateOn ? 'help-fig-pulse' : ''}>
        <rect width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeOpacity="0.35" />
        <text x={w / 2} y={h / 2 - 4} textAnchor="middle" fill={titleColor} style={{ fontSize: 12.5, fontWeight: 600 }}>
          {title}
        </text>
        <text x={w / 2} y={h / 2 + 14} textAnchor="middle" className="fill-mute" style={{ fontSize: 10.5 }}>
          {sub}
        </text>
      </g>
    );
  };

  // Layout: 3 columns. Col 1 = chat, Col 2 = saved (highlighted),
  // Col 3 = stack of 3 outcome cards. Lines fan from the right edge of
  // the saved card (300, 110) to the left edge of each outcome card.
  const savedRight: [number, number] = [300, 110];

  return (
    <FigureFrame
      caption="ลูกค้าคุย → AI จำ → 3 เส้นทาง: ใช้ต่อ, กลายเป็นบทเรียน, หรือลืมไปเอง"
      captionEn="Chat → AI saves a fact → one of three paths: reused, promoted, or forgotten"
      lang={lang}
    >
      <svg role="img" aria-label="memory lifecycle" viewBox="0 0 640 240" className="h-auto w-full">
        {/* Col 1 — Customer chat */}
        <Card x={20} y={90} w={120} h={50} color="paper" title={labels.chat} sub="" />

        {/* Col 1 → Col 2 arrow */}
        <line
          x1="140" y1="115" x2="180" y2="115"
          stroke="hsl(var(--warm))" strokeWidth="2" strokeDasharray="3 3"
          className="help-fig-arrow"
        />

        {/* Col 2 — Saved (highlighted, mint) */}
        <Card x={180} y={80} w={120} h={70} color="mint" title={labels.saved} sub={labels.savedSub} animateOn />

        {/* Three branching lines from saved → outcomes */}
        {/* Top: outcome 1 — Used to personalize */}
        <path
          d={`M ${savedRight[0]} ${savedRight[1]} C 360 110, 380 30, 440 30`}
          fill="none" stroke="hsl(var(--mint))" strokeWidth="1.5" strokeDasharray="3 3"
        />
        {/* Middle: outcome 2 — Team lesson */}
        <line
          x1={savedRight[0]} y1="115" x2="440" y2="115"
          stroke="#4338CA" strokeWidth="1.5" strokeDasharray="3 3"
        />
        {/* Bottom: outcome 3 — Forgotten */}
        <path
          d={`M ${savedRight[0]} ${savedRight[1]} C 360 110, 380 200, 440 200`}
          fill="none" stroke="hsl(var(--mute))" strokeWidth="1.5" strokeDasharray="3 3"
        />

        {/* Col 3 — three stacked outcome cards */}
        <Card x={440} y={5}   w={180} h={50} color="mint" title={labels.o1} sub={labels.o1Sub} />
        <Card x={440} y={90}  w={180} h={50} color="ink"  title={labels.o2} sub={labels.o2Sub} />
        <Card x={440} y={175} w={180} h={50} color="mute" title={labels.o3} sub={labels.o3Sub} />
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
