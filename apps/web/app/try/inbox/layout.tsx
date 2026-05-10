import { Suspense } from 'react';
import { InboxColumns } from '@/components/inbox/InboxColumns';

export default function TryInboxLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <InboxColumns>{children}</InboxColumns>
    </Suspense>
  );
}
