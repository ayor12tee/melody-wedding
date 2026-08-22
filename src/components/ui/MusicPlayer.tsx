"use client";
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startPlaying = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        // Fade in over 10 seconds
        let vol = 0;
        const fadeInterval = setInterval(() => {
          if (vol < 1) {
            vol += 0.05;
            if (vol > 1) vol = 1;
            if (audioRef.current) {
              audioRef.current.volume = vol;
            }
          } else {
            clearInterval(fadeInterval);
          }
        }, 500);
      }).catch(e => console.warn("Audio auto-play blocked by browser:", e));
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        startPlaying();
      }
    }
  };

  useEffect(() => {
    const handleEnter = () => {
      if (audioRef.current && audioRef.current.paused) {
        startPlaying();
      }
    };
    
    // Listen for the specific click event from the Preloader
    window.addEventListener('enter-website', handleEnter);

    // Attempt auto-play immediately as a fallback
    if (audioRef.current && audioRef.current.paused) {
      const promise = audioRef.current.play();
      if (promise !== undefined) {
        promise.then(() => {
          // Autoplay worked!
          setIsPlaying(true);
        }).catch(() => {
          // Auto-play was blocked. Wait for user interaction.
          const handleFirstInteraction = () => {
            if (audioRef.current && audioRef.current.paused) {
              startPlaying();
            }
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('scroll', handleFirstInteraction);
          };
          document.addEventListener('click', handleFirstInteraction, { once: true });
          document.addEventListener('scroll', handleFirstInteraction, { once: true });
        });
      }
    }

    return () => window.removeEventListener('enter-website', handleEnter);
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
