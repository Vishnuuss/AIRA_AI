'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import MagneticButton from '@/components/ui/MagneticButton';
import NeuralBackground from '@/components/three/NeuralBackground';

export default function HeroHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only animate if elements exist
    if (!titleRef.current || !subtextRef.current || !ctaRef.current) return;

    const chars = titleRef.current.querySelectorAll('.char');
    
    const tl = gsap.timeline({ delay: 2.2 }); // Wait for preloader

    tl.fromTo(
      '.eyebrow',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo(
      chars,
      { y: 100, opacity: 0, rotateX: -90 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0, 
        duration: 0.8, 
        stagger: 0.02, 
        ease: 'power4.out',
        transformOrigin: '50% 50% -50px'
      },
      '-=0.4'
    )
    .fromTo(
      subtextRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(
      ctaRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(
      badgeRef.current,
      { scale: 0, opacity: 0, rotate: -90 },
      { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: 'elastic.out(1,0.5)' },
      '-=0.8'
    );

    // Badge continuous rotation
    gsap.to(badgeRef.current, {
      rotate: 360,
      duration: 15,
      repeat: -1,
      ease: 'linear'
    });

  }, []);

  const titleWords = ['INTELLIGENCE.', 'AUTOMATED.', 'AMPLIFIED.'];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <NeuralBackground />
      
      <div className="max-w-7xl mx-auto px-6 w-full z-10 flex flex-col items-center text-center">
        <div className="eyebrow font-mono text-[var(--accent)] tracking-[0.2em] text-sm md:text-base mb-6 opacity-0 uppercase">
          AI Agency
        </div>

        <h1 ref={titleRef} className="hero-display flex flex-col items-center mb-8 perspective-1000">
          {titleWords.map((word, i) => (
            <span key={i} className="block overflow-hidden pb-2">
              {word.split('').map((char, j) => (
                <span key={j} className="char inline-block opacity-0">
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p ref={subtextRef} className="text-[var(--text-muted)] text-lg md:text-xl max-w-2xl mb-12 opacity-0 leading-relaxed">
          We build AI Agents, Automation Systems, RAG Pipelines
          and Visual Identities that make your business unstoppable.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-6">
          <MagneticButton className="px-8 py-4 bg-[var(--accent)] text-black font-bold tracking-wide rounded-sm hover:bg-white transition-colors duration-300">
            <Link href="/contact" className="flex items-center gap-2">
              Start a Project <span>→</span>
            </Link>
          </MagneticButton>
          <Link
            href="/work"
            className="px-8 py-4 border border-[var(--border)] text-[var(--text-primary)] font-medium rounded-sm hover:border-[var(--text-muted)] transition-colors duration-300 group overflow-hidden relative"
          >
            <span className="relative z-10">See Our Work</span>
            <div className="absolute inset-0 bg-[var(--surface)] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
          </Link>
        </div>
      </div>

      {/* Decorative Badge */}
      <div 
        ref={badgeRef}
        className="absolute bottom-12 left-12 w-32 h-32 hidden md:flex items-center justify-center pointer-events-none opacity-0"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow" style={{ animationDuration: '15s' }}>
          <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
          <text fontSize="11" fontWeight="600" fill="var(--text-primary)" letterSpacing="2">
            <textPath href="#circlePath">
              AIRA AGENCY • AI • AUTOMATION • RAG •
            </textPath>
          </text>
        </svg>
        <div className="absolute w-2 h-2 bg-[var(--accent)] rounded-full" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 right-12 hidden md:flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-[var(--border)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--accent)] animate-[float_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
