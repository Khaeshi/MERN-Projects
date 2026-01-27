'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Image from 'next/image';

const navItems: string[] = ['Home', 'Shop', 'About', 'Contact'];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();  
  const router = useRouter();
  
  // Use AuthContext instead of local state
  const { user, loading, logout } = useAuth();

  // Don't show header on admin pages
  const isAdminPage = pathname?.startsWith('/admin');
  
  if (isAdminPage) return null;

  // Determine current page
  const currentPage: string = 
    pathname === '/shop' ? 'shop' : 
    pathname.startsWith('/admin/dashboard') ? 'dashboard' : 
    'home';

  const handleNavClick = (item: string): void => {
    if (item === 'Shop') {
      router.push('/shop');
    } else if (item === 'Dashboard') {
      router.push('/admin/dashboard');  
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

  const handleLogout = async () => {
    try {
      console.log('Header: Logging out...');
      await logout();
      setIsMobileMenuOpen(false);
      
      router.push('/');
      
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLogin = () => {
    router.push('/admin/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-black text-white py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <Image
              src="/favicon.ico"
              alt="Cafe Prince Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-xl tracking-wider leading-tight">
            <div>CAFE</div>
            <div>PRINCE</div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Show Dashboard for Admins */}
          {user?.role === 'admin' && (  
            <button
              onClick={() => handleNavClick('Dashboard')}
              className="relative text-white hover:text-gray-300 transition-colors tracking-wide group"
            >
              Dashboard
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-300 ease-out ${
                currentPage === 'dashboard' ? 'scale-x-100' : 'scale-x-0'
              }`} />
            </button>
          )}

          {navItems.map((item: string) => {
            const isActive = 
              (item === 'Shop' && currentPage === 'shop') ||
              (item === 'Home' && currentPage === 'home');
            
            return (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="relative text-white hover:text-gray-300 transition-colors tracking-wide group"
              >
                {item}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-300 ease-out ${
                  isActive ? 'scale-x-100' : 'scale-x-0'
                }`} />
              </button>
            );
          })}

          {/* User Info & Auth Buttons */}
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  {/* User Profile */}
                  <div className="flex items-center gap-2">
                    {user.profilePicture && (
                      <Image
                        src={user.profilePicture}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    )}
                    <div className="text-left">
                      <p className="text-sm font-medium">{user.name}</p>
                      {user.role === 'admin' && (
                        <span className="text-xs text-amber-400">Admin</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded transition-colors"
                >
                  Staff Login
                </button>
              )}
            </>
          )}
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
        <nav className="md:hidden text-white text-base">
          <div className="flex flex-col gap-4 pt-4">
            {/* User Info in Mobile */}
            {!loading && user && (
              <div className="flex items-center gap-2 px-2 py-2 border-b border-gray-700">
                {user.profilePicture && (
                  <Image
                    src={user.profilePicture}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  {user.role === 'admin' && (
                    <span className="text-xs text-amber-400">Admin</span>
                  )}
                </div>
              </div>
            )}

            {/* Show Dashboard for Admins in Mobile */}
            {user?.role === 'admin' && (  
              <button
                onClick={() => handleNavClick('Dashboard')}
                className={`text-white hover:text-gray-300 transition-colors tracking-wide px-2 text-left ${
                  currentPage === 'dashboard' ? 'font-bold' : ''
                }`}
              >
                Dashboard
              </button>
            )}

            {navItems.map((item: string) => (
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

            {/* Auth Buttons in Mobile */}
            {!loading && (
              <>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="text-left px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors mx-2"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="text-left px-2 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded transition-colors mx-2"
                  >
                    Staff Login
                  </button>
                )}
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}