import { NextResponse } from 'next/server';
import { z } from 'zod';
import { harnessGenerate } from '@/lib/ai/harness';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PostSchema = z.object({
  org: z.string().min(1).max(40),
  message: z.string().trim().min(1).max(2000),
});

const SYSTEM = `You are a helpful customer-service AI for a brand using FlowAIOS as their
customer-ops platform. Reply in the same language the customer used (Thai or English).
Be concise (2-4 lines). Polite Thai retail tone with ค่ะ / ครับ when answering in Thai.
If you don't know an answer, say so politely and offer to flag a teammate. Never claim to be
a real human.`;

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY && !process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      {
        ok: false,
        reply:
          'AI service is offline at the moment. The team will follow up — please leave your contact and we will reach out.',
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  const parsed = PostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  try {
    const res = await harnessGenerate({
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: parsed.data.message },
      ],
      temperature: 0.5,
      maxTokens: 500,
    });
    return NextResponse.json({ ok: true, reply: res.text.trim() });
  } catch (err) {
    console.error('widget messages error', err);
    return NextResponse.json(
      { ok: false, reply: 'Sorry, I had trouble reaching the AI. Please try again.' },
      { status: 500 },
    );
  }
}
