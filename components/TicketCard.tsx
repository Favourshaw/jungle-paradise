"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Payment from "./payment";

interface TicketProps {
  tier: "EARLY BIRD" | "REGULAR" | "VIP";
  price: string;
  oldPrice?: string;
  bgImage?: string;
  maskImage?: string;
  highlightColor?: string;
  disabled?: boolean;
  // NEW props for per-ticket color mask / blur
  maskColor?: string; // CSS color e.g. "rgba(34,197,94,0.18)" or "#0f766e"
  maskOpacity?: number; // 0..1, multiplies alpha if using a solid color
  maskBlur?: number; // px amount to blur the mask (creates soft haze)
  maskBlendMode?: React.CSSProperties["mixBlendMode"]; // e.g. "overlay" | "multiply"
}

export default function JungleTicket({
  tier,
  price,
  oldPrice,
  bgImage = "/jungle-bg.png",
  maskImage = "/mask-vignette.png",
  highlightColor = "#CCFF00",
  disabled = false,
  // NEW defaults
  maskColor = "rgba(6,95,70,0.22)",
  maskOpacity = 1,
  maskBlur = 10,
  maskBlendMode = "overlay",
}: TicketProps) {
  // derive final mask style (if maskColor contains alpha, maskOpacity multiplies it)
  const maskStyle: React.CSSProperties = {
    background: maskColor,
    opacity: maskOpacity,
    filter: `blur(${maskBlur}px)`,
    mixBlendMode: maskBlendMode,
    pointerEvents: "none",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: disabled ? 1 : 1.04 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`relative w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl border-2
        ${disabled ? "opacity-40 blur-[1.5px] pointer-events-none" : ""}`}
      aria-hidden={disabled}
    >
      {/* background image */}
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt="ticket background"
          fill
          className="object-cover"
        />
      </div>

      {/* NEW: per-ticket color mask (tint + blur) */}
      <div className="absolute inset-0" style={maskStyle} aria-hidden />

      {/* extra vignette/darken to improve contrast */}
      <div className="absolute inset-0 bg-black/28 pointer-events-none" />

      {/* content */}
      <div className="relative px-6 py-8 text-center space-y-3 z-10">
        <div className="flex justify-center">
          <Image src="/logo.png" alt="logo" width={72} height={72} />
        </div>

        <p
          className="text-lg font-bold tracking-widest"
          style={{ color: highlightColor }}
        >
          {tier} TICKET
        </p>

        <div
          className="text-[64px] sm:text-[72px] font-extrabold"
          style={{ color: highlightColor }}
        >
          {price}$
        </div>

        {/* old price + animated strike */}
        {oldPrice && (
          <div className="relative w-fit mx-auto">
            <span className="text-xl font-semibold text-white/75">
              {oldPrice}$
            </span>
            <motion.div
              className="absolute top-1/2 left-0 h-[3px] w-full bg-green-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        )}

        <p className="text-green-200 text-md sm:text-lg font-semibold tracking-wide">
          BOAT RIDES + GENERAL ACCESS + COMPLIMENTARY COCKTAILS
        </p>

        <p className="text-xs mt-4 text-green-300 tracking-wider">
          TICKETS AT JUNGLEPARADISE.XYZ
        </p>
      </div>

      {/* animated glow border */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 pointer-events-none"
        style={{ borderColor: highlightColor }}
        animate={{ opacity: [0.35, 0.95, 0.35] }}
        transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
