import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { demoTeam } from '@/lib/demo-merchant/seed';

export const dynamic = 'force-dynamic';

export default function TryTeamPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Team</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {demoTeam.length} members in this demo workspace.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Members</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {demoTeam.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-warm-soft font-medium text-warm">
                    {m.name[0]}
                  </div>
                  <div>
                    <p className="font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded bg-paper-2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                    {m.role}
                  </span>
                  <time className="text-xs text-muted-foreground">{m.joined}</time>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
