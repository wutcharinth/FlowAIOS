import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

const TEMPLATES = [
  { shortcut: 'tracking',     title: 'Send tracking link',         category: 'shipping', uses: 142, body: 'พัสดุของคุณถูกส่งแล้วค่ะ ตามได้ที่ {tracking_url}' },
  { shortcut: 'thanks',       title: 'Closing thanks',             category: 'closing',  uses: 312, body: 'ขอบคุณค่ะ มีอะไรเพิ่มเติมแจ้งได้ตลอดนะคะ' },
  { shortcut: 'refund-policy', title: 'Refund policy summary',     category: 'returns',  uses: 47,  body: 'นโยบายคืนเงิน: 14 วันจากวันรับสินค้า สินค้าต้องไม่เปิดใช้งาน' },
  { shortcut: 'vip-code',     title: 'Share VIP code REPEAT15',    category: 'promo',    uses: 88,  body: 'ใช้โค้ด REPEAT15 ลด 15% สำหรับลูกค้าซื้อซ้ำได้เลยค่ะ' },
  { shortcut: 'allergy-check', title: 'Ingredient allergy check',  category: 'product',  uses: 23,  body: 'ขออนุญาตเช็คสูตรให้นะคะ คุณลูกค้าแพ้ส่วนผสมตัวไหนคะ' },
  { shortcut: 'escalate',     title: 'Hand-off to senior',         category: 'sop',      uses: 19,  body: 'ดิฉันส่งต่อให้หัวหน้าทีมดูแลทันทีค่ะ จะติดต่อกลับภายใน 15 นาที' },
];

export default function TryTemplatesPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Reply templates</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Quick replies your team can drop in via the inbox composer. AI suggests them when
          the customer&rsquo;s question matches.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Existing templates ({TEMPLATES.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {TEMPLATES.map((t) => (
              <li key={t.shortcut} className="px-4 py-3">
                <p className="flex items-center gap-2 font-medium">
                  <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-[11px] text-warm">
                    /{t.shortcut}
                  </code>
                  {t.title}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.body}</p>
                <p className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded bg-paper-2 px-1.5 py-0.5">{t.category}</span>
                  <span>used {t.uses}×</span>
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
