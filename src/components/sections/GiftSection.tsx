"use client";
import { motion } from 'framer-motion';
import { Copy, CheckCircle, Mail } from 'lucide-react';
import { useState } from 'react';

import CinematicText from '../ui/CinematicText';

export default function GiftSection() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = (text: string, accountName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(accountName);
    setTimeout(() => setCopiedAccount(null), 3000);
  };

  const cardStyle = {
    padding: '3.5rem 2.5rem',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(139, 69, 19, 0.1)', 
    borderRadius: '4px',
    minWidth: '280px',
    flex: 1,
    position: 'relative' as const,
    boxShadow: '0 20px 40px rgba(0,0,0,0.02)',
    transition: 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)'
  };

  return (
    <section id="gifts" style={{ position: 'relative', padding: '8rem 1rem', background: 'linear-gradient(to bottom, var(--color-bg-light) 0%, rgba(245, 245, 220, 0.5) 100%)', overflow: 'hidden' }}>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center' }}
        >
          <h3 style={{ fontFamily: 'var(--font-rachelle)', fontSize: 'clamp(3.5rem, 12vw, 5rem)', color: 'var(--color-brown)', marginBottom: '-5px', fontWeight: 'normal', opacity: 0.8, lineHeight: '1' }}>Gift Registry</h3>
          
          <CinematicText 
            text="Our Greatest Gift Is Your Presence"
            className="shimmer-text"
            style={{ 
              fontFamily: 'var(--font-playfair)', 
              fontSize: 'clamp(1.8rem, 6vw, 3rem)', 
              marginBottom: '1.5rem', 
              fontWeight: 400, 
              marginTop: '10px' 
            }}
          />
          
          <div style={{ width: '60px', height: '1px', backgroundColor: 'var(--color-brown)', margin: '0 auto 2.5rem auto', opacity: 0.3 }}></div>

          <div style={{ maxWidth: '750px', margin: '0 auto 4rem auto', fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', lineHeight: '1.8', color: '#444', fontFamily: 'var(--font-playfair)' }}>
            <p style={{ marginBottom: '1.5rem' }}>Your presence as we celebrate this special chapter means more than we could ever ask for.</p>
            <p>However, should you wish to honour us with a gift, we would be incredibly grateful for either a monetary gift or a gift card. We would appreciate any of these instead of physical gifts, Thank you.</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
            
            {/* Account 1 - Michael (Blue Theme) */}
            <motion.div 
              style={cardStyle}
              whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(0,35,102,0.06)' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', backgroundColor: 'var(--color-royal-blue)' }}></div>
              <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-royal-blue)' }}>Michael Adebowale Taiwo</h3>
              <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '2rem', fontFamily: 'var(--font-inter)' }}>Monzo Bank</p>
              
              <div style={{ marginBottom: '2.5rem', fontFamily: 'var(--font-inter)' }}>
                <p style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.4rem' }}>Sort Code</p>
                <p style={{ fontSize: '1.3rem', color: 'var(--color-text-dark)', fontWeight: 500, marginBottom: '1.5rem' }}>04-00-05</p>
                
                <p style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.4rem' }}>Account Number</p>
                <p style={{ fontSize: '1.8rem', color: 'var(--color-text-dark)', fontWeight: 300, letterSpacing: '3px' }}>52111576</p>
              </div>

              <button 
                onClick={() => copyToClipboard('52111576', 'michael')}
                style={{ 
                  width: '100%', padding: '1rem', border: '1px solid var(--color-royal-blue)', backgroundColor: copiedAccount === 'michael' ? 'var(--color-royal-blue)' : 'transparent', 
                  color: copiedAccount === 'michael' ? '#fff' : 'var(--color-royal-blue)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', 
                  cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s ease' 
                }}
              >
                {copiedAccount === 'michael' ? <><CheckCircle size={16} /> Copied!</> : <><Copy size={16} /> Copy Details</>}
              </button>
            </motion.div>

            {/* Account 2 - Melody (Earth/Brown Theme) */}
            <motion.div 
              style={cardStyle}
              whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(139,69,19,0.06)' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', backgroundColor: 'var(--color-brown)' }}></div>
              <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-brown)' }}>Melody Sileola Akintemi</h3>
              
              <div style={{ marginBottom: '2.5rem', fontFamily: 'var(--font-inter)' }}>
                <p style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.4rem' }}>Sort Code</p>
                <p style={{ fontSize: '1.3rem', color: 'var(--color-text-dark)', fontWeight: 500, marginBottom: '1.5rem' }}>04-29-09</p>
                
                <p style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.4rem' }}>Account Number</p>
                <p style={{ fontSize: '1.8rem', color: 'var(--color-text-dark)', fontWeight: 300, letterSpacing: '3px' }}>02329433</p>
              </div>

              <button 
                onClick={() => copyToClipboard('02329433', 'melody')}
                style={{ 
                  width: '100%', padding: '1rem', border: '1px solid var(--color-brown)', backgroundColor: copiedAccount === 'melody' ? 'var(--color-brown)' : 'transparent', 
                  color: copiedAccount === 'melody' ? '#fff' : 'var(--color-brown)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', 
                  cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s ease' 
                }}
              >
                {copiedAccount === 'melody' ? <><CheckCircle size={16} /> Copied!</> : <><Copy size={16} /> Copy Details</>}
              </button>
            </motion.div>

          </div>

          {/* Gift Cards Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ 
              marginTop: '4rem', padding: '3.5rem 2rem', border: '1px solid rgba(139, 69, 19, 0.1)', 
              borderRadius: '4px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.02)'
            }}
          >
            <Mail size={36} color="var(--color-earth-2)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-text-dark)', fontWeight: 400 }}>Gift Cards</h3>
            <p style={{ color: '#666', fontFamily: 'var(--font-inter)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>Digital gift cards can be kindly sent to our email:</p>
            <a href="mailto:melodyakintemi@gmail.com" style={{ color: 'var(--color-royal-blue)', fontFamily: 'var(--font-inter)', fontSize: '1.3rem', letterSpacing: '1px', textDecoration: 'none', borderBottom: '1px solid rgba(0,35,102,0.3)', paddingBottom: '4px', transition: 'all 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.borderBottomColor = 'var(--color-royal-blue)'} onMouseOut={(e) => e.currentTarget.style.borderBottomColor = 'rgba(0,35,102,0.3)'}>
              melodyakintemi@gmail.com
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
