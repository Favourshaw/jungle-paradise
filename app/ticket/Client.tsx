import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const TargetCursor = dynamic(() => import("@/components/TargetCursor"), {
  ssr: false,
  loading: () => null,
});
const FloatingBackgroundImages = dynamic(
  () => import("@/components/FloatingIcons"),
  { ssr: false, loading: () => null }
);
const JungleTicket = dynamic(() => import("@/components/TicketCard"), {
  ssr: false,
  loading: () => (
    <div className="h-64 md:h-[420px] rounded animate-pulse bg-zinc-900" />
  ),
});
const VipTicket = dynamic(() => import("@/components/VipTicket"), {
  ssr: false,
  loading: () => (
    <div className="h-64 md:h-[420px] rounded animate-pulse bg-zinc-900" />
  ),
});
const Rsvp = dynamic(() => import("@/components/Rsvp"), {
  ssr: false,
  loading: () => null,
});

const BackgroundVideo = dynamic(
  () =>
    import("@/components/BgVideo").catch(() => {
      return function FallbackVideo() {
        return (
          <video
            aria-hidden="true"
            className="fixed inset-0 w-full h-full object-cover opacity-60 z-0 pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            poster="/bg-poster.jpg"
          >
            <source src="/bg.mp4" type="video/mp4" />
          </video>
        );
      };
    }),
  { ssr: false, loading: () => null }
);

export default function Client() {
  return (
    <div className="min-h-screen bg-[#061618] py-20 px-6 flex flex-col gap-8 justify-center items-center">
      <TargetCursor spinDuration={2} hideDefaultCursor parallaxOn />
      <FloatingBackgroundImages />

      <BackgroundVideo />

      <div className="fixed inset-0 bg-black/60 z-10 pointer-events-none" />

      <div className="max-w-[320px] z-40 mx-auto flex justify-center items-center flex-col gap-5 cursor-target">
        <Image
          src="/logo.png"
          alt="logo"
          width={120}
          height={120}
          sizes="120px"
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
            disabled
            oldPrice="50"
            highlightColor="#C7FF00"
            bgImage="/jp3.jpg"
            maskColor="rgba(10,200,120,0.22)"
            maskOpacity={1}
            maskBlur={10}
            maskBlendMode="overlay"
          />

          <JungleTicket
            tier="REGULAR"
            price="50"
            highlightColor="#FFD166"
            bgImage="/monk.jpg"
            maskColor="rgba(240,160,40,0.14)"
            maskOpacity={1}
            maskBlur={10}
            maskBlendMode="multiply"
          />

          <VipTicket
            tier="VIP"
            price="100"
            highlightColor="#FF7AB6"
            bgImage="/monk2.jpg"
            maskColor="rgba(160,50,140,0.16)"
            maskOpacity={1}
            maskBlur={10}
            maskBlendMode="overlay"
          />
        </div>

        <div className="text-center text-text text-lg font-semibold mt-6">
          <Rsvp
            tier="Table"
            price=""
            highlightColor="yellow"
            bgImage="/monk4.jpg"
            maskColor="rgba(10,200,120,0.22)"
            maskOpacity={1}
            maskBlur={10}
            maskBlendMode="overlay"
          />
        </div>
      </div>
    </div>
  );
}
