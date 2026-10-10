'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in seconds, e.g. 0.15
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const getInitialClass = () => {
    if (isVisible) return 'opacity-100 translate-x-0 translate-y-0 scale-100';

    switch (direction) {
      case 'up':
        return 'opacity-0 translate-y-10 scale-[0.97]';
      case 'down':
        return 'opacity-0 -translate-y-10 scale-[0.97]';
      case 'left':
        return 'opacity-0 translate-x-10';
      case 'right':
        return 'opacity-0 -translate-x-10';
      default:
        return 'opacity-0 scale-95';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}s`,
      }}
      className={`transition-all duration-700 ease-out will-change-transform transform ${getInitialClass()} ${className}`}
    >
      {children}
    </div>
  );
}
