import { useEffect, useState } from "react";
import { Desktop } from "./Desktop";
import { Projects } from "./Projects";
import { Events } from "./Events";
import { Gallery } from "./Gallery";
import { Team } from "./Team";
import { ToastProvider } from "./ToastProvider";
import { CursorTrail } from "./CursorTrail";
import { motion, AnimatePresence } from "framer-motion";

export const App = (): JSX.Element => {
  const [route, setRoute] = useState<string>(window.location.hash || "#/");

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <ToastProvider>
      <CursorTrail />
      <AnimatePresence mode="wait">
        <motion.div
          key={route}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {route === "#/projects" || route === "#/projects/" ? (
            <Projects />
          ) : route === "#/events" || route === "#/events/" ? (
            <Events />
          ) : route === "#/gallery" || route === "#/gallery/" ? (
            <Gallery />
          ) : route === "#/team" || route === "#/team/" ? (
            <Team />
          ) : (
            <Desktop />
          )}
        </motion.div>
      </AnimatePresence>
    </ToastProvider>
  );
};

export default App;
