"use client";

import { useRef } from "react";
import { useAnimatedParticles } from "./useAnimatedParticles";

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useAnimatedParticles(canvasRef);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none -z-10`}
        aria-hidden="true"
      />
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80 -z-20 pointer-events-none" />
    </>
  );
};
