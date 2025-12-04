// SpookyGlassButton.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { GiMonkey } from "react-icons/gi";

type Props = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
  size?: "sm" | "md" | "lg";
  ghost?: boolean; // more transparent when true
};

const sizeMap = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export default function SpookyGlassButton({
  children = "Summon",
  onClick,
  className = "",
  ariaLabel,
  size = "md",
  ghost = false,
}: Props) {
  return (
    <motion.button
      type="button"
      aria-label={ariaLabel || String(children)}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.98, rotate: -2 }}
      initial={{ opacity: 0.98 }}
      transition={{ duration: 0.18 }}
      className={`
        relative overflow-hidden inline-flex items-center justify-center rounded-2xl
        ${sizeMap[size]}
        ${
          ghost
            ? "bg-white/6 border border-white/6"
            : "bg-white/8 border border-white/8"
        }
        backdrop-blur-md
        text-white
        tracking-wide
        font-semibold
        shadow-[0_8px_30px_rgba(3,7,18,0.6)]
        transition-all duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-300/40
        ${className}
      `}
    >
      {/* inner neon rim */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 30px rgba(16,185,129,0.06), inset 0 0 60px rgba(6,95,70,0.06), 0 6px 30px rgba(8,20,13,0.6)",
          border: "1px solid rgba(160,250,200,0.06)",
        }}
      />

      {/* ghostly pulse glow */}
      <motion.span
        aria-hidden
        className="absolute -inset-1 rounded-2xl blur-[18px] mix-blend-screen pointer-events-none"
        animate={{ opacity: [0.08, 0.22, 0.08] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(34,197,94,0.16), transparent 20%), radial-gradient(circle at 80% 80%, rgba(6,95,70,0.10), transparent 30%)",
        }}
      />

      {/* shining sweep on hover */}
      <motion.span
        aria-hidden
        className="absolute left-[-40%] top-0 bottom-0 w-[40%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)] pointer-events-none"
        initial={{ x: "-40%" }}
        whileHover={{ x: "120%" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />

      {/* subtle floating orbs (spooky particles) */}
      <span
        aria-hidden
        className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-300/70 blur-sm opacity-70"
      />
      <span
        aria-hidden
        className="absolute right-3 top-1/3 w-1.5 h-1.5 rounded-full bg-green-100/70 blur-sm opacity-60"
      />

      {/* content */}
      <span className="relative z-10 flex items-center gap-3">
        <GiMonkey size={30} />
        <span className="select-none">{children}</span>
      </span>
    </motion.button>
  );
}
