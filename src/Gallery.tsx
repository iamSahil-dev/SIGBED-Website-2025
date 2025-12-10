import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import Particles from "./Particles";
import { Button } from "./buttons";
import { MobileMenu } from "./MobileMenu";
import { BackToTop } from "./BackToTop";
import { motion, AnimatePresence } from "framer-motion";

const navigationItems = [
  { label: "Home", href: "#/" },
  { label: "Projects", href: "#/projects" },
  { label: "Events", href: "#/events" },
  { label: "Gallery", href: "#/gallery" },
  { label: "Team", href: "#/team" },
];

// small helper to autoplay the cover index; kept outside the main component for clarity
const AutoPlayCoverFlow = ({ setCoverIndex, autoplayRef, length }: { setCoverIndex: React.Dispatch<React.SetStateAction<number>>; autoplayRef: React.MutableRefObject<boolean>; length: number }) => {
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
  const INTERVAL = 2000; 
    const tick = (t: number) => {
      if (!autoplayRef.current || document.hidden) {
        last = t;
        raf = requestAnimationFrame(tick);
        return;
      }
      if (t - last > INTERVAL) {
        setCoverIndex((prev) => (prev + 1) % length);
        last = t;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setCoverIndex, autoplayRef, length]);

  return null;
};

// Gallery items: 13 photos + 2 videos from public/gallery folder
const galleryItems = [
  { src: "./public/gallery/IMG20231101022618.jpg", alt: "Event Photo 1", type: "image" },
  { src: "./public/gallery/IMG20240120195659.jpg", alt: "Event Photo 2", type: "image" },
  { src: "./public/gallery/IMG20240128161135.jpg", alt: "Event Photo 3", type: "image" },
  { src: "./public/gallery/IMG20240130120713.jpg", alt: "Event Photo 4", type: "image" },
  { src: "./public/gallery/IMG20240203162831.jpg", alt: "Event Photo 5", type: "image" },
  { src: "./public/gallery/IMG20240203162909.jpg", alt: "Event Photo 6", type: "image" },
  { src: "./public/gallery/IMG20240209190244.jpg", alt: "Event Photo 7", type: "image" },
  { src: "./public/gallery/IMG20240313051816.jpg", alt: "Event Photo 8", type: "image" },
  { src: "./public/gallery/IMG20241130120735.jpg", alt: "Event Photo 9", type: "image" },
  { src: "./public/gallery/IMG_7437-Enhanced-NR.jpeg", alt: "Event Photo 10", type: "image" },
  { src: "./public/gallery/Screenshot 2025-12-10 135938.png", alt: "Event Photo 11", type: "image" },
  { src: "./public/gallery/Screenshot 2025-12-10 140005.png", alt: "Event Photo 12", type: "image" },
  { src: "./public/gallery/IMG20231101022618.jpg", alt: "Event Photo 13", type: "image" },
  { src: "./public/gallery/IMG_8483.MOV", alt: "Event Video 1", type: "video" },
  { src: "./public/gallery/IMG_8512.MOV", alt: "Event Video 2", type: "video" },
  { src: "./public/gallery/IMG_2222.jpg", alt: "Event Photo 14", type: "image" },
  { src: "./public/gallery/IMG_2218.jpg", alt: "Event Photo 15", type: "image" },
];

// For coverflow and main display, use images only
const galleryImages = galleryItems.filter(item => item.type === "image");

export const Gallery = (): JSX.Element => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [coverIndex, setCoverIndex] = useState(3);
  const [category] = useState<string>("All");
  const coverRef = useRef<HTMLDivElement | null>(null);
  const autoplayRef = useRef(true);
  const [swishKey, setSwishKey] = useState(0);

  const openAt = (idx: number) => {
    setActiveIndex(idx);
    setLightboxOpen(true);
  };

  const close = () => setLightboxOpen(false);
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % galleryImages.length), []);
  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length), []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, next, prev]);

  const filtered = useMemo(() => galleryImages, []);

  useEffect(() => {
    // trigger a brief swish animation when coverIndex changes
    setSwishKey((k) => k + 1);
  }, [coverIndex]);

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen overflow-x-hidden">
      <Particles />

      <motion.div
        className="fixed top-[70px] left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 origin-left z-[60]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/50 border-b border-blue-400/20 min-h-[70px]">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[70px] flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center group cursor-pointer flex-shrink-0">
            <h1 className="text-base sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
              MUJ ACM SIGBED
            </h1>
          </div>

          <nav className="hidden lg:flex items-center gap-6 lg:gap-8 text-sm lg:text-base">
            {navigationItems.map((item, index) => {
              const isActive = item.href === "#/gallery";
              return (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors relative group whitespace-nowrap"
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              );
            })}
          </nav>

          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 hidden lg:block text-sm lg:text-base px-6 lg:px-8">
            Join Us
          </Button>

          <div className="lg:hidden">
            <MobileMenu navigationItems={navigationItems} />
          </div>
        </div>
      </header>

      <main className="pt-[90px] pb-24">
        {/* Coverflow Hero */}
        <section className="container mx-auto px-8 mb-20">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">Featured Moments</h3>
            <p className="text-gray-400 text-sm">Hover to explore • Click to view full size</p>
          </div>
          
          <div
            ref={coverRef}
            className="relative h-96 md:h-[500px] flex items-center justify-center overflow-hidden mb-8"
          >
            {/* swish effect when carousel advances */}
            <motion.div
              key={swishKey}
              initial={{ x: '-30%', opacity: 0 }}
              animate={{ x: '120%', opacity: [0.0, 0.35, 0.0] }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, rgba(6,182,212,0.0) 0%, rgba(6,182,212,0.12) 30%, rgba(59,130,246,0.06) 60%, rgba(6,182,212,0.0) 100%)', mixBlendMode: 'screen' }}
            />
            {/* Infinite circular carousel */}
            {[...Array(7)].map((_, localIdx) => {
              const globalIdx = (coverIndex - 3 + localIdx + galleryImages.length * 100) % galleryImages.length;
              const img = galleryImages[globalIdx];
              const offset = localIdx - 3;
              const angleStep = (360 / 7);
              const angle = offset * angleStep;
              const radius = 280;
              
              // Calculate position using circle math
              const radians = (angle * Math.PI) / 180;
              const x = Math.sin(radians) * radius;
              const y = -Math.cos(radians) * radius * 0.4;
              
              const z = 10 - Math.abs(offset);
              const scale = 1 - Math.abs(offset) * 0.08;
              const opacity = 1 - Math.abs(offset) * 0.15;
              const isCenter = offset === 0;
              
              return (
                <motion.div
                  key={`${globalIdx}-${localIdx}`}
                  className="absolute will-change-transform cursor-pointer"
                  style={{ perspective: 1200, zIndex: z }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity, x, y, scale }}
                  transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 1.2 }}
                  onClick={() => { setActiveIndex(globalIdx); setLightboxOpen(true); }}
                  whileHover={{ y: y + (isCenter ? -15 : -8) }}
                >
                  <div
                    className="rounded-2xl overflow-hidden border-2 border-cyan-400/40 shadow-2xl bg-black relative transition-all"
                    style={{
                      transformStyle: "preserve-3d",
                      width: isCenter ? (window.innerWidth >= 768 ? 700 : 400) : 280,
                      height: isCenter ? (window.innerWidth >= 768 ? 420 : 260) : 190,
                      boxShadow: isCenter 
                        ? '0 0 60px rgba(34,211,238,0.3), 0 0 120px rgba(59,130,246,0.15)' 
                        : '0 0 20px rgba(34,211,238,0.1)',
                    }}
                  >
                    <motion.img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      initial={false}
                      whileHover={isCenter ? { scale: 1.025 } : { scale: 1.015 }}
                      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                    />
                    {/* center pulse/glow when this is the focused card */}
                    {isCenter && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: [0, 0.5, 0], scale: [1, 1.03, 1] }}
                        transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
                        style={{ boxShadow: '0 0 50px rgba(56,189,248,0.25), inset 0 0 40px rgba(34,211,238,0.1)' }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/50 text-cyan-400 font-semibold transition-all hover:scale-105 active:scale-95"
              onClick={() => setCoverIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)}
            >
              ← Previous
            </button>
            <div className="flex gap-2">
              {galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCoverIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === coverIndex 
                      ? 'bg-cyan-400 w-8' 
                      : 'bg-cyan-400/30 hover:bg-cyan-400/60'
                  }`}
                />
              ))}
            </div>
            <button
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/50 text-cyan-400 font-semibold transition-all hover:scale-105 active:scale-95"
              onClick={() => setCoverIndex((i) => (i + 1) % galleryImages.length)}
            >
              Next →
            </button>
          </div>
        </section>

        {/* autoplay for coverflow */}
  <AutoPlayCoverFlow setCoverIndex={setCoverIndex} autoplayRef={autoplayRef} length={galleryImages.length} />
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Gallery
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Club highlights and memories.
          </motion.p>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">{/* Masonry layout */}
            {filtered.map((img, i) => (
              <motion.div
                key={i}
                className="relative mb-6 break-inside-avoid rounded-xl overflow-hidden border border-blue-400/20 bg-white/5 backdrop-blur-sm group cursor-zoom-in"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => openAt(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <div className="relative flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={activeIndex}
                src={galleryImages[activeIndex].src}
                alt={galleryImages[activeIndex].alt}
                className="max-w-[90vw] max-h-[70vh] rounded-xl border border-cyan-400/30 shadow-2xl"
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 10, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
              />
              <div className="text-white/90 text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-1">
                {galleryImages[activeIndex].alt}
              </div>
              <div className="flex gap-2 max-w-[90vw] overflow-x-auto py-1">
                {galleryImages.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`flex-shrink-0 w-16 h-12 rounded border ${i === activeIndex ? 'border-cyan-400' : 'border-white/10'} overflow-hidden`}
                  >
                    <img src={g.src} alt={g.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            {/* Controls */}
            <button
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white"
            >
              ‹
            </button>
            <button
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white"
            >
              ›
            </button>
            <button
              aria-label="Close"
              onClick={(e) => { e.stopPropagation(); close(); }}
              className="absolute top-6 right-6 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <BackToTop />
    </div>
  );
};

export default Gallery;


