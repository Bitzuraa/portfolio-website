'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface PageTransitionProps {
  children: React.ReactNode;
  key?: string;
}

export function PageTransition({ children, key }: PageTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.inOut' }
      );
    }
  }, []);

  return (
    <motion.div
      key={key}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
