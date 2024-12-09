'use client';

import { User } from '@supabase/supabase-js';
import { AlignJustify, ChartNoAxesGantt, Rainbow, Wallet } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import AuthButton from './auth-button';
import DateChanger from './date-changer';
import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { Separator } from './ui/separator';

export const Header = ({ user }: { user: User | null }) => {
  const pathname = usePathname();
  const isSignIn = pathname == '/sign-in';
  if (isSignIn) return;

  const isLoggedIn = !!user;
  const protectedLinks = isLoggedIn
    ? [
        { url: '/dashboard', label: 'Dashboard', icon: <ChartNoAxesGantt /> },
        { url: '/sources', label: 'Sources', icon: <Wallet /> },
        { url: '/categories', label: 'Categories', icon: <Rainbow /> }
      ]
    : [];
  const MobileHeader = () => {
    return (
      <div className="md:hidden container mx-auto flex flex-row justify-between items-center">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">
              <AlignJustify />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-[200px]">
            <DrawerTitle className="hidden">Menu</DrawerTitle>
            <div className="flex flex-col gap-2">
              <Link href="/">
                <h1 className="text-lg px-4 pt-4 pb-2">Masrafly</h1>
              </Link>
              <Separator />
              {protectedLinks.map((link) => (
                <React.Fragment key={link.url}>
                  <Link href={link.url} className="flex flex-row gap-4 items-center px-4 ">
                    {link.icon} {link.label}
                  </Link>
                  <Separator />
                </React.Fragment>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
        <Link href="/">
          <h1 className="text-2xl">Masrafly</h1>
        </Link>
        <div className="flex flex-row gap-2 items-center justify-end">
          {isLoggedIn ? (
            <AuthButton user={user} />
          ) : (
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    );
  };
  return (
    <header className="border-b py-2 h-[60px] md:h-[80px] mb-4 flex items-center">
      <MobileHeader />
      <div className="hidden md:flex flex-row justify-between items-center container mx-auto">
        <div className="flex flex-row items-center gap-4">
          <Link href="/">
            <h1 className="text-2xl border-r pr-6 underline">Masrafly</h1>
          </Link>
          <div className="flex flex-row items-center gap-1">
            {protectedLinks.map((link) => (
              <Link href={link.url} key={link.url}>
                <Button variant="ghost">{link.label}</Button>
              </Link>
            ))}
          </div>
        </div>
        {isLoggedIn && (
          <div>
            <DateChanger className="border-x px-4 gap-4" />
          </div>
        )}
        <div className="flex flex-row gap-2 items-center">
          {isLoggedIn ? (
            <AuthButton user={user} />
          ) : (
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
