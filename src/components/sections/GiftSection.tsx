"use client";
import { motion } from 'framer-motion';
import { Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function GiftSection() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = (text: string, accountName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(accountName);
    setTimeout(() => setCopiedAccount(null), 3000);
  };

  return (
    <section id="gifts" className="section-container" style={{ backgroundColor: '#fff' }}>
      <div className="content-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title" style={{ color: 'var(--color-brown)' }}>Our Greatest Gift Is Your Presence</h2>
          <div style={{ maxWidth: '600px', margin: '0 auto 3rem auto', fontSize: '1.1rem', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '1.5rem' }}>Your presence as we celebrate this special chapter with us means more than we could ask for.</p>
            <p style={{ marginBottom: '1.5rem' }}>However, should you wish to honour us with a gift, we would be grateful for either a monetary gift or a gift card. No physical gifts are required.</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
            {/* Account 1 */}
            <div style={{ padding: '2.5rem 2rem', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', minWidth: '280px', flex: 1, backgroundColor: 'var(--color-bg-light)' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--color-text-dark)' }}>Michael Adebowale Taiwo</h3>
              <p style={{ marginBottom: '0.5rem', color: '#666' }}>Sort Code: <strong>04-00-75</strong></p>
              <p style={{ marginBottom: '2rem', color: '#666' }}>Account Number: <strong style={{ fontSize: '1.1rem' }}>70821054</strong></p>
              <button 
                onClick={() => copyToClipboard('70821054', 'michael')}
                className="btn-secondary" 
                style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}
              >
                {copiedAccount === 'michael' ? <><CheckCircle size={18} /> Copied!</> : <><Copy size={18} /> Copy Account</>}
              </button>
            </div>

            {/* Account 2 */}
            <div style={{ padding: '2.5rem 2rem', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', minWidth: '280px', flex: 1, backgroundColor: 'var(--color-bg-light)' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--color-text-dark)' }}>Melody Sileola Akintemi</h3>
              <p style={{ marginBottom: '0.5rem', color: '#666' }}>Sort Code: <strong>04-29-09</strong></p>
              <p style={{ marginBottom: '2rem', color: '#666' }}>Account Number: <strong style={{ fontSize: '1.1rem' }}>02329433</strong></p>
              <button 
                onClick={() => copyToClipboard('02329433', 'melody')}
                className="btn-secondary" 
                style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}
              >
                {copiedAccount === 'melody' ? <><CheckCircle size={18} /> Copied!</> : <><Copy size={18} /> Copy Account</>}
              </button>
            </div>
          </div>

          <div style={{ marginTop: '3rem', padding: '2rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', fontFamily: 'var(--font-inter)', fontWeight: 500 }}>Gift Cards</h3>
            <p style={{ color: '#555' }}>Gift cards can be sent to:</p>
            <a href="mailto:melodyakintemi@gmail.com" style={{ color: 'var(--color-royal-blue)', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '0.5rem', display: 'inline-block' }}>melodyakintemi@gmail.com</a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
