export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const slideInFromTop = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 300 }
};

export const buttonHover = {
  whileHover: { 
    scale: 1.05,
    y: -2,
    transition: { duration: 0.2 }
  },
  whileTap: { scale: 0.95 }
};

export const cardHover = {
  whileHover: { 
    y: -10,
    scale: 1.02,
    transition: { duration: 0.3 }
  }
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

// Advanced animations for better visual feedback
export const bounceIn = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

export const slideInFromBottom = {
  initial: { opacity: 0, y: 100 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const rotateIn = {
  initial: { opacity: 0, rotate: -180, scale: 0.5 },
  animate: { 
    opacity: 1, 
    rotate: 0, 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const morphingButton = {
  initial: { scale: 1, borderRadius: "0.75rem" },
  whileHover: { 
    scale: 1.05,
    borderRadius: "2rem",
    transition: { duration: 0.3 }
  },
  whileTap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export const parallaxScroll = {
  slow: {
    animate: {
      y: [0, -50, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  },
  medium: {
    animate: {
      y: [0, -100, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }
    }
  },
  fast: {
    animate: {
      y: [0, -150, 0],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }
};

export const magneticHover = {
  whileHover: {
    scale: 1.1,
    rotate: [0, -5, 5, 0],
    transition: {
      scale: { duration: 0.2 },
      rotate: { duration: 0.6, repeat: Infinity }
    }
  }
};

export const liquidButton = {
  whileHover: {
    scale: [1, 1.05, 1.02],
    borderRadius: ["0.75rem", "2rem", "1rem"],
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  },
  whileTap: {
    scale: 0.95,
    borderRadius: "0.5rem"
  }
};

export const typewriterEffect = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

export const typewriterChar = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200
    }
  }
};

export const glowEffect = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(59, 130, 246, 0.3)",
      "0 0 40px rgba(59, 130, 246, 0.6)",
      "0 0 20px rgba(59, 130, 246, 0.3)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const revealText = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0 100% 0 0)"
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  }
};
