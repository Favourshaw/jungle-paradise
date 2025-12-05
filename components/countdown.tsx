// components/JungleCountdown.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { GiMonkey, GiPalmTree } from "react-icons/gi";
import { TbGlassCocktail } from "react-icons/tb";

interface CountdownProps {
  targetDate: string | Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function JungleCountdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setFinished(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits: [keyof TimeLeft, string, string][] = [
    ["days", "Days", "text-green-400"],
    ["hours", "Hours", "text-yellow-400"],
    ["minutes", "Minutes", "text-orange-400"],
    ["seconds", "Seconds", "text-pink-400"],
  ];

  const floatingIcons = [
    { icon: <GiMonkey size={40} />, x: 10, y: 20 },
    { icon: <GiPalmTree size={50} />, x: 200, y: 50 },
    { icon: <TbGlassCocktail size={35} />, x: 350, y: 80 },
    { icon: <GiMonkey size={30} />, x: 120, y: 150 },
    { icon: <GiPalmTree size={45} />, x: 280, y: 200 },
    { icon: <TbGlassCocktail size={40} />, x: 420, y: 160 },
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-12 p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl cursor-target overflow-hidden">
      {/* Floating jungle icons */}
      {floatingIcons.map((f, i) => (
        <motion.div
          key={i}
          initial={{ y: f.y, x: f.x, opacity: 0.5, scale: 0.8 }}
          animate={{
            y: [f.y, f.y + 20, f.y],
            x: [f.x, f.x + 15, f.x],
            opacity: [0.5, 1, 0.5],
            scale: [0.8, 1, 0.8],
          }}
          transition={{ repeat: Infinity, duration: 5 + i, ease: "easeInOut" }}
          className="absolute pointer-events-none"
        >
          {f.icon}
        </motion.div>
      ))}

      {/* Countdown */}
      <div className="flex flex-wrap justify-center gap-6 relative z-10">
        {timeUnits.map(([unit, label, colorClass]) => (
          <div key={unit} className="flex flex-col items-center">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={timeLeft[unit]}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                className={`text-4xl md:text-6xl font-bold ${colorClass}`}
              >
                {timeLeft[unit].toString().padStart(2, "0")}
              </motion.div>
            </AnimatePresence>
            <span className="text-sm md:text-base text-green">{label}</span>
          </div>
        ))}
        <div className="text-green">Expedition Launch: December 20, 2025</div>
      </div>

      {/* Confetti / Glow when finished */}
      {finished && (
        <>
          <Confetti numberOfPieces={300} recycle={false} />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl font-extrabold text-white text-center pointer-events-none"
          >
            🌴🎉 Wild Paradise is LIVE! 🎉🌴
          </motion.div>
        </>
      )}
    </div>
  );
}
