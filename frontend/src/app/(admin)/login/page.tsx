'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '../../lib/api';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      console.log('🔍 Attempting login to:', API_ENDPOINTS.adminLogin);
  
      const response = await fetch(API_ENDPOINTS.adminLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log('📥 Response:', data);
  
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
  
      console.log('✅ Admin login successful:', data.user);
      localStorage.setItem('adminToken', data.token);
      console.log('💾 Token stored');
  
      router.push('/dashboard');
      
    } catch (err) {
      console.error('❌ Login error:', err);
      setError((err as Error).message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900">
      <div className="w-full max-w-md bg-stone-800 rounded-lg shadow-md p-8 border border-stone-700">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Staff Login</h2>
          <p className="text-stone-400 text-sm mt-1">Access the admin dashboard</p>
        </div>
        
        {error && (
          <div className="bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-stone-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-700 text-white placeholder-stone-500"
              placeholder="admin@cafeshop.com"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-stone-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-700 text-white placeholder-stone-500"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-stone-700">
          <p className="text-sm text-stone-400 text-center">
            Customer?{' '}
            <Link href="/" className="text-amber-400 hover:text-amber-300 font-medium">
              Go to main site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}