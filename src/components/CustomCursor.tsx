'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('hoverable')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed w-8 h-8 border-2 border-blue-400 dark:border-blue-300 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? '#60a5fa' : '#93c5fd',
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Inner dot */}
      <motion.div
        ref={dotRef}
        className="fixed w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Hide default cursor */}
      <style>{`
        body {
          cursor: none;
        }
      `}</style>
    </>
  );
}
