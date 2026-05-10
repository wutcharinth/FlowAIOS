/**
 * Demo merchant seed data.
 *
 * Single source of truth for the /try/* read-only sandbox. Modeled on a
 * fictional Bangkok skincare brand "Klin Skin" so the example data feels
 * coherent across pages: a customer mentioned in the dashboard appears in
 * the inbox, has memory entries cited in their thread, and shows up in
 * the customers list.
 *
 * Pure data — no Supabase, no network. Pages render directly from these
 * arrays.
 */

export const DEMO_BRAND = {
  name: 'Klin Skin',
  tagline: 'Sensitive-skin skincare · Bangkok',
  user: { name: 'Pim', email: 'pim@klinskin.demo', role: 'owner' },
};

export interface DemoCustomer {
  id: string;
  name: string;
  channelIds: Record<string, string>;
  tags: string[];
  createdAt: string;
  inbound: number;
  outbound: number;
}

export const demoCustomers: DemoCustomer[] = [
  {
    id: 'cu-001',
    name: 'อรวรรณ',
    channelIds: { line: 'U1a2b3c4d5e6' },
    tags: ['returning', 'paraben-allergic', 'kerry-preferred'],
    createdAt: '2026-04-12T08:00:00Z',
    inbound: 14,
    outbound: 13,
  },
  {
    id: 'cu-002',
    name: 'Lin Wei',
    channelIds: { shopee: 'SG1009' },
    tags: ['wholesale', 'sg-buyer'],
    createdAt: '2026-04-26T11:42:00Z',
    inbound: 6,
    outbound: 7,
  },
  {
    id: 'cu-003',
    name: '@somchai_real',
    channelIds: { tiktok: 'TT-7733' },
    tags: ['complaint', 'shipping-delayed'],
    createdAt: '2026-05-02T14:18:00Z',
    inbound: 9,
    outbound: 5,
  },
  {
    id: 'cu-004',
    name: 'Returning buyer',
    channelIds: { lazada: 'LZ-44218' },
    tags: ['vip', 'frequent'],
    createdAt: '2026-03-19T09:15:00Z',
    inbound: 22,
    outbound: 22,
  },
  {
    id: 'cu-005',
    name: 'คุณพิมพ์ลภัส',
    channelIds: { line: 'U9z8y7x6' },
    tags: ['repeat'],
    createdAt: '2026-04-04T13:00:00Z',
    inbound: 4,
    outbound: 4,
  },
  {
    id: 'cu-006',
    name: 'TikTok Shop Buyer',
    channelIds: { tiktok: 'TT-5510' },
    tags: ['new'],
    createdAt: '2026-05-08T18:33:00Z',
    inbound: 2,
    outbound: 1,
  },
];

export interface DemoConversation {
  id: string;
  customerId: string;
  customerName: string;
  channel: 'line' | 'shopee' | 'tiktok' | 'lazada' | 'instagram' | 'facebook' | 'email';
  status: 'open' | 'pending' | 'resolved' | 'closed';
  unread: number;
  lastMessage: string;
  lastMessageAt: string;
  autoReply: boolean;
  pill: 'auto' | 'approval' | 'escalate' | 'growth' | null;
}

export const demoConversations: DemoConversation[] = [
  {
    id: 'c-001',
    customerId: 'cu-001',
    customerName: 'อรวรรณ',
    channel: 'line',
    status: 'open',
    unread: 1,
    lastMessage: 'มี cleansing balm ใหม่ไหมคะ',
    lastMessageAt: '2026-05-09T10:18:00Z',
    autoReply: true,
    pill: 'auto',
  },
  {
    id: 'c-002',
    customerId: 'cu-002',
    customerName: 'Lin Wei',
    channel: 'shopee',
    status: 'pending',
    unread: 0,
    lastMessage: 'wholesale 50 pcs price for SG store',
    lastMessageAt: '2026-05-09T09:42:00Z',
    autoReply: false,
    pill: 'approval',
  },
  {
    id: 'c-003',
    customerId: 'cu-003',
    customerName: '@somchai_real',
    channel: 'tiktok',
    status: 'pending',
    unread: 1,
    lastMessage: 'รอของมา 2 อาทิตย์แล้ว ไม่ตอบเลย จะแจ้งความ',
    lastMessageAt: '2026-05-09T08:11:00Z',
    autoReply: false,
    pill: 'escalate',
  },
  {
    id: 'c-004',
    customerId: 'cu-004',
    customerName: 'Returning buyer',
    channel: 'lazada',
    status: 'open',
    unread: 0,
    lastMessage: 'ขอบคุณค่ะ ใช้โค้ด REPEAT15 ได้',
    lastMessageAt: '2026-05-08T20:00:00Z',
    autoReply: true,
    pill: 'growth',
  },
  {
    id: 'c-005',
    customerId: 'cu-005',
    customerName: 'คุณพิมพ์ลภัส',
    channel: 'line',
    status: 'resolved',
    unread: 0,
    lastMessage: 'ยินดีค่ะ มีอะไรเพิ่มเติมแจ้งได้ตลอดนะคะ',
    lastMessageAt: '2026-05-08T15:30:00Z',
    autoReply: true,
    pill: 'auto',
  },
];

export interface DemoMessage {
  id: string;
  direction: 'inbound' | 'outbound';
  body: string;
  aiGenerated: boolean;
  sentAt: string;
}

export const demoThread: Record<string, DemoMessage[]> = {
  'c-001': [
    { id: 'm1', direction: 'inbound',  body: 'สวัสดีค่ะ', aiGenerated: false, sentAt: '2026-05-09T10:00:00Z' },
    { id: 'm2', direction: 'outbound', body: 'สวัสดีค่ะคุณอรวรรณ มีอะไรให้ช่วยไหมคะ', aiGenerated: true,  sentAt: '2026-05-09T10:00:08Z' },
    { id: 'm3', direction: 'inbound',  body: 'มี cleansing balm ใหม่ไหมคะ', aiGenerated: false, sentAt: '2026-05-09T10:18:00Z' },
    { id: 'm4', direction: 'outbound', body:
      'มีค่ะคุณอรวรรณ\n\nKlin Skin Cleansing Balm v2 (paraben-free, fragrance-free) เพิ่งเปิดตัวสัปดาห์นี้ค่ะ\nราคา ฿890 · ส่ง Kerry ตามปกติ · เนื้อนุ่มกว่าเดิม คงสูตร paraben-free ไว้ตามที่คุณเคยแจ้งค่ะ',
      aiGenerated: true, sentAt: '2026-05-09T10:18:14Z',
    },
  ],
  'c-002': [
    { id: 'm1', direction: 'inbound',  body: "Hi! I want to order 50 pcs of your linen camisole for my SG store. What's the wholesale price?", aiGenerated: false, sentAt: '2026-05-09T09:30:00Z' },
    { id: 'm2', direction: 'outbound', body: 'Hi Lin! Thanks for reaching out. For 50+ pcs wholesale we offer 28% off retail. Could you share the SKU and your preferred colorway?',
      aiGenerated: true, sentAt: '2026-05-09T09:31:00Z' },
    { id: 'm3', direction: 'inbound',  body: 'SKU is LC-2024-OAT in size M. I need them by end of June. Stock ok?', aiGenerated: false, sentAt: '2026-05-09T09:42:00Z' },
  ],
  'c-003': [
    { id: 'm1', direction: 'inbound',  body: 'รอของมา 2 อาทิตย์แล้ว ไม่ตอบเลย จะแจ้งความนะ!!', aiGenerated: false, sentAt: '2026-05-09T08:11:00Z' },
    { id: 'm2', direction: 'outbound', body: 'ขออภัยมากค่ะคุณ ดิฉันส่งต่อให้หัวหน้าทีมดูแลทันทีค่ะ จะติดต่อกลับภายใน 15 นาที พร้อมข้อมูลที่ตรวจสอบแล้ว', aiGenerated: true, sentAt: '2026-05-09T08:11:08Z' },
  ],
};

export interface DemoMemory {
  id: string;
  customerId: string;
  kind: string;
  content: string;
  confidence: number;
  useCount: number;
  status: 'active' | 'low_confidence' | 'contradicted' | 'merged' | 'archived';
  lastUsedAt: string | null;
  score: number;
}

export const demoMemory: DemoMemory[] = [
  { id: 'mm-1', customerId: 'cu-001', kind: 'allergy',     content: 'แพ้ paraben — ใช้สูตร paraben-free เท่านั้น',  confidence: 0.95, useCount: 12, status: 'active', lastUsedAt: '2026-05-09T10:18:14Z', score: 0.91 },
  { id: 'mm-2', customerId: 'cu-001', kind: 'preference',  content: 'ชอบส่งผ่าน Kerry — เคยขอเซ็นรับแทนเพื่อนบ้าน', confidence: 0.88, useCount: 7,  status: 'active', lastUsedAt: '2026-05-08T11:00:00Z', score: 0.83 },
  { id: 'mm-3', customerId: 'cu-001', kind: 'tone',        content: 'tone สุภาพและกระชับ ใช้ ค่ะ',                confidence: 0.92, useCount: 4,  status: 'active', lastUsedAt: '2026-05-09T10:00:08Z', score: 0.86 },
  { id: 'mm-4', customerId: 'cu-001', kind: 'preference',  content: 'ชอบโปรส่งฟรี',                              confidence: 0.62, useCount: 1,  status: 'active', lastUsedAt: '2026-04-12T08:00:00Z', score: 0.55 },
  { id: 'mm-5', customerId: 'cu-002', kind: 'fact',        content: 'wholesale buyer · SG store',               confidence: 0.91, useCount: 3,  status: 'active', lastUsedAt: '2026-05-09T09:31:00Z', score: 0.86 },
  { id: 'mm-6', customerId: 'cu-003', kind: 'complaint',   content: 'order #2891 stuck in transit since May 6', confidence: 0.94, useCount: 2,  status: 'active', lastUsedAt: '2026-05-09T08:11:08Z', score: 0.89 },
  { id: 'mm-7', customerId: 'cu-001', kind: 'allergy',     content: 'no allergies (older note)',                confidence: 0.45, useCount: 0,  status: 'contradicted', lastUsedAt: null,                  score: 0.32 },
];

export const demoStats = {
  conversations24h: 24,
  inboundMessages24h: 67,
  aiReplies24h: 41,
  autoReplyRate: 0.78,
  customers: 312,
  openConversations: 7,
  channelBreakdown: [
    { channel: 'line', count: 142 },
    { channel: 'shopee', count: 47 },
    { channel: 'tiktok', count: 31 },
    { channel: 'lazada', count: 28 },
    { channel: 'facebook', count: 19 },
    { channel: 'email', count: 11 },
  ],
};

export interface DemoArticle {
  id: string;
  title: string;
  category: string;
  updatedAt: string;
}

export const demoArticles: DemoArticle[] = [
  { id: 'kb-1',  title: 'นโยบายการจัดส่ง — Kerry, BEST Express, Flash',          category: 'shipping',  updatedAt: '2026-05-08T11:00:00Z' },
  { id: 'kb-2',  title: 'การคืนสินค้าและ refund',                                category: 'returns',   updatedAt: '2026-05-07T10:00:00Z' },
  { id: 'kb-3',  title: 'Cleansing Balm v1 vs v2 — what changed',                category: 'product',   updatedAt: '2026-05-06T09:30:00Z' },
  { id: 'kb-4',  title: 'Paraben-free product list',                              category: 'product',   updatedAt: '2026-05-05T14:00:00Z' },
  { id: 'kb-5',  title: 'VIP discount code policy',                              category: 'promo',     updatedAt: '2026-05-04T16:00:00Z' },
  { id: 'kb-6',  title: 'Wholesale tier pricing (50+ pcs)',                      category: 'wholesale', updatedAt: '2026-05-03T11:30:00Z' },
  { id: 'kb-7',  title: 'Retinol + Vitamin C compatibility',                     category: 'product',   updatedAt: '2026-05-02T08:00:00Z' },
  { id: 'kb-8',  title: 'การจัดการ complaint จาก marketplace',                   category: 'sop',       updatedAt: '2026-05-01T10:00:00Z' },
  { id: 'kb-9',  title: 'Brand voice guide — สุภาพและกระชับ',                    category: 'voice',     updatedAt: '2026-04-30T09:00:00Z' },
  { id: 'kb-10', title: 'When to escalate to a human agent',                     category: 'sop',       updatedAt: '2026-04-29T14:00:00Z' },
  { id: 'kb-11', title: 'Travel-size SKU (30g) launch FAQ',                      category: 'product',   updatedAt: '2026-04-28T13:00:00Z' },
  { id: 'kb-12', title: 'PDPA — what we collect and why',                        category: 'compliance',updatedAt: '2026-04-27T10:00:00Z' },
];

export const demoAiLogs = [
  { id: 'al-1', kind: 'reply_suggest',  model: 'gemini-2.5-flash',     latency: 482, accepted: true,  conversationId: 'c-001', body: 'มีค่ะคุณอรวรรณ Klin Skin Cleansing Balm v2…', createdAt: '2026-05-09T10:18:14Z' },
  { id: 'al-2', kind: 'memory_extract', model: 'gemini-2.5-flash',     latency: 612, accepted: true,  conversationId: 'c-001', body: '{count:1, items:[{kind:"preference", content:"ชอบโปรส่งฟรี"}]}', createdAt: '2026-05-09T10:18:20Z' },
  { id: 'al-3', kind: 'reply_suggest',  model: 'gemini-2.5-flash',     latency: 511, accepted: true,  conversationId: 'c-002', body: 'Hi Lin! Thanks for reaching out…', createdAt: '2026-05-09T09:31:00Z' },
  { id: 'al-4', kind: 'escalate_check', model: 'gate',                 latency: 4,   accepted: false, conversationId: 'c-003', body: 'tier=escalate · legal_keyword: แจ้งความ', createdAt: '2026-05-09T08:11:00Z' },
  { id: 'al-5', kind: 'reply_suggest',  model: 'gemini-2.5-flash',     latency: 398, accepted: true,  conversationId: 'c-004', body: 'ใช้โค้ด REPEAT15 ได้นะคะ — auto-rule R-019', createdAt: '2026-05-08T20:00:00Z' },
  { id: 'al-6', kind: 'reply_suggest',  model: 'claude-haiku-4-5-20251001', latency: 730, accepted: true, conversationId: 'c-005', body: '(Gemini fallback → Claude)', createdAt: '2026-05-08T15:30:00Z' },
];

export const demoBrandVoice = {
  voice: 'friendly',
  language: 'th',
  formality: 'polite',
  signature: 'ทีม Klin Skin',
  forbiddenPhrases: ['100% แน่นอน', 'rush'],
  requiredPhrases: ['ขอบคุณค่ะ', 'ขออนุญาตเช็คให้นะคะ'],
  emojiPolicy: 'none',
  customInstructions:
    'Always offer free shipping mention for orders ≥ ฿800. Default sign-off "ทีม Klin Skin".',
};

export const demoMemorySummary = {
  active_count: 184,
  low_confidence_count: 12,
  contradicted_count: 7,
  merged_count: 23,
  archived_count: 41,
  avg_confidence: 0.78,
  avg_use_count: 3.6,
  total_customers_with_memory: 168,
};

export const demoTeam = [
  { id: 'u-1', email: 'pim@klinskin.demo',  name: 'Pim · CS Manager',  role: 'owner', joined: '2026-03-01' },
  { id: 'u-2', email: 'fern@klinskin.demo', name: 'Fern',              role: 'agent', joined: '2026-03-05' },
  { id: 'u-3', email: 'jane@klinskin.demo', name: 'Jane',              role: 'agent', joined: '2026-04-10' },
  { id: 'u-4', email: 'mike@klinskin.demo', name: 'Mike',              role: 'admin', joined: '2026-03-12' },
];

export const demoAuditLog = [
  { id: 'a-1', action: 'integration.line.saved',     actor: 'Pim',  type: 'user',  at: '2026-05-09T07:00:00Z' },
  { id: 'a-2', action: 'memory.write',               actor: 'AI',   type: 'ai',    at: '2026-05-09T10:18:20Z' },
  { id: 'a-3', action: 'memory.contradict',          actor: 'AI',   type: 'ai',    at: '2026-05-08T11:30:00Z' },
  { id: 'a-4', action: 'kb.article.created',         actor: 'Pim',  type: 'user',  at: '2026-05-08T09:00:00Z' },
  { id: 'a-5', action: 'memory.lifecycle.daily',     actor: 'system', type: 'system', at: '2026-05-09T19:00:00Z' },
  { id: 'a-6', action: 'lesson.approve',             actor: 'Mike', type: 'user',  at: '2026-05-07T16:00:00Z' },
];
