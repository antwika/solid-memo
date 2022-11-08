/* eslint-disable @next/next/no-head-element */
import '@/styles/globals.css';
import Header from 'components/Header';

export default async function RootLayout({ children }: { children: any }) {
  return (
    <html>
      <head>
        <title>Solid Memo</title>
      </head>
      <body className='flex flex-col h-screen'>
        <header className='w-full'>
          <Header />
        </header>
        <main className='overflow-y-auto flex flex-grow bg-slate-200'>
          <div className='container mx-auto p-4 bg-slate-50 shadow-2xl'>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
