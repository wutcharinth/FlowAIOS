import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { requireMembership } from '@/lib/auth/current-user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageGuide } from '@/components/app/page-guide';

export const dynamic = 'force-dynamic';

export default async function WebChatPage() {
  const { orgSlug, role } = await requireMembership();
  if (role !== 'owner' && role !== 'admin') redirect('/dashboard');

  const hdrs = await headers();
  const host = hdrs.get('x-forwarded-host') ?? hdrs.get('host') ?? 'flowaios.vercel.app';
  const protocol = hdrs.get('x-forwarded-proto') ?? 'https';
  const origin = `${protocol}://${host}`;
  const brandLabel = orgSlug;

  const snippet = `<script src="${origin}/widget.js"
        data-org="${orgSlug}"
        data-brand="${brandLabel}"
        data-greeting="Hi! How can we help?"
        defer></script>`;

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Web chat widget</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Drop this snippet on your website to get a chat bubble powered by FlowAIOS.
        </p>
      </div>

      <PageGuide
        title="What is the web chat widget?"
        what="A small JS embed that adds a bottom-right chat bubble to any website. When a visitor opens it, they get a FlowAIOS-powered chat — same brand voice, same KB, same memory as your LINE OA inbox."
        when="Use this if you have a website (Shopify, WordPress, Webflow, custom HTML) and want a 'web' channel alongside LINE/Shopee/etc. Visitor messages land in the same /inbox as your other channels."
        how={[
          'Copy the embed snippet below.',
          'Paste it into your website right before </body> (Shopify: Online Store → Themes → Edit code → theme.liquid; WordPress: Header & Footer plugin or theme footer.php).',
          'Refresh your site. A bubble appears in the bottom-right; click to open.',
        ]}
        helpSlug="connect-line"
      />

      <Card>
        <CardHeader>
          <CardTitle>Embed snippet</CardTitle>
          <CardDescription>Copy + paste before the closing &lt;/body&gt; tag.</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-lg bg-paper-2 p-4 font-mono text-xs leading-relaxed">
            <code>{snippet}</code>
          </pre>

          <div className="mt-4 grid gap-3 text-sm">
            <Row label="data-org" value={orgSlug} hint="The widget tags incoming messages with this slug." />
            <Row label="data-brand" value={brandLabel} hint="Shown in the chat header. Edit to your brand name." />
            <Row label="data-greeting" value="Hi! How can we help?" hint="First message the visitor sees." />
            <Row label="data-accent" value="#B8632A" hint='Optional. Bubble button color, hex.' />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Live preview</CardTitle>
          <CardDescription>
            What the chat panel looks like to your visitor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <iframe
            src={`${origin}/widget?org=${encodeURIComponent(orgSlug)}&brand=${encodeURIComponent(brandLabel)}`}
            title="Web chat preview"
            className="h-[500px] w-full rounded-xl border border-hairline"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Allowed origins</CardTitle>
          <CardDescription>
            Coming next: restrict the widget to specific domains so it can&rsquo;t be embedded
            elsewhere.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            For now the widget accepts requests from any origin. Domain allowlisting +
            per-origin rate limits ship in the next release.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

function Row({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] items-baseline gap-3">
      <code className="font-mono text-xs text-warm">{label}</code>
      <div>
        <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-xs">{value}</code>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </div>
    </div>
  );
}
