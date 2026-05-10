// All marketing copy lives here, bilingual TH/EN. Sourced verbatim from
// crmos360-homepage-demo.html for TH (kept as the canonical IA + copy
// reference); EN is editorial, not literal. Keep this file flat —
// components import only what they need.

export type Bi = { th: string; en: string };

// ── Channels (hero scene + channel strip) ─────────────────────────────────────
interface Channel { key: string; name: string; count: number; active?: boolean }
export const channels: ReadonlyArray<Channel> = [
  { key: 'line',     name: 'LINE',    count: 8, active: true },
  { key: 'tiktok',   name: 'TikTok',  count: 5 },
  { key: 'shopee',   name: 'Shopee',  count: 4 },
  { key: 'lazada',   name: 'Lazada',  count: 3 },
  { key: 'facebook', name: 'Meta',    count: 6 },
  { key: 'email',    name: 'Email',   count: 2 },
];

export const channelStripBrands = [
  'LINE OA',
  'TikTok Shop',
  'Shopee',
  'Lazada',
  'Facebook',
  'Instagram',
  'Email',
] as const;

// ── Hero conversation list (mock UI) ─────────────────────────────────────────
export type ThreadTag = 'Auto' | 'Review' | 'Escalate' | 'Growth';
interface HeroThread {
  sender: Bi;
  body: Bi;
  tag: ThreadTag;
  hot?: boolean;
}
export const heroThreads: ReadonlyArray<HeroThread> = [
  {
    sender: { th: 'คุณพิมพ์พร · LINE OA', en: 'Khun Pimporn · LINE OA' },
    body: {
      th: 'ถามเลข tracking ของออเดอร์ล่าสุด ระบบเช็กข้อมูลและตอบได้ทันที',
      en: 'Asking for latest tracking number — system checked the OMS and replied instantly.',
    },
    tag: 'Auto',
    hot: true,
  },
  {
    sender: { th: 'TikTok Shop Buyer', en: 'TikTok Shop Buyer' },
    body: {
      th: 'ลูกค้าขอเปลี่ยนสินค้า AI ร่างคำตอบพร้อมขั้นตอนให้ทีมอนุมัติ',
      en: 'Exchange request — AI drafted the reply + steps for the team to approve.',
    },
    tag: 'Review',
  },
  {
    sender: { th: 'Shopee Complaint', en: 'Shopee Complaint' },
    body: {
      th: 'ลูกค้าไม่พอใจเรื่องจัดส่งล่าช้า ส่งต่อหัวหน้าทีมพร้อมสรุปเคส',
      en: 'Late-delivery complaint — escalated to lead with case summary.',
    },
    tag: 'Escalate',
  },
  {
    sender: { th: 'Instagram Lead', en: 'Instagram Lead' },
    body: {
      th: 'AI แนะนำสินค้าที่เกี่ยวข้องและคูปองสำหรับ follow-up',
      en: 'AI suggested related products + a follow-up coupon.',
    },
    tag: 'Growth',
  },
];

// ── Hero promises ────────────────────────────────────────────────────────────
export const heroPromises = [
  {
    th: 'ตอบคำถามซ้ำ ๆ ให้เอง',
    en: 'Answers repetitive questions automatically',
  },
  {
    th: 'ให้ทีมอนุมัติเมื่อ AI ยังไม่ชัวร์',
    en: 'Asks for approval when AI is not sure',
  },
  {
    th: 'จำลูกค้า ประวัติแชท และโทนแบรนด์',
    en: 'Remembers customers, chat history, and brand tone',
  },
  {
    th: 'รวมทุกช่องทางขายไว้ในที่เดียว',
    en: 'Brings every sales channel into one inbox',
  },
] as const;

// ── AI OS Principles ─────────────────────────────────────────────────────────
export const principles = [
  {
    n: '01',
    title: 'Observe',
    body: {
      th: 'รวมแชท ออเดอร์ customer profile และ activity จากทุกช่องทางไว้ในมุมมองเดียว',
      en: 'Unify chats, orders, customer profiles, and activity from every channel into one view.',
    },
  },
  {
    n: '02',
    title: 'Understand',
    body: {
      th: 'AI วิเคราะห์ intent, sentiment, urgency, customer history และ business rules ก่อนแนะนำคำตอบ',
      en: 'AI analyzes intent, sentiment, urgency, customer history, and business rules before suggesting a reply.',
    },
  },
  {
    n: '03',
    title: 'Act',
    body: {
      th: 'ให้ AI ตอบเอง รออนุมัติ สร้าง ticket เช็กออเดอร์ เรียก API หรือส่งต่อทีมที่เกี่ยวข้อง',
      en: 'Let AI reply on its own, hold for approval, create a ticket, check orders, call APIs, or hand off to the right team.',
    },
  },
  {
    n: '04',
    title: 'Learn',
    body: {
      th: 'เรียนรู้จากคำตอบที่ทีมแก้ไข เคสที่ถูก escalate และ lesson ที่ manager อนุมัติ — memory ที่ใช้บ่อย confidence จะสูงขึ้น ที่ขัดแย้งจะถูก supersede อัตโนมัติ',
      en: 'Learns from team edits, escalated cases, and manager-approved lessons — frequently used memories gain confidence; contradicted ones are superseded automatically.',
    },
  },
] as const;

// ── AI Agents (tabbed) ───────────────────────────────────────────────────────
export type AgentKey = 'service' | 'ops' | 'growth';

export interface AgentSpec {
  key: AgentKey;
  num: string;
  title: string;
  subtitle: Bi;
  state: string;
  shortLabel: Bi;
  heading: Bi;
  description: Bi;
  capabilities: ReadonlyArray<readonly [string, Bi]>;
  mini: ReadonlyArray<readonly [Bi, Bi]>;
}

export const agents: ReadonlyArray<AgentSpec> = [
  {
    key: 'service',
    num: '01 / Service',
    title: 'Customer Service Agent',
    subtitle: {
      th: 'AI ตัวหลักสำหรับดูแลลูกค้าทุกช่องทาง',
      en: 'The primary AI for customer care across every channel.',
    },
    state: 'Main Character',
    shortLabel: {
      th: 'ตัวหลักสำหรับตอบลูกค้า จำบริบท และจัดการเคสประจำวัน',
      en: 'Lead agent for replies, context recall, and day-to-day case handling.',
    },
    heading: {
      th: 'ตอบลูกค้าเร็วขึ้น โดยยังรักษาคุณภาพและบริบทของแบรนด์',
      en: 'Faster replies — without losing brand quality or context.',
    },
    description: {
      th: 'Customer Service Agent ช่วยตอบคำถาม แนะนำคำตอบ สรุปบทสนทนา วิเคราะห์ intent ตรวจจับ sentiment แปลภาษา จดจำบริบทลูกค้า และแจ้งเตือนเมื่อควรส่งต่อให้มนุษย์',
      en: 'The Customer Service Agent answers questions, suggests replies, summarizes threads, analyzes intent, detects sentiment, translates, remembers customer context, and flags when a human should take over.',
    },
    capabilities: [
      ['Auto Reply', { th: 'ตอบคำถามที่ปลอดภัยและเกิดซ้ำได้ทันที', en: 'Replies to safe, recurring questions instantly.' }],
      ['Approval Draft', { th: 'ร่างคำตอบให้ทีมตรวจในเคสสำคัญ', en: 'Drafts replies for the team to review on important cases.' }],
      ['Customer Memory', { th: 'จำประวัติ ความสนใจ และปัญหาเดิม', en: 'Remembers history, interests, and prior issues.' }],
      ['Sentiment & Intent', { th: 'รู้ว่าลูกค้ากำลังถามอะไรและรู้สึกอย่างไร', en: 'Reads what the customer is asking and how they feel.' }],
    ],
    mini: [
      [
        { th: 'เหมาะกับ', en: 'Best for' },
        { th: 'LINE OA, TikTok Shop, Shopee, Lazada, Facebook, Instagram และ Email', en: 'LINE OA, TikTok Shop, Shopee, Lazada, Facebook, Instagram, and Email.' },
      ],
      [
        { th: 'ตัวอย่างเคส', en: 'Example cases' },
        { th: 'ถามสินค้า โปรโมชั่น ค่าจัดส่ง วิธีชำระเงิน และ complaint เบื้องต้น', en: 'Product questions, promotions, shipping fees, payment methods, and first-line complaints.' },
      ],
      [
        { th: 'ผลลัพธ์', en: 'Outcome' },
        { th: 'ลดเวลาตอบซ้ำ ทำให้ agent ใหม่ตอบได้เหมือนคนมีประสบการณ์', en: 'Cuts repeat-reply time so new agents respond like experienced ones.' },
      ],
    ],
  },
  {
    key: 'ops',
    num: '02 / Operations',
    title: 'Operations Agent',
    subtitle: {
      th: 'AI ที่เปลี่ยนข้อความลูกค้าให้กลายเป็นงานหลังบ้าน',
      en: 'The AI that turns customer messages into back-office work.',
    },
    state: 'Action Engine',
    shortLabel: {
      th: 'เชื่อมแชทกับออเดอร์ ticket API workflow และทีมหลังบ้าน',
      en: 'Connects chats with orders, tickets, APIs, workflows, and back-office teams.',
    },
    heading: {
      th: 'จากคำถามลูกค้าไปสู่ออเดอร์ ticket API และ workflow',
      en: 'From customer question to order, ticket, API call, and workflow.',
    },
    description: {
      th: 'Operations Agent ช่วยตรวจสอบข้อมูล สร้าง ticket assign งาน เรียก API ส่ง webhook แจ้งทีมภายใน หรือ trigger workflow เมื่อลูกค้าถามเรื่องออเดอร์ การจัดส่ง refund return คูปอง หรือปัญหาหลังการขาย',
      en: 'The Operations Agent verifies data, creates tickets, assigns work, calls APIs, sends webhooks, notifies internal teams, and triggers workflows when customers ask about orders, shipping, refunds, returns, coupons, or post-sale issues.',
    },
    capabilities: [
      ['Order Lookup', { th: 'ตรวจสอบสถานะออเดอร์และเลข tracking', en: 'Checks order status and tracking numbers.' }],
      ['Workflow Trigger', { th: 'สร้าง ticket, assign งาน และแจ้งทีม', en: 'Creates tickets, assigns work, notifies the team.' }],
      ['API & Webhook', { th: 'เชื่อมต่อระบบหลังบ้านและ marketplace', en: 'Connects to back-office systems and marketplaces.' }],
      ['Return & Refund', { th: 'จัดการขั้นตอนคืนสินค้าและ complaint', en: 'Handles return flows and complaints.' }],
    ],
    mini: [
      [
        { th: 'เหมาะกับ', en: 'Best for' },
        { th: 'ทีม support, operation, warehouse และผู้จัดการร้านค้า', en: 'Support, ops, warehouse teams, and store managers.' },
      ],
      [
        { th: 'ตัวอย่างเคส', en: 'Example cases' },
        { th: 'เช็กพัสดุ ขอคืนสินค้า ส่งคูปอง เปลี่ยนที่อยู่ หรือแจ้งปัญหาจัดส่ง', en: 'Track shipments, return requests, send coupons, change addresses, report delivery issues.' },
      ],
      [
        { th: 'ผลลัพธ์', en: 'Outcome' },
        { th: 'AI ไม่ได้แค่ตอบ แต่ช่วยทำงานต่อจากบทสนทนาได้จริง', en: 'AI doesn’t just reply — it actually does the work that follows the conversation.' },
      ],
    ],
  },
  {
    key: 'growth',
    num: '03 / Growth',
    title: 'Growth Agent',
    subtitle: {
      th: 'AI ที่เปลี่ยนบทสนทนาให้เป็นโอกาสทางรายได้',
      en: 'The AI that turns conversations into revenue opportunities.',
    },
    state: 'Revenue Intelligence',
    shortLabel: {
      th: 'แนะนำสินค้า โปรโมชั่น follow-up และ insight เพื่อเพิ่มรายได้',
      en: 'Suggests products, promos, follow-ups, and insights to lift revenue.',
    },
    heading: {
      th: 'หาโอกาสขายจากคำถาม ความสนใจ และพฤติกรรมลูกค้า',
      en: 'Find sales opportunities in questions, interests, and customer behavior.',
    },
    description: {
      th: 'Growth Agent วิเคราะห์ความสนใจ คำถามซ้ำ พฤติกรรมลูกค้า และข้อมูลจาก marketplace เพื่อแนะนำสินค้า โปรโมชั่น upsell cross-sell follow-up และ content ที่ควรปรับปรุง',
      en: 'The Growth Agent analyzes interests, recurring questions, customer behavior, and marketplace data to suggest products, promos, upsell, cross-sell, follow-ups, and content worth improving.',
    },
    capabilities: [
      ['Product Recommendation', { th: 'แนะนำสินค้าที่เหมาะกับบริบทลูกค้า', en: 'Recommends products that fit the customer’s context.' }],
      ['Promotion Suggestion', { th: 'เสนอคูปองหรือโปรโมชันที่มีโอกาสปิดการขาย', en: 'Offers coupons or promos with a real chance of closing.' }],
      ['Follow-up Signal', { th: 'ตรวจจับลูกค้าที่สนใจแต่ยังไม่ซื้อ', en: 'Spots interested customers who haven’t bought yet.' }],
      ['Content Insight', { th: 'แนะนำ FAQ และ product content ที่ควรเพิ่ม', en: 'Suggests FAQs and product content worth adding.' }],
    ],
    mini: [
      [
        { th: 'เหมาะกับ', en: 'Best for' },
        { th: 'ecommerce, social commerce, marketplace seller และ brand team', en: 'Ecommerce, social commerce, marketplace sellers, and brand teams.' },
      ],
      [
        { th: 'ตัวอย่างเคส', en: 'Example cases' },
        { th: 'ลูกค้าถามสินค้าซ้ำ เปรียบเทียบรุ่น สนใจแต่ยังไม่จ่าย หรือถามโปรโมชัน', en: 'Repeat product questions, model comparisons, interested-but-unpaid, promo inquiries.' },
      ],
      [
        { th: 'ผลลัพธ์', en: 'Outcome' },
        { th: 'ทำให้แชทลูกค้าเป็นแหล่ง insight สำหรับ sales และ marketing', en: 'Turns the inbox into a real insight source for sales and marketing.' },
      ],
    ],
  },
];

// ── Autopilot modes ──────────────────────────────────────────────────────────
interface AutopilotMode {
  title: string;
  label: string;
  body: Bi;
  bullets: ReadonlyArray<Bi>;
  highlight?: boolean;
}
export const autopilotModes: ReadonlyArray<AutopilotMode> = [
  {
    title: 'Auto-Reply Mode',
    label: 'High Confidence',
    body: {
      th: 'สำหรับคำถามที่ปลอดภัย เกิดซ้ำ และข้อมูลครบถ้วน AI สามารถตอบลูกค้าได้ทันทีเพื่อลดเวลารอ',
      en: 'For safe, recurring questions with complete data — AI replies instantly so customers don’t wait.',
    },
    bullets: [
      { th: 'เวลาเปิดปิดและค่าจัดส่ง', en: 'Hours and shipping fees' },
      { th: 'โปรโมชั่นและวิธีชำระเงิน', en: 'Promotions and payment methods' },
      { th: 'เช็กสถานะออเดอร์และเลขพัสดุ', en: 'Order status and tracking numbers' },
      { th: 'FAQ ทั่วไปของสินค้าและบริการ', en: 'General product and service FAQs' },
    ],
    highlight: true,
  },
  {
    title: 'Approval Mode',
    label: 'Human Review',
    body: {
      th: 'สำหรับเคสสำคัญ AI จะร่างคำตอบพร้อมเหตุผลให้ทีมตรวจสอบก่อนส่งจริง',
      en: 'For important cases — AI drafts a reply with reasoning so the team can review before sending.',
    },
    bullets: [
      { th: 'refund, return และ complaint', en: 'Refunds, returns, complaints' },
      { th: 'ลูกค้าไม่พอใจหรือเคส VIP', en: 'Unhappy customers or VIP cases' },
      { th: 'คำถามที่มีผลต่อยอดขายสูง', en: 'High-revenue questions' },
      { th: 'policy exception หรือ AI ยังไม่มั่นใจ', en: 'Policy exceptions or low-confidence cases' },
    ],
  },
  {
    title: 'Escalation Mode',
    label: 'Human Care',
    body: {
      th: 'สำหรับเคสซับซ้อนหรือเสี่ยง AI จะไม่ตอบเอง แต่สรุปบริบทและส่งต่อให้คนที่เหมาะสม',
      en: 'For complex or risky cases — AI doesn’t reply, but summarizes context and routes to the right person.',
    },
    bullets: [
      { th: 'ข้อพิพาทการชำระเงิน', en: 'Payment disputes' },
      { th: 'ลูกค้าขู่รีวิวเสียหาย', en: 'Customers threatening damaging reviews' },
      { th: 'ข้อมูลไม่ครบหรือความเสี่ยงด้านแบรนด์', en: 'Incomplete data or brand-risk situations' },
      { th: 'เคสที่ควรให้หัวหน้าทีมดูแล', en: 'Cases that should go to a team lead' },
    ],
  },
];

// ── Backoffice — Configuration Advisor recommendations + cards ───────────────
export const recommendations = [
  {
    title: {
      th: 'เปิด Auto Reply สำหรับ tracking request',
      en: 'Enable auto-reply for tracking requests',
    },
    badge: 'auto' as const,
    badgeLabel: '91% confidence',
    body: {
      th: 'ใน 7 วันที่ผ่านมา ทีมอนุมัติคำตอบประเภทนี้ 124 ครั้ง และแก้ไขน้อยกว่า 3% แนะนำให้เปิด auto-reply เมื่อ order API ส่งข้อมูลครบถ้วน',
      en: 'In the last 7 days the team approved 124 replies of this type with under 3% edits. Recommend enabling auto-reply when the order API returns complete data.',
    },
    actions: ['Approve', 'Review rule'],
  },
  {
    title: {
      th: 'เพิ่ม escalation rule สำหรับ complaint จาก Shopee',
      en: 'Add an escalation rule for Shopee complaints',
    },
    badge: 'review' as const,
    badgeLabel: 'Review',
    body: {
      th: 'เคส complaint จาก Shopee มี sentiment ลบสูงกว่าช่องทางอื่น 28% แนะนำให้ส่งต่อหัวหน้าทีมเมื่อมีคำว่า "คืนเงิน" หรือ "รีวิว"',
      en: 'Shopee complaints show 28% higher negative sentiment than other channels. Recommend escalating to a team lead when "refund" or "review" appears.',
    },
    actions: ['Approve', 'Edit trigger'],
  },
  {
    title: {
      th: 'เพิ่ม FAQ เรื่องคูปอง TikTok Shop',
      en: 'Add an FAQ for TikTok Shop coupons',
    },
    badge: 'neutral' as const,
    badgeLabel: 'Knowledge',
    body: {
      th: 'ลูกค้าถามเรื่องใช้คูปองไม่ได้ซ้ำ 46 ครั้งในเดือนนี้ แนะนำให้เพิ่ม policy และตัวอย่างคำตอบลง knowledge base',
      en: 'Customers asked about coupon failures 46 times this month. Recommend adding a policy and sample reply to the knowledge base.',
    },
    actions: ['Add lesson', 'Preview answer'],
  },
] as const;

export const backofficeCards = [
  {
    title: { th: 'AI Setup Assistant', en: 'AI Setup Assistant' },
    body: {
      th: 'เริ่มต้นจากประเภทธุรกิจ ช่องทางที่ใช้ นโยบายจัดส่ง นโยบายคืนสินค้า tone of voice และ workflow ที่ควรเปิดก่อน',
      en: 'Start from business type, channels in use, shipping policy, return policy, tone of voice, and which workflows to enable first.',
    },
    bullets: [
      { th: 'ไม่ต้องเริ่มจากหน้าจอว่าง', en: 'No blank-screen cold start' },
      { th: 'ไม่ต้องเขียน rule ซับซ้อนเองทั้งหมด', en: 'No need to write every complex rule yourself' },
      { th: 'เหมาะกับทีมธุรกิจ ไม่ใช่เฉพาะทีมเทคนิค', en: 'Designed for business teams, not just tech teams' },
    ],
  },
  {
    title: {
      th: 'AI Workflow Builder จากภาษาคน',
      en: 'AI Workflow Builder from natural language',
    },
    body: {
      th: 'บอกระบบด้วยภาษาธรรมชาติ เช่น "ถ้าลูกค้าถามออเดอร์ ให้เช็กสถานะก่อน แล้วตอบพร้อมเลข tracking"',
      en: 'Describe the workflow in plain language — e.g. "If a customer asks about an order, check status first, then reply with the tracking number."',
    },
    bullets: [
      { th: 'AI แปลงเป็น workflow ให้ตรวจสอบ', en: 'AI converts it into a workflow you can review' },
      { th: 'แก้ trigger, condition และ action ได้ก่อนใช้งานจริง', en: 'Edit trigger, condition, and action before it goes live' },
      { th: 'รองรับ API, webhook, ticket และ internal routing', en: 'Supports APIs, webhooks, tickets, and internal routing' },
    ],
  },
  {
    title: { th: 'AI Maintenance', en: 'AI Maintenance' },
    body: {
      th: 'ระบบตรวจจับว่าอะไรควรปรับ เช่น คำตอบที่ agent แก้บ่อย เคสที่ควรเปลี่ยนเป็น auto-reply หรือ policy ที่ควรเพิ่มใน knowledge base',
      en: 'The system flags what should change — replies agents edit often, cases ready for auto-reply, or policies the knowledge base is missing.',
    },
    bullets: [],
  },
] as const;

// ── Self-improving AI ────────────────────────────────────────────────────────
export const knowledgeBaseItems: ReadonlyArray<Bi> = [
  { th: 'รายละเอียดสินค้า ราคา โปรโมชั่น และ FAQ', en: 'Product details, pricing, promotions, and FAQs' },
  { th: 'นโยบายจัดส่ง คืนสินค้า refund และ marketplace rules', en: 'Shipping, return, and refund policies — plus marketplace rules' },
  { th: 'น้ำเสียงของแบรนด์ วิธีรับมือ complaint และ escalation policy', en: 'Brand voice, complaint handling, and escalation policy' },
  { th: 'ข้อมูลบริการ แพ็กเกจ คำถามคลินิก หรือคำถามเฉพาะธุรกิจ', en: 'Services, packages, clinical questions, or business-specific FAQs' },
];

export const lessonItems: ReadonlyArray<Bi> = [
  { th: 'ถ้าลูกค้าถามเรื่องส่งช้า ให้ขอโทษก่อน แล้วค่อยแจ้ง tracking', en: 'If a customer asks about late delivery, apologize first, then share the tracking number.' },
  { th: 'ถ้าสินค้าหมด ให้แนะนำรุ่นใกล้เคียงพร้อมคูปอง', en: 'If a product is sold out, recommend a similar option with a coupon.' },
  { th: 'ถ้าลูกค้าขอ refund จาก Shopee ให้ส่งขั้นตอนตาม policy marketplace', en: 'If a Shopee refund is requested, send the marketplace policy steps.' },
  { th: 'ถ้าลูกค้าบ่นซ้ำเกิน 2 ครั้ง ให้ escalate ให้หัวหน้าทีม', en: 'If a customer complains more than twice, escalate to a team lead.' },
];

export const memoryLifecycleItems: ReadonlyArray<Bi> = [
  { th: 'จดเฉพาะข้อมูลที่ confidence ≥ 0.5 — ที่เหลือไม่เก็บ', en: 'Only stores facts with confidence ≥ 0.5 — the rest is dropped.' },
  { th: 'memory ที่ใช้บ่อย score สูงขึ้น เด้งขึ้นมาก่อนเสมอ', en: 'Frequently used memories score higher and surface first.' },
  { th: 'ข้อมูลใหม่ขัดกับเก่า → AI judge แล้ว supersede อัตโนมัติ', en: 'New facts that contradict old ones are judged and superseded automatically.' },
  { th: 'รายการเกือบเหมือนกัน (cosine ≥ 0.92) ถูก dedup เป็น merged', en: 'Near-duplicates (cosine ≥ 0.92) are deduped into a single merged entry.' },
  { th: 'ไม่ถูกใช้ 60 วัน + confidence ต่ำ → archived ออกจาก context', en: 'Unused for 60 days with low confidence → archived out of context.' },
  { th: 'ข้อเท็จจริงที่ซ้ำใน ≥ 4 ลูกค้า → promote เป็น lesson ระดับองค์กร', en: 'Facts repeated across ≥ 4 customers are promoted to org-level lessons.' },
];

export const harnessItems: ReadonlyArray<Bi> = [
  { th: 'trace_id ทุก reply เพื่อ debug ตั้งแต่ context retrieval ถึงคำตอบ', en: 'trace_id on every reply — debug from retrieval through final answer.' },
  { th: 'fallback อัตโนมัติ Gemini → Claude เมื่อ provider หลักล่ม', en: 'Automatic fallback Gemini → Claude when the primary provider fails.' },
  { th: 'confidence gate: auto / approval / escalate ตาม sentiment + keyword', en: 'Confidence gate: auto / approval / escalate based on sentiment + keywords.' },
  { th: 'history compression: บทสนทนายาว AI สรุป turn เก่าก่อนใช้ context', en: 'History compression: long threads are summarized before going into context.' },
  { th: 'ai_logs บันทึก kb_hits, memory_hits, provider, latency ทุกครั้ง', en: 'ai_logs records kb_hits, memory_hits, provider, and latency on every call.' },
];

// ── Features ─────────────────────────────────────────────────────────────────
export const features = [
  {
    n: '01',
    title: { th: 'Unified Commerce Inbox', en: 'Unified Commerce Inbox' },
    body: {
      th: 'รวมข้อความจาก LINE OA, TikTok Shop, Shopee, Lazada, Facebook, Instagram และ Email พร้อม filter, search, unread tracking, assignment และ tags',
      en: 'Unifies messages from LINE OA, TikTok Shop, Shopee, Lazada, Facebook, Instagram, and Email — with filters, search, unread tracking, assignment, and tags.',
    },
  },
  {
    n: '02',
    title: { th: 'AI Customer Memory', en: 'AI Customer Memory' },
    body: {
      th: 'จดจำประวัติลูกค้า ความสนใจ sentiment notes tags ปัญหาเดิม และข้อมูลสำคัญจากทุกบทสนทนา',
      en: 'Remembers history, interests, sentiment notes, tags, prior issues, and important facts across every conversation.',
    },
  },
  {
    n: '03',
    title: { th: 'AI Reply & Auto Reply', en: 'AI Reply & Auto Reply' },
    body: {
      th: 'ให้ AI ตอบเองในเคสที่มั่นใจ ร่างคำตอบในเคสสำคัญ และส่งต่อทีมเมื่อมีความเสี่ยง',
      en: 'AI replies on its own when confident, drafts when it matters, and escalates to the team when risk is detected.',
    },
  },
  {
    n: '04',
    title: { th: 'Order & Workflow Actions', en: 'Order & Workflow Actions' },
    body: {
      th: 'เชื่อม conversation กับ action เช่น เช็กออเดอร์ สร้าง ticket ส่งคูปอง เรียก API หรือแจ้งทีมภายใน',
      en: 'Connects conversations to actions: check orders, create tickets, send coupons, call APIs, or notify internal teams.',
    },
  },
  {
    n: '05',
    title: { th: 'Growth Suggestions', en: 'Growth Suggestions' },
    body: {
      th: 'แนะนำสินค้า โปรโมชั่น follow-up upsell cross-sell และ content ที่ควรปรับปรุงจากคำถามของลูกค้า',
      en: 'Suggests products, promos, follow-ups, upsell, cross-sell, and content worth improving — drawn from real customer questions.',
    },
  },
  {
    n: '06',
    title: { th: 'Intelligence Dashboard', en: 'Intelligence Dashboard' },
    body: {
      th: 'มองเห็นคำถามซ้ำ ปัญหาที่เกิดบ่อย sentiment trend เคสที่ควรปรับปรุง และ workflow ที่ควรสร้างเพิ่ม',
      en: 'See recurring questions, frequent issues, sentiment trends, cases worth improving, and workflows worth adding.',
    },
  },
  {
    n: '07',
    title: { th: 'Brand Voice Studio', en: 'Brand Voice Studio' },
    body: {
      th: 'ตั้ง voice, formality, signature, forbidden / required phrases และ emoji policy ของแบรนด์ — AI ใช้ทุกคำตอบ',
      en: 'Set voice, formality, signature, forbidden / required phrases, and emoji policy — AI applies them on every reply.',
    },
  },
  {
    n: '08',
    title: { th: 'Product Catalog', en: 'Product Catalog' },
    body: {
      th: 'อัปโหลดสินค้า + รายละเอียด AI สร้าง embedding ให้อัตโนมัติ ใช้ในการตอบลูกค้าและแนะนำสินค้าที่เกี่ยวข้อง',
      en: 'Upload products + details — AI builds embeddings automatically for replies and related-product suggestions.',
    },
  },
  {
    n: '09',
    title: { th: 'Reply Templates', en: 'Reply Templates' },
    body: {
      th: 'quick replies สำหรับทีม พร้อม shortcut + ใช้บ่อย AI suggest อัตโนมัติเมื่อตรงกับคำถามลูกค้า',
      en: 'Quick replies with shortcuts and frequency tracking — AI auto-suggests when one matches the question.',
    },
  },
  {
    n: '10',
    title: { th: 'Memory Governance', en: 'Memory Governance' },
    body: {
      th: 'review memory ที่ AI จด, อนุมัติ pending facts, archive ของเก่า, restore ที่ผิดพลาด — manager คุมได้เต็มที่',
      en: 'Review what the AI remembered, approve pending facts, archive old ones, restore mistakes — managers stay in control.',
    },
  },
  {
    n: '11',
    title: { th: 'Multi-Provider Harness', en: 'Multi-Provider Harness' },
    body: {
      th: 'Gemini หลัก, Claude fallback อัตโนมัติ พร้อม trace_id, confidence gate, structured-output validator — ระบบ AI ระดับ production',
      en: 'Gemini primary with automatic Claude fallback, plus trace_id, confidence gate, and structured-output validator — production-grade AI plumbing.',
    },
  },
  {
    n: '12',
    title: { th: 'PDPA Control Plane', en: 'PDPA Control Plane' },
    body: {
      th: 'memory mode (auto / approval / manual), retention windows, residency, signed DPA — พร้อม audit log สำหรับ compliance review',
      en: 'Memory mode (auto / approval / manual), retention windows, residency, signed DPA — with an audit log ready for compliance review.',
    },
  },
] as const;

// ── Outcomes ─────────────────────────────────────────────────────────────────
export const outcomes: ReadonlyArray<{ title: Bi; body: Bi }> = [
  {
    title: { th: 'เร็วขึ้น', en: 'Faster' },
    body: {
      th: 'ลดเวลาตอบคำถามซ้ำและทำให้ทีมดูแลลูกค้าได้มากขึ้นโดยไม่เพิ่มคนตามจำนวนแชทเสมอไป',
      en: 'Cuts time on repeat questions so the team handles more chats without hiring linearly.',
    },
  },
  {
    title: { th: 'แม่นขึ้น', en: 'More accurate' },
    body: {
      th: 'ตอบจาก customer memory, knowledge base และ policy ของธุรกิจ ไม่ใช่ template ทั่วไป',
      en: 'Answers grounded in customer memory, knowledge base, and your policies — not generic templates.',
    },
  },
  {
    title: { th: 'คุมได้', en: 'In control' },
    body: {
      th: 'เลือกได้ว่าเคสไหนให้ AI ตอบเอง เคสไหนต้องรออนุมัติ และเคสไหนต้องส่งต่อคน',
      en: 'Choose which cases AI answers, which need approval, and which must go to a human.',
    },
  },
  {
    title: { th: 'โตได้', en: 'Built to scale' },
    body: {
      th: 'ต่อยอดสู่ commerce intelligence ด้าน demand, inventory, pricing, logistics และ supply chain เมื่อเชื่อมข้อมูลครบ',
      en: 'Extend into commerce intelligence — demand, inventory, pricing, logistics, supply chain — once your data is connected.',
    },
  },
];

// ── Nav links ────────────────────────────────────────────────────────────────
export const navLinks = [
  { href: '#ai-os', label: { th: 'AI OS', en: 'AI OS' } },
  { href: '#agents', label: { th: 'Agents', en: 'Agents' } },
  { href: '#autopilot', label: { th: 'Autopilot', en: 'Autopilot' } },
  { href: '#backoffice', label: { th: 'Backoffice', en: 'Backoffice' } },
  { href: '#features', label: { th: 'Features', en: 'Features' } },
] as const;
