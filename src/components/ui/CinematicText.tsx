"use client";
import { motion } from 'framer-motion';

interface CinematicTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export default function CinematicText({ text, className = "", style = {}, delay = 0 }: CinematicTextProps) {
  const words = text.split(" ");
  
  const container: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: delay }
    },
  };

  const child: any = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 80,
      },
    },
    hidden: {
      opacity: 0,
      y: 15,
      filter: "blur(4px)",
    },
  };

  return (
    <motion.div
      className={className}
      style={{ ...style, display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: "0.25em" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} style={{ display: "inline-block", paddingBottom: '0.1em' }}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
