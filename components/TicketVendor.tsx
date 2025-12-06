"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
  playSound?: boolean; // optional: toggle sound
  soundSrc?: string; // optional: path to sound file
}

export default function BuyOrVendorModal({
  open,
  onClose,
  playSound = true,
  soundSrc = "/sound.wav",
}: Props) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // play sound once when modal opens
  useEffect(() => {
    if (!open || !playSound) return;
    // try to play (must be allowed: usually user click triggered by button)
    if (!audioRef.current) {
      audioRef.current = new Audio(soundSrc);
      audioRef.current.volume = 0.9;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      // ignore play errors (autoplay policies) — sound will play on subsequent user gesture
    });
  }, [open, playSound, soundSrc]);

  // trap focus roughly: move focus to cancel button when opened
  useEffect(() => {
    if (open && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [open]);

  const go = (path: string) => {
    onClose();
    // small delay to let modal animate before routing
    setTimeout(() => router.push(path), 150);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center "
          aria-modal="true"
          role="dialog"
        >
          {/* overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* modal panel */}
          <motion.div
            initial={{ y: 30, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative z-10 w-[92%] max-w-md rounded-3xl p-6 border border-white/10 backdrop-blur-2xl bg-linear-to-b from-primary/10 to-black/20 shadow-2xl"
          >
            {/* glass frame glow */}
            <div
              className="absolute -inset-px rounded-3xl pointer-events-none"
              style={{
                boxShadow:
                  "0 6px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)",
                borderRadius: "1rem",
              }}
            />

            <div className="relative space-y-4">
              <div className="flex items-center gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-primary/30 to-[#9be7ff]/20 flex items-center justify-center border border-white/10">
                  {/* spooky icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2l2.6 5.3L20 10l-4 3.2L17 20l-5-2.8L7 20l1-6.8L4 10l5.4-2.7L12 2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-text">
                    Welcome, brave soul
                  </h3>
                  <p className="text-sm text-green">
                    Choose an option to proceed — quick, before the mist closes
                    in.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => go("/ticket")}
                  className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-3 transition-transform active:scale-95 cursor-target"
                  aria-label="Buy Ticket"
                >
                  <span className="px-3 py-1 rounded-md bg-black/40 border border-white/8">
                    🎟️
                  </span>
                  <span className="flex-1 text-text">Buy Ticket</span>
                  <span className="text-xs text-green">/ticket</span>
                </button>

                <button
                  onClick={() => go("/vendor")}
                  className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-3 transition-transform active:scale-95 cursor-target"
                  aria-label="Become a vendor"
                >
                  <span className="px-3 py-1 rounded-md bg-black/40 border border-white/8">
                    🛍️
                  </span>
                  <span className="flex-1 text-text">Become a Vendor</span>
                  <span className="text-xs text-green">/vendor</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="w-full py-2 text-sm rounded-lg text-red-500 hover:text-white/95 cursor-target"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
