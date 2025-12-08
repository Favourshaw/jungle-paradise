"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Preloader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);

  const progress = useMotionValue(0);
  const springProgress = useSpring(progress, {
    stiffness: 100,
    damping: 30,
  });

  // Transform springProgress to percentage string
  const progressText = useTransform(
    springProgress,
    (value) => `${Math.round(value)}%`
  );

  // Particle effect component
  const Particles = () => {
    const particles = Array.from({ length: 15 }, (_, i) => i);

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/40 rounded-full"
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              scale: 0,
            }}
            animate={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  // Jungle leaf icons component
  const JungleLeaves = () => {
    const leaves = [
      { rotate: -45, delay: 0, size: "w-6 h-6" },
      { rotate: 45, delay: 0.1, size: "w-5 h-5" },
      { rotate: 0, delay: 0.2, size: "w-7 h-7" },
      { rotate: -25, delay: 0.3, size: "w-5 h-5" },
      { rotate: 25, delay: 0.4, size: "w-6 h-6" },
    ];

    return (
      <div className="absolute -top-12 flex gap-2">
        {leaves.map((leaf, i) => (
          <motion.div
            key={i}
            className={`${leaf.size} bg-emerald-500 rounded-full`}
            style={{ rotate: leaf.rotate }}
            animate={{
              y: [0, -10, 0],
              rotate: [leaf.rotate, leaf.rotate + 10, leaf.rotate],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: leaf.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    // Show preloader on route change
    setVisible(true);
    setDisplayProgress(0);
    progress.set(0);

    let startTime = Date.now();
    const duration = 600; // ms

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 0.95);

      // Smooth easing function
      const easeOutCubic = 1 - Math.pow(1 - rawProgress, 3);
      const newProgress = easeOutCubic * 95;

      progress.set(newProgress);
      setDisplayProgress(Math.round(newProgress));
    };

    const progressInterval = setInterval(updateProgress, 16);

    // Hide after delay
    const hideTimeout = setTimeout(() => {
      clearInterval(progressInterval);
      progress.set(100);
      setDisplayProgress(100);

      setTimeout(() => {
        setVisible(false);
      }, 400);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(hideTimeout);
    };
  }, [pathname, progress]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-linear-to-br from-black via-black/10 to-green/20 pointer-events-none"
        >
          <Particles />

          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0,
              rotateX: -15,
              y: 50,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              scale: 1.1,
              opacity: 0,
              rotateY: 10,
              transition: { duration: 0.4 },
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 0.5,
            }}
            className="relative bg-gradient-to-br from-gray-900/90 to-black/90 border border-white/10 rounded-3xl p-8 flex flex-col gap-6 items-center w-[90%] max-w-md shadow-2xl shadow-emerald-900/30 backdrop-blur-xl"
          >
            <JungleLeaves />

            {/* Animated ring spinner with gradient */}
            <div className="relative w-20 h-20">
              <motion.div
                className="absolute inset-0 rounded-full border-[3px] border-transparent"
                style={{
                  background:
                    "conic-gradient(from 0deg, #10b981, #34d399, #10b981)",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 2px))",
                  WebkitMask:
                    "radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 2px))",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-[3px] border-emerald-400/30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src="/logo.png" width={40} height={50} alt="logo" />
              </div>
            </div>

            {/* Text with typing effect */}
            <div className="text-center space-y-2">
              <motion.h2
                className="text-2xl font-bold bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-300 bg-clip-text text-transparent"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
              >
                Jungle Paradise
              </motion.h2>
              <motion.p
                className="text-white/70 text-sm"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Exploring the wilderness...
              </motion.p>
            </div>

            <div className="w-full space-y-3">
              <div className="flex justify-between text-xs text-white/60">
                <span>Loading</span>
                <span>{displayProgress}%</span>
              </div>

              <div className="relative h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 rounded-full"
                  style={{ width: springProgress }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                />
                <motion.div
                  className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ["-100%", "400%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                  }}
                  style={{
                    width: "20%",
                    opacity: springProgress.get() > 10 ? 1 : 0,
                  }}
                />
              </div>
            </div>

            {/* Decorative bottom leaves */}
            <div className="absolute -bottom-6 flex gap-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-12 h-2 bg-gradient-to-r from-emerald-600/30 to-green-600/30 rounded-full"
                  animate={{
                    scaleX: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
