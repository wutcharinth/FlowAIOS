import Link from 'next/link';
import type { Metadata } from 'next';
import { requireStaff } from '@/lib/staff/auth';

export const metadata: Metadata = {
  title: 'FlowAIOS Staff Console',
  robots: { index: false, follow: false },
};

const STAFF_NAV = [
  { href: '/staff', label: 'Overview' },
  { href: '/staff/orgs', label: 'Organizations' },
  { href: '/staff/users', label: 'Users' },
  { href: '/staff/system', label: 'System health' },
  { href: '/staff/billing', label: 'Billing' },
  { href: '/staff/feature-flags', label: 'Global flags' },
  { href: '/staff/incidents', label: 'Incidents' },
];

export const dynamic = 'force-dynamic';

export default async function StaffLayout({ children }: { children: React.ReactNode }) {
  const staff = await requireStaff();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Distinct visual treatment so staff knows they're in the cross-tenant
          console, not a merchant page. Slate header instead of paper. */}
      <header className="sticky top-0 z-20 border-b bg-[#0B1220] text-paper">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <Link href="/staff" className="flex items-center gap-2.5 font-semibold">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-paper font-mono text-[11px] font-bold text-[#0B1220]">
                F
              </span>
              FlowAIOS
              <span className="ml-1 rounded-full bg-warm/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-warm">
                Staff
              </span>
            </Link>
            <span className="text-xs text-paper/60">
              Cross-tenant · internal only
            </span>
          </div>
          <div className="flex items-center gap-3 text-[12.5px]">
            <span className="text-paper/60">{staff.email}</span>
            <Link href="/dashboard" className="text-paper/80 hover:text-paper">
              ← Merchant view
            </Link>
            <form action="/auth/sign-out" method="post">
              <button className="text-paper/80 hover:text-paper">Sign out</button>
            </form>
          </div>
        </div>
        <nav className="-mb-px flex items-center gap-1 overflow-x-auto px-6 pb-1.5 text-sm">
          {STAFF_NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex-shrink-0 rounded-md px-3 py-1.5 text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper"
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
