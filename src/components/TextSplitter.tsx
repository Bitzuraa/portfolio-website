'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextSplitterProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextSplitter({ text, className = '', delay = 0 }: TextSplitterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll('.letter');
    
    gsap.fromTo(
      letters,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        delay,
        ease: 'power3.out',
      }
    );
  }, [delay]);

  return (
    <div ref={containerRef} className={className}>
      {text.split('').map((char, i) => (
        <span key={i} className="letter inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}
