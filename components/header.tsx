'use client';

import { ThemeSwitcher } from './theme-switcher';

export const Header = () => {
  return (
    <div className="flex flex-row items-center h-12 border-b">
      <ThemeSwitcher />
    </div>
  );
};
