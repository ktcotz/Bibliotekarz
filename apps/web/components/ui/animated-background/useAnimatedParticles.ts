import { useEffect, useRef } from "react";

const CONFIG = {
  particleCount: 50,
  maxSpeed: 0.5,
  minSize: 1,
  maxSize: 4,
  minOpacity: 0.2,
  maxOpacity: 0.7,
  connectionDistance: 100,
  particleColor: "99, 102, 241",
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
};

/**
 * Hook for rendering animated particles on a canvas background.
 *
 * - Responds to window size (ResizeObserver)
 * - Uses requestAnimationFrame for smooth animation
 * - Draws particles and lines between them when they are close
 *
 * @param canvasRef - Reference to the <canvas> element where the particles should be rendered
 *
 * @example
 * const canvasRef = useRef<HTMLCanvasElement>(null);
 * useAnimatedParticles(canvasRef);
 */

export function useAnimatedParticles(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) {
  const animationFrameRef = useRef<number | null>(null);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setSize();

    const createParticles = () => {
      particles.current = Array.from({ length: CONFIG.particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * CONFIG.maxSpeed,
        vy: (Math.random() - 0.5) * CONFIG.maxSpeed,
        size:
          Math.random() * (CONFIG.maxSize - CONFIG.minSize) + CONFIG.minSize,
        opacity:
          Math.random() * (CONFIG.maxOpacity - CONFIG.minOpacity) +
          CONFIG.minOpacity,
      }));
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CONFIG.particleColor}, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.current.length; j++) {
          const other = particles.current[j];
          if (!other) return null;

          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONFIG.connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(${CONFIG.particleColor}, ${
              0.1 * (1 - dist / CONFIG.connectionDistance)
            })`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(document.body);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [canvasRef]);
}
