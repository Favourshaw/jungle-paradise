// app/tickets/page.tsx
"use client";

import FloatingBackgroundImages from "@/components/FloatingIcons";
import TargetCursor from "@/components/TargetCursor";
import JungleTicket from "@/components/TicketCard";
import Image from "next/image";

export default function TicketsPage() {
  return (
    <div className="min-h-screen bg-[#061618] py-20 px-6 flex flex-col gap-8 justify-center items-center ">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      <FloatingBackgroundImages />
      <video
        aria-hidden="true"
        className="fixed inset-0 w-full h-full object-cover opacity-60 z-0 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div className=" fixed inset-0 bg-black/60 z-10"></div>
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
      <div className="backdrop-blur-2xl bg-black/20 w-fit p-11 rounded-2xl mb-10 z-40 cursor-target">
        <h2 className="text-center text-3xl font-bold text-green-300 mb-8">
          Tickets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <JungleTicket
            tier="EARLY BIRD"
            price="35"
            oldPrice="50"
            highlightColor="#C7FF00"
            bgImage="/early.jpg"
            maskColor="rgba(10,200,120,0.22)"
            maskOpacity={1}
            maskBlur={10}
            maskBlendMode="overlay"
          />

          <JungleTicket
            tier="REGULAR"
            price="50"
            disabled
            highlightColor="#FFD166"
            bgImage="/reg.jpg"
            // warmer subtle mask and slightly more blur to indicate 'coming soon'
            maskColor="rgba(240,160,40,0.14)"
            maskOpacity={1}
            maskBlur={16}
            maskBlendMode="multiply"
          />

          <JungleTicket
            tier="VIP"
            price="120"
            disabled
            highlightColor="#FF7AB6"
            bgImage="/vip.jpg"
            maskColor="rgba(160,50,140,0.16)"
            maskOpacity={1}
            maskBlur={18}
            maskBlendMode="overlay"
          />
        </div>
      </div>
    </div>
  );
}
