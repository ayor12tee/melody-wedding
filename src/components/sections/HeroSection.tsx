"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import CountdownTimer from '../ui/CountdownTimer';

const sliderImages = [
  "/images/slider/bg1.jpg",
  "/images/slider/bg2.jpg",
  "/images/slider/bg3.jpg",
  "/images/slider/bg4.jpg",
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
    }, 6000); // Crossfade every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section section-divider-bottom-1" id="hero" style={{ zIndex: 1 }}>
      {/* Background Slider */}
      <div className="hero-background-slider" style={{ zIndex: 0 }}>
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('${sliderImages[currentImageIndex]}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 1,
            }}
          />
        </AnimatePresence>
        {/* Overlay to ensure text readability */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 2 }} />
      </div>

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="hero-content text-center">
          {/* Top Divider */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="hero-divider-top"
          />

          <h1 className="hero-title light hero-names-container">
            <motion.span
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              style={{ display: 'inline-block', fontFamily: 'var(--font-rachelle)', fontWeight: 'normal', fontSize: '1.2em' }}
            >
              Melody
            </motion.span>
            
            <motion.div
              initial={{ y: -30, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="hero-ring-wrapper"
            >
              <img src="/images/wedding-rings.png" alt="Wedding Rings" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.6)' }} />
            </motion.div>
            
            <motion.span
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              style={{ display: 'inline-block', fontFamily: 'var(--font-rachelle)', fontWeight: 'normal', fontSize: '1.2em' }}
            >
              Michael
            </motion.span>
          </h1>

          {/* Bottom Divider */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="hero-divider-bottom"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            className="hero-subtitle light"
          >
            Are getting Married in
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            className="hero-countdown"
          >
            <CountdownTimer targetDate="2026-10-17T10:00:00" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
