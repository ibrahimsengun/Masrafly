'use client';

import { signOutAction } from '@/actions/auth-actions';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthButton from './auth-button';
import { Button } from './ui/button';

export const Header = ({ user }: { user: User | null }) => {
  const pathname = usePathname();
  const isSignIn = pathname == '/sign-in';
  if (isSignIn) return;

  const isLoggedIn = !!user;
  const protectedLinks = isLoggedIn
    ? [
        { url: '/dashboard', label: 'Dashboard' },
        { url: '/sources', label: 'Sources' },
        { url: '/categories', label: 'Categories' }
      ]
    : [];
  return (
    <header className="border-b py-4 h-[80px] mb-8">
      <div className="flex flex-row justify-between items-center container mx-auto ">
        <div className="flex flex-row items-center gap-4">
          <h1 className="border-r pr-6">finance-track</h1>
          <div className="flex flex-row items-center gap-1">
            {protectedLinks.map((link) => (
              <Link href={link.url} key={link.url}>
                <Button variant="ghost">{link.label}</Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          {isLoggedIn ? (
            <>
              <AuthButton user={user} />
              <form>
                <Button variant="outline" formAction={signOutAction}>
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <Button>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
