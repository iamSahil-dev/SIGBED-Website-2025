import { Card, CardContent } from "./card";
import Particles from "./Particles";
import { useState, useEffect, useRef } from "react";
import { Button } from "./buttons";
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, animate } from "framer-motion";
import { Rocket, Target, Bot, Search, X, Filter } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { BackToTop } from "./BackToTop";
import { ProjectModal } from "./ProjectModal";
import { useToast } from "./ToastProvider";

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) => {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false, margin: "-100px" });
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest).toString());
        }
      });
      return controls.stop;
    } else {
      count.set(0);
      setDisplayValue("0");
    }
  }, [isInView, count, target, duration]);

  return (
    <span ref={countRef}>
      {displayValue}{suffix}
    </span>
  );
};

const navigationItems = [
  { label: "Home", href: "#/" },
  { label: "Projects", href: "#/projects" },
  { label: "Events", href: "#/events" },
  { label: "Blogs", href: "#blogs" },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
];

const projects = [
  {
    title: "Quadcopter",
    description:
      "A versatile aerial drone, the Quadcopter serves multiple applications with its agility and maneuverability. From aerial photography to surveillance, this project explores the potential of unmanned aerial vehicles in various fields.",
    image: "https://live.staticflickr.com/65535/53420797170_a34aa7d830_z.jpg",
    tags: ["Drone", "UAV", "Flight Control", "Embedded Systems"],
    category: "Aerial"
  },
  {
    title: "3D Printed Planes",
    description:
      "Fusing technology and education, this project utilizes 3D printing to create miniature planes. Beyond being a fascinating hands-on activity, it offers insights into aerodynamics and the principles of flight.",
    image: "https://live.staticflickr.com/65535/53428135523_a5116006b7_z.jpg",
    tags: ["3D Printing", "Aerodynamics", "Education", "Design"],
    category: "Aerial"
  },
  {
    title: "Bluetooth Car Using Arduino",
    description:
      "Integrating Arduino and Bluetooth technology, this project results in a remote-controlled car. Beyond the fun aspect, it serves as a practical application of embedded systems and wireless communication.",
    image: "https://live.staticflickr.com/65535/53420373396_d858a23434_z.jpg",
    tags: ["Arduino", "Bluetooth", "Wireless", "IoT"],
    category: "Robotics"
  },
  {
    title: "Omnidirectional Car",
    description:
      "Redefining mobility, the Omnidirectional Car incorporates wheels that can move in any direction. This innovative design enhances maneuverability, making it suitable for applications where precise movement is essential.",
    image: "https://live.staticflickr.com/65535/53415719634_e824abd906_z.jpg",
    tags: ["Mecanum Wheels", "Navigation", "Control Systems", "Robotics"],
    category: "Robotics"
  },
  {
    title: "Gesture Controlled Car",
    description:
      "Redefining human-machine interaction, this project enables car control through gesture recognition. By harnessing computer vision, it adds a layer of intuitive control to vehicle navigation.",
    image: "https://live.staticflickr.com/65535/53419285102_4e2556ece4_z.jpg",
    tags: ["Computer Vision", "ML", "Gesture Recognition", "HCI"],
    category: "AI/ML"
  },
  {
    title: "RFID Door Lock/Unlock System",
    description:
      "Elevating security, this project implements RFID technology for door access control. Offering convenience and enhanced security, it showcases the integration of advanced technologies in everyday applications.",
    image: "https://live.staticflickr.com/65535/53420638400_fd7a6e5319_z.jpg",
    tags: ["RFID", "Security", "IoT", "Access Control"],
    category: "IoT"
  },
  {
    title: "Radar",
    description:
      "Exploring radar technology, this project has applications in object detection and tracking. From security systems to autonomous vehicles, radar plays a crucial role in sensing and understanding the environment.",
    image: "https://live.staticflickr.com/65535/53420527394_4030781740_z.jpg",
    tags: ["Radar", "Sensors", "Detection", "Signal Processing"],
    category: "Sensors"
  },
  {
    title: "5DoF Robotic Arm",
    description:
      "With five degrees of freedom, this robotic arm is designed for precise and controlled movements. It finds applications in various fields, including manufacturing, research, and automation, showcasing the versatility of robotic technologies.",
    image: "https://live.staticflickr.com/65535/53420378066_4b35868d0d_z.jpg",
    tags: ["Robotics", "Servo Motors", "Kinematics", "Automation"],
    category: "Robotics"
  },
  {
    title: "FPV Racing Drone",
    description:
      "Delivering an immersive flying experience, the FPV Racing Drone combines speed and technology. It opens up possibilities for recreational and competitive drone racing, showcasing the excitement and potential of drone technology.",
    image: "https://live.staticflickr.com/65535/53415896455_6e17bd8925_z.jpg",
    tags: ["FPV", "Racing", "Drone", "Flight Controller"],
    category: "Aerial"
  },
];

const ProjectCard = ({ project, index, onClick }: { project: typeof projects[0]; index: number; onClick: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  const rotateX = (mousePosition.y - 0.5) * -10;
  const rotateY = (mousePosition.x - 0.5) * 10;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      whileHover={{ scale: 1.03, y: -8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        rotateX,
        rotateY
      }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-blue-400/30 backdrop-blur-xl hover:border-blue-300/60 hover:shadow-2xl hover:shadow-blue-400/20 transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
          <motion.div 
            className="h-48 bg-gradient-to-br from-blue-600/20 to-white/10 flex items-center justify-center text-8xl rounded-t-lg overflow-hidden relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {project.image ? (
              <>
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </>
            ) : null}
          </motion.div>
          
          <div className="p-6">
            <motion.h3 
              className="text-xl font-bold text-blue-300 mb-3 group-hover:text-blue-200 transition-colors"
              initial={{ x: -20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {project.title}
            </motion.h3>

            {/* Tags */}
            {project.tags && (
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-blue-500/10 border border-blue-400/30 rounded-full text-blue-300 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <motion.p 
              className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {isExpanded ? project.description : truncateText(project.description, 80)}
            </motion.p>
            {project.description.length > 80 && (
              <motion.button
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="text-blue-400 hover:text-blue-300 text-sm font-semibold mt-2 transition-colors"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {isExpanded ? "Read less" : "Read more"} →
              </motion.button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Flying Rocket Component
const FlyingRocket = ({ onComplete }: { onComplete: () => void }) => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  return (
    <>
      {/* Rocket */}
      <motion.div
        className="fixed z-[100] pointer-events-none"
        initial={{ 
          x: -100,
          y: screenHeight - 100,
          rotate: 45,
          scale: 1
        }}
        animate={{ 
          x: [
            -100,
            screenWidth * 0.2,
            screenWidth * 0.4,
            screenWidth * 0.6,
            screenWidth * 0.8,
            screenWidth + 100
          ],
          y: [
            screenHeight - 100,
            screenHeight * 0.6,
            screenHeight * 0.3,
            screenHeight * 0.2,
            screenHeight * 0.4,
            -100
          ],
          rotate: [45, 30, 0, -30, -45, -60],
          scale: [1, 1.2, 1.5, 1.3, 1.1, 1]
        }}
        transition={{ 
          duration: 2.5,
          ease: "easeInOut"
        }}
        onAnimationComplete={onComplete}
      >
        {/* Glowing rocket with trail */}
        <div className="relative">
          <Rocket className="w-16 h-16 text-cyan-400 relative z-10" 
            style={{
              filter: "drop-shadow(0 0 20px rgba(6, 182, 212, 1)) drop-shadow(0 0 40px rgba(6, 182, 212, 0.5))"
            }}
          />
          
          {/* Animated exhaust/fire trail */}
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-8 h-16 origin-top"
            animate={{
              scaleY: [1, 1.3, 0.8, 1.2, 1],
              opacity: [0.8, 1, 0.6, 0.9, 0.8]
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-orange-500 via-yellow-400 to-transparent rounded-full blur-sm" />
          </motion.div>
          
          {/* Additional fire effect */}
          <motion.div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-6 h-12 origin-top"
            animate={{
              scaleY: [0.8, 1.2, 0.9, 1.1, 0.8],
              opacity: [1, 0.7, 0.9, 0.6, 1]
            }}
            transition={{
              duration: 0.12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.05
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-yellow-300 via-orange-400 to-transparent rounded-full blur-[2px]" />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Smoke trail particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed z-[99] pointer-events-none"
          initial={{ 
            x: -100,
            y: screenHeight - 100,
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            x: [
              -100 + (i * 10),
              screenWidth * 0.2 - (i * 15),
              screenWidth * 0.4 - (i * 20),
              screenWidth * 0.6 - (i * 25),
              screenWidth * 0.8 - (i * 30),
            ],
            y: [
              screenHeight - 100 + (i * 5),
              screenHeight * 0.6 + (i * 8),
              screenHeight * 0.3 + (i * 10),
              screenHeight * 0.2 + (i * 12),
              screenHeight * 0.4 + (i * 15),
            ],
            opacity: [0, 0.6, 0.4, 0.2, 0],
            scale: [0, 1, 1.5, 2, 2.5]
          }}
          transition={{ 
            duration: 2.5,
            ease: "easeOut",
            delay: i * 0.08
          }}
        >
          <div className="w-12 h-12 rounded-full bg-cyan-400/20 blur-xl" />
        </motion.div>
      ))}
      
      {/* Star particles along the path */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="fixed z-[98] pointer-events-none"
          initial={{ 
            x: screenWidth * (0.2 + i * 0.1),
            y: screenHeight * (0.6 - i * 0.05),
            opacity: 0,
            scale: 0,
            rotate: 0
          }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut",
            delay: 0.3 + (i * 0.2)
          }}
        >
          <div className="w-3 h-3 bg-yellow-300 rounded-full" 
            style={{
              filter: "drop-shadow(0 0 6px rgba(253, 224, 71, 1))"
            }}
          />
        </motion.div>
      ))}
    </>
  );
};

export const Projects = (): JSX.Element => {
  const [showRocket, setShowRocket] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const { showToast } = useToast();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 0.9]);

  const handleRocketClick = () => {
    setShowRocket(true);
    showToast("🚀 Rocket launched!", "success");
  };

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    showToast(`Opening ${project.title}`, "info");
  };

  // Filter projects based on search and category
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       project.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div ref={containerRef} className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen overflow-x-hidden">
      <Particles />
      
      {/* Flying Rocket Animation */}
      {showRocket && <FlyingRocket onComplete={() => setShowRocket(false)} />}
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-[70px] left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 origin-left z-[60]"
        style={{ scaleX: smoothProgress }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/50 border-b border-blue-400/20 min-h-[70px]">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[70px] flex items-center justify-between gap-2 sm:gap-4">
          <motion.div 
            className="flex items-center group cursor-pointer flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h1 className="text-base sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              MUJ ACM SIGBED
            </h1>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-6 lg:gap-8 text-sm lg:text-base">
            {navigationItems.map((item, index) => {
              const isActive = item.href === "#/projects" || item.href === "#/projects/";
              return (
                <motion.a
                  key={index}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors relative group whitespace-nowrap"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </motion.a>
              );
            })}
          </nav>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden lg:block">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 text-sm lg:text-base px-6 lg:px-8">
              Join Us
            </Button>
          </motion.div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <MobileMenu navigationItems={navigationItems} />
          </div>
        </div>
      </header>

      <main className="pt-[90px] pb-24">
        {/* Hero Section with Parallax */}
        <motion.div 
          className="container mx-auto px-8 mb-16"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              className="flex justify-center gap-4 mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.button
                onClick={handleRocketClick}
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.2, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer focus:outline-none"
              >
                <Rocket className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]" />
              </motion.button>
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                <Bot className="w-12 h-12 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
              </motion.div>
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <Target className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]" />
              </motion.div>
            </motion.div>
            
            <motion.h2 
              className="text-6xl font-bold text-center mb-6 leading-tight pb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.span
                className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                Our Projects
              </motion.span>
            </motion.h2>
            
            <motion.p
              className="text-gray-400 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Explore our innovative projects showcasing cutting-edge technology and creative solutions
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="container mx-auto px-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { number: 9, suffix: "+", label: "Projects Completed", icon: Rocket, clickable: true },
              { number: 100, suffix: "+", label: "Team Members", icon: Target, clickable: false },
              { number: 5, suffix: "", label: "Ongoing Projects", icon: Bot, clickable: false }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-400/30 rounded-xl p-6 text-center backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(96, 165, 250, 0.6)",
                  transition: { duration: 0.2 }
                }}
              >
                <motion.button
                  onClick={stat.clickable ? handleRocketClick : undefined}
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  whileTap={{ scale: 0.8 }}
                  className={`${stat.clickable ? 'cursor-pointer' : 'cursor-default'} focus:outline-none mx-auto block mb-4`}
                >
                  <stat.icon className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]" />
                </motion.button>
                <motion.h3 
                  className="text-4xl font-bold text-blue-300 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} duration={2} />
                </motion.h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          className="container mx-auto px-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-row gap-3 items-center justify-center max-w-3xl mx-auto">
            {/* Clean Search Bar */}
            <motion.div 
              className="relative flex-1"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                {/* Search Icon - Left */}
                <div className="absolute left-0 top-0 bottom-0 w-11 flex items-center justify-center pointer-events-none z-10">
                  <Search className="w-5 h-5 text-cyan-400" strokeWidth={2.5} />
                </div>

                {/* Input Field */}
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-11 pr-11 bg-gray-900/60 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-900/80 transition-all backdrop-blur-sm"
                />
                
                {/* Clear Button - Right */}
                {searchQuery && (
                  <motion.button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-0 top-0 bottom-0 w-11 flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" strokeWidth={2.5} />
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* Filter Dropdown Button */}
            <motion.div
              className="relative flex-shrink-0"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={`h-12 px-5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap min-w-[120px] ${
                  selectedCategory !== "All"
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                    : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 hover:text-white border border-cyan-400/30"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Filter className="w-5 h-5" strokeWidth={2} />
                <span className="font-medium">{selectedCategory}</span>
                {selectedCategory !== "All" && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </motion.button>

              {/* Dropdown Menu */}
              {showFilterDropdown && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowFilterDropdown(false)}
                  />
                  
                  {/* Dropdown */}
                  <motion.div
                    className="absolute right-0 top-14 w-48 bg-gray-900/95 backdrop-blur-xl border border-cyan-400/30 rounded-lg shadow-2xl shadow-black/50 overflow-hidden z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {categories.map((category, index) => (
                      <motion.button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowFilterDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left transition-colors ${
                          selectedCategory === category
                            ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                            : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
                        }`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{category}</span>
                          {selectedCategory === category && (
                            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>

          {/* Simplified Results Count */}
          <motion.div
            className="mt-5 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gray-400 text-sm">
              Showing <span className="text-cyan-400 font-semibold">{filteredProjects.length}</span> of <span className="text-white font-semibold">{projects.length}</span> projects
            </span>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={index} 
                project={project} 
                index={index}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-gray-400 text-lg mb-4">No projects found matching your criteria</p>
              <motion.button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg text-white font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          className="container mx-auto px-8 mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-400/40 rounded-2xl p-12 text-center backdrop-blur-sm"
            whileHover={{ scale: 1.02, borderColor: "rgba(96, 165, 250, 0.8)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Want to collaborate?
            </motion.h3>
            <motion.p 
              className="text-gray-300 mb-8 text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Join us in building the future of embedded systems and robotics
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 px-8 py-6 text-lg">
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default Projects;
