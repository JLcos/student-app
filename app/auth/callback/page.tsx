'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import LoadingScreen from '@/components/LoadingScreen';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from the URL
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth callback error:', error);
          router.push('/login?error=auth_failed');
          return;
        }

        if (data.session) {
          // Check if user profile exists
          const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.session.user.id)
            .single();

          // If profile doesn't exist, create it
          if (profileError || !profile) {
            const { error: insertError } = await supabase.from('users').insert({
              id: data.session.user.id,
              email: data.session.user.email!,
              name: data.session.user.user_metadata.name || data.session.user.email!.split('@')[0],
              role: 'student',
              onboarding_completed: false,
            });

            if (insertError) {
              console.error('Error creating profile:', insertError);
            }
          }

          // Redirect based on onboarding status
          if (profile?.onboarding_completed) {
            router.push('/dashboard');
          } else {
            router.push('/onboarding');
          }
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        router.push('/login?error=unexpected');
      }
    };

    handleCallback();
  }, [router]);

  return <LoadingScreen />;
}
