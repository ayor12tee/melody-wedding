"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

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
                  // Usher in the main page!
                  setIsLoading(false);
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
