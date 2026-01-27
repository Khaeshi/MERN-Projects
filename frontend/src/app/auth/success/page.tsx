'use client'

import { useEffect } from 'react';

export default function AuthSuccessPage() {
  useEffect(() => {
    console.log('✅ Auth success page loaded');
    
    // Redirect after showing success message
    const timer = setTimeout(() => {
      const redirectTo = localStorage.getItem('redirectAfterLogin') || '/';
      localStorage.removeItem('redirectAfterLogin');
      console.log('🚀 Redirecting to:', redirectTo);
      window.location.href = redirectTo;
    }, 1500);

    return () => clearTimeout(timer);
  }, []); // Empty deps - runs once on mount

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900">
      <div className="text-center">
        {/* Spinning loader */}
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mb-4"></div>
        
        {/* Success message */}
        <h2 className="text-2xl font-bold text-white mb-2">
          Login successful! ✨
        </h2>
        
        {/* Subtext */}
        <p className="text-stone-400">
          Taking you back...
        </p>
      </div>
    </div>
  );
}