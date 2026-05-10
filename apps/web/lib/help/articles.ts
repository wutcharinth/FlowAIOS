/**
 * Help center articles — bilingual (TH / EN) with optional embedded figures.
 *
 * Render path:
 *   /help/[slug] reads the user's lang preference (cookie + html[lang])
 *   and picks the matching body. The renderer recognises lines like
 *     <Figure name="three-tier-flow" />
 *   and swaps in the matching component from components/help/figures.tsx.
 *
 * Keep articles task-shaped: what triggers visiting the page, what to do,
 * what to expect after.
 */

export interface BilingualString {
  th: string;
  en: string;
}

export interface HelpArticle {
  slug: string;
  category: 'getting-started' | 'channels' | 'ai' | 'memory' | 'governance' | 'reference';
  title: BilingualString;
  summary: BilingualString;
  readMinutes: number;
  body: BilingualString;
  /** Optional pointer to a live-data demo page. */
  demoHref?: string;
}

// Helper to keep body strings tidy.
const trim = (s: string) => s.trim();

export const HELP_ARTICLES: HelpArticle[] = [
  {
    slug: 'getting-started',
    category: 'getting-started',
    readMinutes: 2,
    demoHref: '/try',
    title: {
      th: 'เริ่มต้น — FlowAIOS ทำอะไร ใน 60 วินาที',
      en: 'Getting started — what FlowAIOS does in 60 seconds',
    },
    summary: {
      th: 'FlowAIOS คือ AI แอดมินสำหรับแชทลูกค้า ตอบเองเมื่อมั่นใจ ส่งดราฟต์ให้ทีมเมื่อยังไม่ชัวร์ และส่งต่อทันทีเมื่อสำคัญ',
      en: 'FlowAIOS is an AI admin for customer chats. Auto-replies when sure, drafts when unsure, escalates when it matters.',
    },
    body: {
      th: trim(`
# ทำอะไรได้บ้าง

FlowAIOS รวมแชทจาก LINE OA, Shopee, TikTok Shop, Lazada, Instagram, Facebook และ Email ไว้ในกล่องเดียว AI ตอบคำถามซ้ำ ๆ อัตโนมัติเมื่อมั่นใจ ร่างคำตอบให้ทีมตรวจเมื่อยังไม่ชัวร์ และส่งต่อเคสสำคัญทันที

<Figure name="three-tier-flow" />

# ทั้ง 3 ระดับทำงานยังไง

- **ตอบเอง** เมื่อ AI confidence ≥ 90% ลูกค้าได้คำตอบทันที
- **ส่งดราฟต์รอ approve** เมื่อ 70–90% ทีมเห็น draft + กดส่ง / แก้ / ทิ้ง ใน 1 คลิก
- **Escalate** เมื่อต่ำกว่า 70% หรือเมื่อมี keyword สำคัญ ("คืนเงิน" / "แจ้งความ") หรือ sentiment ลบชัด

threshold ทุกตัวคุณตั้งเองได้ ทุก reply audit ได้

# จุดต่างจาก chatbot ทั่วไป

1. **เข้าใจแบรนด์ของคุณ** — voice, formality, sign-off, forbidden phrases ถูก inject ทุก reply
2. **Self-improving memory** — จำความชอบ / แพ้ / complaint ของแต่ละลูกค้าข้ามทุกช่อง memory เก่าจะ supersede อัตโนมัติเมื่อมีข้อมูลใหม่ที่ขัดแย้ง
3. **Auditable** — ทุก reply มี trace ID ที่ระบุ KB articles + memory ที่อ้างอิง model ที่ใช้ latency และ confidence

# ขั้นถัดไป

- เดินดู [demo dashboard](/try/dashboard) และ [inbox](/try/inbox)
- พร้อมแล้ว → [เชื่อม LINE OA จริง](/help/connect-line) ใน 30 นาที
`),
      en: trim(`
# What it does

FlowAIOS unifies your customer chats from LINE OA, Shopee, TikTok Shop, Lazada, Instagram, Facebook, and Email into one inbox. An AI agent answers repetitive questions automatically when confident, drafts replies for your team to approve when unsure, and escalates important cases instantly.

<Figure name="three-tier-flow" />

# How the three tiers work

- **Auto-reply** when AI confidence ≥ 90%. The customer never waits.
- **Draft for approval** when 70–90%. Your team gets a pre-written reply they can send, edit, or discard in one click.
- **Escalate** when below 70%, or when keywords like "refund" / "แจ้งความ" appear, or when sentiment is strongly negative.

You decide the thresholds. You see every reply.

# What makes it different

1. **Brand-aware**. The AI sounds like your brand — voice, formality, sign-off, forbidden phrases — not like a generic chatbot.
2. **Self-improving memory**. The AI remembers each customer's preferences, allergies, complaints, tone. Across all channels. The memory ages out, dedupes, and supersedes itself automatically.
3. **Auditable**. Every AI reply has a trace ID with the KB articles + customer memories it cited, the model used, the latency, the confidence.

# Next steps

- Walk through the [demo dashboard](/try/dashboard) and [inbox](/try/inbox).
- [Connect your real LINE OA](/help/connect-line) in 30 minutes when you're ready.
`),
    },
  },

  {
    slug: 'connect-line',
    category: 'channels',
    readMinutes: 5,
    demoHref: '/try/admin/integrations',
    title: {
      th: 'เชื่อม LINE OA ใน 30 นาที',
      en: 'Connect your LINE OA in 30 minutes',
    },
    summary: {
      th: 'ตั้งค่าทีละขั้นตอนผ่าน LINE Developers Console + หน้า Admin ของ FlowAIOS ไม่ต้องเขียนโค้ด',
      en: 'A step-by-step setup using LINE Developers Console + your FlowAIOS admin page. No code.',
    },
    body: {
      th: trim(`
# สิ่งที่ต้องเตรียม

- LINE Official Account (ถ้ายังไม่มี สมัครได้ที่ https://www.linebiz.com)
- สิทธิ admin ใน workspace FlowAIOS
- เวลา ~30 นาที

<Figure name="connect-line-steps" />

# Step 1 — สร้าง Messaging API channel

1. ไปที่ https://developers.line.biz/console
2. เลือก / สร้าง Provider แล้วสร้าง **Messaging API** channel ของ OA
3. คัดลอกค่า **Channel secret** (แท็บ Basic settings) และ **Channel access token (long-lived)** (แท็บ Messaging API) เก็บไว้

# Step 2 — วางใน FlowAIOS

1. ใน FlowAIOS ไปที่ **Admin → Channels**
2. วาง Channel secret
3. วาง Channel access token
4. (ทางเลือก) วาง Bot user ID จาก Messaging API → "Your user ID" ใช้ route webhook ตรง org ตอนใช้หลาย channel
5. กด **Save**

# Step 3 — ตั้ง webhook URL ฝั่ง LINE

1. คัดลอก **Webhook URL** จากหน้า Integrations ใน FlowAIOS (รูป \`https://flowaios.vercel.app/api/line/webhook\`)
2. LINE Developers → Messaging API → **Webhook settings** วาง URL
3. เปิด **Use webhook → Enabled**
4. กด **Verify** ควรขึ้น "Success"

# Step 4 — ปิด auto-reply ของ LINE

LINE OA มี auto-reply ของตัวเองที่ชนกับ FlowAIOS ปิดไว้:

1. LINE Developers → Messaging API → **Auto-reply messages → Disable**
2. **Greeting messages → Disable** (FlowAIOS ส่ง greeting เองผ่าน Brand voice + AI)

# Step 5 — ทดสอบ

ส่งข้อความทดสอบเข้า LINE OA ของคุณ ภายใน ~5 วินาที ควรเห็น:

- conversation ใหม่ใน inbox FlowAIOS
- AI draft reply (auto-sent หรือรอ approve ตาม mode)

# ถ้าไม่ทำงาน

- **Webhook verify ไม่ผ่าน** → access token ผิด หรือ channel secret ของคนละ channel
- **ไม่ตอบ** → ตรวจ \`GEMINI_API_KEY\` ใน workspace settings (หรือ env Vercel)
- **Webhook ผ่านแต่ไม่เห็น message** → ดู **Admin → AI logs**
`),
      en: trim(`
# What you need

- LINE Official Account (if you don't have one yet, register at https://www.linebiz.com)
- Admin access to your FlowAIOS workspace
- ~30 minutes

<Figure name="connect-line-steps" />

# Step 1 — Create a Messaging API channel

1. Go to https://developers.line.biz/console
2. Pick (or create) a Provider, then create a new **Messaging API** channel for your OA.
3. Note these values from the channel: **Channel secret** (Basic settings tab) and **Channel access token (long-lived)** (Messaging API tab). You'll paste both into FlowAIOS.

# Step 2 — Paste creds into FlowAIOS

1. In FlowAIOS, go to **Admin → Channels**.
2. Paste the **Channel secret**.
3. Paste the **Channel access token**.
4. Optional: paste the **Bot user ID** (Messaging API tab → "Your user ID"). Routes the webhook to your org if you ever run multiple LINE channels.
5. Click **Save**.

# Step 3 — Set the webhook URL on LINE's side

1. Copy the **Webhook URL** shown at the top of the FlowAIOS Integrations page (it looks like \`https://flowaios.vercel.app/api/line/webhook\`).
2. In LINE Developers → Messaging API → **Webhook settings**, paste the URL.
3. Toggle **Use webhook → Enabled**.
4. Click **Verify**. You should see "Success."

# Step 4 — Disable LINE's auto-reply

LINE OA has its own built-in auto-reply that conflicts with FlowAIOS. Disable it:

1. LINE Developers → Messaging API → **Auto-reply messages → Disable**.
2. **Greeting messages → Disable** (FlowAIOS sends its own greeting via the Brand voice + AI).

# Step 5 — Test it

Send your LINE OA a message from your phone. Within ~5 seconds you should see:

- A new conversation in your FlowAIOS inbox.
- An AI-drafted reply, either auto-sent or pending your approval.

# If it doesn't work

- **Webhook verify fails** → the access token is wrong, or the channel secret is for a different channel. Double-check both.
- **No reply** → check that you set \`GEMINI_API_KEY\` in your workspace settings (or your Vercel env). FlowAIOS short-circuits silently if no AI key is configured.
- **Webhook works but messages don't appear** → check **Admin → AI logs**. The webhook always returns 200; processing errors show up here.
`),
    },
  },

  {
    slug: 'memory-lifecycle',
    category: 'memory',
    readMinutes: 4,
    demoHref: '/try/admin/memory',
    title: {
      th: 'Memory lifecycle ทำงานยังไง — อะไรเก็บ อะไรลืม',
      en: 'How memory lifecycle works — what to keep, what to forget',
    },
    summary: {
      th: 'กฎที่ FlowAIOS ใช้ในการให้คะแนน, dedup, supersede, archive และ promote memory ของลูกค้า',
      en: 'The rules FlowAIOS uses to score, dedup, supersede, archive, and promote customer memories.',
    },
    body: {
      th: trim(`
# AI ที่จำลูกค้าได้ ทำงานยังไง

ตอนคุณคุยกับลูกค้า FlowAIOS จะสังเกตและจำสิ่งที่น่าจดจำไว้ — ความชอบ การแพ้ ปัญหาที่เคยเจอ สินค้าที่เคยซื้อ พอลูกค้าคนนั้นทักมาอีก AI จะรับช่วงต่อจากตรงที่หยุดได้ทันที แม้จะเป็นคนละช่องทาง

<Figure name="memory-lifecycle" />

# AI จำอะไรบ้าง

AI ตั้งใจระมัดระวัง จำเฉพาะข้อเท็จจริงที่มั่นใจ ไม่จำคำคุยเล่น ตัวอย่างที่จำ:

- "แพ้ paraben"
- "ชอบส่งผ่าน Kerry มากกว่า Flash"
- "เคยซื้อ cleansing balm ตอนมีนาคม ถามเรื่อง restock พฤษภาคม"

# ความจำที่มีประโยชน์ จะอยู่นาน

ความจำจะ "เด่น" เมื่อ AI ใช้จริงในการตอบลูกค้า ความจำที่ไม่ได้ใช้จะค่อย ๆ จางหายไปตามเวลา — ตั้งใจให้เป็นแบบนั้น ความจำเรื่องบริษัทขนส่งที่ลูกค้าคนหนึ่งชอบเมื่อสองปีที่แล้ว มักไม่จำเป็นต้องนำมาใช้ตอนนี้

# เมื่อความจำกลายเป็นบทเรียนของทีม

ถ้าข้อเท็จจริงเดียวกันโผล่ในลูกค้าหลายคน — เช่น มีลูกค้า 4 คนขึ้นไปถามเรื่องการรับพัสดุ Kerry — มันไม่ใช่เรื่องส่วนตัวแล้ว แต่เป็น "pattern" ของแบรนด์ FlowAIOS จะแสดงเรื่องเหล่านี้เป็น "candidate lesson" ในหน้า admin คลิกครั้งเดียวก็เปลี่ยนเป็นกฎของทีมให้ AI ใช้ตอบอัตโนมัติได้เลย

# เมื่อต้องแก้ไขด้วยตัวเอง

- AI จำผิด → กด **Mark as wrong** ในโปรไฟล์ลูกค้า AI จะไม่นำความจำนั้นมาใช้อีก
- ลูกค้าเปลี่ยนความชอบ → mark ของเก่าว่าไม่ถูกแล้ว AI จะเรียนรู้ของใหม่จากการคุยครั้งหน้า
- การคุยครั้งหนึ่งทำให้ AI จำสิ่งที่ไม่จำเป็นเยอะ → archive เป็นกลุ่มจาก Admin → Memory

# คุณควบคุมอะไรได้บ้าง

- **โหมดความจำ** — ให้ AI จำเอง (default), ต้องอนุมัติก่อนจำ, หรือปิดการจำอัตโนมัติทั้งหมด
- **อายุการเก็บ** — ตั้งได้ว่าจะให้ความจำอยู่นานแค่ไหน (default 90 วันหลังใช้ครั้งสุดท้าย) ของเก่ากว่านั้นถูกลบอัตโนมัติ
- **อนุมัติบทเรียน** — ทุก lesson ระดับทีมเป็น candidate ก่อน คุณเลือกว่าจะเอาไปใช้จริงตัวไหน
`),
      en: trim(`
# How customer memory works

When you chat with a customer, FlowAIOS notices and saves things worth remembering — preferences, allergies, past complaints, what they bought. The next time that customer messages you, the AI picks up where you left off, even on a different channel.

<Figure name="memory-lifecycle" />

# What gets saved

The AI is conservative on purpose. It saves facts it's confident about and ignores casual chatter. Examples:

- "Allergic to paraben"
- "Prefers Kerry over Flash"
- "Bought the cleansing balm in March, asked about restock in May"

# What stays useful

A memory stays sharp when the AI actually uses it in replies. Memories that don't get used eventually fade — by design. A memory from two years ago about someone's favorite shipping carrier probably isn't worth recalling today.

# When memory becomes a team-wide lesson

If the same fact shows up across many customers — say, four or more buyers all asking about Kerry redelivery — that stops being personal and starts being a brand pattern. FlowAIOS surfaces these as candidate lessons in your admin panel. One click promotes the pattern into a team-wide rule the AI can apply automatically going forward.

# When you want to fix something manually

- The AI saved something wrong → click **Mark as wrong** in the customer profile. The AI won't use that memory again.
- The customer's preferences changed → mark the old fact as wrong. The AI will pick up the new preference next time you chat.
- A noisy conversation produced a flood of low-quality memories → archive them in bulk from Admin → Memory.

# What you control

- **Memory mode** — let the AI save automatically (default), require approval before each save, or disable AI extraction entirely.
- **Retention** — choose how long memories stick around (default 90 days past last use). Older memories are removed automatically.
- **Promotion review** — every team-wide lesson is a candidate first. You decide which to make official.
`),
    },
  },

  {
    slug: 'ai-tuning',
    category: 'ai',
    readMinutes: 4,
    demoHref: '/try/admin/ai-logs',
    title: {
      th: 'จูน AI replies — confidence, retrieval, ปุ่มที่ขยับได้',
      en: 'Tuning AI replies — confidence, retrieval, and what to nudge',
    },
    summary: {
      th: 'วิธีทำให้ AI replies conservative ขึ้น aggressive ขึ้น หรือตรงกับแบรนด์มากขึ้น โดยไม่ต้องเขียนโค้ด',
      en: 'How to make AI replies more conservative, more eager, or more on-brand without writing code.',
    },
    body: {
      th: trim(`
# 4 ปุ่มหลัก

เวลา AI reply ไม่ตรง คำตอบเกือบทุกครั้งอยู่ใน 1 ใน 4 อันนี้:

1. **Brand voice** (Admin → Brand voice) — voice, formality, language, sign-off, forbidden / required phrases inject ทุก reply
2. **Knowledge base** (Admin → Knowledge) — articles ที่ AI อ้างอิงตอนตอบ KB ไม่ทันสมัย → ตอบผิด
3. **Memory** (Admin → Memory) — บันทึกของลูกค้าที่ AI ใช้ปรับคำตอบ memory ผิด → personalize ผิด
4. **Confidence threshold** — เส้นแบ่งระหว่าง auto-reply กับ approval

# เมื่อ AI reply ทั่วไปเกินไป

→ KB บาง หรือไม่มี policy ที่ลูกค้าถาม เปิด Admin → Knowledge → New article เขียน policy เหมือนสอน agent ใหม่ embedding auto

# เมื่อ AI reply เร็วเกินไป (กระตือรือร้นไป)

→ ลด auto-reply threshold จาก 90 → 95 auto-rate ลด, draft load เพิ่ม, perceived quality สูงขึ้น

# เมื่อ AI reply ระวังเกินไป

→ threshold สูงเกิน หรือ KB ไม่ครอบคลุม เปิด **Reply history** ของ thread นั้น ถ้า reply เป็น "ขออนุญาตเช็คให้นะคะ" → AI ไม่มั่นใจ เพิ่ม KB article แล้วดู reply ครั้งหน้า

# เมื่อ AI พูดผิดตัว

→ Brand voice ยังหลวมไป เพิ่ม forbidden phrases ที่เจาะจง (เช่น "100% sure", "rush") + required phrases ที่เป็น signature ของแบรนด์ ใส่ custom instructions สำหรับ quirk เฉพาะ: "Always offer free shipping mention for orders ≥ ฿800"

# เมื่อ AI พูดผิดเรื่องลูกค้า

→ เปิด customer profile จาก inbox memory sidebar แสดงว่า AI กำลังใช้อะไร ของเก่าที่ขัดกับใหม่ → contradict memory ที่ไม่ควรมี → archive

# อ่าน Reply history

ทุก reply ถูกบันทึกที่มา — KB ที่ใช้ ความจำลูกค้าที่อ้างอิง ระดับความมั่นใจ ใช้แก้ปัญหารายตัว หรือดู trend ภาพรวมของทีม
`),
      en: trim(`
# The four levers

When an AI reply isn't quite right, the fix is almost always in one of these:

1. **Brand voice** (Admin → Brand voice). Voice, formality, language, sign-off, forbidden + required phrases. Applied as a system prompt before every reply.
2. **Knowledge base** (Admin → Knowledge). Articles AI cites for product / policy questions. Out-of-date KB → wrong answers.
3. **Memory** (Admin → Memory). The customer-specific notes the AI uses to personalize. Wrong memory → wrong personalization. Archive or contradict to fix.
4. **Confidence threshold** (workspace settings). Where auto-reply ends and approval begins.

# When AI replies are too generic

→ The KB is thin or missing the policy in question. Open Admin → Knowledge → New article. Write the policy as if you were teaching a new agent. Embed automatic.

# When AI replies are too eager

→ Lower the auto-reply threshold from 90 → 95. Auto-rate drops; team draft load increases; customer-perceived quality goes up.

# When AI replies are too conservative

→ Either the threshold is set too high, or the KB doesn't cover the question. Check **Reply history** for that thread — if the AI is hedging with "ขออนุญาตเช็คให้นะคะ", it's uncertain. Add a KB article and watch the next reply.

# When the AI sounds wrong

→ Brand voice isn't tight enough. Add specific forbidden phrases (e.g., "100% sure", "rush") and required phrases (your tone signature). Add custom instructions for any quirk: "Always offer free shipping mention for orders ≥ ฿800."

# When the AI says wrong things about a customer

→ Open the customer's profile from the inbox. Memory sidebar shows what the AI is using. Contradicted-by-newer info? Click contradict on the older row. Memory it shouldn't have at all? Click archive.

# Reading Reply history

Every reply records what it was based on — which KB articles, which customer memories, how confident the AI was. Use it to debug a specific reply or to spot-check trends across your team.
`),
    },
  },

  {
    slug: 'brand-voice',
    category: 'ai',
    readMinutes: 3,
    demoHref: '/try/admin/brand',
    title: {
      th: 'เขียน brand voice ที่ AI ทำตามจริง ๆ',
      en: 'Writing a brand voice the AI will actually follow',
    },
    summary: {
      th: 'pattern + ตัวอย่างที่อยู่รอด 1,000 reply ไม่ใช่ adjective คลุมเครือ',
      en: 'Concrete patterns and examples that survive 1,000 AI replies — not vague adjectives.',
    },
    body: {
      th: trim(`
# Brand voice คลุมเครือ = drift

"Friendly, professional, helpful" ไม่ได้กำหนดอะไรเลย AI จะเฉลี่ยเป็น tone retail ไทยทั่วไป ตึงด้วย pattern ที่จับต้องได้

# สิ่งที่ work

- **Forbidden phrases** — คำที่ไม่อยากใช้เลย "100% guarantee", "rush", สัญญาเกินจริง AI ถูกบอกให้หลีกเลี่ยง
- **Required phrases** — signature opener / closer / acknowledgement เช่น "ขออนุญาตเช็คให้นะคะ" ก่อน factual claim AI ใส่เมื่อ relevant
- **Sign-off** — close consistent หนึ่งแบบ "ทีม Klin Skin" / "Klin Skin team" สร้าง brand recall
- **Custom instructions** — free-form behavior ที่ไม่ครอบคลุมข้างบน ตัวอย่างที่ใช้ได้:
  - "Always mention free shipping for orders ≥ ฿800."
  - "If a customer asks about a competitor, redirect without naming the competitor."
  - "When the customer is short with us, mirror their length — don't pad."

# สิ่งที่ไม่ work

- adjective ลอย ๆ ไม่มีตัวอย่าง ("warm but not gushing" — gushing เป็นยังไงในมุม LLM?)
- tone description เป็นภาษาอังกฤษเมื่อ brand เป็นไทย ใช้ตัวอย่างไทย
- กฎที่ขัดกัน "Be playful" + "be formal" → เลือก random ทุกรอบ

# Brand voice ตั้งต้น 5 นาที

\`\`\`
Voice:    friendly
Language: Thai
Formality: polite (ค่ะ/ครับ)
Emoji:    none
Sign-off: ทีม [Brand]

Required phrases:
  ขอบคุณค่ะ, ขออนุญาตเช็คให้นะคะ

Forbidden phrases:
  100% แน่นอน, rush, สบายใจได้

Custom instructions:
  Always offer free shipping mention for orders ≥ ฿800.
  When a customer apologizes or thanks effusively, mirror briefly and move on.
\`\`\`

พอควบคุม 90% ของ reply เริ่มจากตรงนี้ ปรับต่อ
`),
      en: trim(`
# Vague brand voice = drift

"Friendly. Professional. Helpful." doesn't constrain anything. The AI will average toward the most common Thai retail tone, which may or may not be yours. Tighten with concrete patterns.

# What works

- **Forbidden phrases**: words you would never use. "100% guarantee", "rush", anything with promise overhang. The AI is told to avoid these explicitly.
- **Required phrases**: signature openers / closers / acknowledgements. e.g. "ขออนุญาตเช็คให้นะคะ" before any factual claim. The AI tries to insert when relevant.
- **Sign-off**: one consistent close — "ทีม Klin Skin" / "Klin Skin team". Builds brand recall over time.
- **Custom instructions**: free-form behaviors not covered by the above. Examples that work:
  - "Always mention free shipping for orders ≥ ฿800."
  - "If a customer asks about a competitor, redirect to the closest matching product without naming the competitor."
  - "When the customer is short with us, mirror their length — don't pad."

# What doesn't work

- Adjectives without examples ("warm but not gushing" — what does gushing look like to an LLM?).
- Tone descriptions in English when the brand is Thai. Use Thai examples.
- Conflicting rules. "Be playful" + "be formal" picks one randomly each turn.

# A 5-minute starting brand voice

\`\`\`
Voice:    friendly
Language: Thai
Formality: polite (ค่ะ/ครับ)
Emoji:    none
Sign-off: ทีม [Brand]

Required phrases:
  ขอบคุณค่ะ, ขออนุญาตเช็คให้นะคะ

Forbidden phrases:
  100% แน่นอน, rush, สบายใจได้

Custom instructions:
  Always offer free shipping mention for orders ≥ ฿800.
  When a customer apologizes or thanks effusively, mirror briefly and move on.
\`\`\`

This is enough to constrain 90% of replies. Tune from there.
`),
    },
  },

  {
    slug: 'observability',
    category: 'governance',
    readMinutes: 3,
    demoHref: '/try/admin/ai-logs',
    title: {
      th: 'Reply history — ตามดูทุกคำตอบที่ AI ส่งออก',
      en: 'Reply history — track every reply the AI sends',
    },
    summary: {
      th: 'ทุก AI reply ถูกบันทึกพร้อมที่มา ใช้แก้ปัญหาและตรวจสอบความถูกต้องได้ตลอดเวลา',
      en: 'Every AI reply is logged with its sources, so you can audit and debug whenever you need.',
    },
    body: {
      th: trim(`
# ทุกคำตอบของ AI มีหลักฐาน

เวลา FlowAIOS ส่งคำตอบ (หรือร่างให้ทีมตรวจ) ระบบจะบันทึกไว้:

- มาจากแชทไหนของลูกค้าคนไหน
- AI ใช้ knowledge base และ customer memory ตัวไหนเป็นที่มา
- AI มั่นใจแค่ไหน (สูง / กลาง / ต่ำ)
- ใช้เวลานานแค่ไหน
- ส่งจริง หรือถูกทีมแก้ไข / ปฏิเสธ

ทั้งหมดดูได้ในหน้า **Admin → Reply history**

# เมื่อไหร่ที่ควรเปิดมาดู

- **ลูกค้าบ่นว่า AI ตอบผิด** — เปิดเรคคอร์ดของ reply นั้น ดูว่า AI ใช้ข้อมูลไหนเป็นที่มา แก้ KB หรือ memory ที่ทำให้คำตอบผิดพลาด
- **คำตอบช้าผิดปกติ** — กรองตามวันที่ ดูว่ามีอะไรเปลี่ยน
- **ทีมเริ่มแก้คำตอบ AI บ่อยขึ้น** — สัญญาณว่า brand voice หรือ KB ต้องอัปเดต
- **อยากดูภาพรวม** — สรุปรายเดือนแสดง รายการคำตอบที่ AI ส่งเอง vs. ที่ทีมต้องอนุมัติ vs. ที่ส่งต่อให้คน

# ที่ไม่ได้เก็บ (และทำไม)

FlowAIOS ไม่เก็บข้อความเต็มที่ส่งให้ AI ประมวลผล สองเหตุผล: (1) ทำให้ log ใหญ่เกินจำเป็น (2) อาจมีข้อความลูกค้าตรง ๆ ที่ควรหมดอายุพร้อมการสนทนาอื่น ๆ ใช้ trace ID ที่ติดมากับเรคคอร์ดเพื่อ recreate ข้อมูลได้เมื่อต้องการ

# เรื่อง privacy

ทุกเรคคอร์ดเคารพ **retention window** ของ org ของเก่าจะถูกลบอัตโนมัติ ไม่มีข้อมูลใน log ถูกแชร์กับใครภายนอก
`),
      en: trim(`
# Every AI reply leaves a paper trail

When FlowAIOS sends a reply (or drafts one for your team), it records:

- which customer thread it came from
- which knowledge base articles and customer memories the AI used
- how confident the AI was (high / medium / low)
- how long it took
- whether the reply was sent, edited by the team, or rejected

All of it lives under **Admin → Reply history**.

# When to look here

- **A customer complains a reply was off** — open the entry, see what the AI was working from, fix the underlying knowledge or memory.
- **Replies feel slower than usual** — filter by date, check what changed.
- **Team is editing AI replies more than before** — usually a sign brand voice or KB needs updating.
- **You want a monthly view** — summary breaks down which replies the AI sent alone vs. needed approval vs. were escalated to a human.

# What we don't store (and why)

FlowAIOS does not keep the full text we send the AI for processing. Two reasons: (1) it would balloon the log, and (2) it can contain verbatim customer messages that should expire with the rest of the conversation. The trace ID on each entry lets you reconstruct the same context if you ever need to.

# Privacy

Every entry respects your org's **retention window** — old entries purge automatically. Nothing in the log is shared with the AI provider.
`),
    },
  },

  {
    slug: 'pdpa',
    category: 'governance',
    readMinutes: 3,
    title: {
      th: 'PDPA — เก็บอะไร ควบคุม retention ยังไง',
      en: 'PDPA — what we collect, how to control retention',
    },
    summary: {
      th: 'compliance picture: residency, memory mode, retention windows, audit trail',
      en: 'The compliance picture: residency, memory mode, retention windows, and the audit trail.',
    },
    body: {
      th: trim(`
# สิ่งที่เก็บ

- **Conversations + messages** — ข้อความลูกค้า + reply พร้อม timestamp ใช้สำหรับ AI context และ team review
- **Customer memory** — fact ที่ extract จาก conversation (preference, allergy, complaint) ใช้ personalize
- **AI logs** — trace metadata ของทุก AI call ใช้ debug + audit
- **Audit log** — action ของ human + AI ใน org

ไม่เก็บ: payment info, ID card, ข้อมูลที่ไม่จำเป็น

# 3 โหมดของ memory

ตั้งใน Admin → PDPA:

- **Auto** (default): AI จดข้อเท็จจริงจากการคุยและบันทึกลง customer memory ทันที
- **Approval**: ข้อเท็จจริงเข้าคิวรออนุมัติ admin ต้องอนุมัติก่อนถึงจะเข้าหน่วยความจำจริง
- **Manual**: ปิดการจดของ AI ทั้งหมด memory ทุกแถวต้องใส่ด้วยมือเท่านั้น

# อายุการเก็บข้อมูล (Retention)

ตั้งได้ระดับ org:

- **Customer memory** — default 90 วัน หลังจากใช้ครั้งสุดท้าย
- **Inbox messages** — default 365 วัน
- **Audit log** — default 365 วัน

ของเก่ากว่ากำหนดถูกลบอัตโนมัติทุกคืน — ลบแล้วลบเลย ไม่มี undo ตั้ง window ให้ตรงกับ DPA ของคุณก่อนเริ่มขยาย

# Residency

3 ตัวเลือก:
- **TH** — ข้อมูลใน Supabase region ไทย default
- **SG** — region สิงคโปร์ สำหรับ brand SG
- **EU** — Frankfurt สำหรับ EU operation

เปลี่ยน residency ต้อง migrate workspace contact support@flowaios.com

# DPA template

ให้ DPA template ที่ครอบ PDPA (Thailand), GDPR และ Singapore PDPA เซ็นได้ใน Admin → PDPA → "Sign DPA" — บันทึกผู้เซ็นในเรคคอร์ดของ org คุณ
`),
      en: trim(`
# What we store

- **Conversations + messages**: the customer message and the reply, with timestamps. Required for AI context and team review.
- **Customer memory**: durable facts extracted from conversations (preferences, allergies, complaints). Required for personalization.
- **AI logs**: trace metadata for every AI call. Used for debugging + audit.
- **Audit log**: human and AI actions on the org's data.

We do not store: payment info, ID cards, or any data we don't need to operate.

# Three memory modes

Set in Admin → PDPA:

- **Auto** (default): facts extracted from conversations land in customer memory immediately.
- **Approval**: facts queue for review. An admin must approve each one before it reaches active memory.
- **Manual**: AI extraction is disabled entirely. Memory rows only land via direct admin entry.

# Retention windows

Configurable per org:

- **Customer memory** — default 90 days past last use.
- **Inbox messages** — default 365 days.
- **Audit log** — default 365 days.

Anything older purges automatically every night. Purge is destructive — there's no undo. Set the windows to match your DPA before you grow.

# Residency

Three options:
- **TH** — data lives in Thailand-region Supabase. Default.
- **SG** — data lives in Singapore-region. For SG-based brands.
- **EU** — Frankfurt region. For EU operations.

Switching residency requires a workspace migration. Contact support@flowaios.com.

# DPA template

We provide a signed Data Processing Agreement template that covers PDPA (Thailand), GDPR, and Singapore PDPA. Sign it via Admin → PDPA → "Sign DPA" — your signing user is recorded against your org.
`),
    },
  },

  {
    slug: 'knowledge-base',
    category: 'reference',
    readMinutes: 3,
    demoHref: '/try/admin/knowledge',
    title: {
      th: 'เขียน KB articles ที่ AI ใช้ได้จริง',
      en: 'Writing KB articles AI can actually use',
    },
    summary: {
      th: 'pattern ที่ทำให้ reply ตรงจุด ไม่ใช่ retrieve มาแล้วถูกข้าม',
      en: 'Patterns that consistently land in the right reply, vs patterns that get retrieved but ignored.',
    },
    body: {
      th: trim(`
# AI หาข้อมูลตามความหมาย ไม่ใช่ตามคำตรง ๆ

KB article จะถูกหยิบมาให้ AI ใช้ เมื่อคำถามลูกค้ามีความหมายใกล้กับ title + body ของบทความนั้น แต่จะ "เปลี่ยนคำตอบ" จริงไหม เป็นอีกเรื่อง — AI ต้องอ่านและตัดสินใจเองว่าเข้ากับคำถามจริง

แปลว่า: บทความสั้นและเจาะจงชนะ ส่วน PDF ยาว ๆ มักไม่ work

# สิ่งที่ work

**Title สะท้อนวิธีที่ลูกค้าถาม**
- ✅ "พัสดุถึงไหนแล้ว — เช็คเลข tracking ยังไง"
- ❌ "Order Tracking Procedure — Internal SOP v3.2"

**Body เป็น task-shaped**

\`\`\`
ลูกค้าถาม tracking →

1. ยืนยัน order number
2. ตรวจ OMS status ถ้า ship แล้ว แชร์ carrier + tracking
3. ถ้ายังไม่ ship แจ้งวันคาดว่า ship
4. แจ้งฟรีค่าส่งถ้า order ≥ ฿800

Sample reply:
"พัสดุของคุณ Order #X ส่งจาก Kerry แล้ว ETA พรุ่งนี้ tracking: EC1234567TH"
\`\`\`

AI ใช้ structure เป็น context AND ใช้ phrasing ตัวอย่าง

**1 topic ต่อ 1 article** "Shipping policy" article แยก "Refund policy" article อย่ารวม

# สิ่งที่ไม่ work

- เอกสาร policy ยาว multi-topic retrieval งงว่าย่อหน้าไหน apply
- ภาษา SOP ภายใน AI พยายาม customer-facing jargon ปนเปื้อน reply
- article ที่อธิบายเฉย ๆ ต้อง instruct

# Maintenance

- article ค้าง = reply ผิด หน้า Memory + Reply history flag pattern ที่ AI พูด "let me check" — มัก KB หาย / ค้าง
- archive ของเก่าเมื่อ publish ใหม่ AI ไม่ pull archived row
- 30+ articles เพียงพอสำหรับ brand ส่วนใหญ่ มากกว่านั้น retrieval มี noise consolidate
`),
      en: trim(`
# AI matches by meaning, not exact words

A KB article gets surfaced to the AI when the customer's question is close in meaning to the article's title + body. Whether it actually changes the reply is a separate problem — the AI has to read the article and decide it's relevant.

That means: short, specific articles win. Long PDFs lose.

# What works

**Title that mirrors how customers ask the question.**
- ✅ "พัสดุถึงไหนแล้ว — เช็คเลข tracking ยังไง"
- ❌ "Order Tracking Procedure — Internal SOP v3.2"

**Body that's task-shaped.**

\`\`\`
Customer asks for tracking →

1. Confirm the order number.
2. Check OMS status. If shipped, share the carrier + tracking number.
3. If not shipped, give the expected ship date.
4. Free shipping reminder if order ≥ ฿800.

Sample reply:
"พัสดุของคุณ Order #X ส่งจาก Kerry แล้ว ETA พรุ่งนี้ tracking: EC1234567TH"
\`\`\`

The AI uses the structure as context AND reuses the sample phrasing.

**One topic per article.** "Shipping policy" article. Separate "Refund policy" article. Don't combine.

# What doesn't work

- Long policy documents with multiple topics. The retrieval ends up uncertain about which paragraph applies.
- Internal SOP language. The AI tries to be customer-facing; jargon contaminates replies.
- Articles that just describe — they need to instruct.

# Maintenance

- Stale articles cause wrong replies. The Memory and Reply history pages flag patterns where the AI says "let me check" — that's usually a missing or stale KB article.
- Archive old versions when you publish a new one. The AI won't pick up the old archived row.
- 30+ articles is plenty for most brands. Beyond that, retrieval gets noisy. Consolidate.
`),
    },
  },
];

export const HELP_BY_CATEGORY: Record<string, HelpArticle[]> = HELP_ARTICLES.reduce(
  (acc, a) => {
    (acc[a.category] ??= []).push(a);
    return acc;
  },
  {} as Record<string, HelpArticle[]>,
);

export const CATEGORY_LABEL: Record<HelpArticle['category'], BilingualString> = {
  'getting-started': { th: 'เริ่มต้น', en: 'Getting started' },
  channels: { th: 'ช่องทาง', en: 'Channels' },
  ai: { th: 'จูน AI', en: 'AI tuning' },
  memory: { th: 'Memory', en: 'Memory' },
  governance: { th: 'Governance & PDPA', en: 'Governance & PDPA' },
  reference: { th: 'อ้างอิง', en: 'Reference' },
};

export function findArticle(slug: string): HelpArticle | null {
  return HELP_ARTICLES.find((a) => a.slug === slug) ?? null;
}
