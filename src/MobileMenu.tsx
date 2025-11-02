import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "./buttons";

interface MobileMenuProps {
  navigationItems: Array<{ label: string; href: string }>;
}

export const MobileMenu = ({ navigationItems }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    })
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    window.location.hash = href;
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        className="lg:hidden z-[60] relative text-white p-2"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-black/95 backdrop-blur-xl border-l-2 border-cyan-400/50 z-[56] lg:hidden shadow-2xl shadow-cyan-500/20"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-col h-full p-8 pt-24 relative overflow-hidden">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10 pointer-events-none" />
              
              {/* Logo at top */}
              <motion.div
                className="absolute top-6 left-8 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">S</span>
                </div>
                <span className="text-white font-bold text-lg">SIGBED</span>
              </motion.div>
              {/* Menu Items */}
              <nav className="flex flex-col gap-6 flex-1 relative z-10">
                {navigationItems.map((item, index) => {
                  const currentHash = window.location.hash || "#/";
                  const isActive = currentHash === item.href || 
                                 (currentHash.includes(item.href) && item.href !== "#/");
                  
                  return (
                    <motion.a
                      key={index}
                      custom={index}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      onClick={() => handleNavClick(item.href)}
                      className={`text-2xl font-bold transition-all cursor-pointer relative group py-2 px-4 rounded-lg ${
                        isActive 
                          ? "text-white bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-cyan-500/30" 
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        {isActive && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-cyan-400"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          />
                        )}
                      </div>
                    </motion.a>
                  );
                })}
              </nav>

              {/* Join Button */}
              <motion.div
                custom={navigationItems.length}
                variants={itemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="mt-8 relative z-10"
              >
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 text-white font-bold py-4 text-lg shadow-lg shadow-blue-500/30"
                  onClick={() => setIsOpen(false)}
                >
                  Join Us
                </Button>
              </motion.div>

              {/* Decorative animated circle */}
              <motion.div
                className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl pointer-events-none"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
