import Link from 'next/link';
import { cookies } from 'next/headers';
import {
  HELP_ARTICLES,
  HELP_BY_CATEGORY,
  CATEGORY_LABEL,
  type HelpArticle,
} from '@/lib/help/articles';
import { LANG_COOKIE, readLangCookie, type Lang } from '@/lib/marketing/lang';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'FlowAIOS — Help center · 101 + tutorials',
  description:
    'Self-service docs: getting started, connecting channels, AI tuning, memory governance, brand voice, PDPA.',
};

export default async function HelpHomePage() {
  const cookieStore = await cookies();
  const lang: Lang = readLangCookie(cookieStore.get(LANG_COOKIE)?.value);
  const categories = Object.keys(HELP_BY_CATEGORY) as (keyof typeof CATEGORY_LABEL)[];

  const ui =
    lang === 'th'
      ? {
          eyebrow: 'ศูนย์ช่วยเหลือ · self-service',
          headlineA: 'ทุกอย่างที่ merchant ต้องการเพื่อ',
          headlineEm: 'ใช้งาน FlowAIOS เองได้',
          lead: (n: number) =>
            `${n} บทความ · แต่ละอันอ่าน ≤ 5 นาที เน้น "ทำอะไร" ไม่ใช่ "policy" — อ่านอันที่ตรงกับสิ่งที่คุณกำลังจะทำ`,
          minRead: 'นาที',
          liveDemo: 'มีเดโม',
          fallbackHeader: 'หาไม่เจอ?',
          fallbackBody: 'อีเมลถึง',
          fallbackTail: ' — ตอบกลับภายใน 4 ชั่วโมง วันทำการ BKK',
          demoNav: 'เดโม',
          signinNav: 'เข้าสู่ระบบ',
          startFreeNav: 'เริ่มฟรี',
        }
      : {
          eyebrow: 'Help center · self-service',
          headlineA: 'Everything a merchant needs to',
          headlineEm: 'run FlowAIOS solo',
          lead: (n: number) =>
            `${n} articles. Each ≤ 5 min. Task-shaped, not policy-shaped — read the one that matches what you're trying to do.`,
          minRead: 'min read',
          liveDemo: 'live demo',
          fallbackHeader: "Can't find it?",
          fallbackBody: 'Email ',
          fallbackTail: ' — typical response under 4 hours during BKK business days.',
          demoNav: 'Demo',
          signinNav: 'Sign in',
          startFreeNav: 'Start free',
        };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-paper-2/40">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-warm to-warm-2 font-mono text-[11px] font-bold text-paper">
              F
            </span>
            FlowAIOS
          </Link>
          <div className="flex items-center gap-3 text-[13px]">
            <Link href="/try" className="text-muted-foreground hover:text-foreground">
              {ui.demoNav}
            </Link>
            <Link href="/login" className="text-muted-foreground hover:text-foreground">
              {ui.signinNav}
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-warm px-3 py-1.5 text-paper transition-colors hover:bg-warm-2"
            >
              {ui.startFreeNav}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-12 px-6 py-12">
        <div className="space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-warm">
            {ui.eyebrow}
          </span>
          <h1 className="display-lg max-w-[24ch]">
            {ui.headlineA}{' '}
            <em className="not-italic accent-word">{ui.headlineEm}</em>.
          </h1>
          <p className="lead max-w-[64ch]">{ui.lead(HELP_ARTICLES.length)}</p>
        </div>

        {categories.map((cat) => (
          <section key={cat} className="space-y-3">
            <h2 className="text-[13px] font-mono uppercase tracking-[0.16em] text-warm">
              {CATEGORY_LABEL[cat][lang]}
            </h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {(HELP_BY_CATEGORY[cat] ?? []).map((a: HelpArticle) => (
                <li key={a.slug}>
                  <Link
                    href={`/help/${a.slug}`}
                    className="block rounded-lg border bg-paper p-4 transition-colors hover:border-warm/40 hover:bg-warm-soft/30"
                  >
                    <p className="font-medium">{a.title[lang]}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{a.summary[lang]}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-mute">
                      {a.readMinutes} {ui.minRead}
                      {a.demoHref ? ` · ${ui.liveDemo}` : ''}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="rounded-lg border border-warm/30 bg-warm-soft/30 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-warm">
            {ui.fallbackHeader}
          </p>
          <p className="mt-1 text-sm">
            {ui.fallbackBody}
            <a
              href="mailto:support@flowaios.com"
              className="font-medium text-warm hover:underline"
            >
              support@flowaios.com
            </a>
            {ui.fallbackTail}
          </p>
        </section>
      </main>
    </div>
  );
}
