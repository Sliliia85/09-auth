import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Roboto } from 'next/font/google';
import { AuthProvider } from '@/components/AuthProvider/AuthProvider';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'], 
  weight: ['400', '500', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});


export const metadata: Metadata = {
  title: 'Notes App',
  description: 'Manage your notes efficiently',
  openGraph: {
    title: 'Notes App',
    description: 'Manage your notes efficiently',
    url: 'https://notes-app.com',
    siteName: 'Notes App',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Notes App Open Graph Image',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({ children, modal }: {children: React.ReactNode;modal?: React.ReactNode;}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={roboto.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TanStackProvider>
          <AuthProvider>
          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          {modal}
          <Footer />
            <Toaster position="top-right" reverseOrder={false} />
            </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}