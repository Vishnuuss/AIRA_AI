'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

const testimonials = [
  {
    quote: "AIRA gave us a working system in weeks, not months. Our AEs were burning out doing manual qualification. Now they walk into every call with a full intelligence brief.",
    author: "Sarah Jenkins",
    role: "VP Sales, PipelineIQ"
  },
  {
    quote: "We can't afford hallucinations. Our liability is real. AIRA built us something that cites every claim with the exact document and page number.",
    author: "Marcus Holt",
    role: "Senior Partner, Mercer & Holt LLP"
  },
  {
    quote: "We had a product that could compete with Robinhood, but we looked like a weekend hackathon project. AIRA transformed how we show up in the world.",
    author: "David Chen",
    role: "Founder & CEO, Vaultr"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  const changeTestimonial = (idx: number) => {
    if (idx === activeIndex) return;
    
    const currentQuote = quotesRef.current[activeIndex];
    const nextQuote = quotesRef.current[idx];
    
    const tl = gsap.timeline();
    
    // Out
    tl.to(currentQuote, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 0.5,
      ease: 'power2.inOut'
    })
    // In
    .fromTo(
      nextQuote,
      { clipPath: 'inset(0 0 0 100%)' },
      {
        clipPath: 'inset(0 0 0 0)',
        duration: 0.7,
        ease: 'power3.inOut'
      },
      '-=0.1'
    );
    
    setActiveIndex(idx);
  };

  return (
    <section ref={containerRef} className="py-32 bg-[var(--surface)] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative h-[400px] md:h-[500px]">
        {/* Quotes Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              ref={(el) => { quotesRef.current[idx] = el; }}
              className="absolute w-full"
              style={{ clipPath: idx === activeIndex ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)' }}
            >
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-8 text-[var(--border)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <h3 className="text-3xl md:text-5xl font-serif italic font-medium leading-tight mb-12 text-[var(--text-primary)] px-4">
                  "{t.quote}"
                </h3>
                <div>
                  <div className="text-lg font-bold mb-1 text-[var(--accent)]">{t.author}</div>
                  <div className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation / Progress */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center gap-4">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => changeTestimonial(idx)}
              className="group py-4"
            >
              <div className="w-12 h-1 bg-[var(--border)] relative overflow-hidden">
                <div 
                  className={`absolute inset-0 bg-[var(--accent)] transform origin-left transition-transform duration-500 ${
                    idx === activeIndex ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                  }`} 
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
