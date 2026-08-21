"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const noteTypes = [
  'quarter',
  'eighth',
  'treble'
];

export default function FloatingNotesBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Generate 10 random notes
  const notes = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    type: noteTypes[i % noteTypes.length],
    left: `${Math.random() * 90 + 5}%`, // 5% to 95%
    duration: 30 + Math.random() * 40, // 30-70 seconds (even slower)
    delay: Math.random() * -40, // start at different times
    size: 20 + Math.random() * 30, // 20px to 50px (slightly smaller)
    color: ['var(--color-earth-2)', 'var(--color-royal-blue)', 'var(--color-brown)'][i % 3],
    rotation: Math.random() * 360,
    sway: Math.random() * 30 - 15 // -15px to 15px sway
  }));

  const renderSVG = (type: string) => {
    if (type === 'quarter') {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 18c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3v-7h8v2h-6v7c0 1.66-1.34 3-3 3z"/>
        </svg>
      );
    }
    if (type === 'eighth') {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      );
    }
    if (type === 'treble') {
      return (
        <svg viewBox="0 0 40 70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 55c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" fill="currentColor"/>
          <path d="M25 50c0-15-14-15-14-25c0-5 3.5-9 8.5-9s8.5 4 8.5 9c0 10-18 14-18 25c0 5 3.5 9 8.5 9s8.5-4 8.5-9" />
          <path d="M20 5v55" />
        </svg>
      );
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 20, overflow: 'hidden' }}>
      {notes.map(note => (
        <motion.div
          key={note.id}
          initial={{ y: '110vh', opacity: 0, x: 0 }}
          animate={{ 
            y: '-20vh', 
            opacity: [0, 0.15, 0.25, 0.15, 0], // increased visibility
            x: [0, note.sway, 0, -note.sway, 0],
            rotate: [note.rotation, note.rotation + 90] 
          }}
          transition={{
            y: { duration: note.duration, repeat: Infinity, ease: "linear", delay: note.delay },
            opacity: { duration: note.duration, repeat: Infinity, ease: "linear", delay: note.delay },
            x: { duration: note.duration / 2, repeat: Infinity, ease: "easeInOut", delay: note.delay },
            rotate: { duration: note.duration, repeat: Infinity, ease: "linear", delay: note.delay }
          }}
          style={{
            position: 'absolute',
            left: note.left,
            color: note.color,
            width: note.size,
            height: note.size
          }}
        >
          {renderSVG(note.type)}
        </motion.div>
      ))}
    </div>
  );
}
