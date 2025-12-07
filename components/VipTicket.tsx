"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React from "react";
import Payment from "./payment";
import Tix from "./Tix";
import Portal from "./Portal";
import TixVip from "./TixVip";

interface TicketProps {
  tier: "EARLY BIRD" | "REGULAR" | "VIP";
  price: string;
  oldPrice?: string;
  bgImage?: string;
  maskImage?: string;
  highlightColor?: string;
  disabled?: boolean;

  maskColor?: string; // CSS color e.g. "rgba(34,197,94,0.18)" or "#0f766e"
  maskOpacity?: number; // 0..1, multiplies alpha if using a solid color
  maskBlur?: number; // px amount to blur the mask (creates soft haze)
  maskBlendMode?: React.CSSProperties["mixBlendMode"];
}

type PopupState = "main" | "crypto" | "naira" | null;

export default function VipTicket({
  tier,
  price,
  oldPrice,
  bgImage = "/jungle-bg.png",
  maskImage = "/mask-vignette.png",
  highlightColor = "#CCFF00",
  disabled = false,

  maskColor = "rgba(6,95,70,0.22)",
  maskOpacity = 1,
  maskBlur = 10,
  maskBlendMode = "overlay",
}: TicketProps) {
  const maskStyle: React.CSSProperties = {
    background: maskColor,
    opacity: maskOpacity,
    filter: `blur(${maskBlur}px)`,
    mixBlendMode: maskBlendMode,
    pointerEvents: "none",
  };

  const [popup, setPopup] = useState<PopupState>(null);

  const handleCardClick = () => {
    if (disabled) return;
    setPopup("main");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 22 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: disabled ? 1 : 1.04 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`relative w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl border-2
          ${
            disabled
              ? "opacity-40 blur-[1.5px] pointer-events-none"
              : "cursor-pointer"
          }`}
        aria-hidden={disabled}
        onClick={handleCardClick}
        role={disabled ? undefined : "button"}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            handleCardClick();
          }
        }}
      >
        <div className="absolute inset-0">
          <Image
            src={bgImage}
            alt="ticket background"
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0" style={maskStyle} aria-hidden />

        <div className="absolute inset-0 bg-black/28 pointer-events-none" />

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
            BOAT RIDES + ALL ACCESS + UNLIMITED COCKTAILS + FOOD
          </p>

          <p className="text-xs mt-4 text-green-300 tracking-wider">
            TICKETS AT JUNGLEPARADISE.XYZ
          </p>
        </div>

        <motion.div
          className="absolute inset-0 rounded-xl border-2 pointer-events-none"
          style={{ borderColor: highlightColor }}
          animate={{ opacity: [0.35, 0.95, 0.35] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
        />
      </motion.div>

      <AnimatePresence>
        {popup === "main" && (
          <Portal>
            <>
              <motion.div
                className="fixed inset-0 bg-black/70 z-[90]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPopup(null)}
              />
              <motion.div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
                <motion.div
                  className="
                  max-w-4xl w-full p-8 rounded-2xl text-center space-y-6
                  border border-white/20
                  bg-white/10 
                  backdrop-blur-xl 
                  shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                "
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                >
                  {/* Render Payment component (developer: include widget inside Payment) */}
                  <TixVip />

                  <div className="mt-4 text-right">
                    <button
                      className="text-white underline"
                      onClick={() => setPopup(null)}
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
}
