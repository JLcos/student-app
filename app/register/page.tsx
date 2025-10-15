'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { useStore } from '@/store/useStore';
import { generateId } from '@/utils/helpers';
import { UserRole } from '@/types';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = {
      id: generateId(),
      name,
      email,
      role,
      onboardingCompleted: false,
    };
    
    setUser(user);
    router.push('/onboarding');
  };

  const roleOptions = [
    { value: 'student', label: 'Estudante' },
    { value: 'teacher', label: 'Professor' },
    { value: 'parent', label: 'Responsável' },
  ];

  return (
    <div className="min-h-screen bg-accent-pink flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-primary border-brutal border-brutal-black shadow-brutal-lg px-8 py-4 mb-6">
            <h1 className="text-4xl font-bold text-white">Student App</h1>
          </div>
          <h2 className="text-3xl font-bold">Crie sua conta!</h2>
        </div>

        {/* Register Form */}
        <div className="bg-white border-brutal border-brutal-black shadow-brutal-lg p-8">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="relative">
              <MdPerson className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500" />
              <Input
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="pl-14"
              />
            </div>

            <div className="relative">
              <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500" />
              <Input
                type="email"
                placeholder="seu-email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-14"
              />
            </div>

            <div className="relative">
              <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500" />
              <Input
                type="password"
                placeholder="Crie uma senha forte"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="pl-14"
              />
            </div>

            <Select
              label="Você é:"
              options={roleOptions}
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              required
            />

            <Button type="submit" variant="primary" size="lg" fullWidth>
              Criar conta
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/login')}
              className="font-bold text-primary hover:underline"
            >
              Já tem conta? Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

