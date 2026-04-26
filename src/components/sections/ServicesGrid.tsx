'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { services } from '@/lib/data/services';
import { cn } from '@/lib/utils';

export default function ServicesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Title animation
    const titleChars = titleRef.current?.querySelectorAll('.char');
    if (titleChars) {
      gsap.fromTo(
        titleChars,
        { y: 50, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    // Cards animation
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 100, opacity: 0, rotateX: 10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        }
      );

      // 3D Tilt effect on hover
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = ((y - centerY) / centerY) * -10;
        const tiltY = ((x - centerX) / centerX) * 10;
        
        gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: 'elastic.out(1,0.5)',
        });
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  return (
    <section ref={containerRef} className="py-32 relative bg-[var(--bg)]">
      {/* Marquee Strip */}
      <div className="absolute top-0 left-0 w-full bg-[var(--surface)] border-y border-[var(--border)] py-4 z-10 overflow-hidden transform -skew-y-1">
        <div className="marquee-wrapper">
          <div className="marquee-track flex gap-8 text-[var(--accent)] font-mono text-sm tracking-widest uppercase">
            {[...Array(3)].map((_, i) => (
              <span key={i}>
                AI AGENTS — WORKFLOW AUTOMATION — RAG SYSTEMS — CREATIVE GRAPHICS —{' '}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20">
        <h2 ref={titleRef} className="text-4xl md:text-6xl font-black tracking-tighter mb-16 overflow-hidden">
          {'WHAT WE DO'.split('').map((char, i) => (
            <span key={i} className="char inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-[var(--accent)] rounded-full opacity-5 blur-[120px] pointer-events-none" />

          {services.map((service, idx) => (
            <Link
              href={`/services/${service.slug}`}
              key={service.slug}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="tilt-card group block bg-[var(--surface)] border border-[var(--border)] p-8 md:p-12 rounded-sm hover:border-[var(--text-muted)] transition-colors duration-300 relative overflow-hidden"
            >
              {/* Hover Glow Edge */}
              <div 
                className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none",
                  idx % 2 === 0 ? "bg-[var(--accent)]" : "bg-[var(--accent-2)]"
                )}
              />

              <div className="text-5xl mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500 origin-left">
                {service.icon}
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--text-primary)] relative z-10">
                {service.tagline}
              </h3>
              
              <p className="text-[var(--text-muted)] text-lg mb-12 max-w-md relative z-10 leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex items-center gap-2 text-sm font-bold tracking-wide uppercase mt-auto relative z-10 group-hover:text-[var(--accent)] transition-colors">
                Explore <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
