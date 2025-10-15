'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { MdSchool, MdNotifications, MdShare } from 'react-icons/md';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-accent-yellow flex flex-col items-center justify-center p-6">
      {/* Logo & Title */}
      <div className="text-center mb-12">
        <div className="inline-block bg-primary border-brutal border-brutal-black shadow-brutal-lg px-8 py-4 mb-6">
          <h1 className="text-6xl font-bold text-white">📚</h1>
        </div>
        <h1 className="text-5xl font-bold mb-4 uppercase">Student App</h1>
        <p className="text-2xl font-bold">Organize seu futuro, comece hoje!</p>
      </div>

      {/* Features */}
      <div className="max-w-md w-full space-y-4 mb-12">
        <div className="bg-white border-brutal border-brutal-black shadow-brutal p-6">
          <div className="flex items-start gap-4">
            <MdSchool className="text-4xl text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-xl mb-2">Organize atividades</h3>
              <p className="text-gray-700">
                Mantenha todas as suas tarefas escolares em um só lugar
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border-brutal border-brutal-black shadow-brutal p-6">
          <div className="flex items-start gap-4">
            <MdNotifications className="text-4xl text-secondary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-xl mb-2">Receba lembretes</h3>
              <p className="text-gray-700">
                Nunca mais perca um prazo importante
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border-brutal border-brutal-black shadow-brutal p-6">
          <div className="flex items-start gap-4">
            <MdShare className="text-4xl text-accent-pink flex-shrink-0" />
            <div>
              <h3 className="font-bold text-xl mb-2">Compartilhe progresso</h3>
              <p className="text-gray-700">
                Mantenha pais e professores informados
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="max-w-md w-full space-y-4">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => router.push('/login')}
        >
          Entrar
        </Button>
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={() => router.push('/register')}
        >
          Criar conta
        </Button>
      </div>
    </div>
  );
}

