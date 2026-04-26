'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  end,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: end,
              duration,
              ease: 'power2.out',
              onUpdate: () => {
                if (el) {
                  el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
                }
              },
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    el.textContent = `${prefix}0${suffix}`;

    return () => observer.disconnect();
  }, [end, suffix, prefix, duration]);

  return (
    <span ref={ref} className={`stat-number ${className}`}>
      {prefix}0{suffix}
    </span>
  );
}
