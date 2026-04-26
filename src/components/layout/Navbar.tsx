'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/process', label: 'Process' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[8000] transition-all duration-500',
          scrolled
            ? 'py-4 bg-[rgba(8,8,8,0.85)] backdrop-blur-xl border-b border-[var(--border)]'
            : 'py-6 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-black tracking-tighter text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-300 group">
            <span className="group-hover:tracking-widest transition-all duration-500">AIRA</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'nav-link text-sm font-medium tracking-wide transition-colors duration-200',
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:block">
            <MagneticButton className="px-5 py-2.5 bg-[var(--accent)] text-black font-semibold text-sm rounded-sm hover:bg-white transition-colors duration-200">
              <Link href="/contact">Start a Project</Link>
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[var(--text-primary)] p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={cn(
          'fixed inset-0 z-[8500] bg-[var(--bg)] flex flex-col transition-all duration-500',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex justify-between items-center px-6 pt-6 pb-4">
          <Link href="/" className="text-2xl font-black tracking-tighter text-[var(--text-primary)]">
            AIRA
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-[var(--text-muted)] hover:text-white transition-colors p-2"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 gap-2">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-5xl font-black tracking-tighter text-[var(--text-primary)] hover:text-[var(--accent)] transition-all duration-300 hover:translate-x-4 py-3 border-b border-[var(--border)]"
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="mt-8 text-5xl font-black tracking-tighter text-[var(--accent)] hover:text-white transition-all duration-300 hover:translate-x-4 py-3"
          >
            Contact →
          </Link>
        </div>

        <div className="px-8 pb-8 text-[var(--text-muted)] text-sm font-mono">
          hello@aira.agency
        </div>
      </div>
    </>
  );
}
