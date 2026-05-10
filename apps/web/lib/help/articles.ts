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
# 5 สถานะของ memory ทุกแถว

<Figure name="memory-lifecycle" />

ทุก memory row อยู่ใน 1 ใน 5 สถานะ:

- **Active** — AI ใช้งานจริงใน retrieval แถวที่ score สูงโผล่ขึ้นก่อน
- **Low confidence** — auto-demote เมื่อ confidence < 0.3 + ใช้ 0 ครั้ง + อายุ > 14 วัน hide จาก retrieval แต่ admin ยังเห็น
- **Contradicted** — ข้อมูลใหม่จากลูกค้า override เก็บไว้เป็น audit trail ไม่กลับมาใช้อีก
- **Merged** — duplicate ของแถว active อื่น (cosine similarity ≥ 0.92) hide ไว้ canonical row รับ use_count ไป
- **Archived** — admin archive ด้วยมือ หรือ low-confidence + อายุ > 60 วัน

# สูตร score

\`\`\`
score = 0.5 × confidence
      + 0.3 × min(1, use_count / 10)
      + 0.2 × recency_decay(60d)
\`\`\`

คำนวณใหม่ทุกคืน ตอน retrieval rank ด้วย \`(distance − 0.05 × score)\` — แถวที่ใช้บ่อยจะเด่นกว่า similarity ปกติเล็กน้อย

# งานที่รันทุกคืน

cron job เดินทุก org แล้วทำ:

1. **Dedup** — แถว active คู่ที่ cosine ≥ 0.92, ลูกค้าเดียวกัน + kind เดียวกัน loser → merged
2. **Recompute** — score ใหม่ตามสูตรข้างบน
3. **Auto-archive** — low-confidence row อายุ > 60 วัน → archived
4. **Promotion detection** — fact ที่ปรากฏใน ≥ 4 ลูกค้า → candidate lesson ขึ้นใน Admin → Memory

# เมื่อไหร่ override ด้วยมือ

- memory บอกข้อมูลผิด → กด **contradict**
- ลูกค้าเปลี่ยนความชอบ (ย้ายเมือง / ไม่แพ้แล้ว) → contradict ของเก่า รอ AI extract ของใหม่
- memory ห่วยเยอะจาก conversation noisy 1 อัน → **archive** เป็นกลุ่ม

# Promotion เป็น lesson ระดับองค์กร

เมื่อ AI เห็น fact เดียวกันใน 4+ ลูกค้า (เช่น "ถามเรื่อง Kerry redelivery") มันไม่ใช่เรื่องส่วนตัวแล้ว เป็น brand pattern ขึ้นใน Admin → Memory → Promotion candidates กดครั้งเดียว → กลายเป็น Lesson ที่อาจกลายเป็น auto-rule ต่อไป
`),
      en: trim(`
# The five states

<Figure name="memory-lifecycle" />

Every memory row has one of:

- **Active** — used in retrieval. Top-scored memories surface first.
- **Low confidence** — auto-demoted from active when confidence < 0.3 + zero uses + age > 14 days. Hidden from retrieval but still visible in admin.
- **Contradicted** — newer info from the customer overrode it. Stays as audit trail; never resurfaces.
- **Merged** — near-duplicate of another active memory (cosine similarity ≥ 0.92). The duplicate is hidden, the canonical row absorbs the use_count.
- **Archived** — manually archived by an admin, or low-confidence + age > 60d. Hidden everywhere except admin restore.

# The score formula

\`\`\`
score = 0.5 × confidence
      + 0.3 × min(1, use_count / 10)
      + 0.2 × recency_decay(60d)
\`\`\`

Recomputed nightly. At retrieval time, we rank by \`(distance − 0.05 × score)\` so well-used facts get a small boost over their raw similarity.

# What happens nightly

A cron job runs every org through:

1. **Dedup** — pairs of active memories at cosine ≥ 0.92, same customer + kind. Loser gets \`merged\`.
2. **Recompute** — scores updated using the formula above.
3. **Auto-archive** — low-confidence rows older than 60 days move to archived.
4. **Promotion detection** — same fact across ≥ 4 distinct customers becomes a candidate org-wide lesson, surfaced in Admin → Memory.

# When to override manually

- A memory says something wrong about the customer → **contradict** it.
- The customer's preferences changed (moved cities, no longer allergic) → click contradict on the old row; the next AI extraction picks up the new preference.
- A flood of low-quality memories from a single noisy conversation → **archive** in bulk.

# Promotion to org-wide lesson

When the AI sees the same fact across 4+ distinct customers (e.g., "asks about Kerry redelivery"), it stops being personal and becomes a brand pattern. Surfaced in Admin → Memory → Promotion candidates. One click promotes to a Lesson, where it can become an auto-rule.
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

→ threshold สูงเกิน หรือ KB ไม่ครอบคลุม ดู AI logs ของ thread นั้น ถ้า reply เป็น "ขออนุญาตเช็คให้นะคะ" → AI ไม่มั่นใจ เพิ่ม KB article แล้วดู reply ครั้งหน้า

# เมื่อ AI พูดผิดตัว

→ Brand voice ยังหลวมไป เพิ่ม forbidden phrases ที่เจาะจง (เช่น "100% sure", "rush") + required phrases ที่เป็น signature ของแบรนด์ ใส่ custom instructions สำหรับ quirk เฉพาะ: "Always offer free shipping mention for orders ≥ ฿800"

# เมื่อ AI พูดผิดเรื่องลูกค้า

→ เปิด customer profile จาก inbox memory sidebar แสดงว่า AI กำลังใช้อะไร ของเก่าที่ขัดกับใหม่ → contradict memory ที่ไม่ควรมี → archive

# อ่าน AI logs

แต่ละ reply เก็บ: trace ID, model, latency, KB hits, memory hits, provider attempts (Gemini → Claude fallback), confidence ใช้ debug reply เฉพาะ หรือดู trend — latency creep ขึ้น หรือ fallback rate spike → upstream เปลี่ยน
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

→ Either the threshold is set too high, or the KB doesn't cover the question. Check the **AI logs** for that thread — if the reply is escalating with "ขออนุญาตเช็คให้นะคะ", the model is uncertain. Add a KB article and watch the next reply.

# When the AI sounds wrong

→ Brand voice isn't tight enough. Add specific forbidden phrases (e.g., "100% sure", "rush") and required phrases (your tone signature). Add custom instructions for any quirk: "Always offer free shipping mention for orders ≥ ฿800."

# When the AI says wrong things about a customer

→ Open the customer's profile from the inbox. Memory sidebar shows what the AI is using. Contradicted-by-newer info? Click contradict on the older row. Memory it shouldn't have at all? Click archive.

# Reading AI logs

Each reply persists with: trace ID, model used, latency, KB hits, memory hits, provider attempts (e.g., Gemini → Claude fallback), confidence. Use it to debug a specific reply or to spot-check trends — if average latency is creeping up or fallback rate spikes, something upstream changed.
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
      th: 'Observability — แต่ละ row ใน ai_logs หมายถึงอะไร',
      en: 'Observability — what every ai_logs row means',
    },
    summary: {
      th: 'อ่านหน้า AI logs ยังไงเมื่อมีเรื่องผิดปกติ',
      en: 'How to read the AI logs page when something looks off.',
    },
    body: {
      th: trim(`
# แต่ละ row คือ AI call หนึ่งครั้ง

ฟิลด์:
- **kind**: \`reply_suggest\` (เส้นทางหลัก) · \`memory_extract\` · \`escalate_check\` · \`summarize\` · \`sentiment\` · \`translate\`
- **model**: LLM ที่ตอบ \`gemini-2.5-flash\` คือ primary; \`claude-haiku-4-5-*\` คือ fallback firing
- **latency**: ms end-to-end > 2000ms = ช้า
- **conversationId**: jump ไปที่ thread
- **response.trace_id**: cross-reference กับ logs และ memory writes
- **response.kb_hits**: KB articles ที่ AI อ้างอิง
- **response.memory_hits**: memory rows ของลูกค้าที่ดึงมา
- **response.provider_attempts**: provider chain (เช่น \`["gemini","anthropic"]\` แปลว่า Gemini fail แล้ว Claude มาช่วย)
- **response.used_summary**: true เมื่อ conversation ยาวพอที่ต้องสรุป turn เก่า
- **response.confidence**: AI ให้คะแนนตัวเอง drives gating tier
- **accepted**: ส่งจริงไหม false = escalate / blocked / agent reject

# เมื่อไหร่มาดูที่นี่

- ลูกค้าบ่นว่า reply ผิด → หา row ตรวจ kb_hits + memory_hits
- latency spike → filter by date ดูว่าตรงกับ model change ไหม
- fallback rate ค่อย ๆ ขึ้น → Gemini อาจ outage harness handle ได้แต่ค่าแพงขึ้น
- acceptance rate ตก → AI useful น้อยลง ตรวจ brand voice + KB ที่เพิ่งแก้

# ที่ไม่เห็น (และทำไม)

ตั้งใจไม่เก็บ full prompt ที่ส่ง model ใน ai_logs จะ bloat log + เก็บ verbatim customer message Trace IDs ใช้ replay context window เดียวกัน reconstruct prompt ได้ถ้าจำเป็น
`),
      en: trim(`
# Each row is one AI call

Fields:
- **kind**: \`reply_suggest\` (the main path) · \`memory_extract\` · \`escalate_check\` · \`summarize\` · \`sentiment\` · \`translate\`.
- **model**: the LLM that handled it. \`gemini-2.5-flash\` is primary; \`claude-haiku-4-5-*\` indicates a fallback fired.
- **latency**: end-to-end ms. > 2000ms is slow.
- **conversationId**: jump to the thread this row contributed to.
- **response.trace_id**: cross-reference with logs and downstream memory writes.
- **response.kb_hits**: which KB articles the AI cited.
- **response.memory_hits**: which customer memory rows were retrieved.
- **response.provider_attempts**: the provider chain (e.g. \`["gemini","anthropic"]\` means Gemini failed and Claude saved the day).
- **response.used_summary**: true when the conversation was long enough to compress older turns into a summary.
- **response.confidence**: AI's self-rated confidence; drives the gating tier.
- **accepted**: whether the reply was actually sent. False = escalated, blocked, or rejected by the human.

# When to look here

- Customer complains about a wrong reply → find the row, check kb_hits + memory_hits to understand what the AI saw.
- Latency spike → filter by date, see if a model change correlates.
- Fallback rate creeping up → Gemini may be having an outage. The harness handles it but rising fallback = rising costs.
- Acceptance rate drops → the AI is suddenly less useful; check brand voice + KB for recent changes.

# What you can't see (and why)

We deliberately don't store the full prompt sent to the model in ai_logs. It would bloat the log and contain (in some cases) verbatim customer messages. Trace IDs let you reconstruct the prompt by replaying the same context window if you need to.
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

# 3 modes ของ memory

ตั้งใน Admin → PDPA:

- **Auto** (default): fact extract แล้ว land ใน customer memory ทันที
- **Approval**: fact คิวใน \`pending_facts\` admin ต้อง approve ก่อนเข้า active memory
- **Manual**: AI extraction ปิด memory rows มีจาก admin ใส่เองเท่านั้น

# Retention windows

ตั้ง per org:

- **memory_retention_days** (default 90) customer memory เก่ากว่านี้ purge ทุกคืน
- **inbox_retention_days** (default 365) message เก่ากว่านี้ purge
- **audit_retention_days** (default 365) audit entries เก่ากว่านี้ purge

Purge เป็น destructive — ไม่มี undo ตั้ง window ตาม DPA ก่อนโต

# Residency

3 ตัวเลือก:
- **TH** — ข้อมูลใน Supabase region ไทย default
- **SG** — region สิงคโปร์ สำหรับ brand SG
- **EU** — Frankfurt สำหรับ EU operation

เปลี่ยน residency ต้อง migrate workspace contact support@flowaios.com

# DPA template

ให้ DPA template ที่ครอบ PDPA, GDPR, Singapore PDPA ผ่าน Admin → PDPA → "Sign DPA" — เพิ่ม signing user ลง org_pdpa_settings
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
- **Approval**: facts queue in \`pending_facts\`. An admin must approve each one before it reaches active memory.
- **Manual**: AI extraction is disabled entirely. Memory rows only land via direct admin entry.

# Retention windows

Per org, configurable:

- **memory_retention_days** (default 90). Customer memory older than this is purged nightly.
- **inbox_retention_days** (default 365). Messages older than this are purged.
- **audit_retention_days** (default 365). Audit log entries older than this are purged.

Purge is destructive — there's no undo. Set the windows to match your DPA before you grow.

# Residency

Three options:
- **TH** — data lives in Thailand-region Supabase. Default.
- **SG** — data lives in Singapore-region. For SG-based brands.
- **EU** — Frankfurt region. For EU operations.

Switching residency requires a workspace migration. Contact support@flowaios.com.

# DPA template

We provide a signed Data Processing Agreement template that covers PDPA, GDPR, and Singapore PDPA. Available via Admin → PDPA → "Sign DPA" — adds your signing user to the org_pdpa_settings row.
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
# AI retrieve ตาม similarity reply ตามความเข้าใจ

KB article ถูก pull เข้า context ของ AI เมื่อคำถามลูกค้า similar กับ title + body (cosine over embedding) จะเปลี่ยน reply จริงไหม เป็นอีกเรื่อง — AI ต้อง read แล้วตัดสินใจว่า relevant

แปลว่า: short + specific articles ชนะ long PDFs แพ้

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

- article ค้าง = reply ผิด หน้า Memory + AI logs flag pattern ที่ AI พูด "let me check" — มัก KB หาย / ค้าง
- archive ของเก่าเมื่อ publish ใหม่ AI ไม่ pull archived row
- 30+ articles เพียงพอสำหรับ brand ส่วนใหญ่ มากกว่านั้น retrieval มี noise consolidate
`),
      en: trim(`
# AI retrieves by similarity, replies by understanding

A KB article gets pulled into the AI's context when the customer's question is similar to the article's title + body (cosine similarity over the embedding). Whether it actually changes the reply is a separate problem — the AI has to read it and decide it's relevant.

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

- Stale articles cause wrong replies. The Memory and AI logs surfaces flag patterns where the AI says "let me check" — that's usually a missing or stale KB article.
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
