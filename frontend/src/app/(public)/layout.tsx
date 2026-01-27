'use client'

import dynamic from 'next/dynamic';
import { Footer } from '../components/public/Footer';
import { CartSidebar } from "../components/features/Cart/CartSidebar";
import { LoginModal } from "../components/public/LoginModal";

const Header = dynamic(() => import('../components/public/Header').then(mod => mod.Header), { ssr: false });

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <CartSidebar />
      <LoginModal />
    </div>
  );
}