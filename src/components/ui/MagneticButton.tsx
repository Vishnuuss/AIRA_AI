'use client';

import { useRef, useEffect, type MouseEvent, type ReactNode } from 'react';
import gsap from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  strength?: number;
  as?: 'button' | 'div';
}

export default function MagneticButton({
  children,
  className,
  onClick,
  type = 'button',
  disabled,
  strength = 0.4,
  as: Tag = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      gsap.to(el, { x: deltaX, y: deltaY, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <Tag
      // @ts-expect-error polymorphic ref
      ref={ref}
      type={Tag === 'button' ? type : undefined}
      onClick={onClick}
      disabled={disabled}
      className={cn('magnetic-btn', className)}
    >
      {children}
    </Tag>
  );
}
