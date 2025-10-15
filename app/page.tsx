'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';

export default function Home() {
  const router = useRouter();
  const user = useStore((state) => state.user);

  useEffect(() => {
    // Redirect based on user state
    if (!user) {
      router.push('/welcome');
    } else if (!user.onboardingCompleted) {
      router.push('/onboarding');
    } else {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-accent-yellow">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 border-brutal border-brutal-black bg-primary text-white px-8 py-4 shadow-brutal-lg inline-block">
          STUDENT APP
        </h1>
        <p className="text-xl font-bold mt-6">Carregando...</p>
      </div>
    </div>
  );
}

