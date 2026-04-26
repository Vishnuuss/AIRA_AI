'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageTransition from '@/components/ui/PageTransition';
import { serviceBySlug } from '@/lib/data/services';
import MagneticButton from '@/components/ui/MagneticButton';

function ROICalculator() {
  const [hours, setHours] = useState(10);
  const hourlyRate = 50; // assumed avg hourly rate
  const monthlyHours = hours * 4.33;
  const monthlySavings = Math.round(monthlyHours * hourlyRate);

  return (
    <div className="bg-[var(--surface)] p-8 border border-[var(--border)] rounded-sm">
      <h3 className="font-bold text-2xl mb-6 text-[var(--accent-2)]">ROI Calculator</h3>
      <div className="mb-8">
        <label className="block text-sm font-mono text-[var(--text-muted)] mb-4">
          Hours spent on repetitive tasks per week: <span className="text-white font-bold text-xl">{hours} hrs</span>
        </label>
        <input 
          type="range" 
          min="2" 
          max="40" 
          value={hours} 
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-full accent-[var(--accent-2)]"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-[var(--bg)] border border-[var(--border)] rounded-sm">
          <div className="text-xs font-mono text-[var(--text-muted)] mb-1">Hours Saved / Mo</div>
          <div className="text-3xl font-bold">{Math.round(monthlyHours)}</div>
        </div>
        <div className="p-4 bg-[var(--bg)] border border-[var(--border)] rounded-sm">
          <div className="text-xs font-mono text-[var(--text-muted)] mb-1">Cost Saved / Mo</div>
          <div className="text-3xl font-bold text-[var(--accent-2)]">${monthlySavings.toLocaleString()}</div>
        </div>
      </div>
      <p className="text-xs text-[var(--text-muted)] mt-4">*Assumes average loaded hourly rate of $50/hr.</p>
    </div>
  );
}

export default function AutomationService() {
  const service = serviceBySlug('automation');
  if (!service) return null;

  return (
    <PageTransition>
      <main className="min-h-screen bg-[var(--bg)]">
        {/* Hero */}
        <section className="relative pt-40 pb-24 px-6 border-b border-[var(--border)] overflow-hidden">
          {/* Flowchart Background SVG */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full min-w-[800px]">
              <path d="M10,50 L90,50 M30,30 L30,70 M70,30 L70,70" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="10" cy="50" r="2" fill="currentColor" />
              <circle cx="50" cy="50" r="5" fill="none" stroke="currentColor" />
              <circle cx="90" cy="50" r="2" fill="currentColor" />
            </svg>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <Link href="/services" className="text-sm font-mono text-[var(--text-muted)] hover:text-[var(--accent-2)] mb-8 inline-block transition-colors">
              ← Back to Services
            </Link>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-tight">
              {service.title.toUpperCase()}
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
              We connect your entire tech stack. If a human does it twice, we write a script to do it forever.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-16">
              <div className="md:col-span-8">
                <h2 className="text-3xl font-bold mb-8">What We Automate</h2>
                <div className="space-y-6 mb-16">
                  {service.features.map(f => (
                    <div key={f.title} className="flex gap-4 p-6 bg-[var(--surface)] border-l-2 border-transparent hover:border-[var(--accent-2)] transition-colors rounded-r-sm">
                      <div className="text-2xl mt-1">{f.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                        <p className="text-[var(--text-muted)]">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-3xl font-bold mb-8">How It Works</h2>
                <div className="flex flex-col gap-4 mb-16 relative">
                  <div className="absolute left-6 top-6 bottom-6 w-px bg-[var(--border)]" />
                  {['Audit', 'Design', 'Deploy'].map((step, i) => (
                    <div key={step} className="flex gap-6 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--accent-2)] flex items-center justify-center font-bold text-[var(--accent-2)] shrink-0">
                        0{i+1}
                      </div>
                      <div className="pt-3 pb-8">
                        <h4 className="font-bold text-xl">{step}</h4>
                        <p className="text-[var(--text-muted)] mt-2">
                          {i === 0 && 'We map every manual touchpoint in your current process.'}
                          {i === 1 && 'We architect the logic, identify integration points, and build the pipelines.'}
                          {i === 2 && 'We test in shadow mode, then push live and train your team.'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-4 space-y-12">
                <ROICalculator />

                <div>
                  <h3 className="text-sm font-mono tracking-widest uppercase text-[var(--text-muted)] mb-6">Tools We Use</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map(tech => (
                      <span key={tech} className="pill-tag hover:border-[var(--accent-2)] hover:text-[var(--accent-2)]">{tech}</span>
                    ))}
                  </div>
                </div>

                <MagneticButton className="w-full py-4 bg-[var(--accent-2)] text-black font-bold uppercase tracking-wide hover:bg-white transition-colors text-center block">
                  <Link href="/contact" className="block w-full h-full">Automate My Workflow →</Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
