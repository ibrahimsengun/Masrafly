import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { createClient } from '@/utils/supabase/server';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'finance-track | Personal Finance Management',
  description: 'Easily track your income and expenses, reach your financial goals'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header user={user} />
          <main className="flex flex-col justify-start items-start min-h-[calc(100vh-140px)] py-8 container mx-auto">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
