import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface MorphingCardProps {
  children: React.ReactNode;
  className?: string;
  hoverColor?: string;
  glowEffect?: boolean;
}

export function MorphingCard({ 
  children, 
  className = "",
  hoverColor = "rgba(59, 130, 246, 0.1)",
  glowEffect = false
}: MorphingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card className={`relative overflow-hidden transition-all duration-500 ${
        isHovered ? 'shadow-2xl' : 'shadow-lg'
      }`}>
        {/* Animated background overlay */}
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{ background: hoverColor }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Glow effect */}
        {glowEffect && (
          <motion.div
            className="absolute inset-0 opacity-0"
            style={{
              background: `radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)`,
              filter: "blur(20px)"
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.5), transparent)",
            opacity: 0
          }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            rotate: isHovered ? 360 : 0
          }}
          transition={{ 
            opacity: { duration: 0.3 },
            rotate: { duration: 2, ease: "linear", repeat: isHovered ? Infinity : 0 }
          }}
        />
        
        {/* Content with higher z-index */}
        <div className="relative z-10">
          {children}
        </div>
      </Card>
    </motion.div>
  );
}

interface AnimatedCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ 
  title, 
  children, 
  icon, 
  className = "",
  delay = 0
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.2 }
      }}
      className={className}
    >
      <Card className="h-full bg-white border-none shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
        {icon && (
          <motion.div
            className="absolute top-4 right-4 opacity-20 group-hover:opacity-40"
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.6 }}
          >
            {icon}
          </motion.div>
        )}
        
        <CardHeader>
          <CardTitle className="relative z-10">{title}</CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10">
          {children}
        </CardContent>
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
}