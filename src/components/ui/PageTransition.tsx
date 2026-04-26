'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative w-full h-full">
        {/* The Curtain Out */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '100%' }}
          exit={{ y: '0%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9000] bg-[var(--bg)] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            exit={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.2 }}
            className="text-4xl font-black tracking-widest text-[var(--text-primary)]"
          >
            AIRA
          </motion.div>
        </motion.div>

        {/* The Curtain In */}
        <motion.div
          initial={{ y: '0%' }}
          animate={{ y: '-100%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9000] bg-[var(--bg)] pointer-events-none"
        />

        {/* Page Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
