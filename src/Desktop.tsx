import { useEffect, useRef, useState } from "react";
import Particles from "./Particles";
import { Link } from "react-router-dom";
import { Button } from "./buttons";
import { Card, CardContent } from "./card";
import { ArrowRight, Mail, Phone, ExternalLink } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { BackToTop } from "./BackToTop";
import { InteractiveRobot } from "@/components/ui/InteractiveRobot";
import { Spotlight } from "@/components/ui/spotlight";

const navigationItems = [
  { label: "Home", href: "#/" },
  { label: "Projects", href: "#/projects" },
  { label: "Events", href: "#/events" },
  { label: "Blogs", href: "#blogs" },
  { label: "Gallery", href: "#/gallery" },
  { label: "Team", href: "#/team" },
];

const blogPosts = [
  {
    title: "Top Robotics Trends in 2025: What’s Changing and What to Expect",
    description:
      "Remember Wall-E, Jarvis, and Baymax? Well, that isn’t just movie magic anymore, it’s happening right now. In 2025, robots design buildings, pick crops, assist in hospitals, and hold conversations that surprise you. The robotics world is changing quickly. It’s tough to keep up with advances in AI, humanoid robots, eco-friendly designs, and automation. These innovations are impacting nearly every industry.",
  gradient: "from-blue-500 to-cyan-500",
    
    image:
      "../public/blog_image_3.png",
    href: "https://medium.com/@acm.sigbed/top-robotics-trends-in-2025-whats-changing-and-what-to-expect-aed5be1981bb"
  },
  {
    title: "Tesla Optimus vs Boston Dynamics Atlas: Who’s Leading the Future of Humanoid Robots?",
    description:
      'We are currently going through a period of unprecedented momentum in the humanoid robotics space, so there could not be a better time to take a closer look at the two giants advancing this technological revolution. This week, Elon Musk hinted that the upcoming Optimus Gen 3 will have just so many improvements, stoking euphoric anticipation about the most anticipated robotics launch of the year, in the minds of many.',
    gradient: "from-blue-500 to-cyan-500",
    image:
      "../public/blog_image_2.png",
    href:"https://medium.com/@acm.sigbed/tesla-optimus-vs-boston-dynamics-atlas-whos-leading-the-future-of-humanoid-robots-ea91e57668bc"
  },
  {
    title: "Exploring Robotics Dynamics and Kinematics: The Mechanics of Movement",
    description:
      "Robotics is a fusion of engineering, computer science, and mathematics, focusing on the study of machine movement in relation to its environment. At the heart of robotics are two fundamental fields: dynamics and kinematics. This blog delves deeper into these concepts, shedding light on their significance and applications in the robotics world.",
  gradient: "from-cyan-400 to-blue-400",
    image:
      "../public/blog_image_1.png",
    href:"https://medium.com/@acm.sigbed/exploring-robotics-dynamics-and-kinematics-the-mechanics-of-movement-38975f635b05"
  },
];

const projects = [
  {
    title: "Quadcopter",
    description:
      "A versatile aerial drone, the Quadcopter serves multiple applications with its agility and maneuverability. From aerial photography to surveillance, this project explores the potential of unmanned aerial vehicles in various fields.",
    image: "https://live.staticflickr.com/65535/53420797170_a34aa7d830_z.jpg"
  },
  {
    title: "3D Printed Planes",
    description:
      "Fusing technology and education, this project utilizes 3D printing to create miniature planes. Beyond being a fascinating hands-on activity, it offers insights into aerodynamics and the principles of flight.",
    image: "https://live.staticflickr.com/65535/53428135523_a5116006b7_z.jpg"
  },
  {
    title: "Bluetooth Car Using Arduino",
    description:
      "Integrating Arduino and Bluetooth technology, this project results in a remote-controlled car. Beyond the fun aspect, it serves as a practical application of embedded systems and wireless communication.",
    image: "https://live.staticflickr.com/65535/53420373396_d858a23434_z.jpg"
  },
  {
    title: "Omnidirectional Car",
    description:
      "Redefining mobility, the Omnidirectional Car incorporates wheels that can move in any direction. This innovative design enhances maneuverability, making it suitable for applications where precise movement is essential.",
    image: "https://live.staticflickr.com/65535/53415719634_e824abd906_z.jpg"
  },
  {
    title: "Gesture Controlled Car",
    description:
      "Redefining human-machine interaction, this project enables car control through gesture recognition. By harnessing computer vision, it adds a layer of intuitive control to vehicle navigation.",
    image: "https://live.staticflickr.com/65535/53419285102_4e2556ece4_z.jpg"
  },
  {
    title: "RFID Door Lock/Unlock System",
    description:
      "Elevating security, this project implements RFID technology for door access control. Offering convenience and enhanced security, it showcases the integration of advanced technologies in everyday applications.",
    image: "https://live.staticflickr.com/65535/53420638400_fd7a6e5319_z.jpg"
  },
  {
    title: "Radar",
    description:
      "Exploring radar technology, this project has applications in object detection and tracking. From security systems to autonomous vehicles, radar plays a crucial role in sensing and understanding the environment.",
    image: "https://live.staticflickr.com/65535/53420527394_4030781740_z.jpg"
  },
  {
    title: "5DoF Robotic Arm",
    description:
      "With five degrees of freedom, this robotic arm is designed for precise and controlled movements. It finds applications in various fields, including manufacturing, research, and automation, showcasing the versatility of robotic technologies.",
    image: "https://live.staticflickr.com/65535/53420378066_4b35868d0d_z.jpg"
  },
  {
    title: "FPV Racing Drone",
    description:
      "Delivering an immersive flying experience, the FPV Racing Drone combines speed and technology. It opens up possibilities for recreational and competitive drone racing, showcasing the excitement and potential of drone technology.",
    image: "https://live.staticflickr.com/65535/53415896455_6e17bd8925_z.jpg"
  },
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card
      className="bg-gradient-to-br from-gray-900/90 to-black/90 border-blue-400/30 backdrop-blur-xl hover:border-blue-300/60 hover:shadow-2xl hover:shadow-blue-400/20 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-300 group overflow-hidden"
    >
      <CardContent className="p-0">
  <div className="h-48 bg-gradient-to-br from-blue-600/20 to-white/10 flex items-center justify-center text-8xl rounded-t-lg overflow-hidden">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : null}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-blue-300 mb-3 group-hover:text-blue-200 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm leading-relaxed">
            {isExpanded ? project.description : truncateText(project.description, 80)}
          </p>
          {project.description.length > 80 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-400 hover:text-blue-300 text-sm font-semibold mt-2 transition-colors"
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const Desktop = (): JSX.Element => {

  // when the Desktop mounts ensure we're scrolled to top if route is home
  useEffect(() => {
    if (window.location.hash === "#/") {
      window.scrollTo({ top: 0 });
    }
  }, []);

  // headline reveal + rotating tagline + subtle parallax
  const [mounted, setMounted] = useState(false);
  const taglines = [
    "Empowering Innovation at the Nexus of Intelligence and Integration",
    "Where Embedded Systems Redefine Possibilities",
    "Learn · Build · Collaborate",
  ];
  const [tagIndex, setTagIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // kick off headline reveal and tagline rotation
    setMounted(true);
    const iv = setInterval(() => setTagIndex((s) => (s + 1) % taglines.length), 3500);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    // subtle parallax on scroll for the hero (desktop only)
    let raf = 0;
    function onScroll() {
      if (!heroRef.current) return;
      const y = window.scrollY || window.pageYOffset;
      // small capped vertical shift
      const shift = Math.min(60, y * 0.08);
      heroRef.current.style.transform = `translate3d(0, ${shift}px, 0)`;
    }

    function loop() {
      onScroll();
      raf = requestAnimationFrame(loop);
    }

    if (window.innerWidth >= 768) {
      raf = requestAnimationFrame(loop);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // scroll progress bar for homepage (updates transform: scaleX)
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    let rafId = 0;

    function update() {
      const node = progressRef.current;
      if (!node) return;
      const doc = document.documentElement;
      const scrollTop = window.scrollY || window.pageYOffset;
      const height = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const progress = Math.max(0, Math.min(1, scrollTop / height));
      node.style.transform = `scaleX(${progress})`;
      rafId = requestAnimationFrame(update);
    }

    rafId = requestAnimationFrame(update);

    // re-compute on resize and load
    const onResize = () => { if (!rafId) rafId = requestAnimationFrame(update); };
    window.addEventListener("resize", onResize);
    window.addEventListener("load", update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", update);
    };
  }, [progressRef]);

  // reveal-on-scroll for panels: fade+slide when entering viewport
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    // helper to perform an immediate visibility check (covers SPA navigation)
    const checkVisibleNow = (elements: HTMLElement[], io?: IntersectionObserver) => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      elements.forEach((el) => {
        if (el.classList.contains("reveal-visible")) return;
        const r = el.getBoundingClientRect();
        if (r.top <= vh * 0.88) {
          el.classList.add("reveal-visible");
          if (io) io.unobserve(el);
        }
      });
    };

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("reveal-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("reveal-visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => io.observe(el));

    // run an immediate check in case elements are already in view (SPA navigation)
    checkVisibleNow(els, io);

    // also re-run check when the page hash changes (our router) or when the window loads
    const onHash = () => checkVisibleNow(els, io);
    const onLoad = () => checkVisibleNow(els, io);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("load", onLoad);

    // images may change layout; re-check when images load inside reveals
    const imgHandler = () => checkVisibleNow(els, io);
    const imgs = Array.from(document.querySelectorAll("img"));
    imgs.forEach((img) => img.addEventListener("load", imgHandler));

    return () => {
      io.disconnect();
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("load", onLoad);
      imgs.forEach((img) => img.removeEventListener("load", imgHandler));
    };
  }, []);

  // --- moving dots BG ---
  const DOT_COUNT = 150;
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const positionsRef = useRef(
    Array.from({ length: DOT_COUNT }).map(() => {
      const z = Math.random() * 0.9 + 0.1; // depth: 0.1 (near) .. 1.0 (far)
      return {
  x: Math.random() * (window.innerWidth || 800),
  y: Math.random() * (window.innerHeight || 600),
  vx: (Math.random() - 0.5) * 0.3,
  vy: (Math.random() - 0.5) * 0.3,
        z,
        // baseSize smaller when far (z closer to 1)
        baseSize: (1 - z) * 0.9 + 0.3,
      };
    })
  );
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  // track mouse velocity (px per ms) to push particles in the direction of motion
  const mouseVelRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2, t: performance.now() });
  const lastTickRef = useRef<number>(performance.now());
  useEffect(() => {
    let raf = 0;

    function onMove(e: MouseEvent) {
      const now = performance.now();
      const last = lastMouseRef.current;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dt = Math.max(1, now - last.t); // ms

      // velocity in px per ms, smoothed
      const vx = dx / dt;
      const vy = dy / dt;
      mouseVelRef.current.x = mouseVelRef.current.x * 0.75 + vx * 0.25;
      mouseVelRef.current.y = mouseVelRef.current.y * 0.75 + vy * 0.25;

      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      lastMouseRef.current = { x: e.clientX, y: e.clientY, t: now };
    }

    window.addEventListener("mousemove", onMove);

    function tick() {
      const positions = positionsRef.current;
      const t = performance.now();
      for (let i = 0; i < positions.length; i++) {
        const p = positions[i];

        // small random wandering (scaled by depth so nearer dots are livelier)
        p.vx += (Math.random() - 0.5) * 0.02 * (1 - p.z);
        p.vy += (Math.random() - 0.5) * 0.01 * (1 - p.z);

        // Apply a velocity impulse based on recent mouse movement so particles
        // continue moving (momentum) after the cursor stops.
        const mvel = mouseVelRef.current; // px per ms (smoothed)
        // advance lastTickRef for consistent timing (value not directly used below)
        lastTickRef.current = t;
        // impulse multipliers (tuned small so motion is subtle but persistent)
        const IMPULSE_X = 0.045; // stronger horizontal fling (increased noticeably)
        const IMPULSE_Y = 0.015; // vertical impulse (increased noticeably)
        // convert mvel (px/ms) into a velocity change and apply depth scaling
        p.vx += mvel.x * IMPULSE_X * (1 - p.z);
        p.vy += mvel.y * IMPULSE_Y * (1 - p.z);

        // Vertical bobbing to create 3D illusion (sinusoidal based on time + index)
        const bob = Math.sin(t * 0.002 + i) * (0.35 + (1 - p.z) * 0.9);
        p.vy += bob * 0.002;

        // integrate
        p.x += p.vx;
        p.y += p.vy;

        // slight damping (reduced more so motion stays livelier)
        p.vx *= 0.85;
        p.vy *= 0.85;

        // cap speed for stability (nearer dots allowed to move faster)
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const MAX_SPEED = 13 * (1 - p.z) + 3.0;
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        // wrap-around edges for continuous motion
        const W2 = window.innerWidth;
        const H = window.innerHeight;
        if (p.x < -10) p.x = W2 + 10;
        if (p.x > W2 + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        const el = dotsRef.current[i];
        if (el) {
          // scale further by depth so nearer dots appear larger
          const depthScale = 0.6 + (1 - p.z) * 1.2;
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${p.baseSize * depthScale})`;
          // pulse opacity slightly for visual interest (nearer dots brighter)
          el.style.opacity = `${0.35 + (1 - p.z) * 0.6 + Math.max(0, Math.sin((p.x + p.y) * 0.02)) * 0.2}`;
        }
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen overflow-x-hidden">
      <Particles />
      <div
        ref={progressRef}
        className="fixed top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 origin-left z-[60]"
        style={{ transform: "scaleX(0)", transformOrigin: "left" }}
      />

      {/* Header */}
  <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/50 border-b border-blue-400/20">
        <div className="w-full px-8 h-20 flex items-center">
          <div className="flex items-center gap-4 group cursor-pointer mr-auto">
            <img 
              src="public/logo.png" 
              alt="SIGBED Logo" 
              className="h-14 w-auto object-contain transform group-hover:scale-110 transition-transform cursor-pointer"
            /> 
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              MUJ ACM SIGBED
            </h1>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-lg justify-center w-full">
            {navigationItems.map((item, index) => {
              const isActive = item.href === "#/" || item.href === "#";
              return (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    if (item.label === "Home") {
                      e.preventDefault();
                      if (window.location.hash !== "#/") window.location.hash = "#/";
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="text-gray-300 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-white transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              );
            })}
          </nav>

          <Button 
            asChild
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 ml-auto hidden lg:block"
          >
            <Link to="/auth-choice">Join Us</Link>
          </Button>

          {/* Mobile Menu */}
          <MobileMenu navigationItems={navigationItems} />
        </div>
      </header>

      {/* Hero Section */}
      <section data-reveal className="reveal relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="container mx-auto px-8 text-center">
          <div ref={heroRef} className="transition-all duration-1000">
            <h2
              className="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient"
              style={{
                transition: "transform 700ms cubic-bezier(.2,.9,.2,1), opacity 600ms",
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                opacity: mounted ? 1 : 0,
              }}
            >
              ACM SIGBED
            </h2>

            <p className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Welcome to India's First SIGBED Chapter
            </p>

            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12 relative h-12 flex items-center justify-center">
              {/* rotating tagline: render all and crossfade via opacity */}
              {taglines.map((t, i) => (
                <span
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-700 ${tagIndex === i ? "opacity-100" : "opacity-0"}`}
  <section data-reveal className="reveal relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Spotlight effect for the entire hero section - attached to section */}
        <Spotlight size={450} springOptions={{ damping: 30, stiffness: 150 }} />
        
        <div className="container mx-auto px-8 relative z-10">
          <div ref={heroRef} className="transition-all duration-1000 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Column: Text Content */}
            <div className="flex-1 text-center lg:text-left relative z-20">
              <h2
                className="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-white bg-clip-text text-transparent animate-blue-shift drop-shadow-2xl relative z-10"
                style={{
                  transition: "transform 700ms cubic-bezier(.2,.9,.2,1), opacity 600ms",
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  opacity: mounted ? 1 : 0,
                }}
              >
                ACM SIGBED
              </h2>

              <p className="text-2xl md:text-3xl text-gray-300 mb-8 drop-shadow-lg relative z-10">
                Welcome to India's First SIGBED Chapter
              </p>

              <p className="text-lg text-gray-400 relative h-12 flex items-center justify-center lg:justify-start z-10">
                {/* rotating tagline: render all and crossfade via opacity */}
                {taglines.map((t, i) => (
                  <span
                    key={i}
                    className={`absolute transition-opacity duration-700 ${tagIndex === i ? "opacity-100" : "opacity-0"}`}
                  >
                    {t}
                  </span>
                ))}
              </p>
            </div>

            {/* Right Column: Interactive Robot - Full Width */}
            <div className="flex-1 w-full lg:w-[55%] xl:w-[50%] flex items-center justify-center relative z-10 overflow-visible">
              <div className="w-full h-[550px] md:h-[700px] lg:h-[750px] relative overflow-visible flex items-center justify-center px-12 lg:px-16">
              <div
                  className="w-full h-full relative overflow-visible"
                  style={{
                    transform: 'scale(0.9)',
                    transformOrigin: 'center',
                    width: 'calc(100% + 180px)',
                    marginLeft: '-90px',
                    marginRight: '-100px',
                  }}
                >
                  <InteractiveRobot />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>    

      {/* About Section */}
  <section data-reveal className="reveal relative py-32 px-8">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-blue-400/30 backdrop-blur-xl">
            <CardContent className="p-12">
              <h2 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Special Interest Group on Embedded Systems
              </h2>
              <p className="text-2xl text-blue-300 text-center mb-8">
                Empowering Innovation, Advancing Embedded Systems
              </p>
              <div className="space-y-6 text-gray-300 text-lg max-w-5xl mx-auto">
                <p>
                  ACM SIGBED is a focal point within the Association for
                  Computing Machinery (ACM) for all aspects of embedded
                  computing systems and cyber-physical systems, including both
                  software and hardware.
                </p>
                <p>
                  We are committed to promoting research, development, and
                  application of embedded systems across various domains. We aim
                  to create a vibrant and collaborative environment where
                  professionals and enthusiasts can share ideas, explore
                  emerging trends, and contribute to the evolution of embedded
                  computing.
                </p>
              </div>
              <div className="flex justify-center mt-12">
                <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-full border-0 group">
                  Learn More
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Us Section */}
  <section data-reveal className="reveal relative py-32 px-8">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-400/30 backdrop-blur-xl">
            <CardContent className="p-12">
              <h2 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                About Us
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                The Manipal University Jaipur (MUJ) ACM SIGBED Student Chapter
                is a place where innovation and technology meet to flourish! As
                an integral part of the larger ACM SIGBED, our chapter serves as
                a focal point within the Association for Computing Machinery
                (ACM) for all aspects of embedded computing systems,
                encompassing both software and hardware domains. We embrace the
                attitude of learning, commitment, and hard work, and we extend a
                warm welcome to students who are passionate about embedded
                systems and its diverse implementations. Our chapter is a lively
                gathering place for students to interact with like-minded
                people, learn about innovative developments, and take part in
                educational programmes that help them gain a deeper
                comprehension of the world of robotics and embedded culture.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
  <section id="projects" data-reveal className="reveal relative py-32 px-8">
        <div className="container mx-auto">
          <h2 className="text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent leading-tight pb-2">
            Our Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <div className="bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-8 py-4">
              <p className="text-lg">
                Explore more Projects from{" "}
                <span className="text-white font-semibold">
                  MUJ ACM SIGBED!
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
  <section id="blogs" data-reveal className="reveal relative py-32 px-8">
        <div className="container mx-auto">
          <h2 className="text-6xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight pb-2">
            Our Blogs
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((blog, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900/90 to-black/90 border-blue-400/30 backdrop-blur-xl hover:scale-105 transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-8">
                  {blog.image ? (
                    <div className="w-full h-48 rounded-lg overflow-hidden mb-6 group-hover:shadow-2xl transition-shadow">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-full h-48 rounded-lg bg-gradient-to-br ${blog.gradient} mb-6 group-hover:shadow-2xl transition-shadow`}
                    />
                  )}
                  <h3 className="text-xl font-bold text-blue-400 mb-4 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 mb-6 line-clamp-3">
                    {blog.description}
                  </p>
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700 border-0 group"
                  >
                    <a
                      href={blog.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-12">
              <a
                href="https://medium.com/@acm.sigbed"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-8 py-4 text-lg flex items-center"
              >
                Read more blogs from{" "}
                <span className="text-white font-semibold ml-2">
                  MUJ ACM SIGBED!
                </span>
              </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
  <section data-reveal className="reveal relative py-32 px-8">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 border-0">
            <CardContent className="p-16 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Explore the benefits of joining ACM SIGBED
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Your gateway to the world of IoT. Join us to connect with
                like-minded individuals, gearing up for success in college and
                beyond, with a specific focus on the Internet of Things
              </p>
              <Button 
                asChild
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-12 py-6 rounded-full border-0 font-bold"
              >
                <Link to="/auth-choice">Join Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-blue-900/40 to-white/5 backdrop-blur-xl border-t border-blue-400/30 py-16 px-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
              <img 
              src="public/logo.png" 
              alt="SIGBED Logo" 
              className="h-14 w-auto object-contain transform group-hover:scale-110 transition-transform cursor-pointer"
            />
                <h3 className="text-xl font-bold">MUJ ACM SIGBED</h3>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4 text-blue-300">
                Contact Us
              </h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <div>
                    <p>Tanmay Kaushik</p>
                    <p>+91 93503 78040</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <div>
                    <p>Saamarth Mishra</p>
                    <p>+91 99192 01610</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4 text-blue-300">Links</h4>
              <div className="space-y-2">
                <a
                  href="https://sigbed.vercel.app/team/developers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Development Team
                </a>
                <a
                  href="https://www.acm.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  ACM Official Website
                </a>
                <a
                  href="https://sigbed.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  SIGBED Official Website
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4 text-blue-300">
                Address
              </h4>
              <p className="text-gray-300 mb-4">
                Manipal University Jaipur, Dehmi Kalan, Near GVK Toll Plaza,
                Jaipur-Ajmer Expressway, Jaipur, Rajasthan 303007
              </p>
              <a
                href="mailto:acm.sigbed@muj.manipal.edu"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                acm.sigbed@muj.manipal.edu
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Smooth blue-shift for the headline gradient */
        @keyframes blueShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-blue-shift {
          background-size: 300% 300%;
          animation: blueShift 6s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        /* reveal panels */
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 800ms ease, transform 800ms cubic-bezier(.2,.9,.2,1);
          will-change: opacity, transform;
        }

        .reveal-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};