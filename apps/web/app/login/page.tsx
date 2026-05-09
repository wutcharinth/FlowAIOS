import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from './login-form';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const search = await searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-[14.5px] font-semibold tracking-[-0.012em] text-ink transition-opacity hover:opacity-80"
        aria-label="Back to FlowAIOS home"
      >
        <img
          src="/flowaios-logo.png"
          alt=""
          aria-hidden
          width={24}
          height={24}
          className="h-6 w-6 shrink-0"
        />
        FlowAIOS
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>Welcome back to FlowAIOS.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm next={search.next ?? '/inbox'} initialError={search.error ?? null} />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            No account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
