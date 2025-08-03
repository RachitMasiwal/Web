import { useEffect } from "react";
import { motion } from "framer-motion";
import { useCountUp, useScrollAnimation } from "@/hooks/use-scroll-animation";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ end, duration = 2000, suffix = "", className = "" }: AnimatedCounterProps) {
  const { ref, isVisible } = useScrollAnimation(0.5);
  const { count, startCountUp } = useCountUp(end, duration);

  useEffect(() => {
    if (isVisible) {
      startCountUp();
    }
  }, [isVisible, startCountUp]);

  return (
    <motion.span
      ref={ref}
      className={`font-bold text-4xl lg:text-5xl text-blue-600 ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {count.toLocaleString()}{suffix}
    </motion.span>
  );
}
