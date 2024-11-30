'use client';

import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from './theme-switcher';

export const Footer = () => {
  const pathname = usePathname();
  const isSignIn = pathname == '/sign-in';
  if (isSignIn) return;

  return (
    <footer className="flex flex-row justify-evenly items-center p-4 text-sm border-t h-[60px] mt-8">
      <span />
      <span>
        develop by
        <a
          href="https://github.com/ibrahimsengun"
          target="_blank"
          style={{ textDecoration: 'underline', marginLeft: '4px' }}
        >
          ibrahimsengun
        </a>
      </span>
      <ThemeSwitcher />
    </footer>
  );
};
