'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import { API_ENDPOINTS } from '../lib/api';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';

  useEffect(() => {
    const checkAuth = async () => {
      if (isLoginPage) {
        setIsLoading(false);
        return;
      }

      const adminToken = localStorage.getItem('adminToken');

      if (!adminToken) {
        router.push('/login');
        setIsLoading(false);
        return;
      }

      try {
        console.log('📡 Verifying at:', API_ENDPOINTS.adminVerify);
        
        const response = await fetch(API_ENDPOINTS.adminVerify, {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAdminUser({
            id: data.user._id || data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
          });
        } else {
          localStorage.removeItem('adminToken');
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('adminToken');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, isLoginPage, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-stone-400">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!adminUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-900">
      <AdminHeader adminUser={adminUser} />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}