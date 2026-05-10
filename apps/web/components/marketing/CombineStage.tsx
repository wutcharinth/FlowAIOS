/**
 * Hero illustration: customer channels converging into a single FlowAIOS inbox.
 *
 * Six channel orbs sit at the perimeter of a rounded card; each connects to
 * the centre inbox panel by a dashed line whose stroke-dashoffset animates
 * to suggest data streaming inward. Orbs gently float on alternating phases.
 *
 * Geometry uses viewBox="0 0 100 100" with preserveAspectRatio="none" so SVG
 * line coords match the percentage-positioned orbs 1:1. Orb positions tuned
 * post-Playwright QA so none of the six overlap the centre inbox card.
 *
 * Icons are simple Lucide-style category glyphs (chat bubble, shopping bag,
 * music note, shopping cart, connection link, envelope) on brand-coloured
 * tile backgrounds — recognisable in context without copying logos.
 *
 * Static visual + CSS animations only. No JS, no client-side state.
 */

interface ChannelDef {
  key: 'line' | 'shopee' | 'tiktok' | 'lazada' | 'meta' | 'email';
  label: string;
  pos: string;
  /** Centre point in 100x100 viewBox so SVG lines align with the orb. */
  cx: number;
  cy: number;
  bg: string;
  phase: 'a' | 'b';
  icon: 'bubble' | 'bag' | 'note' | 'cart' | 'link' | 'envelope';
}

const CHANNELS: ChannelDef[] = [
  { key: 'line',    label: 'LINE OA',  pos: 'left-[6%] top-[10%]',     cx: 10, cy: 14,
    bg: '#06C755',                                                      phase: 'a', icon: 'bubble' },
  { key: 'shopee',  label: 'Shopee',   pos: 'right-[6%] top-[8%]',     cx: 90, cy: 12,
    bg: '#EE4D2D',                                                      phase: 'b', icon: 'bag' },
  { key: 'tiktok',  label: 'TikTok',   pos: 'left-[3%] top-[44%]',     cx: 7,  cy: 48,
    bg: '#0B1220',                                                      phase: 'a', icon: 'note' },
  { key: 'lazada',  label: 'Lazada',   pos: 'right-[3%] top-[42%]',    cx: 88, cy: 46,
    bg: 'linear-gradient(135deg,#0F146E 0%,#F0006A 100%)',              phase: 'b', icon: 'cart' },
  { key: 'meta',    label: 'Meta',     pos: 'left-[16%] bottom-[6%]',  cx: 20, cy: 90,
    bg: 'linear-gradient(135deg,#1877F2 0%,#C13584 60%,#F58529 100%)',  phase: 'a', icon: 'link' },
  { key: 'email',   label: 'Email',    pos: 'right-[16%] bottom-[4%]', cx: 80, cy: 92,
    bg: '#475569',                                                      phase: 'b', icon: 'envelope' },
];

interface InboxRow {
  channel: ChannelDef['key'];
  icon: ChannelDef['icon'];
  bg: string;
  name: string;
  msg: string;
  pill: 'auto' | 'approval' | 'escalate' | 'growth';
  pillLabel: string;
}

const ROWS: InboxRow[] = [
  {
    channel: 'line',
    icon: 'bubble',
    bg: '#06C755',
    name: 'อรวรรณ',
    msg: 'มี cleansing balm ใหม่ไหม. memory: paraben-free, Kerry shipper',
    pill: 'auto',
    pillLabel: 'Auto',
  },
  {
    channel: 'shopee',
    icon: 'bag',
    bg: '#EE4D2D',
    name: 'Lin Wei',
    msg: 'wholesale 50 pcs price, verify SKU + tier first',
    pill: 'approval',
    pillLabel: 'Approval',
  },
  {
    channel: 'tiktok',
    icon: 'note',
    bg: '#0B1220',
    name: '@somchai_real',
    msg: 'sentiment: negative + keyword "แจ้งความ", escalate within 5 min',
    pill: 'escalate',
    pillLabel: 'Escalate',
  },
  {
    channel: 'lazada',
    icon: 'cart',
    bg: 'linear-gradient(135deg,#0F146E 0%,#F0006A 100%)',
    name: 'Returning buyer',
    msg: 'VIP discount code, auto-rule R-008 candidate, 31 hits/30d',
    pill: 'growth',
    pillLabel: 'Growth',
  },
];

const PILL_CLASS: Record<InboxRow['pill'], string> = {
  auto: 'bg-mint-soft text-mint',
  approval: 'bg-warm-soft text-warm',
  escalate: 'bg-[#FFF1F2] text-[#BE123C]',
  growth: 'bg-[#EEF2FF] text-[#4338CA]',
};

const STAGE_CSS = `
  @keyframes flowaios-stage-float-a {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-6px); }
  }
  @keyframes flowaios-stage-float-b {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(6px); }
  }
  @keyframes flowaios-stage-dash {
    from { stroke-dashoffset: 0; }
    to   { stroke-dashoffset: -14; }
  }
  @keyframes flowaios-stage-pulse {
    0%, 100% { box-shadow: 0 0 0 0 hsl(var(--mint) / 0.55); }
    50%      { box-shadow: 0 0 0 6px hsl(var(--mint) / 0); }
  }
  .flowaios-orb-a { animation: flowaios-stage-float-a 5.5s ease-in-out infinite; }
  .flowaios-orb-b { animation: flowaios-stage-float-b 6s   ease-in-out infinite; }
  .flowaios-stage-line {
    stroke: url(#flowaios-stage-grad);
    stroke-width: 0.35;
    stroke-dasharray: 1 1.2;
    animation: flowaios-stage-dash 2.4s linear infinite;
    fill: none;
  }
  .flowaios-stage-pulse {
    animation: flowaios-stage-pulse 1.6s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .flowaios-orb-a, .flowaios-orb-b,
    .flowaios-stage-line, .flowaios-stage-pulse { animation: none !important; }
  }
`;

const INBOX_CX = 50;
const INBOX_CY = 55;

export function CombineStage() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-hairline bg-paper shadow-terminal"
      style={{ aspectRatio: '1 / 1.05' }}
    >
      <style dangerouslySetInnerHTML={{ __html: STAGE_CSS }} />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 55%, black 30%, transparent 75%)',
          maskImage:
            'radial-gradient(circle at 50% 55%, black 30%, transparent 75%)',
        }}
      />

      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 z-[1] h-full w-full"
      >
        <defs>
          <linearGradient id="flowaios-stage-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B8632A" stopOpacity="0" />
            <stop offset="50%" stopColor="#B8632A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2C8A6B" stopOpacity="0" />
          </linearGradient>
        </defs>
        {CHANNELS.map((c) => (
          <line
            key={c.key}
            x1={c.cx}
            y1={c.cy}
            x2={INBOX_CX}
            y2={INBOX_CY}
            className="flowaios-stage-line"
          />
        ))}
      </svg>

      {CHANNELS.map((ch) => (
        <div
          key={ch.key}
          aria-hidden
          className={`absolute z-[3] flex h-14 w-14 items-center justify-center rounded-2xl border border-hairline bg-paper shadow-soft ${ch.pos} ${ch.phase === 'a' ? 'flowaios-orb-a' : 'flowaios-orb-b'}`}
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md text-white"
            style={{ background: ch.bg }}
          >
            <ChannelGlyph kind={ch.icon} size={16} />
          </span>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.04em] text-mute">
            {ch.label}
          </span>
        </div>
      ))}

      <div
        className="absolute left-1/2 top-[55%] z-[4] w-[64%] min-w-[260px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-hairline bg-paper shadow-terminal"
      >
        <div className="flex items-center gap-2 border-b border-hairline bg-paper-2 px-3 py-2.5">
          <span
            className="flex h-3.5 w-3.5 items-center justify-center rounded bg-gradient-to-br from-warm to-warm-2 text-paper"
            aria-hidden
          />
          <span className="font-mono text-[12px] font-medium text-ink-2">
            flowaios.app / inbox
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] text-mint">
            <span className="flowaios-stage-pulse h-1.5 w-1.5 rounded-full bg-mint" />
            AI OS Online
          </span>
        </div>

        <ul className="m-0 list-none p-0">
          {ROWS.map((r, i) => (
            <li
              key={i}
              className="grid grid-cols-[20px_1fr_auto] items-center gap-2.5 border-b border-hairline px-3 py-2.5 last:border-b-0"
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded text-white"
                style={{ background: r.bg }}
                aria-hidden
              >
                <ChannelGlyph kind={r.icon} size={12} />
              </span>
              <div className="min-w-0">
                <div className="text-[12.5px] font-medium text-ink">
                  {r.name}
                </div>
                <div className="mt-0.5 truncate text-[11.5px] text-ink-2">
                  {r.msg}
                </div>
              </div>
              <span
                className={`rounded-full px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.04em] ${PILL_CLASS[r.pill]}`}
              >
                {r.pillLabel}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Generic category glyphs — chat bubble for messaging, shopping bag/cart for
 * marketplaces, music note for short-video, link for social, envelope for
 * email. Stroke-only so they pick up `currentColor` from the parent badge.
 */
function ChannelGlyph({
  kind,
  size,
}: {
  kind: 'bubble' | 'bag' | 'note' | 'cart' | 'link' | 'envelope';
  size: number;
}) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (kind) {
    case 'bubble':
      return (
        <svg {...props}>
          <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
        </svg>
      );
    case 'bag':
      return (
        <svg {...props}>
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    case 'note':
      return (
        <svg {...props}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case 'cart':
      return (
        <svg {...props}>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
        </svg>
      );
    case 'link':
      return (
        <svg {...props}>
          <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
          <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
        </svg>
      );
    case 'envelope':
      return (
        <svg {...props}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
  }
}
