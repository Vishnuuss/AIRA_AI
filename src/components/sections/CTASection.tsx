'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'focused'|'submitting'|'success'>('idle');

  useEffect(() => {
    if (!textRef.current) return;
    const chars = textRef.current.querySelectorAll('.char');
    
    gsap.fromTo(
      chars,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      
      // Particle burst effect
      const burst = gsap.timeline();
      for(let i=0; i<30; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-[var(--accent)] rounded-full';
        const form = document.querySelector('.cta-form');
        if(form) form.appendChild(particle);
        
        burst.fromTo(particle, 
          { x: '50%', y: '50%', opacity: 1 },
          {
            x: `+=${(Math.random() - 0.5) * 400}`,
            y: `+=${(Math.random() - 0.5) * 400}`,
            opacity: 0,
            scale: Math.random() * 2,
            duration: 1 + Math.random(),
            ease: 'power3.out',
            onComplete: () => particle.remove()
          }, 0
        );
      }
    }, 1500);
  };

  return (
    <section ref={containerRef} className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[var(--bg)]">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <span className="text-[20vw] font-black tracking-tighter leading-none">AIRA</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10 text-center">
        <h2 ref={textRef} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-16 leading-tight">
          {'READY TO BUILD SOMETHING THAT SCALES?'.split('').map((char, i) => (
            <span key={i} className="char inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>

        <div className="cta-form relative max-w-xl mx-auto h-16">
          {status !== 'success' ? (
            <form 
              onSubmit={handleSubmit}
              className={`flex items-center w-full h-full border border-[var(--border)] rounded-sm bg-[var(--surface)] transition-all duration-300 ${status === 'focused' ? 'ring-1 ring-[var(--accent)] border-[var(--accent)] scale-105' : ''}`}
            >
              <input 
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setStatus('focused')}
                onBlur={() => setStatus('idle')}
                required
                className="flex-1 bg-transparent border-none outline-none px-6 text-[var(--text-primary)] placeholder:text-[var(--text-dim)]"
              />
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="h-full px-8 bg-[var(--accent)] text-black font-bold uppercase tracking-wide hover:bg-white transition-colors flex items-center justify-center min-w-[140px]"
              >
                {status === 'submitting' ? (
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Send →'
                )}
              </button>
            </form>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-[var(--accent)] animate-in fade-in slide-in-from-bottom-4 duration-500">
              We'll be in touch. ✓
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
