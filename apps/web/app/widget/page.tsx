import { WidgetChat } from './widget-chat';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'FlowAIOS Web Chat',
  robots: { index: false, follow: false },
};

/**
 * Public chat-widget iframe target.
 *
 * Embedded by /widget.js into the bottom-right of the merchant's website.
 * No app-shell — pure chat surface meant to render inside an iframe.
 *
 * Auth: none. Rate-limited at the API layer
 * (apps/web/app/api/widget/messages/route.ts).
 */

export default async function WidgetPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string; brand?: string; greeting?: string }>;
}) {
  const params = await searchParams;
  const org = params.org ?? 'demo';
  const brand = params.brand ?? 'FlowAIOS demo';
  const greeting =
    params.greeting ??
    'สวัสดีค่ะ มีอะไรให้ช่วยไหมคะ · Hi! How can we help?';

  return <WidgetChat org={org} brand={brand} greeting={greeting} />;
}
