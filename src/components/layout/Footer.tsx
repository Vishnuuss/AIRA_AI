'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/process', label: 'Process' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] mt-24">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Col 1 */}
          <div>
            <div className="text-3xl font-black tracking-tighter text-[var(--text-primary)] mb-4">
              AIRA
            </div>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 max-w-xs">
              Intelligence. Automated. Amplified. We build AI systems that make your business unstoppable.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 hover:scale-110"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <div className="text-xs font-mono tracking-widest text-[var(--text-muted)] uppercase mb-6">
              Quick Links
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <div className="text-xs font-mono tracking-widest text-[var(--text-muted)] uppercase mb-6">
              Start a Project
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
              Ready to automate, scale, and dominate? Tell us what you&apos;re building.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--accent)] text-black font-semibold text-sm rounded-sm hover:bg-white transition-colors duration-200 mb-6"
            >
              Get In Touch →
            </Link>
            <div className="mt-4">
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2">
                Email
              </div>
              <a
                href="mailto:hello@aira.agency"
                className="text-sm text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
              >
                hello@aira.agency
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="accent-line mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--text-muted)] font-mono">
            © {new Date().getFullYear()} AIRA Agency. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200 flex items-center gap-2 font-mono"
          >
            Back to top <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
