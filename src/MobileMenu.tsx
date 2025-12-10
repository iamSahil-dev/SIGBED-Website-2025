import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "./buttons";

interface MobileMenuProps {
  navigationItems: Array<{ label: string; href: string }>;
}

export const MobileMenu = ({ navigationItems }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    window.location.hash = href;
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        className="lg:hidden z-[102] relative text-white p-3 hover:bg-white/10 rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
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
              <X className="w-7 h-7" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-7 h-7" strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Backdrop - covers everything and blurs */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[100] lg:hidden"
              style={{ 
                backdropFilter: 'blur(12px) brightness(0.3)', 
                WebkitBackdropFilter: 'blur(12px) brightness(0.3)',
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-blue-950 border-l-2 border-cyan-400/50 z-[101] lg:hidden shadow-2xl shadow-cyan-500/20"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col w-full h-screen p-6 sm:p-8">
              {/* Logo at top */}
              <motion.div
                className="flex items-center mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-white font-bold text-xl">MUJ ACM SIGBED</span>
              </motion.div>

              {/* Menu Items */}
              <nav className="flex flex-col gap-3">
                {navigationItems.map((item, index) => {
                  const currentHash = window.location.hash || "#/";
                  const isActive = currentHash === item.href || 
                                 (currentHash.includes(item.href) && item.href !== "#/");
                  
                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`text-base sm:text-lg font-semibold py-3 px-4 rounded-lg text-left transition-all ${
                        isActive 
                          ? "text-white bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-cyan-500/30" 
                          : "text-gray-300 bg-blue-900 hover:text-white hover:bg-blue-800"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </nav>

              {/* Join Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navigationItems.length * 0.05 + 0.1 }}
                className="mt-8"
              >
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 text-white font-bold py-3 text-base shadow-lg shadow-blue-500/30"
                  onClick={() => setIsOpen(false)}
                >
                  Join Us
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
