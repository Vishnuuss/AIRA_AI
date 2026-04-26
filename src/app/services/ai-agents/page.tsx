'use client';

import Link from 'next/link';
import PageTransition from '@/components/ui/PageTransition';
import NeuralBackground from '@/components/three/NeuralBackground';
import { serviceBySlug } from '@/lib/data/services';
import MagneticButton from '@/components/ui/MagneticButton';

export default function AIAgentsService() {
  const service = serviceBySlug('ai-agents');
  if (!service) return null;

  return (
    <PageTransition>
      <main className="min-h-screen bg-[var(--bg)]">
        {/* Hero */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden border-b border-[var(--border)]">
          <NeuralBackground />
          <div className="max-w-5xl mx-auto relative z-10">
            <Link href="/services" className="text-sm font-mono text-[var(--text-muted)] hover:text-[var(--accent)] mb-8 inline-block">
              ← Back to Services
            </Link>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-tight">
              {service.title.toUpperCase()}
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
              We build custom LLM-powered agents that handle tier-1 support, qualify leads, and orchestrate complex workflows while you sleep.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-16">
              <div className="md:col-span-8">
                <h2 className="text-3xl font-bold mb-8">What Are AI Agents?</h2>
                <div className="prose-aira mb-16">
                  <p>
                    Unlike standard chatbots that just answer questions based on a prompt, AI agents are autonomous systems equipped with tools. They can perceive inputs, reason about how to solve a problem, use tools (like your CRM, email, or database), and take actions to achieve a specific goal.
                  </p>
                  <p>
                    Think of an agent not as software, but as a digital employee that never sleeps, never makes typos, and costs a fraction of the price.
                  </p>
                </div>

                <h2 className="text-3xl font-bold mb-8">What We Build</h2>
                <div className="space-y-8 mb-16">
                  {service.features.map(f => (
                    <div key={f.title} className="bg-[var(--surface)] p-8 border border-[var(--border)] rounded-sm">
                      <div className="text-3xl mb-4">{f.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                      <p className="text-[var(--text-muted)]">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-4 space-y-12">
                <div>
                  <h3 className="text-sm font-mono tracking-widest uppercase text-[var(--text-muted)] mb-6">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map(tech => (
                      <span key={tech} className="pill-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-[var(--surface)] border border-[var(--border)] rounded-sm">
                  <h3 className="font-bold text-xl mb-4">Case Study</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6">
                    See how we reduced support tickets by 70% for an e-commerce brand using an autonomous support agent.
                  </p>
                  <Link href="/work/ecommerce-ai-support" className="text-[var(--accent)] font-bold text-sm hover:underline">
                    Read Case Study →
                  </Link>
                </div>

                <MagneticButton className="w-full py-4 bg-[var(--accent)] text-black font-bold uppercase tracking-wide hover:bg-white transition-colors text-center block">
                  <Link href="/contact" className="block w-full h-full">Build Your Agent →</Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
