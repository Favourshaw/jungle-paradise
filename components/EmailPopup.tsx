"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DramaticEmailForm from "./EmailForm";

export default function EmailPopup() {
  const [open, setOpen] = useState(false);

  // Show popup once site finishes loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 400); // small delay so page feels loaded
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Popup container */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[100] p-4"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div
              className="relative max-w-lg w-full"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-3 -right-3 bg-white/90 text-black 
                w-8 h-8 rounded-full flex items-center justify-center 
                shadow-lg hover:scale-110 transition"
              >
                ✕
              </button>

              <DramaticEmailForm />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
