"use client";
import SpookyGlassButton from "@/components/Button";
import CardSwap, { Card } from "@/components/CardSwap";
import CardSwapItem from "@/components/CardSwapItem";
import Countdown from "@/components/countdown";
import Dock from "@/components/Dock";
import DramaticEmailForm from "@/components/EmailForm";
import EmailPopup from "@/components/EmailPopup";
import FloatingBackgroundImages from "@/components/FloatingIcons";
import FloatingBackgroundIcons from "@/components/FloatingIcons";
import TargetCursor from "@/components/TargetCursor";
import { Settings } from "lucide-react";
import Image from "next/image";
import { GiMonkey } from "react-icons/gi";

export default function Home() {
  return (
    <div className="overflow-hidden min-h-screen bg-black relative jungle-ambient particles">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      <FloatingBackgroundImages />
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

      <div className="absolute inset-0 bg-black/60 z-10"></div>

      <div className="flex flex-col justify-center my-24">
        <div className="max-w-[320px] z-40 mx-auto flex justify-center items-center flex-col gap-5 cursor-target ">
          <Image
            src="/logo.png"
            alt="logo"
            width={120}
            height={120}
            sizes="320px"
            className="transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <p className="text-center font-serif uppercase text-green">
            wild paradise awaits
          </p>
        </div>

        <div
          className="relative z-30 flex flex-col lg:flex-row lg:items-center lg:justify-between
               bg-white/10 backdrop-blur-xl border border-transparent
               m-6 sm:m-12 md:m-24 rounded-3xl p-6 sm:p-10 shadow-[0_0_40px_rgba(0,0,0,0.4)]
               hover:shadow-primary transition-all duration-500 overflow-hidden "
        >
          <div className=" max-w-2xl space-y-4 ml-0 md:ml-32">
            <div className="cursor-target flex gap-4 justify-center items-center text-2xl md:text-4xl font-semibold text-text">
              <GiMonkey size={55} className="text-text animate-bounce" />
              The Jungle Awakens December 20
            </div>
            <div className="">
              <div className="font-eater cursor-target  leading-relaxed text-green text-xs sm:text-sm md:text-2xl ">
                Get ready for the ultimate jungle beach experience! Dive into
                vibrant nights filled with pulsating music, tropical cocktails,
                and playful water games under the stars. Lounge on golden sands,
                feel the ocean breeze, and immerse yourself in adventure and
                unforgettable moments. This is where the jungle meets the beach
                — wild, exhilarating, and completely unforgettable.
              </div>
              <div className="cursor-target ">
                <SpookyGlassButton
                  onClick={() => alert("Eerie!")}
                  className="w-full mt-5"
                >
                  Enter
                </SpookyGlassButton>
              </div>
              <div>
                <Countdown targetDate="2025-12-20T21:00:00+01:00" />
              </div>
            </div>
          </div>

          {/* CARD SECTION */}
          <div>
            <div className="z-20 relative h-80 md:h-[600px] ">
              <CardSwapItem />
            </div>
          </div>
        </div>
      </div>
      <EmailPopup />
    </div>
  );
}
