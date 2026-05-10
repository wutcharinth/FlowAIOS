export const dynamic = 'force-dynamic';

export default function TryInboxIndexPage() {
  return (
    <div className="flex h-full items-center justify-center px-8 py-16">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-warm-soft text-2xl text-warm">
          ✦
        </div>
        <h2 className="text-[16px] font-semibold">Select a conversation</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          Pick a thread from the list to read the full message history,
          customer profile, and AI memory. Filter by status or channel
          using the tree on the left.
        </p>
      </div>
    </div>
  );
}
