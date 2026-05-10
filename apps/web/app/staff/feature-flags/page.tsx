import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

const GLOBAL_FLAGS = [
  { key: 'm15', label: 'Phase 1.5 surfaces', state: 'on', description: 'Knowledge / Intelligence / Advisor / Settings nav.' },
  { key: 'memory_v2', label: 'Memory lifecycle v2', state: 'on', description: 'Confidence + use_count + dedup + score-weighted retrieval.' },
  { key: 'harness_fallback', label: 'Multi-provider fallback', state: 'on', description: 'Gemini → Claude when primary fails or safety-blocks.' },
  { key: 'chat_widget', label: 'Embeddable chat widget', state: 'beta', description: 'Public /widget/* surface for merchant websites.' },
  { key: 'fulfillment_connectors', label: 'Fulfillment connectors', state: 'gated', description: 'Shopify / WooCommerce / marketplace OAuth (Pro tier).' },
];

export default function StaffFeatureFlagsPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Global feature flags</h1>
        <p className="mt-1 text-sm text-mute">
          Per-org flags live in <code className="rounded bg-paper-2 px-1 font-mono text-xs">/admin/flags</code>. Global rollout flags live here.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Active flags</CardTitle>
          <CardDescription>
            Editable in code today; will move to a flags table in a later phase.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {GLOBAL_FLAGS.map((f) => (
              <li
                key={f.key}
                className="grid grid-cols-[1fr_auto] items-start gap-4 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium">{f.label}</p>
                  <p className="mt-0.5 text-xs text-mute">{f.description}</p>
                  <code className="mt-1 inline-block font-mono text-[10px] text-mute">
                    {f.key}
                  </code>
                </div>
                <span
                  className={`flex-shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                    f.state === 'on'
                      ? 'bg-mint-soft text-mint'
                      : f.state === 'beta'
                        ? 'bg-warm-soft text-warm'
                        : 'bg-paper-2 text-mute'
                  }`}
                >
                  {f.state}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
