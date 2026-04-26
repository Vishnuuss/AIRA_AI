'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import PageTransition from '@/components/ui/PageTransition';
import { services } from '@/lib/data/services';
import MagneticButton from '@/components/ui/MagneticButton';

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      '.service-card',
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.15, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen pt-32 pb-24 bg-[var(--bg)]" ref={containerRef}>
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-24 max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">
              OUR SERVICES
            </h1>
            <p className="text-[var(--text-muted)] text-xl leading-relaxed">
              We don't build toys. We build production-grade AI systems, rock-solid automation pipelines, and visual identities that command attention. Here's exactly what we do.
            </p>
          </header>

          <div className="space-y-32">
            {services.map((service, idx) => (
              <div key={service.slug} className="service-card relative">
                {/* Animated Divider */}
                {idx > 0 && (
                  <div className="absolute -top-16 left-0 w-full h-px bg-[var(--border)] overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-[var(--accent)] w-1/4 animate-[marqueeScroll_4s_linear_infinite]" />
                  </div>
                )}
                
                <div className="grid md:grid-cols-12 gap-12 items-start group">
                  <div className="md:col-span-4">
                    <div className="text-8xl mb-8 group-hover:scale-110 transition-transform duration-500 origin-left">
                      {service.icon}
                    </div>
                    <h2 className="text-4xl font-bold mb-4">{service.title}</h2>
                    <div className="flex flex-wrap gap-2 mt-8">
                      {service.techStack.slice(0, 5).map(tech => (
                        <span key={tech} className="pill-tag">{tech}</span>
                      ))}
                      {service.techStack.length > 5 && (
                        <span className="pill-tag opacity-50">+{service.techStack.length - 5}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="md:col-span-8 bg-[var(--surface)] border border-[var(--border)] p-8 md:p-12 rounded-sm group-hover:border-[var(--text-muted)] transition-colors duration-500 relative overflow-hidden">
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                      style={{ background: service.accentColor }}
                    />
                    
                    <p className="text-xl text-[var(--text-muted)] mb-12 leading-relaxed relative z-10">
                      {service.description}
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-8 mb-12 relative z-10">
                      {service.features.map(f => (
                        <div key={f.title}>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xl">{f.icon}</span>
                            <h4 className="font-bold">{f.title}</h4>
                          </div>
                          <p className="text-sm text-[var(--text-muted)]">{f.desc}</p>
                        </div>
                      ))}
                    </div>
                    
                    <MagneticButton className="px-6 py-3 bg-[var(--bg)] border border-[var(--border)] font-bold text-sm hover:bg-white hover:text-black transition-colors duration-300 rounded-sm relative z-10">
                      <Link href={`/services/${service.slug}`}>
                        {service.cta}
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
