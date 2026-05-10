import Link from 'next/link';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { findArticle, CATEGORY_LABEL, type BilingualString } from '@/lib/help/articles';
import { LANG_COOKIE, readLangCookie, type Lang } from '@/lib/marketing/lang';
import { Figure } from '@/components/help/figures';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return { title: 'FlowAIOS — Help' };
  return {
    title: `${article.title.en} · FlowAIOS Help`,
    description: article.summary.en,
  };
}

export default async function HelpArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const cookieStore = await cookies();
  const lang: Lang = readLangCookie(cookieStore.get(LANG_COOKIE)?.value);

  const t = (b: BilingualString) => b[lang];
  const meta =
    lang === 'th'
      ? { allArticles: '← บทความทั้งหมด', minLabel: 'นาที', readyHeader: 'พร้อมเริ่มใช้?', signupCta: 'สร้าง workspace →', orCta: 'ดูเดโมต่อ', seeLive: 'ดูจริงในเดโม →' }
      : { allArticles: '← All articles', minLabel: 'min', readyHeader: 'Ready to ship?', signupCta: 'Create your workspace →', orCta: 'keep exploring the demo', seeLive: 'See it live in the demo →' };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-paper-2/40">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
            {meta.allArticles}
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
            {t(CATEGORY_LABEL[article.category])} · {article.readMinutes} {meta.minLabel}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
            {t(article.title)}
          </h1>
          <p className="mt-2 text-base text-muted-foreground">{t(article.summary)}</p>
          {article.demoHref && (
            <Link
              href={article.demoHref}
              className="mt-4 inline-block rounded-md border border-warm/40 bg-warm-soft px-3 py-1.5 text-[12.5px] font-medium text-warm hover:bg-warm hover:text-paper"
            >
              {meta.seeLive}
            </Link>
          )}
        </div>

        <article className="prose prose-sm max-w-none">
          {renderArticleBody(t(article.body), lang)}
        </article>

        <div className="mt-12 rounded-lg border border-warm/30 bg-warm-soft/30 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-warm">
            {meta.readyHeader}
          </p>
          <p className="mt-1 text-sm">
            <Link href="/signup" className="font-medium text-warm hover:underline">
              {meta.signupCta}
            </Link>{' '}
            ·{' '}
            <Link href="/try" className="text-warm hover:underline">
              {meta.orCta}
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}

/**
 * Markdown-ish renderer with figure-embed support.
 *
 *   <Figure name="three-tier-flow" />
 *
 * lines on their own become an inline <Figure /> component.
 */
function renderArticleBody(body: string, lang: Lang): React.ReactNode {
  const lines = body.split('\n');
  const blocks: React.ReactNode[] = [];

  let i = 0;
  let key = 0;
  const figureRe = /^<Figure\s+name="([^"]+)"\s*\/>$/;

  while (i < lines.length) {
    const line = lines[i]!;

    const figureMatch = line.trim().match(figureRe);
    if (figureMatch) {
      blocks.push(<Figure key={key++} name={figureMatch[1]!} lang={lang} />);
      i += 1;
      continue;
    }

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

    if (line.trim() === '') {
      i += 1;
      continue;
    }

    const para: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i]!.trim() !== '' &&
      !lines[i]!.startsWith('#') &&
      !lines[i]!.startsWith('- ') &&
      !lines[i]!.startsWith('> ') &&
      !lines[i]!.startsWith('```') &&
      !figureRe.test(lines[i]!.trim())
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

function renderInline(text: string): React.ReactNode {
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
