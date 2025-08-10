"use client";

import { useEffect, useRef, useState } from 'react';

/* Inline BoxReveal component (minimal) */
export function BoxReveal({
  children, delay = 0, speed = 500, className = '', direction = 'right',
}: {
  children: React.ReactNode;
  delay?: number;
  speed?: number;
  className?: string;
  direction?: 'right' | 'left' | 'up' | 'down';
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const animationsEnabledRef = useRef(true);
  const reducedMotionRef = useRef(false);

  // Determine reduced motion + listen for design token updates (animations toggle)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const apply = () => { reducedMotionRef.current = mq.matches; };
      apply();
      mq.addEventListener?.('change', apply);
    }
    // initial animations toggle from root dataset
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      animationsEnabledRef.current = root.dataset.anim === 'on';
      const handler = (e: Event) => {
        const detail = (e as CustomEvent).detail?.tokens;
        if (detail && typeof detail.animationsEnabled === 'boolean') {
          animationsEnabledRef.current = detail.animationsEnabled;
        } else {
          animationsEnabledRef.current = root.dataset.anim === 'on';
        }
      };
      document.addEventListener('design-tokens:updated', handler as EventListener);
      return () => document.removeEventListener('design-tokens:updated', handler as EventListener);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Map direction to exit transform
  const exitTransform = {
    right: 'translate-x-full',
    left: '-translate-x-full',
    down: 'translate-y-full',
    up: '-translate-y-full',
  }[direction];

  const animationsActive = animationsEnabledRef.current && !reducedMotionRef.current;
  const transitionOpacity = animationsActive ? `transition-opacity duration-${speed} ease-out` : '';
  const transitionTransform = animationsActive ? `transition-transform duration-${speed} ease-out` : '';
  const coverTransformClass = animationsActive ? (visible ? exitTransform : 'translate-x-0') : 'hidden';

  return (
    <div ref={ref} className={`relative inline-block overflow-hidden align-top ${className}`}>
      <div
        className={`${transitionOpacity} ${visible || !animationsActive ? 'opacity-100' : 'opacity-0'}`}
        style={animationsActive ? { transitionDelay: `${delay}ms` } : undefined}
      >
        {children}
      </div>
      <span
        className={`pointer-events-none absolute inset-0 bg-background will-change-transform ${transitionTransform} ${coverTransformClass}`}
        style={animationsActive ? { transitionDelay: `${delay}ms` } : undefined}
        aria-hidden="true"
      />
    </div>
  );
}
