import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default function TryIntegrationsPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Integrations</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Connect channels so messages flow into FlowAIOS inbox.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            LINE OA
            <span className="rounded-full bg-mint-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-mint">
              Connected
            </span>
          </CardTitle>
          <CardDescription>
            Receive and reply to LINE Official Account messages.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="mb-1 text-xs font-medium">Webhook URL</p>
            <code className="block break-all rounded bg-background px-2 py-1 font-mono text-xs">
              https://flowaios.vercel.app/api/line/webhook
            </code>
          </div>
          <div className="text-xs text-muted-foreground">
            Bot user ID: <code className="font-mono">U7a9b8c2d3e1</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Coming soon</CardTitle>
          <CardDescription>Other channels on the roadmap.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>· Facebook Messenger</li>
            <li>· Instagram DM</li>
            <li>· TikTok Shop</li>
            <li>· Shopee Chat</li>
            <li>· Lazada Chat</li>
          </ul>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        <Link href="/help/connect-line" className="text-warm hover:underline">
          How to connect your real LINE OA in 30 minutes →
        </Link>
      </p>
    </main>
  );
}
