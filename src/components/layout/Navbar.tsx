"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
          <Link href="/" style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', fontWeight: 'bold', color: (scrolled || mobileMenuOpen) ? 'var(--color-text-dark)' : '#fff', transition: 'color 0.4s ease' }}>
            M & M
          </Link>
        </div>
        
        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          <Link href="#events" className="nav-link" style={{ color: scrolled ? 'var(--color-text-dark)' : '#fff' }}>Events</Link>
          <Link href="#gifts" className="nav-link" style={{ color: scrolled ? 'var(--color-text-dark)' : '#fff' }}>Registry</Link>
          <Link href="#rsvp" className="nav-link" style={{ color: scrolled ? 'var(--color-royal-blue)' : '#fff', fontWeight: 'bold' }}>RSVP</Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="mobile-only">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: (scrolled || mobileMenuOpen) ? 'var(--color-text-dark)' : '#fff', display: 'flex', alignItems: 'center' }}
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
