'use client';

import { ReactNode, useState, useRef, TouchEvent } from 'react';
import { clsx } from '@/utils/helpers';

interface SwipeableCardProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
  leftAction?: { icon: ReactNode; color: string; label: string };
  rightAction?: { icon: ReactNode; color: string; label: string };
}

export default function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  className,
  leftAction,
  rightAction,
}: SwipeableCardProps) {
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  const handleTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    currentX.current = e.touches[0].clientX;
    const diff = currentX.current - startX.current;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (Math.abs(translateX) > 100) {
      if (translateX > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (translateX < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }
    
    setTranslateX(0);
  };

  const showLeftAction = translateX > 50 && rightAction;
  const showRightAction = translateX < -50 && leftAction;

  return (
    <div className="relative overflow-hidden">
      {/* Background Actions */}
      {showRightAction && (
        <div
          className="absolute inset-y-0 left-0 flex items-center px-6"
          style={{ backgroundColor: rightAction?.color }}
        >
          <div className="flex flex-col items-center text-white">
            {rightAction?.icon}
            <span className="text-xs font-bold mt-1">{rightAction?.label}</span>
          </div>
        </div>
      )}
      
      {showLeftAction && (
        <div
          className="absolute inset-y-0 right-0 flex items-center px-6"
          style={{ backgroundColor: leftAction?.color }}
        >
          <div className="flex flex-col items-center text-white">
            {leftAction?.icon}
            <span className="text-xs font-bold mt-1">{leftAction?.label}</span>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div
        className={clsx(
          'transition-transform duration-200 touch-pan-y',
          className
        )}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s ease-out',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
}

