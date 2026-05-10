import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

const TILES = [
  { href: '/try/admin/team',         title: 'Team',         description: 'Members, roles, invites',                metric: '4 members' },
  { href: '/try/admin/integrations', title: 'Integrations', description: 'LINE, Messenger, Instagram',             metric: 'LINE connected' },
  { href: '/try/admin/knowledge',    title: 'Knowledge',    description: 'FAQ, SOP, product info AI references',   metric: '12 articles' },
  { href: '/try/admin/products',     title: 'Products',     description: 'Catalog AI cites in replies',            metric: '4 products' },
  { href: '/try/admin/templates',    title: 'Templates',    description: 'Quick replies for the team',             metric: '6 templates' },
  { href: '/try/admin/brand',        title: 'Brand voice',  description: 'How AI sounds to your customers',        metric: 'Configured' },
  { href: '/try/admin/memory',       title: 'Memory',       description: 'Self-improving customer memory',         metric: '184 active' },
  { href: '/try/admin/ai-logs',      title: 'AI logs',      description: 'Every reply traced + observable',        metric: '6 events / 24h' },
  { href: '/try/admin/audit',        title: 'Audit',        description: 'AI / system / user actions',             metric: 'Complete trail' },
];

export default function TryAdminPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your demo workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TILES.map((t) => (
          <Link key={t.href} href={t.href}>
            <Card className="h-full transition-colors hover:border-warm/40 hover:bg-warm-soft/30">
              <CardHeader>
                <CardTitle className="text-base">{t.title}</CardTitle>
                <CardDescription>{t.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-sm text-warm">{t.metric}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
