import React, { JSX, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

type Status = "idle" | "sending" | "success" | "error";

export default function DramaticEmailForm(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");

  function validateEmail(value: string) {
    return /^\S+@\S+\.\S+$/.test(String(value).trim());
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus("error");

      window.setTimeout(() => setStatus("idle"), 900);
      return;
    }

    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");

    window.setTimeout(() => {
      setEmail("");
      setStatus("idle");
    }, 1800);
  }

  const particles = Array.from({ length: 12 }).map((_, i) => ({ id: i }));

  const containerVariant: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "circOut" },
    },
  };

  const inputFocusVariant: Variants = {
    idle: { boxShadow: "0 0 0 rgba(0,0,0,0)" },
    focus: { boxShadow: "0 6px 30px rgba(34,197,94,0.12)" },
    error: { boxShadow: "0 6px 30px rgba(244,63,94,0.18)" },
  };

  return (
    <div className="min-h-[320px] flex items-center justify-center p-6">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariant}
        whileHover={{ translateY: -4 }}
        className="relative w-full max-w-md"
      >
        {/* Background glow */}
        <div
          className="absolute -inset-2 rounded-3xl bg-linear-to-r from-primary via-primary/60 to-primary/90 opacity-30 blur-3xl transform-gpu animate-[pulse_6s_ease-in-out_infinite]"
          aria-hidden
        />

        {/* Rotating subtle ring */}
        <motion.div
          aria-hidden
          className="absolute -inset-4 rounded-3xl border border-primary/10"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        />

        <div className="relative rounded-3xl bg-primary/5 border border-primary/20 backdrop-blur-2xl p-6 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-lg bg-linear-to-br from-primary to-green flex items-center justify-center shadow-md">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7"
                    stroke="#052e16"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 7l-10 6L2 7"
                    stroke="#052e16"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold tracking-tight">
                Join the Jungle List
              </h3>
              <p className="text-sm text-green-200/80">
                Exclusive invites, early drops & wild updates — one quick email.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>

            <div className="relative">
              {/* Animated border when error */}
              <motion.div
                initial={false}
                animate={{ opacity: status === "error" ? 1 : 0 }}
                transition={{ duration: 0.18 }}
                className="pointer-events-none absolute -inset-0.5 rounded-xl border-2 border-rose-400/80"
                aria-hidden
              />

              {/* Input with subtle motion shadow */}
              <motion.input
                id="email"
                type="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setStatus((s) => (s === "error" ? "idle" : s))}
                placeholder="your@email.com"
                aria-invalid={status === "error"}
                aria-describedby="email-hint"
                className={`w-full rounded-xl py-3 pr-36 pl-4 text-white placeholder:text-green-200/50 bg-black/30 border border-white/6 focus:outline-none backdrop-blur-sm transition-shadow duration-200 shadow-sm`}
                variants={inputFocusVariant}
                animate={status === "error" ? "error" : "idle"}
                whileFocus={{ scale: 1.0 }}
              />

              {/* Button */}
              <div className="absolute right-1 top-1/2 -translate-y-1/2">
                <motion.button
                  type="submit"
                  className="relative inline-flex items-center justify-center rounded-lg px-5 py-2.5 bg-gradient-to-r from-primary to-green text-black font-semibold shadow-md ring-1 ring-white/20 overflow-hidden"
                  whileHover={{ scale: 1.06, rotate: -1 }}
                  whileTap={{ scale: 0.98, rotate: 1 }}
                  aria-live="polite"
                >
                  <AnimatePresence initial={false} mode="wait">
                    {status === "sending" ? (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        className="flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4 animate-spin"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="60"
                            strokeDashoffset="18"
                            fill="none"
                          />
                        </svg>
                        Sending...
                      </motion.span>
                    ) : status === "success" ? (
                      <motion.span
                        key="success"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 6L9 17l-5-5" stroke="black" />
                        </svg>
                        Sent
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        className="flex items-center gap-2"
                      >
                        <span className="sr-only">Submit email</span>
                        Get In
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* shine */}
                  <motion.span
                    className="absolute -inset-0.5 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] opacity-0"
                    animate={{ opacity: [0, 0.9, 0], translateX: [-50, 0, 50] }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    aria-hidden
                  />
                </motion.button>
              </div>
            </div>

            {/* hint / error text */}
            <div className="mt-3 min-h-[20px]">
              <p
                id="email-hint"
                className={`text-sm transition-opacity ${
                  status === "error" ? "text-rose-300" : "text-green-200/70"
                }`}
              >
                {status === "error"
                  ? "Please enter a valid email address."
                  : "We’ll only use this for exclusive updates."}
              </p>
            </div>
          </form>

          {/* dramatic footer flourish */}
          <div className="mt-6 flex items-center gap-3 text-xs text-green-100/60">
            <div className="h-0.5 w-8 bg-gradient-to-r from-emerald-300 to-cyan-300 rounded-full" />
            <span>Encrypted vibes — no spam, ever.</span>
          </div>

          {/* Success particles (rendered during success) */}
          <div className="pointer-events-none">
            <AnimatePresence>
              {status === "success" && (
                <>
                  {particles.map((p) => (
                    <motion.span
                      key={p.id}
                      initial={{ opacity: 0, scale: 0.6, x: 0, y: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: (Math.random() - 0.5) * 240,
                        y: -Math.abs(Math.random()) * 160,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9, ease: "circOut" }}
                      className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-emerald-300"
                      style={{ transformOrigin: "center" }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* soft vignette */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/3 mix-blend-overlay"
          aria-hidden
        />
      </motion.div>
    </div>
  );
}
