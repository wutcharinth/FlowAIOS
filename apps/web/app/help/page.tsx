import Link from 'next/link';
import {
  HELP_ARTICLES,
  HELP_BY_CATEGORY,
  CATEGORY_LABEL,
} from '@/lib/help/articles';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'FlowAIOS — Help center · 101 + tutorials',
  description:
    'Self-service docs: getting started, connecting channels, AI tuning, memory governance, brand voice, PDPA.',
};

export default function HelpHomePage() {
  const categories = Object.keys(HELP_BY_CATEGORY) as (keyof typeof CATEGORY_LABEL)[];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
              Demo
            </Link>
            <Link href="/login" className="text-muted-foreground hover:text-foreground">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-warm px-3 py-1.5 text-paper transition-colors hover:bg-warm-2"
            >
              Start free
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-12 px-6 py-12">
        <div className="space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-warm">
            Help center · self-service
          </span>
          <h1 className="display-lg max-w-[24ch]">
            Everything a merchant needs to{' '}
            <em className="not-italic accent-word">run FlowAIOS solo</em>.
          </h1>
          <p className="lead max-w-[64ch]">
            {HELP_ARTICLES.length} articles. Each ≤ 5 min. Task-shaped, not policy-shaped — read the
            one that matches what you&rsquo;re trying to do.
          </p>
        </div>

        {categories.map((cat) => (
          <section key={cat} className="space-y-3">
            <h2 className="text-[13px] font-mono uppercase tracking-[0.16em] text-warm">
              {CATEGORY_LABEL[cat]}
            </h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {(HELP_BY_CATEGORY[cat] ?? []).map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/help/${a.slug}`}
                    className="block rounded-lg border bg-paper p-4 transition-colors hover:border-warm/40 hover:bg-warm-soft/30"
                  >
                    <p className="font-medium">{a.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{a.summary}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-mute">
                      {a.readMinutes} min read{a.demoHref ? ' · live demo' : ''}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="rounded-lg border border-warm/30 bg-warm-soft/30 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-warm">
            Can&rsquo;t find it?
          </p>
          <p className="mt-1 text-sm">
            Email{' '}
            <a
              href="mailto:support@flowaios.com"
              className="font-medium text-warm hover:underline"
            >
              support@flowaios.com
            </a>{' '}
            — typical response under 4 hours during BKK business days.
          </p>
        </section>
      </main>
    </div>
  );
}
