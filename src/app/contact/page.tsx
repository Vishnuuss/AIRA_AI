'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { gsap } from '@/lib/gsap';
import PageTransition from '@/components/ui/PageTransition';
import MagneticButton from '@/components/ui/MagneticButton';
const TwitterIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const LinkedinIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);
const InstagramIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  description: z.string().min(20, 'Please provide more detail (min 20 chars)'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { register, handleSubmit, formState: { errors } } = useReactHookForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: '',
      budget: ''
    }
  });

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll('.char');
    gsap.fromTo(chars,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.5)' }
    );
  }, []);

  const onSubmit = async (data: FormData) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      
      if (res.ok) {
        setStatus('success');
        
        // Success animation
        if (formRef.current) {
          gsap.to(formRef.current, { y: -50, opacity: 0, duration: 0.5 });
        }
        
        // Particle burst
        for(let i=0; i<40; i++) {
          const p = document.createElement('div');
          p.className = 'fixed w-2 h-2 bg-[var(--accent)] rounded-full pointer-events-none z-50';
          document.body.appendChild(p);
          
          gsap.fromTo(p,
            { x: window.innerWidth * 0.75, y: window.innerHeight * 0.5, opacity: 1 },
            {
              x: `+=${(Math.random() - 0.5) * 600}`,
              y: `+=${(Math.random() - 0.5) * 600}`,
              opacity: 0,
              scale: Math.random() * 3,
              duration: 1 + Math.random(),
              ease: 'power3.out',
              onComplete: () => p.remove()
            }
          );
        }
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please check your connection.');
    }
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-[var(--bg)] pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-32">
            
            {/* Left Column */}
            <div>
              <h1 ref={titleRef} className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
                {"LET'S BUILD SOMETHING.".split('').map((char, i) => (
                  <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </h1>
              
              <p className="text-[var(--text-muted)] text-xl leading-relaxed mb-12">
                Tell us about your project. We'll review your requirements and respond within 24 hours with next steps.
              </p>

              <div className="space-y-8 mb-16">
                <div>
                  <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2">Email</div>
                  <a href="mailto:hello@aira.agency" className="text-xl font-bold hover:text-[var(--accent)] transition-colors">hello@aira.agency</a>
                </div>
                <div>
                  <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2">Response Time</div>
                  <div className="text-xl font-bold">&lt; 24 hours</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2">Location</div>
                  <div className="text-xl font-bold">Remote — Worldwide</div>
                </div>
              </div>

              <div className="mb-12 border border-[var(--border)] p-6 bg-[var(--surface)] rounded-sm inline-block">
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[var(--accent)] rounded-sm flex items-center justify-center text-black">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                  <div>
                    <div className="font-bold text-lg group-hover:text-[var(--accent)] transition-colors">Or book a call directly →</div>
                    <div className="text-sm text-[var(--text-muted)]">Find a time that works for you.</div>
                  </div>
                </a>
              </div>

              <div className="flex gap-4">
                <MagneticButton className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                  <LinkedinIcon size={20} />
                </MagneticButton>
                <MagneticButton className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                  <TwitterIcon size={20} />
                </MagneticButton>
                <MagneticButton className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                  <InstagramIcon size={20} />
                </MagneticButton>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="relative">
              {status === 'success' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[var(--surface)] border border-[var(--border)] rounded-sm">
                  <div className="w-20 h-20 bg-[var(--accent-glow)] rounded-full flex items-center justify-center text-[var(--accent)] mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Message received.</h3>
                  <p className="text-[var(--text-muted)] text-lg">
                    We'll review your project details and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">Name *</label>
                      <input 
                        {...register('name')}
                        type="text" 
                        className={`w-full bg-[var(--surface)] border ${errors.name ? 'border-red-500' : 'border-[var(--border)]'} px-4 py-3 rounded-sm text-white focus:outline-none focus:border-[var(--accent)] transition-colors`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">Email *</label>
                      <input 
                        {...register('email')}
                        type="email" 
                        className={`w-full bg-[var(--surface)] border ${errors.email ? 'border-red-500' : 'border-[var(--border)]'} px-4 py-3 rounded-sm text-white focus:outline-none focus:border-[var(--accent)] transition-colors`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">Company (Optional)</label>
                    <input 
                      {...register('company')}
                      type="text" 
                      className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-3 rounded-sm text-white focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">Service Needed *</label>
                    <select 
                      {...register('service')}
                      className={`w-full bg-[var(--surface)] border ${errors.service ? 'border-red-500' : 'border-[var(--border)]'} px-4 py-3 rounded-sm text-white focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none`}
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="AI Agents">AI Agents</option>
                      <option value="Workflow Automation">Workflow Automation</option>
                      <option value="RAG Systems">RAG Systems</option>
                      <option value="Creative Graphics">Creative Graphics</option>
                      <option value="Multiple">Multiple / Not Sure</option>
                    </select>
                    {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-4">Budget Range *</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['<$1K', '$1K–5K', '$5K–15K', '$15K+'].map(budget => (
                        <label key={budget} className="cursor-pointer">
                          <input 
                            {...register('budget')} 
                            type="radio" 
                            value={budget} 
                            className="peer sr-only"
                          />
                          <div className="p-4 border border-[var(--border)] bg-[var(--surface)] rounded-sm text-center text-sm font-bold peer-checked:border-[var(--accent)] peer-checked:text-[var(--accent)] hover:border-white transition-colors">
                            {budget}
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">Project Description *</label>
                    <textarea 
                      {...register('description')}
                      rows={5}
                      className={`w-full bg-[var(--surface)] border ${errors.description ? 'border-red-500' : 'border-[var(--border)]'} px-4 py-3 rounded-sm text-white focus:outline-none focus:border-[var(--accent)] transition-colors resize-none`}
                      placeholder="Tell us what you're trying to achieve..."
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                  </div>

                  {status === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-sm text-sm">
                      {errorMessage}
                    </div>
                  )}

                  <MagneticButton 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full py-5 bg-[var(--accent)] text-black font-bold tracking-widest uppercase text-sm rounded-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message →'}
                  </MagneticButton>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>
    </PageTransition>
  );
}
