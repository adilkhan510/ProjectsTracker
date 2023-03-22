import '@/styles/global.css';
import { Inter } from '@next/font/google';
import Sidebar from '@/components/Sidebar';
import clsx from 'clsx';
import GlassContainer from '@/components/GlassContainer';

export interface DashboardRootLayoutProps {
  children: React.ReactNode;
}

export default function DashboardRootLayout({
  children,
}: DashboardRootLayoutProps) {
  return (
    <html lang='en' className={clsx('dark')}>
      <head />
      <body className='h-screen w-screen candy-mesh p-6'>
        <GlassContainer className='w-full h-full p-6 flex align-center container mx-auto'>
          <Sidebar />
          <main className='w-full pl-6 h-full'>{children}</main>
        </GlassContainer>
      </body>
    </html>
  );
}
