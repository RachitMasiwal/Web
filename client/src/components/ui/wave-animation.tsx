import { motion } from "framer-motion";

interface WaveAnimationProps {
  className?: string;
  color?: string;
  height?: number;
  speed?: number;
}

export function WaveAnimation({ 
  className = "",
  color = "#3b82f6",
  height = 100,
  speed = 3
}: WaveAnimationProps) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ height: height * 1.2 }}
      >
        <motion.path
          d="M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z"
          fill={color}
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: 1 }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.path
          d="M0,80 C200,40 400,120 600,80 C800,40 1000,120 1200,80 L1200,120 L0,120 Z"
          fill={color}
          opacity={0.6}
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: -1 }}
          transition={{
            duration: speed * 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
}

export function FloatingElements({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 2, -2, 0]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

interface PulsingDotProps {
  size?: number;
  color?: string;
  className?: string;
}

export function PulsingDot({ 
  size = 12, 
  color = "#3b82f6", 
  className = "" 
}: PulsingDotProps) {
  return (
    <motion.div
      className={`rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color
      }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [1, 0.5, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}