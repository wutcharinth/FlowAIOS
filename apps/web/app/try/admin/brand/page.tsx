import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { demoBrandVoice } from '@/lib/demo-merchant/seed';

export const dynamic = 'force-dynamic';

const v = demoBrandVoice;

export default function TryBrandPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Brand voice</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          How FlowAIOS sounds when it talks to your customers. Applied as a system layer
          before every AI reply.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Voice & tone</CardTitle>
          <CardDescription>The persona FlowAIOS speaks as.</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4 text-sm">
            <Row label="Voice" value={v.voice} />
            <Row label="Default language" value={v.language === 'th' ? 'Thai' : 'English'} />
            <Row label="Formality" value={v.formality === 'polite' ? 'Polite (ค่ะ/ครับ)' : 'Casual'} />
            <Row label="Emoji policy" value={v.emojiPolicy} />
            <Row label="Sign-off" value={v.signature} />
            <Row
              label="Required phrases"
              value={v.requiredPhrases.join(' · ')}
              hint="AI tries to use these when relevant."
            />
            <Row
              label="Forbidden phrases"
              value={v.forbiddenPhrases.join(' · ')}
              hint="AI is told never to use these."
            />
            <Row
              label="Custom instructions"
              value={v.customInstructions}
              hint="Free-form text injected into every system prompt."
            />
          </dl>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        <Link href="/help/brand-voice" className="text-warm hover:underline">
          Tips for writing a brand voice that the AI will follow consistently →
        </Link>
      </p>
    </main>
  );
}

function Row({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div>
      <dt className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm">{value || '—'}</dd>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
