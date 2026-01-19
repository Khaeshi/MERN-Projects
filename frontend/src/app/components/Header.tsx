'use client';

import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';  // Add ShoppingCart import
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';  // Add useCart import
import Image from 'next/image'

const navItems = ['Home', 'Shop', 'About', 'Contact'];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { cart, toggleCart } = useCart();  // Add cart and toggleCart from context

  const currentPage = pathname === '/shop' ? 'shop' : 'home';
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);  // Calculate count

  const handleNavClick = (item: string) => {
    if (item === 'Shop') {
      router.push('/shop');
    } else {
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById(item.toLowerCase());
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-black text-white py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <Image
              src="/favicon.ico"  // Path to favicon in public folder
              alt="Cafe Prince Logo"
              width={48}  // Adjust size as needed
              height={48}
              className="w-full h-full object-contain"  // Ensures it fits
            />
          </div>
          <div className="text-xl tracking-wider leading-tight">
            <div>CAFE</div>
            <div>PRINCE</div>
          </div>
        </div>

        {/* Desktop Navigation with Conditional Cart Icon */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Cart Icon - Only on /menu, left of Home */}
          {pathname === '/shop' && (
            <div className="relative">
              <ShoppingCart
                size={28}
                className="text-white hover:text-gray-300 cursor-pointer"
                onClick={toggleCart}  // Toggle the sidebar
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>
          )}
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`text-white hover:text-gray-300 transition-colors tracking-wide ${
                (item === 'Shop' && currentPage === 'shop') || 
                (item === 'Home' && currentPage === 'home') ? 'border-b-2 border-white' : ''
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-gray-800 rounded transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden mt-4 pb-4 border-t border-gray-700">
          <div className="flex flex-col gap-4 pt-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-white hover:text-gray-300 transition-colors tracking-wide px-2 text-left ${
                  (item === 'Shop' && currentPage === 'shop') || 
                  (item === 'Home' && currentPage === 'home') ? 'font-bold' : ''
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}