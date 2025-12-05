// components/Header.tsx
"use client";

import React, { JSX } from "react";
import { motion } from "framer-motion";
import { VscSearch, VscBell } from "react-icons/vsc";
import { BatteryFull, WifiCog, WifiHigh } from "lucide-react";

export default function Header(): JSX.Element {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-auto font-sans">
      {/* Mac-style (desktop) */}
      <div className="hidden md:flex items-center justify-between h-12 px-4 bg-linear-to-b from-white/4 to-white/2 backdrop-blur-md border-b border-white/6 shadow-sm">
        {/* left: traffic lights + title */}
        <div className="flex items-center gap-3">
          {/* traffic lights */}
          <div className="flex items-center gap-2 mr-3">
            <button
              aria-label="close"
              className="w-3.5 h-3.5 rounded-full bg-rose-400 shadow-md border border-black/10"
            />
            <button
              aria-label="minimize"
              className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-md border border-black/10"
            />
            <button
              aria-label="maximize"
              className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-md border border-black/10"
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="text-sm font-medium text-slate-100 select-none"
          >
            Jungle Paradise
          </motion.h1>
        </div>

        {/* right: status icons */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.06 }}
            className="p-1 rounded-md hover:bg-white/6 transition"
            aria-label="notifications"
          >
            <VscBell className="text-slate-100" />
          </motion.button>

          <div className="flex items-center gap-2 text-xs text-slate-200">
            <div className="flex items-center gap-1 px-2 py-0.5 bg-black/20 rounded-md">
              <WifiCog />
              <span className="hidden lg:inline">Paradise</span>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 bg-black/20 rounded-md">
              <BatteryFull />
              <span className="hidden lg:inline">100%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden bg-linear-to-b from-black/30 to-black/20 backdrop-blur-sm border-b border-white/6">
        <div className="relative h-14 flex items-center justify-between px-3">
          <div className="text-sm text-slate-100 font-medium">
            <ClockSmall />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="text-sm text-slate-100 font-semibold">
              Jungle Paradise
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-100">
            <WifiCog />
            <BatteryFull />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 transform translate-y-1.5 pointer-events-none">
            <div className="w-36 h-6 bg-black/40 rounded-b-xl blur-sm" />
          </div>
        </div>
      </div>
    </header>
  );
}

/** small clock component used in the mobile header */
function ClockSmall(): JSX.Element {
  const [time, setTime] = React.useState(() => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  });

  React.useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      setTime(d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <span aria-hidden>{time}</span>
    </>
  );
}
