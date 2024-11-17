'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import SignInWithGoogleForm from '@/forms/sign-in-with-google-form';

export default function SignIn() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold mb-2">Welcome to FinanceTrack</CardTitle>
          <p className="text-muted-foreground">Manage your finances with ease</p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-24 h-24">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </CardContent>
        <CardContent>
          <SignInWithGoogleForm />
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          <p>We use Google for secure login and never store your credentials.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
