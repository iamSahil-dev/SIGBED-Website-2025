import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export const CursorTrail = () => {
  const [trails, setTrails] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let trailId = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, [role="button"], input, textarea, select');
      setIsHovering(!!isInteractive);

      // Add trail particle
      setTrails(prev => {
        const newTrail = { id: trailId++, x: e.clientX, y: e.clientY };
        const updated = [...prev, newTrail];
        // Keep only last 8 particles
        return updated.slice(-8);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  // Remove trails after animation
  useEffect(() => {
    if (trails.length > 0) {
      const timer = setTimeout(() => {
        setTrails(prev => prev.slice(1));
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [trails]);

  return (
    <>
      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="w-full h-full rounded-full border-2 border-cyan-400"
          animate={{
            scale: isHovering ? 1.5 : 1,
            borderColor: isHovering ? "rgba(6, 182, 212, 1)" : "rgba(6, 182, 212, 0.5)"
          }}
          transition={{ duration: 0.15 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400"
          animate={{
            scale: isHovering ? 0 : 1
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Trail particles */}
      <AnimatePresence>
        {trails.map((trail) => (
          <motion.div
            key={trail.id}
            className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:block"
            initial={{ 
              x: trail.x,
              y: trail.y,
              scale: 1,
              opacity: 0.8
            }}
            animate={{ 
              scale: 0,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
            style={{
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <div 
              className="w-3 h-3 rounded-full bg-cyan-400/40 blur-[1px]"
              style={{
                boxShadow: "0 0 10px rgba(6, 182, 212, 0.6)"
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default CursorTrail;
