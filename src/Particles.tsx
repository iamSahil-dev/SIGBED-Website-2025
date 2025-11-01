import { useEffect, useRef } from "react";

const DOT_COUNT = 150;

export default function Particles(): JSX.Element {
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const positionsRef = useRef(
    Array.from({ length: DOT_COUNT }).map(() => {
      const z = Math.random() * 0.9 + 0.1; // depth
      return {
        x: Math.random() * (window.innerWidth || 800),
        y: Math.random() * (window.innerHeight || 600),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        z,
        baseSize: (1 - z) * 0.9 + 0.3,
      } as any;
    })
  );

  // mouse tracking for velocity impulses
  const mouseVelRef = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const lastMouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2, t: performance.now() });
  const lastTickRef = useRef<number>(performance.now());

  useEffect(() => {
    let raf = 0;

    function onMove(e: MouseEvent) {
      const now = performance.now();
      const last = lastMouseRef.current;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dt = Math.max(1, now - last.t);
      const vx = dx / dt;
      const vy = dy / dt;
      // smoother but more responsive smoothing (less inertia)
      mouseVelRef.current.x = mouseVelRef.current.x * 0.6 + vx * 0.4;
      mouseVelRef.current.y = mouseVelRef.current.y * 0.6 + vy * 0.4;
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;
      lastMouseRef.current = { x: e.clientX, y: e.clientY, t: now };
    }

    window.addEventListener("mousemove", onMove);
    // support pointermove for better cross-device responsiveness (store handler for cleanup)
    const pointerHandler = (ev: any) => {
      if (ev.pointerType === "mouse") return; // mouse already handled
      onMove(ev as MouseEvent);
    };
    window.addEventListener("pointermove", pointerHandler);

    function tick() {
      const positions = positionsRef.current;
      const t = performance.now();
      for (let i = 0; i < positions.length; i++) {
        const p: any = positions[i];
  // a little random wandering (scaled by depth)
  p.vx += (Math.random() - 0.5) * 0.03 * (1 - p.z);
  p.vy += (Math.random() - 0.5) * 0.02 * (1 - p.z);

  const mvel = mouseVelRef.current;
  const mpos = mousePosRef.current;
  lastTickRef.current = t;

  // stronger base impulses for responsiveness
  const BASE_IMPULSE_X = 0.06;
  const BASE_IMPULSE_Y = 0.02;

  // compute approximate mouse speed (px/sec) and convert to a burst multiplier
  const mSpeedPerMs = Math.sqrt(mvel.x * mvel.x + mvel.y * mvel.y);
  const mSpeed = mSpeedPerMs * 1000; // px per second
  const burst = Math.min(4, mSpeed / 200); // ~1 at 200px/s, up to 4

  // proximity factor so closer dots respond more
  const dxm = p.x - mpos.x;
  const dym = p.y - mpos.y;
  const dist = Math.sqrt(dxm * dxm + dym * dym);
  const radius = Math.max(window.innerWidth, window.innerHeight) * 0.35;
  const proximity = Math.max(0, 1 - dist / radius); // 1 near, 0 far

  const proxMultiplier = 1 + proximity * 2; // 1..3

  // apply velocity impulses scaled by depth, burst and proximity
  p.vx += mvel.x * BASE_IMPULSE_X * (1 - p.z) * (1 + 0.5 * burst) * proxMultiplier;
  p.vy += mvel.y * BASE_IMPULSE_Y * (1 - p.z) * (1 + 0.5 * burst) * proxMultiplier;

        const bob = Math.sin(t * 0.002 + i) * (0.35 + (1 - p.z) * 0.9);
        p.vy += bob * 0.002;

        p.x += p.vx;
        p.y += p.vy;

  // slightly reduced damping so motion stays snappier
  p.vx *= 0.82;
  p.vy *= 0.82;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const MAX_SPEED = 13 * (1 - p.z) + 3.0;
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        const W = window.innerWidth;
        const H = window.innerHeight;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        const el = dotsRef.current[i];
        if (el) {
          const depthScale = 0.6 + (1 - p.z) * 1.2;
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${p.baseSize * depthScale})`;
          el.style.opacity = `${0.35 + (1 - p.z) * 0.6 + Math.max(0, Math.sin((p.x + p.y) * 0.02)) * 0.2}`;
        }
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointermove", pointerHandler);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,120,255,0.06),transparent_50%)]" />
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: Math.random() * 5 + "s",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: DOT_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className="absolute bg-white rounded-full"
            style={{
              width: "4px",
              height: "4px",
              transform: "translate3d(-100px,-100px,0) scale(1)",
              opacity: 0.6,
              willChange: "transform, opacity",
              pointerEvents: "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
