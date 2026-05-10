import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findArticle, CATEGORY_LABEL } from '@/lib/help/articles';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return { title: 'FlowAIOS — Help' };
  return { title: `${article.title} · FlowAIOS Help`, description: article.summary };
}

export default async function HelpArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-paper-2/40">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
            ← All articles
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-warm to-warm-2 font-mono text-[11px] font-bold text-paper">
              F
            </span>
            FlowAIOS
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-6 py-12">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-warm">
            {CATEGORY_LABEL[article.category]} · {article.readMinutes} min
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
            {article.title}
          </h1>
          <p className="mt-2 text-base text-muted-foreground">{article.summary}</p>
          {article.demoHref && (
            <Link
              href={article.demoHref}
              className="mt-4 inline-block rounded-md border border-warm/40 bg-warm-soft px-3 py-1.5 text-[12.5px] font-medium text-warm hover:bg-warm hover:text-paper"
            >
              See it live in the demo →
            </Link>
          )}
        </div>

        <article className="prose prose-sm max-w-none">
          {renderArticleBody(article.body)}
        </article>

        <div className="mt-12 rounded-lg border border-warm/30 bg-warm-soft/30 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-warm">
            Ready to ship?
          </p>
          <p className="mt-1 text-sm">
            <Link href="/signup" className="font-medium text-warm hover:underline">
              Create your workspace →
            </Link>{' '}
            or{' '}
            <Link href="/try" className="text-warm hover:underline">
              keep exploring the demo
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}

/** Tiny markdown-ish renderer: handles H1/H2/H3, lists, blockquotes, and code fences. */
function renderArticleBody(body: string): React.ReactNode {
  const lines = body.split('\n');
  const blocks: React.ReactNode[] = [];

  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i]!;

    // Code fence
    if (line.startsWith('```')) {
      const buf: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i]!.startsWith('```')) {
        buf.push(lines[i]!);
        i += 1;
      }
      i += 1;
      blocks.push(
        <pre
          key={key++}
          className="my-4 overflow-x-auto rounded-md bg-paper-2 p-3 text-xs leading-relaxed"
        >
          {buf.join('\n')}
        </pre>,
      );
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      blocks.push(
        <h3 key={key++} className="mt-6 text-base font-semibold">
          {line.slice(4)}
        </h3>,
      );
      i += 1;
      continue;
    }
    if (line.startsWith('## ')) {
      blocks.push(
        <h2 key={key++} className="mt-8 text-lg font-semibold">
          {line.slice(3)}
        </h2>,
      );
      i += 1;
      continue;
    }
    if (line.startsWith('# ')) {
      blocks.push(
        <h2 key={key++} className="mt-8 text-xl font-semibold">
          {line.slice(2)}
        </h2>,
      );
      i += 1;
      continue;
    }

    // Lists
    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i]!.startsWith('- ')) {
        items.push(lines[i]!.slice(2));
        i += 1;
      }
      blocks.push(
        <ul key={key++} className="my-3 list-disc space-y-1 pl-5 text-sm">
          {items.map((it, j) => (
            <li key={j}>{renderInline(it)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // Blockquote / callout
    if (line.startsWith('> ')) {
      blocks.push(
        <blockquote
          key={key++}
          className="my-3 border-l-2 border-warm bg-warm-soft/40 px-4 py-2 text-sm italic"
        >
          {line.slice(2)}
        </blockquote>,
      );
      i += 1;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      i += 1;
      continue;
    }

    // Paragraph (collect contiguous non-empty non-special lines)
    const para: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i]!.trim() !== '' &&
      !lines[i]!.startsWith('#') &&
      !lines[i]!.startsWith('- ') &&
      !lines[i]!.startsWith('> ') &&
      !lines[i]!.startsWith('```')
    ) {
      para.push(lines[i]!);
      i += 1;
    }
    blocks.push(
      <p key={key++} className="my-3 text-sm leading-relaxed text-ink-2">
        {renderInline(para.join(' '))}
      </p>,
    );
  }

  return <>{blocks}</>;
}

/** Render inline `code` and **bold** + naive link parsing. */
function renderInline(text: string): React.ReactNode {
  // Split on backticks first.
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith('`') && p.endsWith('`')) {
      return (
        <code
          key={i}
          className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-[12px] text-warm"
        >
          {p.slice(1, -1)}
        </code>
      );
    }
    // Handle **bold**
    const boldParts = p.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((b, j) => {
      if (b.startsWith('**') && b.endsWith('**')) {
        return (
          <strong key={`${i}-${j}`} className="font-semibold text-ink">
            {b.slice(2, -2)}
          </strong>
        );
      }
      return <span key={`${i}-${j}`}>{b}</span>;
    });
  });
}
