import Link from 'next/link';

/**
 * Reusable inline help banner for admin / merchant pages.
 *
 * Surfaces three things at the top of a page so a merchant always knows:
 *   - What this page is (one sentence).
 *   - When to use it (the trigger / the question this answers).
 *   - How to use it (a 2-3 step quickstart).
 *
 * Plus a link to the matching /help/[slug] article for the deeper read.
 *
 * Visual is intentionally subtle — soft warm background, dismissible feel
 * even though it's static. Don't compete with the page content.
 */
export function PageGuide({
  title,
  what,
  when,
  how,
  helpSlug,
}: {
  title: string;
  what: string;
  when: string;
  how: string[];
  helpSlug?: string;
}) {
  return (
    <details
      className="group rounded-lg border border-warm/20 bg-warm-soft/30 px-4 py-3 [&_summary]:list-none"
    >
      <summary className="flex cursor-pointer items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-sm">
          <span
            aria-hidden
            className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-warm/15 font-mono text-[11px] font-semibold text-warm"
          >
            ?
          </span>
          <span className="font-medium text-ink">{title}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-mute">
          <span className="font-mono uppercase tracking-widest group-open:hidden">
            show guide
          </span>
          <span className="font-mono uppercase tracking-widest hidden group-open:inline">
            hide
          </span>
          <span aria-hidden className="text-warm transition-transform group-open:rotate-180">
            ▾
          </span>
        </div>
      </summary>

      <div className="mt-4 space-y-3 text-sm">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
            What this is
          </p>
          <p className="mt-1 leading-relaxed text-ink-2">{what}</p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
            When you&rsquo;ll use it
          </p>
          <p className="mt-1 leading-relaxed text-ink-2">{when}</p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
            How to use it
          </p>
          <ol className="mt-1 space-y-1">
            {how.map((step, i) => (
              <li key={i} className="flex items-baseline gap-2 text-ink-2">
                <span className="font-mono text-[11px] text-warm">{String(i + 1).padStart(2, '0')}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {helpSlug && (
          <p className="text-xs">
            <Link
              href={`/help/${helpSlug}`}
              className="text-warm hover:underline"
            >
              Read the full {helpSlug.replace(/-/g, ' ')} guide →
            </Link>
          </p>
        )}
      </div>
    </details>
  );
}
