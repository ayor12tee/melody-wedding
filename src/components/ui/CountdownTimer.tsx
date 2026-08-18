"use client";
import { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isMounted) return null; // Avoid hydration mismatch on first render

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      marginTop: '1.5rem',
      flexWrap: 'wrap'
    }}>
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px',
          minWidth: '80px',
          padding: '1rem 0.5rem',
          color: '#fff',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <span style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-playfair)', lineHeight: '1' }}>
            {value.toString().padStart(2, '0')}
          </span>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.5rem' }}>
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}
