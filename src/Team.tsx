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

// Executive team data - customize name, role, and image for each member
const execTeam = [
  {
    name: "Parthav Shah",
    role: "Chairperson",
    image: "./public/execs/IMG-20251128-WA0003.jpg",
    imagePosition: "center top",
    github: "https://github.com/parthavshah",
    linkedin: "https://www.linkedin.com/in/parthavshahprofile?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app ",
  },
  {
    name: "Harman Bhambra",
    role: "Vice-Chairperson",
    image: "./public/execs/Harman.png",
    imagePosition: "center",
    github: "",
    linkedin: "",
  },
  {
    name: "Akshat Mishra",
    role: "Treasurer",
    image: "./public/execs/AkshatM.png",
    imagePosition: "center top",
    github: "",
    linkedin: "",
  },
  {
    name: "Eshaan Saha",
    role: "Technical Secretary",
    image: "./public/execs/Eshaan.png",
    imagePosition: "center 40%",
    github: "https://github.com/EshaanSaha",
    linkedin: "https://www.linkedin.com/in/eshaan-saha/",
  },
  {
    name: "Manalee Tamrakar",
    role: "Creative Director",
    image: "./public/execs/DSC00131.jpg",
    imagePosition: "center top",
    github: "https://github.com/manaleetamrakar",
    linkedin: "http://www.linkedin.com/in/manalee-tamrakar",
  },
  {
    name: "Mumukshu Bohra",
    role: "Head of Operations",
    image: "./public/execs/Mumukshu.png",
    imagePosition: "center",
    github: "",
    linkedin: "https://www.linkedin.com/in/mumukshu-bohra-69046b233/",
  },
];

const PersonCard = ({ p, index }: { p: { name: string; role: string; image: string; github?: string; linkedin?: string; imagePosition?: string }; index: number }) => {
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
              <img src={p.image} alt={p.name} className="w-full h-64 object-cover" style={{ objectPosition: p.imagePosition || 'center' }} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* spotlight */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `radial-gradient(400px at ${spot.x}% ${spot.y}%, rgba(59,130,246,0.20), rgba(0,0,0,0))` }}
            />

            {/* social icons */}
            <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10">
                  <Github className="w-4 h-4" />
                </a>
              )}
              {p.linkedin && (
                <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
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
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[70px] flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center group cursor-pointer flex-shrink-0">
            <h1 className="text-base sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
              MUJ ACM SIGBED
            </h1>
          </div>

          <nav className="hidden lg:flex items-center gap-6 lg:gap-8 text-sm lg:text-base">
            {navigationItems.map((item, index) => {
              const isActive = item.href === "#/team";
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
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Team
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Meet the executive team behind MUJ ACM SIGBED.
          </motion.p>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-blue-300">Executive Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {execTeam.map((p, i) => (
                <PersonCard key={i} p={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <BackToTop />
    </div>
  );
};

export default Team;


