'use client'

import { Geist, Geist_Mono } from "next/font/google";
import dynamic from 'next/dynamic';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { CartSidebar } from "./components/features/Cart/CartSidebar";
import { LoginModal } from "./components/OAuth/LoginModal";
import "./globals.css";

const Header = dynamic(() => import('./components/Header').then(mod => mod.Header), { ssr: false });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <div className="app min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
              <CartSidebar />
              <LoginModal />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}