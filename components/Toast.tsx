'use client';

import { useEffect, useState } from 'react';
import { MdCheckCircle, MdError, MdInfo, MdWarning, MdClose } from 'react-icons/md';
import { clsx } from '@/utils/helpers';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      icon: MdCheckCircle,
      bg: 'bg-accent-green',
      text: 'text-white',
    },
    error: {
      icon: MdError,
      bg: 'bg-red-500',
      text: 'text-white',
    },
    warning: {
      icon: MdWarning,
      bg: 'bg-accent-yellow',
      text: 'text-brutal-black',
    },
    info: {
      icon: MdInfo,
      bg: 'bg-secondary',
      text: 'text-white',
    },
  };

  const { icon: Icon, bg, text } = config[type];

  return (
    <div
      className={clsx(
        'fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4',
        'border-brutal border-brutal-black shadow-brutal-lg',
        'transition-all duration-300',
        bg,
        text,
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
      role="alert"
    >
      <Icon className="text-2xl flex-shrink-0" />
      <p className="font-bold">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className={clsx('ml-2 hover:opacity-70 transition-opacity', text)}
      >
        <MdClose className="text-xl" />
      </button>
    </div>
  );
}

