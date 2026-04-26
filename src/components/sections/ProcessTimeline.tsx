'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const steps = [
  { num: '01', title: 'DISCOVER', desc: 'Audit systems, map workflows' },
  { num: '02', title: 'ARCHITECT', desc: 'Design flows, pick tech stack' },
  { num: '03', title: 'BUILD', desc: 'Sprints with weekly demos' },
  { num: '04', title: 'LAUNCH', desc: 'Deploy, train, and support' }
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply horizontal scroll on desktop
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (!isDesktop || !sectionRef.current || !scrollContainerRef.current) return;

    const sections = gsap.utils.toArray('.process-step');
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + scrollContainerRef.current?.offsetWidth
      }
    });

  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:h-screen md:py-0 flex flex-col justify-center bg-[var(--bg)] relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full mb-12 md:mb-24">
        <h2 className="text-xs font-mono tracking-widest text-[var(--text-muted)] uppercase">
          [ OUR METHODOLOGY ]
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex flex-col md:flex-row w-full md:w-[400vw] h-full items-center px-6 md:px-0"
      >
        {steps.map((step, idx) => (
          <div 
            key={step.num} 
            className="process-step w-full md:w-[100vw] flex-shrink-0 flex items-center justify-center mb-16 md:mb-0"
          >
            <div className="max-w-2xl w-full mx-auto flex flex-col items-start px-6 md:px-12">
              <div className="text-[6rem] md:text-[10rem] font-black text-transparent stroke-text leading-none mb-4 opacity-20"
                   style={{ WebkitTextStroke: '2px var(--border)' }}>
                {step.num}
              </div>
              <h3 className="text-4xl md:text-6xl font-bold mb-4">{step.title}</h3>
              <p className="text-[var(--text-muted)] text-xl md:text-2xl">{step.desc}</p>
              
              <div className="mt-8 h-1 w-0 bg-[var(--accent)] group-hover:w-full transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
