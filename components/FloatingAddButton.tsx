'use client';

import { MdAdd } from 'react-icons/md';

interface FloatingAddButtonProps {
  onClick: () => void;
}

export default function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-4 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 
                 bg-accent-green text-brutal-black 
                 border-brutal border-brutal-black shadow-brutal-lg
                 flex items-center justify-center rounded-full
                 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal hover:scale-110
                 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none active:scale-95
                 transition-all duration-200 no-print
                 focus:ring-4 focus:ring-accent-green focus:ring-offset-2"
      aria-label="Adicionar nova atividade"
    >
      <MdAdd className="text-3xl sm:text-4xl font-bold" />
    </button>
  );
}

