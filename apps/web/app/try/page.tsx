import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

const TILES: { href: string; title: string; body: string; metric: string }[] = [
  {
    href: '/try/dashboard',
    title: 'Dashboard',
    body: 'KPIs, hourly chart, channel breakdown, recent activity feed.',
    metric: '24h overview',
  },
  {
    href: '/try/inbox',
    title: 'Inbox',
    body: 'Unified conversations across LINE, Shopee, TikTok, Lazada, IG, FB, Email.',
    metric: '24 conversations',
  },
  {
    href: '/try/inbox/c-001',
    title: 'Inbox · thread view',
    body: 'AI-assisted reply composer with confidence gating + memory sidebar.',
    metric: 'Live thread',
  },
  {
    href: '/try/customers',
    title: 'Customers',
    body: 'Per-customer memory, channel IDs, conversations, tags.',
    metric: 'Cross-channel profiles',
  },
  {
    href: '/try/admin',
    title: 'Admin overview',
    body: 'Team, integrations, knowledge, products, brand voice, memory, audit.',
    metric: 'Merchant-side controls',
  },
  {
    href: '/try/admin/memory',
    title: 'Memory governance',
    body: 'Active / contradicted / merged / archived. Promote facts to lessons.',
    metric: 'Self-improving',
  },
  {
    href: '/try/admin/brand',
    title: 'Brand voice',
    body: 'Voice, formality, signature, forbidden + required phrases, emoji policy.',
    metric: 'Brand-aware AI',
  },
  {
    href: '/try/admin/knowledge',
    title: 'Knowledge base',
    body: 'FAQ, SOP, policies. Vector retrieval into every AI reply.',
    metric: '12 articles',
  },
  {
    href: '/try/admin/ai-logs',
    title: 'AI logs',
    body: 'Every reply traced — provider, latency, KB hits, memory citations.',
    metric: 'Full observability',
  },
  {
    href: '/help',
    title: '101 / Help center',
    body: 'Getting started, LINE setup, AI tuning, brand voice, memory, PDPA.',
    metric: 'Self-service docs',
  },
];

export default function TryHomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-10">
      <div className="space-y-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-warm">
          Merchant demo · no signup
        </span>
        <h1 className="display-lg max-w-[20ch] text-ink">
          Walk through every FlowAIOS surface — with{' '}
          <em className="not-italic accent-word">seeded data</em>.
        </h1>
        <p className="lead max-w-[64ch]">
          This is the same merchant experience you get after signing up — same dashboards,
          same inbox, same admin controls. The data is fictional (a Bangkok skincare brand
          named Klin Skin). Click any tile to explore. When you&rsquo;re ready,{' '}
          <Link href="/signup" className="text-warm underline-offset-4 hover:underline">
            create a real account
          </Link>{' '}
          and connect your LINE OA.
        </p>
      </div>

      {/* Tutorial / 101 callout */}
      <Card className="border-warm/30 bg-warm-soft/30">
        <CardHeader>
          <CardTitle className="text-base">Start with the 5-minute tour</CardTitle>
          <CardDescription>
            Self-paced: read each tile in order, click in, come back.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm">
            <li>
              <span className="mr-2 font-mono text-[10px] tracking-widest text-warm">01.</span>
              <Link href="/help/getting-started" className="hover:text-warm hover:underline">
                Getting started — what FlowAIOS does in 60 seconds
              </Link>
            </li>
            <li>
              <span className="mr-2 font-mono text-[10px] tracking-widest text-warm">02.</span>
              <Link href="/try/dashboard" className="hover:text-warm hover:underline">
                See the dashboard your team will live in
              </Link>
            </li>
            <li>
              <span className="mr-2 font-mono text-[10px] tracking-widest text-warm">03.</span>
              <Link href="/try/inbox/c-001" className="hover:text-warm hover:underline">
                Open a thread and watch the AI reply with KB + memory context
              </Link>
            </li>
            <li>
              <span className="mr-2 font-mono text-[10px] tracking-widest text-warm">04.</span>
              <Link href="/try/admin/memory" className="hover:text-warm hover:underline">
                Inspect memory governance — what AI keeps, forgets, promotes
              </Link>
            </li>
            <li>
              <span className="mr-2 font-mono text-[10px] tracking-widest text-warm">05.</span>
              <Link href="/help/connect-line" className="hover:text-warm hover:underline">
                Connect your real LINE OA in 30 minutes
              </Link>
            </li>
          </ol>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TILES.map((t) => (
          <Link key={t.href} href={t.href}>
            <Card className="h-full transition-colors hover:border-warm/40 hover:bg-warm-soft/30">
              <CardHeader>
                <CardTitle className="text-base">{t.title}</CardTitle>
                <CardDescription>{t.body}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-xs text-warm">{t.metric} →</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
