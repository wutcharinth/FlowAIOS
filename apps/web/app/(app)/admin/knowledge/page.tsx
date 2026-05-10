import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireMembership } from '@/lib/auth/current-user';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageGuide } from '@/components/app/page-guide';

export const dynamic = 'force-dynamic';

export default async function KnowledgePage() {
  const { orgId, role } = await requireMembership();
  if (role !== 'owner' && role !== 'admin') redirect('/dashboard');

  const admin = createAdminClient();
  const { data: articles } = await admin
    .from('knowledge_articles')
    .select('id, title, category, archived, updated_at')
    .eq('org_id', orgId)
    .order('updated_at', { ascending: false })
    .limit(200);

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Knowledge base</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            FAQ, SOPs and product info FlowAIOS uses when answering customers.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/knowledge/new">+ New article</Link>
        </Button>
      </div>

      <PageGuide
        title="What is the knowledge base?"
        what="Org-specific articles FlowAIOS pulls into AI context when the customer's question matches. Embeddings are auto-generated; retrieval is vector + keyword."
        when="Add articles for any policy or product fact you'd otherwise have to teach a new agent. If the AI says 'let me check' for a question that has a clear answer in your business, you're missing a KB article."
        how={[
          'Title the article the way customers ask the question, not the way you describe it internally.',
          'Body should be task-shaped: "When customer asks X, do Y. Sample reply: …" The AI reuses sample phrasing.',
          'One topic per article. Long policies should split. 30+ articles is plenty for most brands.',
        ]}
        helpSlug="knowledge-base"
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All articles</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {!articles || articles.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No articles yet. Create one to teach FlowAIOS your business.
            </div>
          ) : (
            <ul className="divide-y">
              {articles.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/admin/knowledge/${a.id}`}
                    className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-accent"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{a.title}</p>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                        {a.category && (
                          <span className="rounded bg-paper-2 px-1.5 py-0.5">
                            {a.category}
                          </span>
                        )}
                        {a.archived && (
                          <span className="rounded bg-muted px-1.5 py-0.5">archived</span>
                        )}
                      </div>
                    </div>
                    <time className="text-xs text-muted-foreground">
                      {new Date(a.updated_at).toLocaleDateString()}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
