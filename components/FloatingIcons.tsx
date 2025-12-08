"use client";
import React, { JSX } from "react";
import { motion } from "framer-motion";

type Item = {
  id: string;
  src: string;
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;
  size?: number;
  delay?: number;
  duration?: number;
  opacity?: number;
  floatRange?: number;
  swayRange?: number;
  rotateRange?: number;
};

const items: Item[] = [
  {
    id: "monkey-1",
    src: "/cock2.png",
    left: "6%",
    top: "6%",
    size: 140,
    delay: 0.2,
    duration: 8,
    opacity: 0.95,
    floatRange: 26,
    swayRange: 18,
    rotateRange: 10,
  },
  {
    id: "monkey-2",
    src: "/logo.png",
    right: "12%",
    top: "10%",
    size: 120,
    delay: 0.6,
    duration: 9.4,
    opacity: 0.92,
    floatRange: 20,
    swayRange: 14,
    rotateRange: 12,
  },
  {
    id: "cocktail-1",
    src: "/cock1.png",
    right: "8%",
    top: "20%",
    size: 140,
    delay: 1.0,
    duration: 7.6,
    opacity: 0.95,
    floatRange: 30,
    swayRange: 22,
    rotateRange: 14,
  },

  {
    id: "palm-1",
    src: "/beach.png",
    right: "22%",
    bottom: "14%",
    size: 220,
    delay: 0.5,
    duration: 12,
    opacity: 0.85,
    floatRange: 40,
    swayRange: 30,
    rotateRange: 8,
  },

  {
    id: "leaf-1",
    src: "/logo.png",
    left: "4%",
    bottom: "26%",
    size: 120,
    delay: 0.8,
    duration: 11,
    opacity: 0.88,
    floatRange: 36,
    swayRange: 18,
    rotateRange: 6,
  },

  {
    id: "cocktail-2",
    src: "/logo.png",
    right: "34%",
    top: "6%",
    size: 110,
    delay: 0.7,
    duration: 7.8,
    opacity: 0.9,
    floatRange: 26,
    swayRange: 22,
    rotateRange: 12,
  },
];

export default function FloatingBackgroundImages(): JSX.Element {
  return (
    <div className="pointer-events-none absolute inset-0 -z-0">
      {items.map((it) => {
        const xAmp =
          Math.random() * (it.swayRange ?? 20) - (it.swayRange ?? 20) / 2;
        const yAmp = it.floatRange ?? 26;
        const rot =
          Math.random() * (it.rotateRange ?? 12) - (it.rotateRange ?? 12) / 2;

        return (
          <motion.div
            key={it.id}
            initial={{
              opacity: 0,
              scale: 0.9,
              y: it.floatRange ? it.floatRange / 2 : 12,
            }}
            animate={{
              opacity: [0, it.opacity ?? 0.9, it.opacity ?? 0.9],
              y: [0, -yAmp * 1.0, 0],
              x: [0, xAmp, 0],
              rotate: [0, rot, 0],
              scale: [0.96, 1.02, 0.98],
            }}
            transition={{
              delay: it.delay ?? 0,
              duration: it.duration ?? 8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: it.left,
              top: it.top,
              right: it.right,
              bottom: it.bottom,
              width: it.size,
              height: it.size,
              opacity: it.opacity ?? 0.9,
              transformOrigin: "center",
              filter: "drop-shadow(0 18px 40px rgba(2,6,23,0.6))",
            }}
          >
            <div
              className="rounded-full bg-white/2 flex items-center justify-center overflow-hidden"
              style={{ width: "100%", height: "100%", padding: 6 }}
            >
              <img
                src={it.src}
                alt={it.id}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  pointerEvents: "none",
                }}
              />
            </div>

            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full pointer-events-none"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(34,197,94,0)",
                  "0 0 30px rgba(34,197,94,0.06)",
                  "0 0 0px rgba(34,197,94,0)",
                ],
              }}
              transition={{
                duration: it.duration ?? 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: it.delay ?? 0,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
