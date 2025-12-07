"use client";
import React from "react";

export default function BackgroundVideo() {
  return (
    <video
      aria-hidden="true"
      className="fixed inset-0 w-full h-full object-cover opacity-60 z-0 pointer-events-none"
      autoPlay
      loop
      muted
      playsInline
      poster="/monk4.jpg"
    >
      <source src="/bg.mp4" type="video/mp4" />
    </video>
  );
}
