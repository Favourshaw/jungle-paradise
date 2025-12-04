// app/contact/page.tsx
"use client";

import React, { JSX } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TargetCursor from "@/components/TargetCursor";

const socials = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/yourhandle",
    short: "@yourhandle",
  },
  {
    id: "x",
    label: "X (Twitter)",
    href: "https://x.com/yourhandle",
    short: "@yourhandle",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@yourhandle",
    short: "@yourhandle",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://youtube.com/@yourchannel",
    short: "WildParadise",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://facebook.com/yourpage",
    short: "/yourpage",
  },
];

const PHONE = "+44 20 7946 0958";
const EMAIL = "hi@wildparadise.example";

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

export default function ContactPage(): JSX.Element {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start ">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className="relative rounded-3xl p-8 shadow-2xl bg-white/6 border border-white/6 backdrop-blur-md overflow-hidden cursor-target"
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

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        className="font-medium text-emerald-100 hover:underline"
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
              <div className="w-full h-56 bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 flex items-center justify-center text-slate-200/20">
                Event poster placeholder
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
                  className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold px-4 py-2 shadow-lg border border-white/10"
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
                </a>{" "}
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
