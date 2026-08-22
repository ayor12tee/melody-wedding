"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DancingCoupleIllustration = () => (
  <motion.div
    style={{ marginLeft: '12px', transformOrigin: 'bottom center', display: 'flex' }}
    animate={{ rotate: [-3, 3, -3], x: [-1, 1, -1] }}
    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
  >
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.2))' }}>
      {/* Groom Back leg */}
      <path d="M 40 60 L 35 90 L 42 90 L 45 60 Z" fill="#1a252f" />
      {/* Groom Front leg */}
      <path d="M 35 60 L 28 90 L 35 90 L 40 60 Z" fill="#2c3e50" />
      {/* Groom Torso */}
      <path d="M 32 32 L 48 30 L 45 60 L 33 60 Z" fill="#2c3e50" />
      {/* Groom Head */}
      <circle cx="38" cy="24" r="6" fill="#f5d0b5" />
      <path d="M 32 25 Q 38 15 44 26 Z" fill="#1a1a1a" />
      {/* Groom Arm holding up */}
      <path d="M 45 35 Q 55 30 65 20" stroke="#2c3e50" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="65" cy="20" r="2.5" fill="#f5d0b5" />

      {/* Bride Back arm */}
      <path d="M 65 20 Q 60 25 55 32" stroke="#f5d0b5" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Bride Skirt with flowing animation */}
      <motion.path 
        fill="#ffffff" 
        stroke="#e0e0e0" 
        strokeWidth="1"
        animate={{ d: [
          "M 45 45 L 55 45 C 65 70 75 90 75 90 L 30 90 C 30 90 40 70 45 45 Z",
          "M 45 45 L 55 45 C 62 70 70 90 70 90 L 25 90 C 25 90 37 70 45 45 Z",
          "M 45 45 L 55 45 C 65 70 75 90 75 90 L 30 90 C 30 90 40 70 45 45 Z"
        ] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      {/* Bride Bodice */}
      <path d="M 48 30 L 58 30 L 55 45 L 45 45 Z" fill="#ffffff" />
      {/* Bride Head */}
      <circle cx="55" cy="22" r="5.5" fill="#f5d0b5" />
      {/* Bride Hair bun & Hair */}
      <circle cx="61" cy="19" r="4.5" fill="#3e2723" />
      <path d="M 49 22 Q 55 13 60 22 Z" fill="#3e2723" />
      {/* Bride Front arm around groom */}
      <path d="M 52 32 Q 45 28 35 30" stroke="#f5d0b5" strokeWidth="2.5" strokeLinecap="round" />
      {/* Bride Veil swaying */}
      <motion.path 
        fill="rgba(255,255,255,0.7)"
        animate={{ d: [
          "M 61 17 C 75 20 70 45 70 45 C 70 45 60 35 61 17 Z",
          "M 61 17 C 80 25 75 50 75 50 C 75 50 62 38 61 17 Z",
          "M 61 17 C 75 20 70 45 70 45 C 70 45 60 35 61 17 Z"
        ] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
    </svg>
  </motion.div>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="navbar" style={{ 
        background: scrolled || mobileMenuOpen ? 'rgba(250, 250, 250, 0.95)' : 'transparent',
        backdropFilter: scrolled || mobileMenuOpen ? 'blur(12px)' : 'none',
        borderBottom: scrolled || mobileMenuOpen ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid transparent',
        transition: 'all 0.4s ease',
        boxShadow: scrolled || mobileMenuOpen ? '0 4px 20px rgba(0,0,0,0.02)' : 'none'
      }}>
        <div>
          <Link href="/" style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', fontWeight: 'bold', color: (scrolled || mobileMenuOpen) ? 'var(--color-text-dark)' : 'var(--color-royal-blue)', transition: 'color 0.4s ease', display: 'flex', alignItems: 'center' }}>
            <span>M & M</span>
            <DancingCoupleIllustration />
          </Link>
        </div>
        
        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          <Link href="#events" className="nav-link" style={{ color: scrolled ? 'var(--color-text-dark)' : 'var(--color-royal-blue)' }}>Events</Link>
          <Link href="#gifts" className="nav-link" style={{ color: scrolled ? 'var(--color-text-dark)' : 'var(--color-royal-blue)' }}>Registry</Link>
          <Link href="#rsvp" className="nav-link" style={{ color: scrolled ? 'var(--color-royal-blue)' : 'var(--color-royal-blue)', fontWeight: 'bold' }}>RSVP</Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="mobile-only">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: (scrolled || mobileMenuOpen) ? 'var(--color-text-dark)' : 'var(--color-royal-blue)', display: 'flex', alignItems: 'center' }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '70px',
              left: 0,
              width: '100%',
              backgroundColor: 'rgba(250, 250, 250, 0.98)',
              backdropFilter: 'blur(15px)',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2.5rem',
              zIndex: 999,
              borderBottom: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
            }}
          >
            <Link href="#events" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', fontFamily: 'var(--font-inter)', color: 'var(--color-text-dark)', textTransform: 'uppercase', letterSpacing: '2px' }}>Events</Link>
            <Link href="#gifts" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', fontFamily: 'var(--font-inter)', color: 'var(--color-text-dark)', textTransform: 'uppercase', letterSpacing: '2px' }}>Registry</Link>
            <Link href="#rsvp" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', fontFamily: 'var(--font-inter)', color: 'var(--color-royal-blue)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>RSVP</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
