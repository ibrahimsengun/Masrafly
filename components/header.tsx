'use client';

import { signOutAction } from '@/actions/auth-actions';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { Button } from './ui/button';

export const Header = ({ user }: { user: User | null }) => {
  const isLoggedIn = !!user;
  const protectedLinks = isLoggedIn ? [{ url: '/sources', label: 'Sources' }] : [];
  return (
    <div className="flex flex-row justify-between items-center px-8 py-4 border-b mb-4">
      <div className="flex flex-row items-center gap-4">
        <h1>finance-track</h1>
        <div className="flex flex-row items-center gap-1">
          {protectedLinks.map((link) => (
            <Button variant="ghost" key={link.url}>
              <Link href={link.url}>{link.label}</Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        {isLoggedIn ? (
          <form>
            <Button variant="outline" formAction={signOutAction}>
              Sign Out
            </Button>
          </form>
        ) : (
          <Button>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
