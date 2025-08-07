"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Star,
  Heart,
  Sparkles,
  Zap,
  Crown,
  LucideIcon,
} from "lucide-react";
import { useMemo } from "react";

const ELEMENTS: Array<{
  Icon: LucideIcon;
  delay: number;
  x: number;
  y: number;
}> = [
  { Icon: BookOpen, delay: 0, x: 10, y: 20 },
  { Icon: Star, delay: 2, x: 80, y: 30 },
  { Icon: Heart, delay: 4, x: 15, y: 70 },
  { Icon: Sparkles, delay: 1, x: 85, y: 80 },
  { Icon: Zap, delay: 3, x: 70, y: 15 },
  { Icon: Crown, delay: 5, x: 25, y: 85 },
];

export const FloatingElements = () => {
  const elements = useMemo(() => ELEMENTS, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {elements.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-indigo-400/70"
          style={{
            top: `${y}vh`,
            left: `${x}vw`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon className="h-10 w-10" />
        </motion.div>
      ))}
    </div>
  );
};
