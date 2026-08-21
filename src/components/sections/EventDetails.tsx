"use client";
import { motion } from 'framer-motion';
import CinematicText from '../ui/CinematicText';

export default function EventDetails() {
  const columnStyle = {
    flex: '1',
    minWidth: '280px',
    padding: '3rem 2rem',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    textAlign: 'center' as const,
    position: 'relative' as const
  };

  const titleStyle = {
    fontFamily: 'var(--font-playfair)',
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    fontWeight: 400
  };

  const dateStyle = {
    fontFamily: 'var(--font-inter)',
    fontSize: '0.9rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    marginBottom: '2rem',
    fontWeight: 500
  };

  const detailStyle = {
    fontFamily: 'var(--font-inter)',
    fontSize: '0.95rem',
    lineHeight: '1.8',
    marginBottom: '1.5rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    color: '#666'
  };

  const dressCodeStyle = {
    fontFamily: 'var(--font-playfair)',
    fontStyle: 'italic',
    fontSize: '1.1rem',
    marginTop: 'auto',
    marginBottom: '1.5rem'
  };

  const buttonStyle = {
    display: 'inline-block',
    padding: '10px 25px',
    border: '1px solid currentColor',
    backgroundColor: 'transparent',
    fontSize: '0.8rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    fontWeight: 500
  };

  return (
    <section id="events" style={{ backgroundColor: 'var(--color-bg-light)', padding: '6rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', backgroundColor: '#fff', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', borderRadius: '8px', position: 'relative' }}>
        
        <div style={{ width: '100%', textAlign: 'center', padding: '4rem 0 1rem' }}>
          <CinematicText 
            text="When & Where"
            className="shimmer-text"
            style={{ 
              fontFamily: 'var(--font-rachelle)', 
              fontSize: 'clamp(3.5rem, 10vw, 4.5rem)', 
              fontWeight: 'normal', 
              opacity: 0.9 
            }}
          />
        </div>

        {/* Engagement */}
        <motion.div className="event-column" style={columnStyle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="var(--color-royal-blue)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem' }}>
            <rect x="12" y="22" width="36" height="26" rx="2" />
            <circle cx="30" cy="35" r="7" />
            <path d="M22 22V18h16v4" />
            <path d="M30 8v6 M24 11l3 3 M36 11l-3 3" />
            <circle cx="18" cy="28" r="1.5" fill="var(--color-royal-blue)" />
          </svg>
          <h2 style={{ ...titleStyle, color: 'var(--color-royal-blue)' }}>Engagement</h2>
          <p style={{ ...dateStyle, color: 'var(--color-royal-blue)' }}>16 October • 04:00 PM</p>
          <div style={detailStyle}>
            <p>7 Abingdon Rd</p>
            <p>Middlesbrough TS1 2DP</p>
          </div>
          <p style={{ ...dressCodeStyle, color: 'var(--color-royal-blue)' }}>Dress code: Any shade of blue</p>
          <a href="https://maps.google.com/?q=7+Abingdon+Rd,+Middlesbrough+TS1+2DP" target="_blank" rel="noopener noreferrer" style={{ ...buttonStyle, color: 'var(--color-royal-blue)' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-royal-blue)'; e.currentTarget.style.color = '#fff'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-royal-blue)'; }}>
            Get Directions
          </a>
        </motion.div>

        {/* Wedding */}
        <motion.div className="event-column" style={columnStyle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="var(--color-brown)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem' }}>
            <path d="M12 55h36" />
            <path d="M24 55V25l6-8 6 8v30" />
            <path d="M30 6v11M26 10h8" />
            <path d="M24 35l-8 6v14M36 35l8 6v14" />
            <path d="M26 55v-8a4 4 0 018 0v8" />
            <circle cx="30" cy="30" r="2.5" />
          </svg>
          <h2 style={{ ...titleStyle, color: 'var(--color-brown)' }}>Wedding</h2>
          <p style={{ ...dateStyle, color: 'var(--color-brown)' }}>17 October • 10:00 AM</p>
          <div style={detailStyle}>
            <p>390 Newport Rd</p>
            <p>Middlesbrough TS5 4BT</p>
          </div>
          <p style={{ ...dressCodeStyle, color: 'var(--color-brown)' }}>Dress code: Beige, brown, or earth tones</p>
          <a href="https://maps.google.com/?q=390+Newport+Rd,+Middlesbrough+TS5+4BT" target="_blank" rel="noopener noreferrer" style={{ ...buttonStyle, color: 'var(--color-brown)' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-brown)'; e.currentTarget.style.color = '#fff'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-brown)'; }}>
            Get Directions
          </a>
        </motion.div>

        {/* Reception */}
        <motion.div className="event-column" style={columnStyle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="var(--color-earth-2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem' }}>
            <g transform="translate(23, 28) rotate(15) translate(-25, -25)">
              <path d="M21 10l-3 15c0 4 2 6 7 6s7-2 7-6l-3-15H21z" />
              <path d="M25 31v12M20 43h10" />
              <path d="M20 16h10" />
            </g>
            <g transform="translate(37, 28) rotate(-15) translate(-35, -25)">
              <path d="M31 10l-3 15c0 4 2 6 7 6s7-2 7-6l-3-15H31z" />
              <path d="M35 31v12M30 43h10" />
              <path d="M30 16h10" />
            </g>
            <circle cx="27" cy="14" r="1.5" />
            <circle cx="24" cy="9" r="1" />
            <circle cx="33" cy="14" r="1.5" />
            <circle cx="36" cy="9" r="1" />
            <circle cx="30" cy="7" r="1" />
          </svg>
          <h2 style={{ ...titleStyle, color: 'var(--color-earth-2)' }}>Reception</h2>
          <p style={{ ...dateStyle, color: 'var(--color-earth-2)' }}>17 October • 01:00 PM</p>
          <div style={detailStyle}>
            <p>390 Newport Rd</p>
            <p>Middlesbrough TS5 4BT</p>
          </div>
          <p style={{ ...dressCodeStyle, color: 'var(--color-earth-2)' }}>Dress code: Beige, brown, or earth tones</p>
          <a href="https://maps.google.com/?q=390+Newport+Rd,+Middlesbrough+TS5+4BT" target="_blank" rel="noopener noreferrer" style={{ ...buttonStyle, color: 'var(--color-earth-2)' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-earth-2)'; e.currentTarget.style.color = '#fff'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-earth-2)'; }}>
            Get Directions
          </a>
        </motion.div>

      </div>
    </section>
  );
}
