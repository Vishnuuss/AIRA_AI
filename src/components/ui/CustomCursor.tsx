'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animFrame: number;

    const moveDot = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      animFrame = requestAnimationFrame(animateRing);
    };

    const onEnterLink = () => {
      ringRef.current?.classList.add('visible', 'expanded');
      dotRef.current && (dotRef.current.style.opacity = '0');
    };

    const onLeaveLink = () => {
      ringRef.current?.classList.remove('expanded');
      dotRef.current && (dotRef.current.style.opacity = '1');
    };

    const onEnterBtn = () => {
      ringRef.current?.classList.add('visible', 'expanded');
    };

    const onLeaveBtn = () => {
      ringRef.current?.classList.remove('expanded');
    };

    document.addEventListener('mousemove', moveDot);
    animFrame = requestAnimationFrame(animateRing);

    // Attach to all interactive elements
    const attachListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };

    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', moveDot);
      cancelAnimationFrame(animFrame);
      observer.disconnect();
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
