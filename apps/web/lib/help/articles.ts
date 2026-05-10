/**
 * Help center articles. Markdown-ish content rendered as plain HTML by the
 * /help/[slug] page. Keep articles short (≤ 5 min read), task-shaped, and
 * link to the relevant /try/* page so a reader can see the feature live.
 */

export interface HelpArticle {
  slug: string;
  category: 'getting-started' | 'channels' | 'ai' | 'memory' | 'governance' | 'reference';
  title: string;
  summary: string;
  readMinutes: number;
  /** Plain text with simple markup: lines starting with #, ##, ###, -, > are special. */
  body: string;
  /** Optional pointer to a live-data demo page. */
  demoHref?: string;
}

export const HELP_ARTICLES: HelpArticle[] = [
  {
    slug: 'getting-started',
    category: 'getting-started',
    title: 'Getting started — what FlowAIOS does in 60 seconds',
    summary:
      'FlowAIOS is an AI admin for customer chats. It auto-replies when sure, drafts when unsure, and escalates when it matters.',
    readMinutes: 2,
    demoHref: '/try',
    body: `
# What it does

FlowAIOS unifies your customer chats from LINE OA, Shopee, TikTok Shop, Lazada, Instagram, Facebook, and Email into one inbox. An AI agent answers repetitive questions automatically when confident, drafts replies for your team to approve when unsure, and escalates important cases instantly.

# How the three tiers work

- **Auto-reply** when AI confidence ≥ 90%. The customer never waits.
- **Draft for approval** when 70–90%. Your team gets a pre-written reply they can send, edit, or discard in one click.
- **Escalate** when below 70%, or when keywords like "refund" / "แจ้งความ" appear, or when sentiment is strongly negative.

You decide the thresholds. You see every reply.

# What makes it different

1. **Brand-aware**. The AI sounds like your brand — voice, formality, sign-off, forbidden phrases — not like a generic chatbot.
2. **Self-improving memory**. The AI remembers each customer's preferences, allergies, complaints, tone. Across all channels. The memory ages out, dedupes, and supersedes itself automatically.
3. **Auditable**. Every AI reply has a trace ID with the KB articles + customer memories it cited, the model used, the latency, the confidence. You can debug a single reply or a 30-day trend.

# Next steps

- Walk through the [demo dashboard](/try/dashboard) and [inbox](/try/inbox) — same surfaces you'll see after signup.
- [Connect your real LINE OA](/help/connect-line) in 30 minutes when you're ready.
`.trim(),
  },
  {
    slug: 'connect-line',
    category: 'channels',
    title: 'Connect your LINE OA in 30 minutes',
    summary:
      'A step-by-step setup using LINE Developers Console + your FlowAIOS admin page. No code.',
    readMinutes: 5,
    demoHref: '/try/admin/integrations',
    body: `
# What you need

- LINE Official Account (already created — if not, register at https://www.linebiz.com)
- Admin access to your FlowAIOS workspace
- ~30 minutes

# Step 1 — Create a Messaging API channel

1. Go to https://developers.line.biz/console
2. Pick (or create) a Provider, then create a new **Messaging API** channel for your OA.
3. Note these values from the channel: **Channel secret** (Basic settings tab) and **Channel access token (long-lived)** (Messaging API tab). You'll paste both into FlowAIOS.

# Step 2 — Paste creds into FlowAIOS

1. In FlowAIOS, go to **Admin → Integrations**.
2. Paste the **Channel secret**.
3. Paste the **Channel access token**.
4. Optional: paste the **Bot user ID** (Messaging API tab → "Your user ID"). This routes the webhook to your org if you ever run multiple LINE channels.
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
`.trim(),
  },
  {
    slug: 'ai-tuning',
    category: 'ai',
    title: 'Tuning AI replies — confidence, retrieval, and what to nudge',
    summary:
      'How to make AI replies more conservative, more eager, or more on-brand without writing code.',
    readMinutes: 4,
    demoHref: '/try/admin/ai-logs',
    body: `
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
`.trim(),
  },
  {
    slug: 'brand-voice',
    category: 'ai',
    title: 'Writing a brand voice the AI will actually follow',
    summary:
      'Concrete patterns and examples that survive 1,000 AI replies — not vague adjectives.',
    readMinutes: 3,
    demoHref: '/try/admin/brand',
    body: `
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
`.trim(),
  },
  {
    slug: 'memory-lifecycle',
    category: 'memory',
    title: 'How memory lifecycle works — what to keep, what to forget',
    summary:
      'The rules FlowAIOS uses to score, dedup, supersede, archive, and promote customer memories.',
    readMinutes: 4,
    demoHref: '/try/admin/memory',
    body: `
# The five states

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
`.trim(),
  },
  {
    slug: 'observability',
    category: 'governance',
    title: 'Observability — what every ai_logs row means',
    summary:
      'How to read the AI logs page when something looks off.',
    readMinutes: 3,
    demoHref: '/try/admin/ai-logs',
    body: `
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
`.trim(),
  },
  {
    slug: 'pdpa',
    category: 'governance',
    title: 'PDPA — what we collect, how to control retention',
    summary:
      'The compliance picture: residency, memory mode, retention windows, and the audit trail.',
    readMinutes: 3,
    body: `
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
`.trim(),
  },
  {
    slug: 'knowledge-base',
    category: 'reference',
    title: 'Writing KB articles AI can actually use',
    summary:
      'Patterns that consistently land in the right reply, vs patterns that get retrieved but ignored.',
    readMinutes: 3,
    demoHref: '/try/admin/knowledge',
    body: `
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
`.trim(),
  },
];

export const HELP_BY_CATEGORY: Record<string, HelpArticle[]> = HELP_ARTICLES.reduce(
  (acc, a) => {
    (acc[a.category] ??= []).push(a);
    return acc;
  },
  {} as Record<string, HelpArticle[]>,
);

export const CATEGORY_LABEL: Record<HelpArticle['category'], string> = {
  'getting-started': 'Getting started',
  channels: 'Channels',
  ai: 'AI tuning',
  memory: 'Memory',
  governance: 'Governance & PDPA',
  reference: 'Reference',
};

export function findArticle(slug: string): HelpArticle | null {
  return HELP_ARTICLES.find((a) => a.slug === slug) ?? null;
}
