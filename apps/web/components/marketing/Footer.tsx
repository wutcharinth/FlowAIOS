import Link from 'next/link';
import { navLinks } from '@/lib/marketing/data';
import { T } from './lang-text';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline bg-paper py-12">
      <div className="mx-auto flex w-[min(1240px,calc(100%-48px))] flex-col items-start gap-7 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/flowaios-logo.png"
            alt=""
            aria-hidden
            width={26}
            height={26}
            className="h-[26px] w-[26px] shrink-0"
          />
          <div className="text-[13px] text-mute">
            <b className="font-medium text-ink">FlowAIOS</b>
            <span className="mx-2 text-hairline-2">·</span>
            <span className="th-only">AI OS สำหรับ Customer Operations</span>
            <span className="en-only">AI OS for Customer Operations</span>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-7 gap-y-2 text-[13px]">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-ink-2 transition-colors hover:text-warm"
            >
              <T value={label} />
            </Link>
          ))}
          <Link href="/login" className="text-ink-2 transition-colors hover:text-warm">
            <span className="th-only">เข้าสู่ระบบ</span>
            <span className="en-only">Sign in</span>
          </Link>
        </nav>

        <div className="font-mono text-[11px] tracking-[0.05em] text-mute">© {year}</div>
      </div>
    </footer>
  );
}
