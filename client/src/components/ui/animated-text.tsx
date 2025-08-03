import { motion } from "framer-motion";
import { typewriterEffect, typewriterChar, revealText } from "@/lib/animations";

interface AnimatedTextProps {
  text: string;
  className?: string;
  variant?: "typewriter" | "reveal" | "fadeIn";
  delay?: number;
}

export function AnimatedText({ 
  text, 
  className = "", 
  variant = "typewriter", 
  delay = 0 
}: AnimatedTextProps) {
  if (variant === "typewriter") {
    return (
      <motion.div
        className={className}
        variants={typewriterEffect}
        initial="hidden"
        animate="visible"
        style={{ overflow: "hidden" }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={typewriterChar}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (variant === "reveal") {
    return (
      <motion.div
        className={className}
        variants={revealText}
        initial="hidden"
        animate="visible"
        style={{ overflow: "hidden" }}
        transition={{ delay }}
      >
        {text}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {text}
    </motion.div>
  );
}

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function AnimatedHeading({ 
  children, 
  className = "", 
  level = 1 
}: AnimatedHeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
    >
      <Component className={className}>
        {children}
      </Component>
    </motion.div>
  );
}