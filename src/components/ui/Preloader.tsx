"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [showEnter, setShowEnter] = useState(false);
  const [isFizzing, setIsFizzing] = useState(false);

  // We rely on Framer Motion's onAnimationComplete to hide the preloader
  // so it ushers in the main page exactly when the snake animation finishes.


  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }} // Smooth 1-second fade out of everything
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#fff",
            textAlign: "center",
          }}
        >
          {/* loading-heart container */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            <motion.svg
              viewBox="0 0 512 512"
              style={{
                width: "11rem",
                overflow: "visible",
                fill: "transparent",
                stroke: "#8eaeba",
                strokeWidth: 11,
              }}
              // We move the path animation properties directly to the path element below
            >
              <motion.path 
                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" 
                initial={{ pathLength: 0, pathOffset: 0 }}
                animate={{ 
                  pathLength: [0, 1, 1, 1], 
                  pathOffset: [0, 0, 0, 1] 
                }}
                transition={{
                  duration: 2.8,
                  times: [0, 0.4, 0.6, 1], // 0-1.1s: Draw in | 1.1s-1.7s: Hold | 1.7s-2.8s: Erase like a snake (origin to tail)
                  ease: "easeInOut",
                }}
                onAnimationComplete={() => {
                  // Show the enter button instead of immediately fading out
                  setShowEnter(true);
                }}
              />
            </motion.svg>

            <motion.div
              initial={{ opacity: 1 }}
              style={{

                fontFamily: "var(--font-playfair), serif",
                fontSize: "20pt",
                color: "currentColor",
                lineHeight: 0.9,
                position: "absolute",
                top: "41px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              Melody<br />
              <small style={{ fontSize: "12pt" }}>&</small><br />
              Michael
            </motion.div>

            <AnimatePresence>
              {showEnter && (
                <motion.button
                  initial={{ opacity: 0, y: 15, x: "-50%" }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    x: "-50%",
                    scale: [1, 1.03, 1]
                  }}
                  transition={{ 
                    opacity: { duration: 0.8 },
                    y: { duration: 0.8 },
                    scale: { repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.8 } 
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 15px 40px rgba(0, 35, 102, 0.5)",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.9, 
                    boxShadow: "0 2px 10px rgba(0, 35, 102, 0.2)",
                    rotate: -1,
                    transition: { duration: 0.1 }
                  }}
                  onClick={() => {
                    setIsFizzing(true);
                    // Dispatch custom event to reliably trigger music immediately
                    window.dispatchEvent(new CustomEvent('enter-website'));
                    // Delay hiding the preloader so the user sees the fizz explosion
                    setTimeout(() => {
                      setIsLoading(false);
                    }, 500);
                  }}
                  style={{
                    position: "absolute",
                    top: "100%", 
                    left: "50%",
                    marginTop: "3rem",
                    padding: "14px 28px", 
                    backgroundColor: "#FDFBF7", // Elegant warm ivory
                    border: "1px solid rgba(0, 35, 102, 0.1)",
                    color: "var(--color-royal-blue)",
                    fontFamily: "var(--font-inter), sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "2px", 
                    fontSize: "0.8rem", 
                    fontWeight: 600,
                    cursor: "pointer",
                    borderRadius: "40px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                    whiteSpace: "nowrap",
                    maxWidth: "90vw" 
                  }}
                >
                  <span style={{ position: "relative", zIndex: 2 }}>Open Invitation</span>
                  
                  {/* Colorful Fizzy Sparkle Burst */}
                  <AnimatePresence>
                    {isFizzing && Array.from({ length: 30 }).map((_, i) => {
                      const angle = Math.random() * Math.PI * 2;
                      const distance = Math.random() * 80 + 40; 
                      const colors = ['#D4AF37', '#8eaeba', 'var(--color-royal-blue)', '#b76e79', '#FFD700'];
                      const randomColor = colors[Math.floor(Math.random() * colors.length)];
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 1, scale: 0, x: "-50%", y: "-50%" }}
                          animate={{ 
                            opacity: 0, 
                            scale: Math.random() * 2 + 0.5,
                            x: `calc(-50% + ${Math.cos(angle) * distance}px)`,
                            y: `calc(-50% + ${Math.sin(angle) * distance}px)`,
                          }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: `${Math.random() * 6 + 4}px`,
                            height: `${Math.random() * 6 + 4}px`,
                            backgroundColor: randomColor,
                            borderRadius: '50%',
                            pointerEvents: 'none',
                            zIndex: 1
                          }}
                        />
                      );
                    })}
                  </AnimatePresence>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
