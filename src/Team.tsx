import { useEffect, useRef, useState } from "react";
import Particles from "./Particles";
import { Button } from "./buttons";
import { Card, CardContent } from "./card";
import { MobileMenu } from "./MobileMenu";
import { BackToTop } from "./BackToTop";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const navigationItems = [
  { label: "Home", href: "#/" },
  { label: "Projects", href: "#/projects" },
  { label: "Events", href: "#/events" },
  { label: "Gallery", href: "#/gallery" },
  { label: "Team", href: "#/team" },
];

const execTeam = Array.from({ length: 4 }).map((_, i) => ({
  name: `Executive ${i + 1}`,
  role: i === 0 ? "Chair" : i === 1 ? "Vice Chair" : i === 2 ? "Secretary" : "Treasurer",
  image: `https://picsum.photos/seed/sigbed-exec-${i}/600/600`,
}));

const heads = Array.from({ length: 6 }).map((_, i) => ({
  name: `Team Head ${i + 1}`,
  role: "Head",
  image: `https://picsum.photos/seed/sigbed-head-${i}/600/600`,
}));

const core = Array.from({ length: 12 }).map((_, i) => ({
  name: `Core Member ${i + 1}`,
  role: "Core",
  image: `https://picsum.photos/seed/sigbed-core-${i}/600/600`,
}));

const PersonCard = ({ p, index }: { p: { name: string; role: string; image: string }; index: number }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const tx = (x - 0.5) * 12;
    const ty = (0.5 - y) * 12;
    setTilt({ x: tx, y: ty });
    setSpot({ x: x * 100, y: y * 100 });
  };

  const onLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpot({ x: 50, y: 50 });
  };

  const onFocus = () => {
    // subtle lift on keyboard focus
    setTilt({ x: 0, y: -3 });
  };

  const onBlur = () => {
    setTilt({ x: 0, y: 0 });
  };

  // layered parallax: image moves slightly, foreground content moves a little more
  const imageTranslate = { x: tilt.x * -1.2, y: tilt.y * -1.2 };
  const fgTranslate = { x: tilt.x * 0.6, y: tilt.y * 0.6 };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
      className="group"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
      role="button"
      aria-label={`${p.name}, ${p.role}`}
      style={{ transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`, transition: 'transform 220ms ease' }}
    >
      <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-blue-400/30 backdrop-blur-xl overflow-hidden hover:border-blue-300/60 transition-all relative focus:outline-none focus:ring-4 focus:ring-cyan-500/20">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            {/* image layer */}
            <div style={{ transform: `translate3d(${imageTranslate.x}px, ${imageTranslate.y}px, 0)`, transition: 'transform 350ms cubic-bezier(.2,.9,.2,1)' }}>
              <img src={p.image} alt={p.name} className="w-full h-64 object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* spotlight */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `radial-gradient(400px at ${spot.x}% ${spot.y}%, rgba(59,130,246,0.20), rgba(0,0,0,0))` }}
            />

            {/* social icons */}
            <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"><Github className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>
          <div className="p-5" style={{ transform: `translate3d(${fgTranslate.x}px, ${fgTranslate.y}px, 0)`, transition: 'transform 300ms cubic-bezier(.2,.9,.2,1)' }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300">{p.role}</span>
            </div>
            <h3 className="text-lg font-bold text-blue-300">{p.name}</h3>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const Team = (): JSX.Element => {
  const [tab, setTab] = useState<"Executive" | "Core" | "Heads">("Executive");
  const [burst, setBurst] = useState<number>(0);
  useEffect(() => {
    // trigger confetti-like burst indicator on tab change
    setBurst((b) => b + 1);
  }, [tab]);
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen overflow-x-hidden">
      <Particles />

      <motion.div
        className="fixed top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 origin-left z-[60]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/50 border-b border-blue-400/20">
        <div className="w-full px-8 h-20 flex items-center">
          <div className="flex items-center gap-4 group cursor-pointer mr-auto">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-white flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-2xl font-bold">S</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
              MUJ ACM SIGBED
            </h1>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-lg justify-center w-full">
            {navigationItems.map((item, index) => {
              const isActive = item.href === "#/team";
              return (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              );
            })}
          </nav>

          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 ml-auto hidden lg:block">
            Join Us
          </Button>

          <MobileMenu navigationItems={navigationItems} />
        </div>
      </header>

      <main className="pt-28 pb-24">
        <section className="container mx-auto px-8 text-center mb-12">
          <motion.h2
            className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Team
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Meet the people behind MUJ ACM SIGBED. Replace placeholders with your members.
          </motion.p>
        </section>

        <section className="container mx-auto px-8">
          <div className="flex justify-center gap-3 mb-8 relative">
            {( ["Executive", "Core", "Heads"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-full border transition-all ${
                  tab === t ? "bg-cyan-600 text-white border-transparent" : "bg-white/5 text-gray-300 border-blue-400/30 hover:border-blue-400/60"
                }`}
              >
                {t === 'Heads' ? 'Team Heads' : t === 'Executive' ? 'Executives' : 'Core'}
              </button>
            ))}
            {/* simple confetti particles */}
            <div className="pointer-events-none absolute -top-4">
              {[...Array(12)].map((_, i) => (
                <motion.span
                  key={`${burst}-${i}`}
                  className="absolute left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full"
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
                  animate={{ opacity: [1, 1, 0], x: (i - 6) * 14, y: -50 - i * 6, scale: [1, 1.2, 0.8] }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              ))}
            </div>
          </div>

          {tab === "Executive" && (
            <div className="mb-16">
              <h3 className="text-3xl font-bold mb-6 text-blue-300">Executive Team</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {execTeam.map((p, i) => (
                  <PersonCard key={i} p={p} index={i} />
                ))}
              </div>
            </div>
          )}
          {tab === "Core" && (
            <div>
              <h3 className="text-3xl font-bold mb-6 text-blue-300">Core Team</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {core.slice(0, 4).map((p, i) => (
                  <PersonCard key={i} p={p} index={i} />
                ))}
              </div>
            </div>
          )}

          {tab === "Heads" && (
            <div className="mb-16">
              <h3 className="text-3xl font-bold mb-6 text-blue-300">Team Heads</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {heads.map((p, i) => (
                  <PersonCard key={i} p={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <BackToTop />
    </div>
  );
};

export default Team;


