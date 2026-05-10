import { redirect } from 'next/navigation';
import { requireMembership } from '@/lib/auth/current-user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageGuide } from '@/components/app/page-guide';

export const dynamic = 'force-dynamic';

const CONNECTORS = [
  {
    key: 'shopify',
    name: 'Shopify',
    blurb: 'Order lookup, fulfillment status, refund initiation, customer profile.',
    tier: 'pro',
    visibility: 'AI sees order #, items, fulfillment status, tracking, refund eligibility.',
    color: '#96BF48',
  },
  {
    key: 'woocommerce',
    name: 'WooCommerce',
    blurb: 'Order lookup, customer profile, basic fulfillment status.',
    tier: 'pro',
    visibility: 'AI sees orders, line items, customer history.',
    color: '#7F54B3',
  },
  {
    key: 'lazada',
    name: 'Lazada Open Platform',
    blurb: 'Order management + tracking + refund flows on Lazada.',
    tier: 'business',
    visibility: 'AI sees marketplace orders, return requests, customer questions in marketplace chat.',
    color: '#0F146E',
  },
  {
    key: 'shopee',
    name: 'Shopee Open API',
    blurb: 'Orders + chat + tracking + Shopee Logistics.',
    tier: 'business',
    visibility: 'Marketplace orders, returns, refund flows, fulfillment partner status.',
    color: '#EE4D2D',
  },
  {
    key: 'tiktok-shop',
    name: 'TikTok Shop API',
    blurb: 'Order + product + fulfillment events + creator chat handoff.',
    tier: 'business',
    visibility: 'Live cart, abandoned-cart, fulfillment status, product Q&A.',
    color: '#0B1220',
  },
  {
    key: 'magento',
    name: 'Magento / Adobe Commerce',
    blurb: 'Order, customer, catalog, fulfillment.',
    tier: 'enterprise',
    visibility: 'Custom field mapping; integration scope set per workspace.',
    color: '#EE672F',
  },
  {
    key: 'bigcommerce',
    name: 'BigCommerce',
    blurb: 'Order, customer, fulfillment, refund.',
    tier: 'pro',
    visibility: 'Standard order + customer scope.',
    color: '#121118',
  },
  {
    key: 'flash',
    name: 'Flash Express',
    blurb: 'Direct shipper API for tracking + delivery confirmation in TH.',
    tier: 'pro',
    visibility: 'Tracking events. Drives "where is my order" replies in real time.',
    color: '#EBA300',
  },
  {
    key: 'kerry',
    name: 'Kerry / DHL eCommerce',
    blurb: 'TH last-mile carrier integration.',
    tier: 'pro',
    visibility: 'Tracking + delivery confirmations + redelivery scheduling.',
    color: '#FF7900',
  },
];

const TIER_STYLE: Record<string, string> = {
  free: 'bg-paper-2 text-mute',
  pro: 'bg-warm-soft text-warm',
  business: 'bg-mint-soft text-mint',
  enterprise: 'bg-[#EEF2FF] text-[#4338CA]',
};

const TIER_LABEL: Record<string, string> = {
  free: 'Free',
  pro: 'Pro tier',
  business: 'Business tier',
  enterprise: 'Enterprise',
};

export default async function ConnectorsPage() {
  const { role } = await requireMembership();
  if (role !== 'owner' && role !== 'admin') redirect('/dashboard');

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Fulfillment & commerce connectors</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          When the AI can see order data, it can answer &ldquo;where is my order&rdquo; and
          &ldquo;can I refund&rdquo; without escalating. These connectors plug your commerce +
          shipping backends in.
        </p>
      </div>

      <PageGuide
        title="What are connectors?"
        what="Outbound API integrations that let FlowAIOS read (and in some cases write) data on your commerce + shipping platforms. The AI uses this data inline when answering customers — no copy-paste between systems."
        when="Connect when (a) repetitive 'where is my order' messages are a meaningful share of your inbox, or (b) you want the AI to verify SKU + stock before quoting wholesale, or (c) you handle refunds frequently and want guided flows instead of free-form replies."
        how={[
          'Click Connect on any platform you use. OAuth flow opens a popup and asks for read-only scope by default.',
          'Test the connection from the per-connector settings — sample query against a known order.',
          'Once connected, the AI auto-cites the relevant data in any thread where the customer asks about an order. You can disable per-connector at any time.',
        ]}
        helpSlug="ai-tuning"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {CONNECTORS.map((c) => (
          <Card key={c.key} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-9 w-9 items-center justify-center rounded-md font-mono text-sm font-bold text-white"
                    style={{ background: c.color }}
                  >
                    {c.name[0]}
                  </span>
                  <CardTitle className="text-base">{c.name}</CardTitle>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${TIER_STYLE[c.tier]}`}
                >
                  {TIER_LABEL[c.tier]}
                </span>
              </div>
              <CardDescription>{c.blurb}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{c.visibility}</p>
              <button
                disabled
                className="mt-4 w-full rounded-md border border-hairline bg-paper px-3 py-1.5 text-sm font-medium text-mute"
              >
                Coming soon · Connect
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Don&rsquo;t see your platform?</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          We support custom REST integrations on the Enterprise tier. Email{' '}
          <a href="mailto:partnerships@flowaios.com" className="text-warm hover:underline">
            partnerships@flowaios.com
          </a>{' '}
          with the docs URL and a one-line description of the data you want the AI to see.
        </CardContent>
      </Card>
    </main>
  );
}
