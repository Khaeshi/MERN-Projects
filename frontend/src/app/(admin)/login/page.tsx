'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link  from 'next/link';
import GoogleLoginButton from '../../components/public/GoogleLoginButton';
import { login as loginUser } from '../../lib/auth';
import { useAuth } from '../../context/AuthContext';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { checkAuth, user } = useAuth();

  // Redirect if already logged in as admin
  useEffect(() => {
    if (user && user.role === 'admin') {
      router.push('/admin/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      console.log('✅ Login successful:', data.user);
      
      // Re-check auth to update context
      await checkAuth();
      
      if (data.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        setError('Access denied. Admin privileges required.');
      }
    } catch (err) {
      setError((err as Error).message || 'Login failed');
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

        {/* Show Google OAuth for staff too (optional) */}
        <GoogleLoginButton />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-stone-800 text-stone-400">OR</span>
          </div>
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
              placeholder="admin@cafe.com"
              required
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