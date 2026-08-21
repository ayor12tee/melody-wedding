"use client";
import { motion } from 'framer-motion';

export default function Footer() {
  // A subtle floating animation for music notes
  const noteVariants = {
    animate: (custom: number) => ({
      y: [0, -15, 0],
      opacity: [0.1, 0.5, 0.1],
      rotate: [0, custom * 5, -custom * 5, 0],
      transition: {
        duration: 5 + custom,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  return (
    <footer style={{ 
      position: 'relative', 
      padding: '7rem 2rem 5rem 2rem', 
      textAlign: 'center', 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)', 
      color: '#fff',
      overflow: 'hidden'
    }}>
      {/* Decorative Musical Staves Background (Very Subtle) */}
      <div style={{ position: 'absolute', top: '50%', left: '-10%', right: '-10%', transform: 'translateY(-50%) rotate(-5deg)', opacity: 0.03, pointerEvents: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ height: '1px', width: '120%', background: '#fff' }}></div>
        <div style={{ height: '1px', width: '120%', background: '#fff' }}></div>
        <div style={{ height: '1px', width: '120%', background: '#fff' }}></div>
        <div style={{ height: '1px', width: '120%', background: '#fff' }}></div>
        <div style={{ height: '1px', width: '120%', background: '#fff' }}></div>
      </div>

      {/* Floating Animated Notes */}
      <motion.div custom={1} variants={noteVariants} animate="animate" style={{ position: 'absolute', top: '25%', left: '15%', color: 'var(--color-earth-2)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3v-7h8v2h-6v7c0 1.66-1.34 3-3 3z"/></svg>
      </motion.div>
      <motion.div custom={2} variants={noteVariants} animate="animate" style={{ position: 'absolute', top: '45%', right: '15%', color: 'var(--color-earth-2)' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
      </motion.div>
      <motion.div custom={1.5} variants={noteVariants} animate="animate" style={{ position: 'absolute', bottom: '25%', left: '25%', color: 'var(--color-earth-2)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
      </motion.div>
      <motion.div custom={2.5} variants={noteVariants} animate="animate" style={{ position: 'absolute', top: '15%', right: '35%', color: 'var(--color-earth-2)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3v-7h8v2h-6v7c0 1.66-1.34 3-3 3z"/></svg>
      </motion.div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Elegant Treble Clef */}
        <div style={{ marginBottom: '1.5rem', color: 'var(--color-beige)' }}>
          <svg width="40" height="70" viewBox="0 0 40 70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 55c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" fill="currentColor"/>
            <path d="M25 50c0-15-14-15-14-25c0-5 3.5-9 8.5-9s8.5 4 8.5 9c0 10-18 14-18 25c0 5 3.5 9 8.5 9s8.5-4 8.5-9" />
            <path d="M20 5v55" />
          </svg>
        </div>

        {/* Highlighted Hashtag */}
        <h2 style={{ 
          fontFamily: 'var(--font-rachelle)', 
          fontSize: '4rem', 
          marginBottom: '1.5rem', 
          fontWeight: 'normal',
          background: 'linear-gradient(to right, #F5F5DC, #C19A6B)', // Beige to Earth-2
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 4px 20px rgba(193, 154, 107, 0.1)'
        }}>
          michaelfoundhismelody
        </h2>
        
        {/* Subtle Divider */}
        <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-earth-2)', margin: '0 auto 1.5rem auto', opacity: 0.5 }}></div>

        {/* Date */}
        <p style={{ fontSize: '1rem', color: '#aaa', fontFamily: 'var(--font-inter)', letterSpacing: '4px', textTransform: 'uppercase' }}>
          16 & 17 October 2026
        </p>
      </div>
    </footer>
  );
}
