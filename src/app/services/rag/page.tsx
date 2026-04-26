'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageTransition from '@/components/ui/PageTransition';
import { serviceBySlug } from '@/lib/data/services';
import MagneticButton from '@/components/ui/MagneticButton';
import PointCloud from '@/components/three/PointCloud';

function DemoChat() {
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'ai', text: 'Hi. I am trained on AIRA\'s knowledge base. What would you like to know about RAG systems?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    // Simulated RAG response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: `Based on our documentation: RAG (Retrieval-Augmented Generation) combines a vector database with an LLM. When you ask "${userMsg}", the system first retrieves relevant chunks from your documents, then passes them to the model to generate a fact-based answer with citations.` 
      }]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-sm flex flex-col h-[400px]">
      <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
        <h3 className="font-bold text-sm">Live RAG Demo</h3>
        <span className="text-xs font-mono text-[var(--accent)] px-2 py-1 bg-[var(--accent-glow)] rounded-sm">Connected</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-sm text-sm ${
              msg.role === 'user' ? 'bg-[var(--accent)] text-black' : 'bg-[var(--bg)] border border-[var(--border)]'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] p-3 rounded-sm bg-[var(--bg)] border border-[var(--border)] flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-[var(--border)] flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
        />
        <button type="submit" disabled={loading} className="px-4 bg-[var(--accent)] text-black font-bold text-sm rounded-sm disabled:opacity-50">
          Send
        </button>
      </form>
    </div>
  );
}

export default function RAGService() {
  const service = serviceBySlug('rag');
  if (!service) return null;

  return (
    <PageTransition>
      <main className="min-h-screen bg-[var(--bg)]">
        {/* Hero */}
        <section className="relative pt-40 pb-24 px-6 border-b border-[var(--border)] overflow-hidden">
          <PointCloud />
          <div className="max-w-5xl mx-auto relative z-10">
            <Link href="/services" className="text-sm font-mono text-[var(--text-muted)] hover:text-[var(--accent)] mb-8 inline-block transition-colors">
              ← Back to Services
            </Link>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-tight">
              {service.title.toUpperCase()}
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
              Stop fine-tuning models to learn facts. We build retrieval systems that ground AI in your actual data, with citations.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-16">
              <div className="md:col-span-8">
                <h2 className="text-3xl font-bold mb-8">What Is RAG?</h2>
                <div className="prose-aira mb-12">
                  <p>
                    Retrieval-Augmented Generation (RAG) is how you make an AI know things it wasn't trained on. Instead of expensive fine-tuning, RAG works like an open-book exam for the AI.
                  </p>
                </div>
                
                {/* Visual Pipeline */}
                <div className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-sm flex flex-col md:flex-row items-center justify-between mb-16 gap-4 font-mono text-xs text-center text-[var(--accent)]">
                  <div className="p-3 border border-[var(--accent)] rounded-sm bg-[var(--accent-glow)] w-full">Documents</div>
                  <div>→</div>
                  <div className="p-3 border border-[var(--border)] rounded-sm w-full">Embedder</div>
                  <div>→</div>
                  <div className="p-3 border border-[var(--border)] rounded-sm w-full">Vector DB</div>
                  <div>→</div>
                  <div className="p-3 border border-[var(--border)] rounded-sm w-full">LLM</div>
                  <div>→</div>
                  <div className="p-3 border border-[var(--accent)] rounded-sm bg-[var(--accent-glow)] w-full">Answer</div>
                </div>

                <h2 className="text-3xl font-bold mb-8">What We Build</h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-16">
                  {service.features.map(f => (
                    <div key={f.title} className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-sm">
                      <div className="text-2xl mb-4">{f.icon}</div>
                      <h3 className="font-bold mb-2">{f.title}</h3>
                      <p className="text-sm text-[var(--text-muted)]">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-4 space-y-12">
                <DemoChat />

                <div>
                  <h3 className="text-sm font-mono tracking-widest uppercase text-[var(--text-muted)] mb-6">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map(tech => (
                      <span key={tech} className="pill-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <MagneticButton className="w-full py-4 bg-[var(--accent)] text-black font-bold uppercase tracking-wide hover:bg-white transition-colors text-center block">
                  <Link href="/contact" className="block w-full h-full">Build My RAG System →</Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
