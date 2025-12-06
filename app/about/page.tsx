// app/contact/page.tsx
"use client";

import React, { JSX } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TargetCursor from "@/components/TargetCursor";
import DecryptedText from "@/components/DecryptedText";

const socials = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/the_jungleparadise",
    short: "@the_jungleparadise",
  },

  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@the_jungleparadise",
    short: "@the_jungleparadise",
  },
];

const PHONE = "+234 8137642173";
const EMAIL = "support@jungleparadise.xyz";

// Event: set your event date/time in ISO format and human string
const EVENT_START_ISO = "2026-06-20T21:00:00+01:00"; // Nigeria time (WAT)
const EVENT_END_ISO = "2026-06-21T03:00:00+01:00"; // Nigeria time (WAT)
const EVENT_TITLE = "Wild Paradise — Jungle Beach Party";
const EVENT_LOCATION = "Lagos, Nigeria";

function googleCalendarLink() {
  // Format: https://calendar.google.com/calendar/u/0/r/eventedit?text=...&dates=YYYYMMDDTHHMMSSZ/...
  const start = EVENT_START_ISO.replace(/[-:]/g, "").split(".")[0] + "Z";
  const end = EVENT_END_ISO.replace(/[-:]/g, "").split(".")[0] + "Z";
  const url = new URL("https://calendar.google.com/calendar/u/0/r/eventedit");
  url.searchParams.set("text", EVENT_TITLE);
  url.searchParams.set("dates", `${start}/${end}`);
  url.searchParams.set("location", EVENT_LOCATION);
  url.searchParams.set(
    "details",
    "Join us for a jungle-beach night of music, drinks and magical moments."
  );
  return url.toString();
}

export default function About(): JSX.Element {
  return (
    <main className="overflow-hidden min-h-screen bg-black relative text-slate-100 py-16 px-6">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      <video
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60 "></div>
      <div className="max-w-5xl mx-auto">
        <div className="max-w-[320px] z-50 mx-auto flex justify-center items-center flex-col gap-5 cursor-target mb-5">
          <Image
            src="/logo.png"
            alt="logo"
            width={120}
            height={120}
            sizes="320px"
            className="transition-transform duration-500 group-hover:scale-105 z-40"
            priority
          />
          <p className="text-center font-serif uppercase text-green z-40">
            wild paradise awaits
          </p>
        </div>

        <div>
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className="relative rounded-3xl p-8 shadow-2xl bg-white/6 border border-white/6 backdrop-blur-md overflow-hidden  mb-8 cursor-target"
            aria-labelledby="contact-heading"
          >
            <div style={{ marginTop: "4rem" }}>
              <DecryptedText
                text="Welcome to Jungle Paradise, the island escape accessible only by sea."
                animateOn="view"
                speed={100}
              />
            </div>

            <div style={{ marginTop: "4rem" }}>
              <DecryptedText
                text="Leave the mainland behind and board the boat to a world curated for the bold, the stylish, and the effortlessly cool. As the shore recedes, anticipation builds for the secluded haven awaiting you."
                speed={200}
                animateOn="view"
                maxIterations={20}
                characters="ABCD1234!?"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
              />
            </div>

            <div style={{ marginTop: "2rem" }}>
              <DecryptedText
                text="Here, on our private island, sunlight dances through a canopy of palms, and the air is perfumed with salt spray and tropical blossoms. Every sun-drenched deck, shaded lounge, and sandy cove is thoughtfully crafted for pure, easy-going vibes."
                animateOn="view"
                speed={300}
              />
            </div>

            <div style={{ marginTop: "2rem" }}>
              <DecryptedText
                text="This is more than a party. it's Jungle Paradise, your elevated, members-only retreat. Accessible by invitation and vessel, it blends the laid-back elegance of a beach house with the untamed beauty of an island oasis. It's a sanctuary designed for connection, barefoot luxury, and moments so pristine they feel untouched."
                animateOn="view"
                speed={400}
              />
            </div>

            <div style={{ marginTop: "2rem" }}>
              <DecryptedText
                text="Your voyage is part of the experience. Unwind, mingle with fellow travelers, and discover bliss in the most exclusive paradise where the journey is just as memorable as the destination."
                animateOn="view"
                speed={500}
              />
            </div>
          </motion.section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start ">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "circOut" }}
            className="relative rounded-3xl p-8 shadow-2xl bg-white/6 border border-white/6 backdrop-blur-md overflow-hidden cursor-target mb-12"
            aria-labelledby="contact-heading"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-1 rounded-3xl blur-3xl opacity-30"
              style={{
                background:
                  "linear-gradient(120deg, rgba(56,189,248,0.06), rgba(16,185,129,0.04), rgba(129,140,248,0.03))",
              }}
            />

            <h1
              id="contact-heading"
              className="text-3xl font-semibold tracking-tight mb-2 z-10 relative"
            >
              Contact & Event Info
            </h1>

            <p className="text-sm text-slate-200/80 mb-6 z-10 relative">
              Reach out or follow us on socials. Save the date and come party
              with us.
            </p>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center text-2xl ">
                  📞
                </div>
                <div>
                  <div className="text-sm text-slate-300/90">Phone</div>
                  <a
                    className="text-lg font-medium text-emerald-200 hover:underline"
                    href={`tel:${PHONE.replace(/\s+/g, "")}`}
                  >
                    {PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center text-2xl">
                  ✉️
                </div>
                <div>
                  <div className="text-sm text-slate-300/90">Email</div>
                  <a
                    className="text-lg font-medium text-emerald-200 hover:underline"
                    href={`mailto:${EMAIL}`}
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center text-2xl">
                  📅
                </div>
                <div>
                  <div className="text-sm text-slate-300/90">Event Date</div>
                  <div className="flex items-center gap-3">
                    <time className="text-lg font-medium text-emerald-100">
                      {/* human friendly date */}
                      December 20, 2025 · 13:00 (WAT)
                    </time>

                    <a
                      className="inline-flex items-center gap-2 rounded-lg bg-white/6 px-3 py-1 text-sm text-emerald-200 hover:bg-white/8 transition"
                      href={googleCalendarLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Add to calendar
                    </a>
                  </div>

                  <p className="text-xs text-slate-400 mt-1">
                    {EVENT_LOCATION}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-white/6" />

            {/* Socials */}
            <div className="relative z-10">
              <h2 className="text-sm text-slate-200/80 mb-3">
                Follow & stay updated
              </h2>

              <ul className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                {socials.map((s) => (
                  <motion.li
                    key={s.id}
                    className="rounded-xl bg-black/30 border border-white/6 p-3 flex items-center justify-between"
                    whileHover={{ scale: 1.02, x: 6 }}
                    transition={{ type: "spring", stiffness: 140, damping: 14 }}
                  >
                    <div>
                      <div className="text-sm text-slate-300/80">{s.label}</div>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-emerald-100 hover:underline text-sm"
                      >
                        {s.short}
                      </a>
                    </div>

                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${s.label}`}
                      className="inline-flex items-center gap-2 rounded-md bg-white/4 px-3 py-2 text-xs text-slate-100 hover:bg-white/6 transition"
                    >
                      Visit
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* RIGHT: big event poster / social tiles */}
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "circOut" }}
            className="relative rounded-3xl p-6 shadow-lg bg-white/4 border border-white/6 backdrop-blur-md flex flex-col gap-6 cursor-target"
          >
            {/* Poster */}
            <div className="rounded-xl overflow-hidden border border-white/6">
              <div className="relative w-full h-95 bg-linear-to-br from-primary/30 via-black/50 to-green/90 flex items-center justify-center text-slate-200/20">
                <Image
                  src="/bgt.png"
                  alt="bgt"
                  fill
                  className="transition-transform duration-500 group-hover:scale-105 z-40 relative"
                  priority
                />
              </div>
            </div>

            {/* Quick contact CTA */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-300/80">Quick RSVP</div>
                  <div className="text-lg font-medium text-emerald-100">
                    Limited capacity — reserve early
                  </div>
                </div>

                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                    "RSVP — " + EVENT_TITLE
                  )}`}
                  className="inline-flex items-center gap-3 rounded-2xl bg-linear-to-r from-emerald-400 to-cyan-400 text-black font-semibold px-4 py-2 shadow-lg border border-white/10"
                >
                  RSVP via Email
                </a>
              </div>

              <div className="text-sm text-slate-300/80">
                Prefer chat?{" "}
                <a
                  className="text-emerald-100 hover:underline"
                  href={`tel:${PHONE.replace(/\s+/g, "")}`}
                >
                  Call us
                </a>
                or message us via socials.
              </div>
            </div>

            {/* small footer */}
            <div className="text-xs text-slate-400">
              <strong>Venue policy:</strong> This is a private event. Entry is
              subject to age and ID checks.
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
