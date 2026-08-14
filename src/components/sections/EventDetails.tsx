"use client";
import { motion } from 'framer-motion';

export default function EventDetails() {
  return (
    <>
      <section id="engagement" className="section-container bg-engagement">
        <div className="content-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">The Engagement</h2>
            <p className="subtitle" style={{ marginBottom: '2rem', color: 'rgba(255,255,255,0.9)' }}>16 October 2026 &bull; 4:00 PM</p>
            <div style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              <p>7 Abingdon Rd</p>
              <p>Middlesbrough TS1 2DP</p>
            </div>
            <p style={{ marginBottom: '3rem', fontStyle: 'italic', fontSize: '1.1rem' }}>Dress Code: Any shade of blue</p>
            <a href="https://maps.google.com/?q=7+Abingdon+Rd,+Middlesbrough+TS1+2DP" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ backgroundColor: 'white', color: 'var(--color-royal-blue)', padding: '0.75rem 2rem', display: 'inline-block' }}>
              Get Directions
            </a>
          </motion.div>
        </div>
      </section>

      <section id="wedding" className="section-container bg-wedding">
        <div className="content-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">The Wedding</h2>
            <p className="subtitle" style={{ marginBottom: '2rem', color: 'var(--color-brown)' }}>17 October 2026 &bull; 10:00 AM</p>
            <div style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              <p>390 Newport Rd</p>
              <p>Middlesbrough TS5 4BT</p>
            </div>
            <p style={{ marginBottom: '3rem', fontStyle: 'italic', fontSize: '1.1rem' }}>Dress Code: Beige, brown, or earth tones</p>
            <a href="https://maps.google.com/?q=390+Newport+Rd,+Middlesbrough+TS5+4BT" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.75rem 2rem', display: 'inline-block' }}>
              Get Directions
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
