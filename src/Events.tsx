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

const upcomingEvents = [
  { title: 'NexTrack 3.0', image: './public/events/NexTrack.png', description: 'The upcoming edition of the LFR event featuring a redesigned track and advanced navigation tasks.', details:'More details soon!!.' },
  { title: 'Evoque', image: './public/events/Evoque.png', description: 'a technical fest, featuring events related to programming, robotics, and other computing fields.', details:'More details soon!!.' },
  { title: 'RoboRace', image: './public/events/RoboRace.png', description: 'A major attraction during Oneiros where robots competed to complete the race track in the shortest time.', details:'More details soon!!.' },
];

const pastEvents = [
  { title: 'Defuse 2.0', image: './public/events/Defuse.png', description: 'A more engaging CS:GO-inspired defusal challenge combining tech puzzles with physical mechanisms.' },
  { title: 'Robocamp', image: './public/events/RoboRace.png', description: 'A 7-day workshop conducted by our tech team to train beginners in robotics, ending with a hands-on project.' },
  { title: 'Autobots 3.0', image: './public/events/Autobots.png', description: 'Hosted during Evoque, this edition focused on real-time navigation challenges and gave participants a strong hands-on robotics experience.' },
  { title: 'NexTrack 2.0', image: './public/events/NexTrack2.png', description: 'A more challenging LFR competition with tighter turns and an upgraded track to test sensor accuracy and control.' },
  { title: 'Throttle', image: './public/events/Throttle.png', description: 'A robot racing event testing speed, control, and endurance across an obstacle-based arena.' },
  { title: 'UAV workshop', image: './public/events/UAV.png', description: 'Introduction to drone fundamentals, flight mechanics, and controller handling.' },
];

export const Events = (): JSX.Element => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { showToast } = useToast();

  const filteredUpcoming = useMemo(() => 
    upcomingEvents
      .map((e, i) => ({ ...e, __idx: i })),
    []
  );

  const filteredPast = useMemo(() => 
    pastEvents
      .map((e, i) => ({ ...e, __idx: i + 1000 })),
    []
  );

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

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/50 border-b border-blue-400/20 min-h-[70px]">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[70px] flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center group cursor-pointer flex-shrink-0">
            <h1 className="text-base sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
              MUJ ACM SIGBED
            </h1>
          </div>

          <nav className="hidden lg:flex items-center gap-6 lg:gap-8 text-sm lg:text-base">
            {navigationItems.map((item, index) => {
              const isActive = item.href === "#/events";
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
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Events
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Discover signature workshops, talks, and showcases.
          </motion.p>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Upcoming Events Timeline */}
          {filteredUpcoming.length > 0 && (
            <div className="mb-20">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Upcoming Events
                </h3>
                <p className="text-gray-400 text-sm">Events you can still register for</p>
              </motion.div>

              <div ref={timelineRef} className="relative mx-auto max-w-5xl">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-cyan-500/40 via-blue-500/40 to-cyan-600/30 rounded-full shadow-[0_8px_24px_rgba(34,211,238,0.08)]" />

                <div className="space-y-10">
                  {/* Upcoming events timeline */}
                  {filteredUpcoming.map((e, idx) => (
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
                          <div className="mt-2">{e.details || 'Extended details coming soon.'}</div>
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
                </div>
              </div>
            </div>
          )}

          {/* Past Events Timeline */}
          {filteredPast.length > 0 && (
            <div>
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-gray-400 bg-clip-text text-transparent">
                  Past Events
                </h3>
                <p className="text-gray-400 text-sm">Events we've successfully hosted</p>
              </motion.div>

              <div className="relative mx-auto max-w-5xl">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-600/30 via-gray-600/20 to-gray-700/20 rounded-full shadow-[0_8px_24px_rgba(59,130,246,0.04)]" />

                <div className="space-y-10">
                  {/* Past events timeline */}
                  {filteredPast.map((e, idx) => (
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
            </div>
          )}
        </section>
      </main>

      <BackToTop />
    </div>
  );
};

export default Events;


