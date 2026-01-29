'use client';

import { useRouter } from 'next/navigation';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminHeaderProps {
  adminUser: AdminUser;
}

export default function AdminHeader({ adminUser }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/login');
  };

  return (
    <header className="bg-stone-800 shadow-sm border-b border-stone-700">
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-stone-400">
            Welcome, <span className="font-medium text-white">{adminUser.name}</span>
          </span>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}