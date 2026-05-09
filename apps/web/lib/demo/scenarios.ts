/**
 * Interactive demo scenarios — 5 ecommerce category playgrounds.
 *
 * Each scenario boots a fictional brand store with its own catalog facts
 * and policies, then highlights a distinct AI capability that's hard to
 * deliver without context-aware retail tooling:
 *
 *   beauty       Customer memory + ingredient compatibility
 *   fashion      Stock check + size matrix + alternative cross-sell
 *   food         Real-time order tracking + mid-cook modification
 *   electronics  Spec comparison + warranty Q&A + upgrade-path advice
 *   supplements  Compliance boundary — knowing what NOT to answer
 *
 * The system prompt for each is loaded server-side by /api/demo/scenario,
 * so brand facts (SKU, prices, KB) never bloat the client bundle.
 */

export type ScenarioId =
  | 'beauty'
  | 'fashion'
  | 'food'
  | 'electronics'
  | 'supplements';

/** Icon glyph identifiers — render via the CategoryIcon component. */
export type CategoryIconKey =
  | 'sparkles'
  | 'shirt'
  | 'bowl'
  | 'monitor'
  | 'leaf';

export interface ScenarioMeta {
  id: ScenarioId;
  icon: CategoryIconKey;
  category: { th: string; en: string };
  brand: string;
  tagline: { th: string; en: string };
  capability: { th: string; en: string };
  greeting: { th: string; en: string };
  starters: ReadonlyArray<{ th: string; en: string }>;
}

export const SCENARIOS: ReadonlyArray<ScenarioMeta> = [
  {
    id: 'beauty',
    icon: 'sparkles',
    category: { th: 'Beauty / Skincare', en: 'Beauty / Skincare' },
    brand: 'Klin Skin',
    tagline: {
      th: 'สกินแคร์สำหรับผิวบอบบาง',
      en: 'Skincare for sensitive skin',
    },
    capability: {
      th: 'AI จำข้อมูลแพ้ของลูกค้า + ตรวจ ingredient ก่อนแนะนำ',
      en: 'AI remembers allergies + checks ingredient compatibility before recommending',
    },
    greeting: {
      th: 'สวัสดีค่ะ ยินดีต้อนรับสู่ Klin Skin มีอะไรให้ช่วยไหมคะ คุณเคยซื้อ Cleansing Balm Original เดือนที่แล้ว ขอจดข้อมูลผิวเพิ่มเติมเพื่อแนะนำให้แม่นยำขึ้นได้ไหมคะ',
      en: "Hi! Welcome back to Klin Skin. You bought Cleansing Balm Original last month — anything else I can help with today? Mind if I ask a couple of skin details so I can recommend more accurately?",
    },
    starters: [
      {
        th: 'ฉันแพ้ paraben — ใช้ Cleansing Balm v2 ได้ไหมคะ',
        en: "I'm allergic to paraben — can I use Cleansing Balm v2?",
      },
      {
        th: 'กินวิตามิน A อยู่ ใช้ retinol cream ตัวนี้คู่กันได้ไหม',
        en: "I take vitamin A — is your retinol cream safe alongside it?",
      },
      {
        th: 'ผิวมัน ผสมแห้ง อายุ 28 แนะนำ moisturizer ตัวไหน',
        en: 'Combo oily-dry skin, age 28 — what moisturizer would you suggest?',
      },
    ],
  },
  {
    id: 'fashion',
    icon: 'shirt',
    category: { th: 'Fashion', en: 'Fashion' },
    brand: 'Sira Studio',
    tagline: {
      th: 'แฟชั่นผู้หญิง · Made in Bangkok',
      en: "Women's fashion · Made in Bangkok",
    },
    capability: {
      th: 'AI เช็คสต็อก + size matrix + แนะนำตัวอื่นเมื่อหมด',
      en: 'AI checks live stock + size matrix + cross-sells alternatives when sold out',
    },
    greeting: {
      th: 'สวัสดีค่ะ Sira Studio มาเช็คไอเทมตัวไหนคะ พิมพ์ SKU หรือชื่อรุ่นมาได้เลย หรือบอกสไตล์ที่ต้องการให้ดิฉันแนะนำได้ค่ะ',
      en: 'Welcome to Sira Studio. Looking for a specific item? Drop the SKU or item name, or describe the style you have in mind and I can recommend.',
    },
    starters: [
      {
        th: 'มี linen blazer สี oat ไซส์ M ไหมคะ',
        en: 'Do you have the linen blazer in oat color, size M?',
      },
      {
        th: 'ส่ง Bangkok กี่วัน ส่ง Chiang Mai กี่วัน',
        en: 'How long does delivery take to Bangkok vs Chiang Mai?',
      },
      {
        th: 'นโยบายคืนสินค้าเป็นยังไงคะ ไม่พอดีไซส์',
        en: "What's the return policy if the size doesn't fit?",
      },
    ],
  },
  {
    id: 'food',
    icon: 'bowl',
    category: { th: 'Food / Delivery', en: 'Food / Delivery' },
    brand: 'Krua Mae',
    tagline: {
      th: 'อาหารไทยส่งถึงที่ · 14 สาขา',
      en: 'Thai home cooking, delivered · 14 branches',
    },
    capability: {
      th: 'AI ดูสถานะออเดอร์ real-time + รับการแก้ไขก่อนของออกครัว',
      en: 'AI tracks order status real-time + accepts modifications before kitchen-out',
    },
    greeting: {
      th: 'สวัสดีค่ะ Krua Mae มีออเดอร์ที่อยากเช็คหรือสาขาที่อยากสั่งไหมคะ ส่งเลขออเดอร์มาได้เลย หรือบอกพิกัดให้ดิฉันแนะนำสาขาใกล้ที่สุดได้ค่ะ',
      en: 'Hi from Krua Mae. Order to track or modify? Drop the order number — or share your area and I can suggest the nearest branch.',
    },
    starters: [
      {
        th: 'ออเดอร์ #3401 ถึงไหนแล้วคะ',
        en: 'Where is order #3401 right now?',
      },
      {
        th: 'ขอเปลี่ยนข้าวผัดให้ไม่เผ็ดได้ไหมคะ ออเดอร์ #3402',
        en: 'Can I change order #3402 to mild spice level?',
      },
      {
        th: 'สาขาทองหล่อปิดกี่โมง ยังสั่งทันไหม',
        en: 'What time does Thonglor branch close? Can I still order?',
      },
    ],
  },
  {
    id: 'electronics',
    icon: 'monitor',
    category: { th: 'Electronics', en: 'Electronics' },
    brand: 'Volt Hub',
    tagline: {
      th: 'อุปกรณ์ไอที + กล้อง · authorized reseller',
      en: 'Computers, cameras, audio · authorized reseller',
    },
    capability: {
      th: 'AI เปรียบเทียบสเปก + ตอบเรื่อง warranty + แนะนำ upgrade path',
      en: 'AI compares specs + answers warranty + recommends an upgrade path',
    },
    greeting: {
      th: 'สวัสดีครับ Volt Hub ถามเรื่องสเปก, ประกัน, หรือ trade-in ได้เลยครับ บอกการใช้งานหลักของเครื่องมา ผมจะแนะนำตัวที่คุ้มที่สุดให้ครับ',
      en: 'Welcome to Volt Hub. Ask about specs, warranty, or trade-in. Tell me the main use case for the gear and I can point you to the best-value pick.',
    },
    starters: [
      {
        th: 'iPad Air vs iPad Pro M4 ทำงาน design ตัวไหนคุ้มกว่า',
        en: 'iPad Air vs iPad Pro M4 — which is better value for design work?',
      },
      {
        th: 'ประกัน MacBook ครอบคลุมการตกน้ำไหมครับ',
        en: 'Does my MacBook warranty cover water damage?',
      },
      {
        th: 'มี trade-in iPhone 13 Pro ไป iPhone 15 ได้ไหม ราคาประมาณเท่าไร',
        en: 'Can I trade in iPhone 13 Pro for iPhone 15? Rough price estimate?',
      },
    ],
  },
  {
    id: 'supplements',
    icon: 'leaf',
    category: { th: 'Health Supplements', en: 'Health Supplements' },
    brand: 'Vita Bloom',
    tagline: {
      th: 'วิตามิน + อาหารเสริม · Thai FDA registered',
      en: 'Vitamins + supplements · Thai FDA registered',
    },
    capability: {
      th: 'AI รู้ว่าตอบอะไรไม่ได้ — escalate คำถามทางการแพทย์ให้เภสัชกร',
      en: "AI knows what it can't answer — escalates clinical questions to the pharmacist team",
    },
    greeting: {
      th: 'สวัสดีค่ะ Vita Bloom ถามเรื่องสินค้า, ส่วนผสม, หรือคำสั่งซื้อได้เลยค่ะ คำถามเกี่ยวกับสุขภาพเฉพาะบุคคลจะส่งต่อให้ทีมเภสัชกรดูแลโดยตรง เพื่อให้คำตอบที่ปลอดภัยและถูกต้องที่สุดค่ะ',
      en: 'Hi from Vita Bloom. Ask about products, ingredients, or orders. Anything about your specific health condition or medications goes to our pharmacist team directly so you get a safe, accurate answer.',
    },
    starters: [
      {
        th: 'ฉันมีความดันสูง กินวิตามินรวมตัวนี้ได้ไหมคะ',
        en: 'I have high blood pressure — can I take this multivitamin?',
      },
      {
        th: 'collagen ตัวนี้มีน้ำตาลกี่กรัมต่อซอง',
        en: 'How many grams of sugar per sachet in this collagen?',
      },
      {
        th: 'ส่งฟรีเมื่อสั่งครบเท่าไรคะ',
        en: "What's the free shipping threshold?",
      },
    ],
  },
];

export const SCENARIO_BY_ID = new Map(SCENARIOS.map((s) => [s.id, s]));

export function isScenarioId(v: string): v is ScenarioId {
  return SCENARIO_BY_ID.has(v as ScenarioId);
}
