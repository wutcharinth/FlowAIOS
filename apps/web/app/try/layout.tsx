import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FlowAIOS — Merchant Demo',
  description:
    'Walk through every FlowAIOS surface — inbox, AI replies, memory governance, brand voice, knowledge base — with seeded data. No signup required.',
};

const TRY_NAV = [
  { href: '/try', label: 'Tour' },
  { href: '/try/dashboard', label: 'Dashboard' },
  { href: '/try/inbox', label: 'Inbox' },
  { href: '/try/customers', label: 'Customers' },
  { href: '/try/admin', label: 'Admin' },
  { href: '/help', label: '101 / Help' },
];

export default function TryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Demo banner */}
      <div className="border-b border-warm/30 bg-warm-soft/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-2 text-[12.5px] text-warm">
          <span className="font-mono uppercase tracking-[0.12em]">
            Demo mode · seeded data · no real customer chats
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-md border border-warm/40 bg-paper px-2.5 py-1 text-[11px] font-medium text-warm transition-colors hover:bg-warm hover:text-paper"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-warm px-2.5 py-1 text-[11px] font-medium text-paper transition-colors hover:bg-warm-2"
            >
              Start free
            </Link>
          </div>
        </div>
      </div>

      {/* App-shell topbar (matches the real /(app) layout) */}
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <Link
              href="/try"
              className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/flowaios-logo.png"
                alt=""
                aria-hidden
                width={24}
                height={24}
                className="h-6 w-6 shrink-0"
              />
              FlowAIOS
            </Link>
            <span className="text-sm text-muted-foreground">Demo Org</span>
          </div>
          <Link
            href="/"
            className="text-[13px] text-muted-foreground hover:text-foreground"
          >
            ← Back to homepage
          </Link>
        </div>
        <nav className="-mb-px flex items-center gap-1 overflow-x-auto px-6 pb-1.5 text-sm scrollbar-thin">
          {TRY_NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex-shrink-0 rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
