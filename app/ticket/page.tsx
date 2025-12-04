// app/tickets/page.tsx
"use client";

import React, { JSX, useState } from "react";
import { motion } from "framer-motion";

type TicketType = "early" | "regular" | "vip";

const PRICES_NGN = {
  early: 5000, // NGN
  regular: 8500, // NGN
  vip: 20000, // NGN
};

export default function TicketsPage(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<TicketType>("early");

  const buy = async (type: TicketType) => {
    if (type !== "early") return; // only allow early for now
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amountNgn: PRICES_NGN[type],
          ticketType: type,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.message || "Failed to initialize payment");
      // Redirect to Paystack checkout url returned by server
      window.location.href = data.authorization_url;
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Payment initialization failed.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen h-full bg-[linear-gradient(180deg,#041014,#06191a)] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold mb-6"
        >
          Buy Tickets — Wild Paradise
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 text-slate-300"
        >
          Early bird tickets are live — regular and VIP will open later. Secure
          your spot now.
        </motion.p>

        {/* Email input + buy CTA */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <label className="text-sm text-slate-300">
              Email to receive ticket
            </label>
            <input
              className="w-full mt-2 rounded-xl bg-black/30 border border-white/6 px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/30"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>

          <div className="flex gap-3 items-end">
            <button
              onClick={() => buy("early")}
              disabled={loading}
              className="rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black px-5 py-3 font-semibold shadow-lg"
            >
              {loading
                ? "Redirecting..."
                : `Buy Early — NGN ${PRICES_NGN.early.toLocaleString()}`}
            </button>
          </div>
        </div>

        {/* Ticket cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(["early", "regular", "vip"] as TicketType[]).map((t) => {
            const price = PRICES_NGN[t];
            const active = t === "early";
            return (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: t === "early" ? 0.05 : 0.12 }}
                className={`relative rounded-3xl p-6 border border-white/6 backdrop-blur-md bg-white/4 shadow-xl overflow-hidden ${
                  !active
                    ? "filter blur-[2px] saturate-50 pointer-events-none"
                    : ""
                }`}
                onClick={() => active && setSelected(t)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm text-slate-200/80 uppercase tracking-wide">
                      {t === "early"
                        ? "Early Bird"
                        : t === "regular"
                        ? "Regular"
                        : "VIP"}
                    </div>
                    <div className="text-2xl font-bold mt-2">
                      NGN {price.toLocaleString()}
                    </div>
                    <div className="text-xs mt-2 text-slate-300/70">
                      {t === "early"
                        ? "Limited seats — discounted price"
                        : t === "regular"
                        ? "Coming soon"
                        : "Coming soon"}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    {!active ? (
                      <div className="text-xs text-slate-400">Locked</div>
                    ) : (
                      <div className="text-sm text-emerald-100">Available</div>
                    )}
                    <button
                      onClick={() => active && buy(t)}
                      disabled={!active || loading}
                      className={`rounded-lg px-4 py-2 font-medium ${
                        active
                          ? "bg-emerald-500/90 text-black hover:scale-105 transform transition"
                          : "bg-white/6 text-slate-300 pointer-events-none"
                      }`}
                    >
                      {active ? "Buy now" : "Locked"}
                    </button>
                  </div>
                </div>

                {/* decorative */}
                <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-gradient-to-br from-emerald-600 to-cyan-500 opacity-10 blur-2xl pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-sm text-slate-400">
          <strong>Note:</strong> This page uses Paystack for payments. After the
          checkout completes you'll be redirected back to Paystack's hosted page
          to complete payment. Implement server-side verification of
          transactions (webhook or verify endpoint) before granting
          access/tickets.
        </div>
      </div>
    </main>
  );
}
