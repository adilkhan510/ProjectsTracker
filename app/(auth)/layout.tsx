import GlassContainer from '@/components/GlassContainer';
import '@/styles/global.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export interface AuthRootLayoutProps {
  children: React.ReactNode;
}

export default function AuthRootLayout({ children }: AuthRootLayoutProps) {
  return (
    <html lang='en' className={inter.variable}>
      <head />
      <body className='h-screen w-screen rainbow-mesh p-6'>
        <GlassContainer className='w-full h-full flex items-center justify-center'>
          {children}
        </GlassContainer>
      </body>
    </html>
  );
}
