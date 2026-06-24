import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center pb-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
