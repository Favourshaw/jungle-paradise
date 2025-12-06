"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmailPopup() {
  const [open, setOpen] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const msgRef = useRef<HTMLDivElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

  // Show popup after a small delay
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // Floating leaf animation on click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        !target ||
        target.closest("form") ||
        (target as any).type === "submit"
      )
        return;

      const leaf = document.createElement("div");
      leaf.innerHTML = "🍃";
      leaf.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 1000;
        animation: floatAway 1s ease-out forwards;
      `;
      document.body.appendChild(leaf);
      setTimeout(() => leaf.remove(), 1000);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Inject styles
  useEffect(() => {
    if (document.getElementById("email-popup-styles")) return;
    const style = document.createElement("style");
    style.id = "email-popup-styles";
    style.textContent = `
      @keyframes floatAway {
        0% { transform: translate(0,0) rotate(0deg); opacity:1; }
        100% { transform: translate(${
          Math.random() * 100 - 50
        }px, -100px) rotate(180deg); opacity:0; }
      }
      #form-msg {
        transition: all 0.3s ease;
        min-height: 1.2em;
        margin-top: 8px;
        padding: 4px 8px;
        border-radius: 4px;
        background-color: rgba(0,0,0,0.06);
      }
      #form-msg:empty { display: none; }
      #email:focus { outline: 3px solid rgba(184,255,160,0.12); outline-offset: 2px; }
    `;
    document.head.appendChild(style);
  }, []);

  function showSuccessEffect() {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const leaf = document.createElement("div");
        leaf.innerHTML = "🍃";
        leaf.style.cssText = `
          position: fixed;
          left: ${Math.random() * 100}vw;
          top: -30px;
          font-size: 24px;
          pointer-events: none;
          z-index: 9999;
          animation: successFloat 2s ease-out forwards;
        `;
        document.body.appendChild(leaf);
        setTimeout(() => leaf.remove(), 2000);
      }, i * 150);
    }
    if (!document.querySelector("#success-style")) {
      const style = document.createElement("style");
      style.id = "success-style";
      style.textContent = `
        @keyframes successFloat {
          0% { transform: translate(0,0) rotate(0deg); opacity:1; }
          100% { transform: translate(${
            Math.random() * 60 - 30
          }px, 80vh) rotate(360deg); opacity:0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Submit email to PHP
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const emailInput = emailRef.current;
    const messageDiv = msgRef.current;
    const submitBtn = submitBtnRef.current;
    if (!emailInput || !messageDiv || !submitBtn) return;

    messageDiv.textContent = "";
    messageDiv.style.color = "#b8ffa0";

    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      messageDiv.textContent = "Please enter a valid email address";
      messageDiv.style.color = "#ff6b6b";
      emailInput.focus();
      return;
    }

    const originalText = submitBtn.textContent || "Send";
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    emailInput.disabled = true;

    try {
      const formData = new FormData();
      formData.append("email", email);

      // ✅ FIXED — use relative path to sender.php
      const response = await fetch("/sender.php", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();

      if (
        text.toLowerCase().includes("already") ||
        text.toLowerCase().includes("duplicate")
      ) {
        messageDiv.textContent = "✅ Already subscribed!";
        messageDiv.style.color = "#ffcc00";
      } else {
        messageDiv.textContent = "🎉 Successfully subscribed! Thank you!";
        messageDiv.style.color = "#b8ffa0";
        emailInput.value = "";
        showSuccessEffect();
      }
    } catch (err) {
      console.error(err);
      messageDiv.textContent = "❌ Failed to send email. Try again.";
      messageDiv.style.color = "#ff6b6b";
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      emailInput.disabled = false;
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[100] p-4"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div
              className="relative max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-3 -right-3 bg-white/90 text-black 
                w-8 h-8 rounded-full flex items-center justify-center 
                shadow-lg hover:scale-110 transition"
                aria-label="Close popup"
              >
                ✕
              </button>

              <div className="rounded-xl p-6 bg-gradient-to-b from-white/4 to-white/6 backdrop-blur-xl border border-white/10 shadow-lg">
                <h3 className="text-xl font-bold mb-2 text-white">
                  Join the Expedition
                </h3>
                <p className="text-sm text-white/75 mb-4">
                  Subscribe for updates
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <label className="block text-sm text-white/80">
                    Email
                    <input
                      id="email"
                      ref={emailRef}
                      type="email"
                      required
                      placeholder="you@domain.com"
                      className="mt-1 block w-full rounded-md p-3 bg-black/20 border border-white/10 text-white"
                    />
                  </label>
                  <div>
                    <button
                      type="submit"
                      ref={submitBtnRef}
                      className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-[#7ef9a3]/20 via-[#9be7ff]/10 to-[#ff9bd1]/10 border border-white/10 text-white"
                    >
                      Join the List
                    </button>
                    <div
                      id="form-msg"
                      ref={msgRef}
                      className="text-sm mt-2"
                      aria-live="polite"
                    />
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
