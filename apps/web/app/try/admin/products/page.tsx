import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

const PRODUCTS = [
  { sku: 'CB-V1',  name: 'Cleansing Balm Original',     price: 890,  inStock: true,  desc: 'paraben-free, fragrance-free' },
  { sku: 'CB-V2',  name: 'Cleansing Balm v2',           price: 890,  inStock: true,  desc: 'softer formula, paraben-free, just launched' },
  { sku: 'HB-1',   name: 'Hydra Boost Moisturizer',     price: 1290, inStock: true,  desc: 'combo skin, hyaluronic acid + ceramide' },
  { sku: 'RT-03',  name: 'Retinol 0.3% Cream',          price: 1490, inStock: false, desc: 'entry-level retinol' },
  { sku: 'VC-15',  name: 'Vitamin C Serum 15%',         price: 990,  inStock: true,  desc: 'fragrance-free' },
  { sku: 'CB-T30', name: 'Cleansing Balm Travel 30g',   price: 320,  inStock: true,  desc: 'just launched' },
];

export default function TryProductsPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Product catalog</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Products FlowAIOS can reference when answering customer questions.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">All products</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {PRODUCTS.map((p) => (
              <li
                key={p.sku}
                className="flex items-center justify-between gap-3 px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{p.name}</p>
                  <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-mono">{p.sku}</span>
                    <span>·</span>
                    <span>{p.desc}</span>
                    {!p.inStock && (
                      <span className="rounded bg-rose/10 px-1.5 py-0.5 text-rose">
                        out of stock
                      </span>
                    )}
                  </p>
                </div>
                <span className="font-mono text-sm tabular-nums">
                  {p.price.toLocaleString()} THB
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
