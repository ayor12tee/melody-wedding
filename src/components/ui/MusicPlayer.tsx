"use client";
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Start quietly at volume 0
        audioRef.current.volume = 0;
        audioRef.current.play().catch(e => console.warn("Audio file missing or blocked:", e));
        
        // Grow dramatically over 10 seconds
        let vol = 0;
        const fadeInterval = setInterval(() => {
          if (vol < 1) {
            vol += 0.05;
            // Cap it at 1
            if (vol > 1) vol = 1;
            
            if (audioRef.current) {
              audioRef.current.volume = vol;
            }
          } else {
            clearInterval(fadeInterval);
          }
        }, 500); // Increases volume every 500ms
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // We can auto-play or handle initial load here if needed, 
    // but browsers often block auto-play without user interaction.
    // It's better to let the user click play.
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50 }}>
      <audio ref={audioRef} loop src="/all-of-me-instrumental.mp3" />
      
      <button 
        onClick={togglePlay}
        style={{
          backgroundColor: 'var(--color-royal-blue)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          transition: 'transform 0.3s ease'
        }}
        title="Play Background Music"
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isPlaying ? <Pause size={24} /> : <Music size={24} />}
      </button>
    </div>
  );
}
