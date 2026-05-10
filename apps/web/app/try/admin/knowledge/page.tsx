import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { demoArticles } from '@/lib/demo-merchant/seed';

export const dynamic = 'force-dynamic';

export default function TryKnowledgePage() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Knowledge base</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            FAQ, SOPs, and product info FlowAIOS uses when answering customers.
          </p>
        </div>
        <button
          disabled
          className="rounded-md bg-warm/40 px-4 py-2 text-sm font-medium text-paper"
        >
          + New article
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All articles</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {demoArticles.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-accent/40"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{a.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    <span className="rounded bg-paper-2 px-1.5 py-0.5">{a.category}</span>
                  </p>
                </div>
                <time className="text-xs text-muted-foreground">
                  {new Date(a.updatedAt).toLocaleDateString()}
                </time>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        <Link href="/help/knowledge-base" className="text-warm hover:underline">
          How to write KB articles AI can actually use →
        </Link>
      </p>
    </main>
  );
}
