import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}

export function InteractiveBackground() {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate floating shapes
    const newShapes: FloatingShape[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 100 + 50,
      color: `rgba(59, 130, 246, ${Math.random() * 0.1 + 0.05})`,
      duration: Math.random() * 20 + 10
    }));
    setShapes(newShapes);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
        }}
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full opacity-20"
          style={{
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
            filter: "blur(2px)"
          }}
          initial={{ x: shape.x, y: shape.y }}
          animate={{
            x: [shape.x, shape.x + 200, shape.x - 100, shape.x],
            y: [shape.y, shape.y - 150, shape.y + 100, shape.y],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3Cpath d='M0 0l40 40M40 0L0 40' stroke='%233b82f6' stroke-width='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px"
        }}
        animate={{
          backgroundPosition: ["0px 0px", "40px 40px"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

export function ParticleField() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
  }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 0.5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-blue-400 rounded-full opacity-60"
          style={{
            width: particle.size,
            height: particle.size
          }}
          initial={{ x: particle.x, y: particle.y }}
          animate={{
            y: [particle.y, -50],
            opacity: [0.6, 0]
          }}
          transition={{
            duration: particle.speed * 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}