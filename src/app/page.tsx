'use client';

import { useState } from 'react';
import Preloader from '@/components/sections/Preloader';
import HeroHome from '@/components/sections/HeroHome';
import ServicesGrid from '@/components/sections/ServicesGrid';
import FeaturedWork from '@/components/sections/FeaturedWork';
import Testimonials from '@/components/sections/Testimonials';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import CTASection from '@/components/sections/CTASection';
import CountUp from '@/components/ui/CountUp';
import PageTransition from '@/components/ui/PageTransition';

function StatsRow() {
  const stats = [
    { end: 50, suffix: '+', label: 'Projects Delivered' },
    { end: 3, suffix: 'x', label: 'Average ROI for Clients' },
    { end: 100, suffix: '%', label: 'On-time Delivery' },
    { end: 12, suffix: '+', label: 'Industries Served' },
  ];

  return (
    <div className="w-full bg-[var(--surface)] border-y border-[var(--border)] py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[var(--border)]">
        {stats.map((stat, i) => (
          <div key={i} className={`flex flex-col items-center justify-center ${i === 0 ? 'border-none' : ''}`}>
            <div className="text-4xl md:text-6xl text-[var(--accent)] mb-2">
              <CountUp end={stat.end} suffix={stat.suffix} />
            </div>
            <div className="text-sm font-mono tracking-widest uppercase text-[var(--text-muted)] text-center">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <>
      {!preloaderComplete && <Preloader onComplete={() => setPreloaderComplete(true)} />}
      
      {preloaderComplete && (
        <PageTransition>
          <HeroHome />
          <ServicesGrid />
          <StatsRow />
          <ProcessTimeline />
          <FeaturedWork />
          <Testimonials />
          <CTASection />
        </PageTransition>
      )}
    </>
  );
}
