import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SignupForm } from './signup-form';

export default function SignupPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6">
      <Link
        href="/"
        className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-md border border-hairline bg-paper px-3 py-1.5 text-[13px] text-ink-2 transition-colors hover:border-warm/40 hover:text-ink sm:left-6 sm:top-6"
        aria-label="Back to FlowAIOS home"
      >
        <span aria-hidden>←</span>
        Back
      </Link>

      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-[14.5px] font-semibold tracking-[-0.012em] text-ink transition-opacity hover:opacity-80"
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
          <CardTitle className="text-2xl">Create account</CardTitle>
          <CardDescription>Start using FlowAIOS.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have one?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Want to look around first?{' '}
            <Link
              href="/try"
              className="font-medium text-warm hover:underline"
            >
              Try the merchant demo →
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
