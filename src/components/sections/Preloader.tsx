'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    });

    // Letters animate in
    tl.fromTo(
      lettersRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, ease: 'elastic.out(1,0.8)', duration: 0.8 }
    )
    // Progress bar fills
    .to(progressRef.current, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, '-=0.4')
    // Letters explode out
    .to(
      lettersRef.current,
      {
        scale: 6,
        opacity: 0,
        stagger: 0.04,
        ease: 'power4.in',
        duration: 0.5,
      },
      '+=0.1'
    )
    // Container slides up
    .to(
      containerRef.current,
      { yPercent: -100, duration: 0.6, ease: 'power4.inOut' },
      '-=0.2'
    );
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div ref={containerRef} className="preloader">
      <div className="relative flex gap-1 overflow-hidden">
        {'AIRA'.split('').map((letter, i) => (
          <span
            key={i}
            ref={(el) => { lettersRef.current[i] = el; }}
            className="inline-block text-[8rem] md:text-[12rem] font-black tracking-tighter text-[var(--text-primary)] leading-none"
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="mt-8 w-48 h-px bg-[var(--border)] relative overflow-hidden">
        <div
          ref={progressRef}
          className="absolute inset-y-0 left-0 bg-[var(--accent)] origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      <div className="mt-4 font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase">
        Loading
      </div>
    </div>
  );
}
