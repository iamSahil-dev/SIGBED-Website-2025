import { useMemo, useRef, useState } from "react";
import Particles from "./Particles";
import { Button } from "./buttons";
import { Card, CardContent } from "./card";
import { MobileMenu } from "./MobileMenu";
import { BackToTop } from "./BackToTop";
import { motion } from "framer-motion";
import { useToast } from "./ToastProvider";

const navigationItems = [
  { label: "Home", href: "#/" },
  { label: "Projects", href: "#/projects" },
  { label: "Events", href: "#/events" },
  { label: "Gallery", href: "#/gallery" },
  { label: "Team", href: "#/team" },
];

const placeholderEvents = [
  { title: 'Intro to Embedded Linux', date: '2024-11-10', tag: 'Workshop', image: 'https://picsum.photos/seed/sigbed-event-1/800/500', description: 'Hands-on intro to embedded Linux and cross-compilation.' },
  { title: 'Real-Time Systems Talk', date: '2025-02-20', tag: 'Talk', image: 'https://picsum.photos/seed/sigbed-event-2/800/500', description: 'Discussing RTOS choices and scheduling.' },
  { title: 'Robotics Showcase', date: '2025-05-12', tag: 'Showcase', image: 'https://picsum.photos/seed/sigbed-event-3/800/500', description: 'Student projects and demos.' },
  { title: 'Networking in Embedded', date: '2023-09-05', tag: 'Talk', image: 'https://picsum.photos/seed/sigbed-event-4/800/500', description: 'Past talk on networking stacks.' },
  { title: 'Sensor Fusion Workshop', date: '2025-12-01', tag: 'Workshop', image: 'https://picsum.photos/seed/sigbed-event-5/800/500', description: 'Filter design and sensor fusion.' },
  { title: 'Legacy Systems Panel', date: '2024-01-15', tag: 'Talk', image: 'https://picsum.photos/seed/sigbed-event-6/800/500', description: 'Panel discussion with industry vets.' },
  { title: 'FPGA Day', date: '2026-03-22', tag: 'Workshop', image: 'https://picsum.photos/seed/sigbed-event-7/800/500', description: 'Intro to FPGA toolchains and flow.' },
  { title: 'End of Year Showcase', date: '2025-08-30', tag: 'Showcase', image: 'https://picsum.photos/seed/sigbed-event-8/800/500', description: 'Annual projects and awards.' },
];

export const Events = (): JSX.Element => {
  const [activeTag, setActiveTag] = useState<string>("All");
  const [expanded, setExpanded] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { showToast } = useToast();
  const tags = ["All", "Workshop", "Talk"];

  const filtered = useMemo(() => placeholderEvents.filter((e) => activeTag === "All" || e.tag === activeTag), [activeTag]);

  // split into upcoming vs past
  const now = Date.now();
  const upcoming = filtered
    .map((e, i) => ({ ...e, __idx: i }))
    .filter((e) => new Date(e.date).getTime() >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = filtered
    .map((e, i) => ({ ...e, __idx: i }))
    .filter((e) => new Date(e.date).getTime() < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // robot indicator removed per request — timeline remains interactive
  

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
              const isActive = item.href === "#/events";
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
        <section className="container mx-auto px-8 mb-12 text-center">
          <motion.h2
            className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Events
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Discover signature workshops, talks, and showcases. All content is placeholder; replace with real events later.
          </motion.p>

          <div className="flex gap-3 justify-center mt-8">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`px-5 py-2 rounded-full border transition-all ${
                  activeTag === t
                    ? "bg-cyan-600 text-white border-transparent"
                    : "bg-gray-900/60 text-gray-300 border-cyan-400/30 hover:border-cyan-400/60"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex gap-3 justify-center mt-4">
            <div className="text-sm text-gray-300">Timeline view • click a node to expand details</div>
          </div>
        </section>

        <section className="container mx-auto px-8">
          <div ref={timelineRef} className="relative mx-auto max-w-5xl">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-cyan-500/40 via-transparent to-blue-600/30 rounded-full shadow-[0_8px_24px_rgba(34,211,238,0.06)]" />

              {/* robot indicator removed per user request */}

            <div className="space-y-10">
              {/* compact upcoming timeline summary - click to jump */}
              {upcoming.length > 0 && (
                <div className="mb-6 flex gap-4 items-center overflow-x-auto py-2 px-2">
                  {upcoming.map((e, uidx) => (
                    <button
                      key={`nav-${uidx}`}
                      onClick={() => {
                        const el = document.getElementById(`event-up-${e.__idx}`);
                        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="min-w-[180px] flex-shrink-0 px-4 py-3 rounded-xl bg-gradient-to-br from-cyan-600/8 to-blue-700/6 border border-cyan-400/30 hover:from-cyan-600/12 hover:to-blue-700/10 transition shadow-lg"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="text-xs text-cyan-300 font-medium">{new Date(e.date).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-300 px-2 py-0.5 rounded bg-black/20">{e.tag}</div>
                      </div>
                      <div className="text-sm font-semibold text-blue-200 mt-1 truncate">{e.title}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Upcoming events first */}
              {upcoming.map((e, idx) => (
                <motion.div
                  id={`event-up-${e.__idx}`}
                  key={`up-${idx}`}
                  className={`relative flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                >
                  <div className="w-[48%]">
                    <Card
                      onClick={() => setExpanded(expanded === e.__idx ? null : e.__idx)}
                      className={`cursor-pointer bg-gradient-to-br from-gray-900/90 to-black/90 border-blue-400/20 backdrop-blur-xl overflow-hidden transform transition-all duration-400 ${expanded === e.__idx ? 'scale-[1.02] shadow-2xl shadow-cyan-500/30 ring-2 ring-cyan-500/20' : 'hover:scale-[1.01]'}`}
                    >
                      <CardContent className="p-0">
                        <div className="h-48 w-full overflow-hidden relative">
                          <img
                            src={e.image}
                            alt={e.title}
                            className="w-full h-full object-cover transition-transform duration-500"
                            style={{ transform: expanded === e.__idx ? 'scale(1.06)' : undefined }}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-3 left-3 flex items-center gap-2">
                            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300">{e.tag}</span>
                            <span className="text-gray-300 text-xs bg-black/40 rounded px-2 py-0.5 border border-white/10">{e.date}</span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-xl font-bold text-blue-300 mb-1">{e.title}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">{e.description}</p>
                        </div>
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={expanded === e.__idx ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="px-5 pb-5 overflow-hidden text-gray-300 text-sm"
                        >
                          <div className="mt-2">Extended details: location, speakers, and links would go here. Replace with real data.</div>
                          <div className="flex gap-3 mt-4">
                            <Button
                              className="bg-blue-600 hover:bg-blue-700 border-0"
                              onClick={(ev) => {
                                ev.stopPropagation();
                                showToast("RSVP saved! See you there 🚀", "success");
                                if (!audioRef.current) audioRef.current = new Audio("./public/whoosh.mp3");
                                audioRef.current.currentTime = 0;
                                audioRef.current.play().catch(() => {});
                              }}
                            >
                              RSVP
                            </Button>
                            <Button className="bg-white/10 hover:bg-white/20 border border-white/10">Add to Calendar</Button>
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </div>
                  <button
                    aria-label={`Timeline node up ${idx + 1}`}
                    onClick={() => setExpanded(expanded === e.__idx ? null : e.__idx)}
                    className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)] border-4 border-black flex items-center justify-center text-black font-bold"
                  >
                    {idx + 1}
                  </button>
                </motion.div>
              ))}

              {/* Past events below */}
              {past.map((e, idx) => (
                <motion.div
                  key={`past-${idx}`}
                  className={`relative flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                >
                  <div className="w-[48%]">
                    <Card className="cursor-default bg-gradient-to-br from-gray-900/90 to-black/90 border-blue-400/10 backdrop-blur-xl overflow-hidden">
                      <CardContent className="p-0">
                        <div className="h-44 w-full overflow-hidden relative">
                          <img
                            src={e.image}
                            alt={e.title}
                            className="w-full h-full object-cover transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-3 left-3 flex items-center gap-2">
                            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-200">{e.tag}</span>
                            <span className="text-gray-400 text-xs bg-black/30 rounded px-2 py-0.5 border border-white/6">{e.date}</span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-xl font-bold text-blue-300 mb-1">{e.title}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">{e.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-blue-300/60 border-4 border-black" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <BackToTop />
    </div>
  );
};

export default Events;


