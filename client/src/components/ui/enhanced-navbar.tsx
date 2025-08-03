import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Tracking", href: "/tracking" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

export function EnhancedNavbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/">
              <motion.div
                className={`flex items-center space-x-2 font-bold text-xl ${
                  isScrolled ? "text-blue-600" : "text-white"
                }`}
                animate={{
                  color: isScrolled ? "#2563eb" : "#ffffff"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <span className="text-white text-sm font-bold">UL</span>
                </motion.div>
                <span>Unitas LogistiX</span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <motion.div
                    className={`relative px-4 py-2 rounded-lg transition-colors ${
                      location === item.href
                        ? isScrolled
                          ? "text-blue-600"
                          : "text-yellow-400"
                        : isScrolled
                        ? "text-gray-700 hover:text-blue-600"
                        : "text-white/90 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    
                    {/* Active indicator */}
                    {location === item.href && (
                      <motion.div
                        className={`absolute bottom-0 left-1/2 w-1 h-1 rounded-full ${
                          isScrolled ? "bg-blue-600" : "bg-yellow-400"
                        }`}
                        layoutId="activeIndicator"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ translateX: "-50%" }}
                      />
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link href="/contact">
              <MagneticButton
                className={`${
                  isScrolled
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-white text-blue-600 hover:bg-blue-50"
                } px-6 py-2 rounded-full font-semibold shadow-lg glass-morphism`}
              >
                Get Quote
              </MagneticButton>
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <motion.button
                className={`md:hidden p-2 ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </SheetTrigger>
            
            <SheetContent side="right" className="w-72 bg-white/95 backdrop-blur-md">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link href={item.href}>
                      <motion.div
                        className={`block px-4 py-3 rounded-lg text-lg font-medium ${
                          location === item.href
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                        whileHover={{ scale: 1.02, x: 10 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="pt-4"
                >
                  <Link href="/contact">
                    <MagneticButton
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Quote
                    </MagneticButton>
                  </Link>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}