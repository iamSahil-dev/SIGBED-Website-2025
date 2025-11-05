import { useEffect, useRef } from "react";

const DOT_COUNT = 180;

type BurstParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
};

export default function Particles(): JSX.Element {
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const burstsRef = useRef<BurstParticle[]>([]);
  const burstElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement | null>(null);
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

    function onPointerDown(e: PointerEvent) {
      // spawn a burst at the click/tap location
      const x = e.clientX;
      const y = e.clientY;
      const count = 18;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 6.0;
        const z = Math.random() * 0.9 + 0.1;
        const size = 2 + Math.random() * 6 * (1 - z);
        const hue = 190 + Math.random() * 80; // cyan->blue range
        burstsRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0.8 + Math.random() * 0.6,
          size,
          color: `hsl(${hue}, 90%, ${50 - z * 10}%)`,
        });
      }
      // cap to pool size
      if (burstsRef.current.length > 64) burstsRef.current.splice(0, burstsRef.current.length - 64);
    }

    window.addEventListener("mousemove", onMove);
    // support pointermove for better cross-device responsiveness (store handler for cleanup)
    const pointerHandler = (ev: any) => {
      if (ev.pointerType === "mouse") return; // mouse already handled
      onMove(ev as MouseEvent);
    };
    window.addEventListener("pointermove", pointerHandler);
    window.addEventListener("pointerdown", onPointerDown);

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
          const depthScale = 0.6 + (1 - p.z) * 1.4;
          const hue = 200 + (1 - p.z) * 80; // depth-dependent hue
          el.style.background = `radial-gradient(circle at 30% 30%, hsl(${hue},90%,70%), hsl(${hue},80%,55%))`;
          el.style.boxShadow = `0 0 ${4 + (1 - p.z) * 8}px rgba(100,170,255,${0.12 + (1 - p.z) * 0.18})`;
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${p.baseSize * depthScale})`;
          el.style.opacity = `${0.25 + (1 - p.z) * 0.75}`;
        }
      }

  // update bursts
      const bursts = burstsRef.current;
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.vx *= 0.92;
        b.vy *= 0.92;
        b.vy += 0.02 * (1 - Math.random());
        b.x += b.vx;
        b.y += b.vy;
        b.life -= 0.016;
        const bel = burstElsRef.current[i];
        if (bel) {
          bel.style.transform = `translate3d(${b.x}px, ${b.y}px, 0) scale(${b.size / 4})`;
          bel.style.opacity = `${Math.max(0, Math.min(1, b.life))}`;
          bel.style.background = b.color;
        }
        if (b.life <= 0) {
          bursts.splice(i, 1);
          // also remove corresponding DOM entry by keeping elements synced in render
        }
      }

      // update cursor ring (smooth follow)
      const cur = cursorRef.current;
      if (cur) {
        const cx = mousePosRef.current.x;
        const cy = mousePosRef.current.y;
        // gentle trailing via CSS transform — use small lerp
        cur.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointermove", pointerHandler);
      window.removeEventListener("pointerdown", onPointerDown);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* subtle animated radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.06),transparent_20%),radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.04),transparent_30%)] animate-gradient-bg" />

      {/* decorative slow orbs */}
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${60 + Math.random() * 140}px`,
              height: `${60 + Math.random() * 140}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `radial-gradient(circle at 30% 30%, rgba(6,182,212,${0.06 + Math.random() * 0.06}), rgba(59,130,246,${0.02 + Math.random() * 0.03}))`,
              filter: "blur(34px)",
              transform: `translate3d(0,0,0)`,
              animation: `float ${40 + Math.random() * 30}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* floating project icons removed per user request */}

      {/* bursts layer (fixed pool for DOM reuse) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (burstElsRef.current[i] = el)}
            className="absolute rounded-full"
            style={{
              width: "6px",
              height: "6px",
              transform: "translate3d(-100px,-100px,0)",
              opacity: 0,
              willChange: "transform, opacity, background",
              pointerEvents: "none",
            }}
          />
        ))}
      </div>

      {/* main particle dots */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: DOT_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className="absolute rounded-full"
            style={{
              width: "4px",
              height: "4px",
              transform: "translate3d(-100px,-100px,0) scale(1)",
              opacity: 0.6,
              willChange: "transform, opacity, background",
              pointerEvents: "none",
            }}
          />
        ))}
      </div>

      {/* cursor ring (visual only) */}
      <div
        ref={(el) => (cursorRef.current = el)}
        className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 36,
          height: 36,
          borderRadius: 9999,
          border: "2px solid rgba(6,182,212,0.85)",
          boxShadow: "0 0 12px rgba(6,182,212,0.18), 0 0 28px rgba(59,130,246,0.08)",
          transform: `translate3d(${mousePosRef.current.x}px, ${mousePosRef.current.y}px, 0)`,
          transition: "transform 0.06s linear",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
