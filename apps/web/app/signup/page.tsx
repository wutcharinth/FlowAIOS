import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SignupForm } from './signup-form';

export default function SignupPage() {
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
        </CardContent>
      </Card>
    </main>
  );
}
