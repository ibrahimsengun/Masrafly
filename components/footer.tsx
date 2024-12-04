'use client';

import { usePathname } from 'next/navigation';

export const Footer = () => {
  const pathname = usePathname();
  const isSignIn = pathname == '/sign-in';
  if (isSignIn) return;

  return (
    <footer className="flex justify-center p-4 text-sm border-t h-[60px] mt-4">
      develop by
      <a
        href="https://github.com/ibrahimsengun"
        target="_blank"
        style={{ textDecoration: 'underline', marginLeft: '4px' }}
      >
        ibrahimsengun
      </a>
    </footer>
  );
};
