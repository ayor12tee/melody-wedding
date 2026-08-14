"use client";
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="section-container bg-hero" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <div className="content-wrapper frame-border hero-frame">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h2 className="subtitle" style={{ marginBottom: '1rem', color: 'var(--color-royal-blue)' }}>We are getting married</h2>
          <h1 className="title-main" style={{ color: 'var(--color-brown)' }}>
            <span style={{ fontSize: '1.2em' }}>M</span>elody 
            <span style={{ margin: '0 0.5em', fontStyle: 'italic', fontWeight: '300', fontSize: '0.8em' }}>&</span> 
            <span style={{ fontSize: '1.2em' }}>M</span>ichael
          </h1>
          <p style={{ marginTop: '2rem', fontSize: '1.1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            October 2026 &bull; Middlesbrough
          </p>
        </motion.div>
      </div>
    </section>
  );
}
