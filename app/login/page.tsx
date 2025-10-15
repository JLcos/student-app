'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useStore } from '@/store/useStore';
import { generateId } from '@/utils/helpers';
import { MdEmail, MdLock } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    
    if (!email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulated API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulated login - in production, this would call an API
    const user = {
      id: generateId(),
      name: email.split('@')[0],
      email,
      role: 'student' as const,
      onboardingCompleted: false,
    };
    
    setUser(user);
    setLoading(false);
    router.push('/onboarding');
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    
    // Simulated API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulated Google login
    const user = {
      id: generateId(),
      name: 'Estudante',
      email: 'estudante@gmail.com',
      role: 'student' as const,
      onboardingCompleted: false,
    };
    
    setUser(user);
    setLoading(false);
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-primary border-brutal border-brutal-black shadow-brutal-lg px-8 py-4 mb-6">
            <h1 className="text-4xl font-bold text-white">Student App</h1>
          </div>
          <h2 className="text-3xl font-bold">Bem-vindo de volta!</h2>
        </div>

        {/* Login Form */}
        <div className="bg-white border-brutal border-brutal-black shadow-brutal-lg p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500 z-10" />
              <Input
                id="login-email"
                type="email"
                placeholder="seu-email@exemplo.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                error={errors.email}
                className="pl-14"
                autoComplete="email"
              />
            </div>

            <div className="relative">
              <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500 z-10" />
              <Input
                id="login-password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                error={errors.password}
                className="pl-14"
                showPasswordToggle
                autoComplete="current-password"
              />
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              fullWidth
              loading={loading}
              icon={<MdLock />}
            >
              Entrar
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-brutal border-brutal-black" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white font-bold uppercase">ou</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="mt-6 w-full flex items-center justify-center gap-3 px-6 py-3 
                       bg-white border-brutal border-brutal-black shadow-brutal
                       font-bold uppercase tracking-wide
                       hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm
                       active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
                       transition-all"
            >
              <FcGoogle className="text-2xl" />
              Entrar com Google
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/register')}
              className="font-bold text-primary hover:underline"
            >
              Não tem conta? Criar agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

