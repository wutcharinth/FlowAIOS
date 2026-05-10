import type { ReactNode } from 'react';

/**
 * Renders both TH and EN copies as sibling spans. CSS in globals.css
 * (`html[lang="th"] .en-only` / `html[lang="en"] .th-only` → `display: none`)
 * shows only the active language. The cookie-driven <html lang> attribute
 * decides which one is visible.
 *
 * Use anywhere a `Bi` { th, en } pair from lib/marketing/data.ts is rendered.
 */
export function T({ value }: { value: { th: ReactNode; en: ReactNode } }) {
  return (
    <>
      <span className="th-only">{value.th}</span>
      <span className="en-only">{value.en}</span>
    </>
  );
}
