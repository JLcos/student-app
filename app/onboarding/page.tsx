'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { useStore } from '@/store/useStore';
import { MdSchool, MdNotifications, MdShare, MdArrowForward } from 'react-icons/md';

const slides = [
  {
    icon: MdSchool,
    title: 'Organize suas atividades',
    description: 'Mantenha todas as suas tarefas, trabalhos e provas organizados em um único lugar.',
    color: 'bg-primary',
  },
  {
    icon: MdNotifications,
    title: 'Receba lembretes importantes',
    description: 'Configure notificações personalizadas e nunca mais perca um prazo.',
    color: 'bg-secondary',
  },
  {
    icon: MdShare,
    title: 'Compartilhe seu progresso',
    description: 'Mantenha pais e professores informados sobre seu desempenho escolar.',
    color: 'bg-accent-purple',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, setUser } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Complete onboarding
      if (user) {
        setUser({ ...user, onboardingCompleted: true });
      }
      router.push('/dashboard');
    }
  };

  const handleSkip = () => {
    if (user) {
      setUser({ ...user, onboardingCompleted: true });
    }
    router.push('/dashboard');
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className={`min-h-screen ${slide.color} flex flex-col items-center justify-between p-6`}>
      {/* Skip button */}
      <div className="w-full max-w-md flex justify-end">
        <button
          onClick={handleSkip}
          className="font-bold text-white hover:underline uppercase"
        >
          Pular
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full">
        <div className="bg-white border-brutal border-brutal-black shadow-brutal-lg p-12 mb-8">
          <Icon className="text-8xl mx-auto" />
        </div>

        <div className="bg-white border-brutal border-brutal-black shadow-brutal-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 uppercase">{slide.title}</h2>
          <p className="text-lg text-gray-700">{slide.description}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full max-w-md">
        {/* Dots */}
        <div className="flex justify-center gap-3 mb-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 border-brutal border-brutal-black transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <Button
          variant="accent"
          size="lg"
          fullWidth
          onClick={handleNext}
          className="flex items-center justify-center gap-2"
        >
          {currentSlide === slides.length - 1 ? 'Começar' : 'Próximo'}
          <MdArrowForward className="text-2xl" />
        </Button>
      </div>
    </div>
  );
}

