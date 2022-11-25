/* eslint-disable @next/next/no-head-element */
import NextAuthSessionProvider from 'src/components/NextAuthSessionProvider';
import '@/styles/globals.css';
import Header from 'src/components/Header';
import { unstable_getServerSession as unstableGetServerSession } from 'next-auth/next';

export default async function RootLayout({ children }: { children: any }) {
  const session = await unstableGetServerSession();

  return (
    <html>
      <head>
        <title>Solid Memo</title>
      </head>
      <body className='flex flex-col h-screen'>
        <NextAuthSessionProvider session={session}>
          <header className='w-full'>
            <Header />
          </header>
          <main className='overflow-y-auto flex flex-grow bg-slate-200'>
            <div className='container mx-auto p-4 bg-slate-50 shadow-2xl'>
              {children}
            </div>
          </main>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
