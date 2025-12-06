import React from "react";
import CardSwap, { Card } from "./CardSwap";
import Image from "next/image";

function CardSwapItem() {
  return (
    <div>
      <CardSwap
        cardDistance={60}
        verticalDistance={80}
        delay={5000}
        pauseOnHover={false}
      >
        {/* Card 1 — Party fun */}
        <Card>
          <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl group card-fade-in ">
            <Image
              src="/jp3.jpg"
              alt="Party scene"
              fill
              sizes="320px"
              className="absolute inset-0 w-full  h-full object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-transparent" />
            <header className="relative z-10 flex items-center gap-3 p-4 backdrop-blur-lg bg-primary/50">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M2 12l4-4 4 4M20 12l-4-4-4 4M7 21l-2-6 3-1 3 1-2 6"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-text text-lg font-semibold">Party Fun</h3>
            </header>
            <div className="absolute left-0 right-0 top-50 z-10 p-8 m-4 backdrop-blur-md bg-primary/5 rounded-2xl">
              <p className="text-sm text-green ">
                An exclusive invite-only 18+ experience! Dance under the stars,
                enjoy lively music, and make unforgettable memories with
                friends. The ultimate night of fun awaits you!
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div
            className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl group card-fade-in"
            style={{ animationDelay: "120ms" }}
          >
            <Image
              src="/jp2.jpg"
              alt="Beach"
              fill
              sizes="320px"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-transparent" />
            <header className="relative z-10 flex items-center gap-3 p-4 backdrop-blur-lg bg-primary/50">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M3 21s4-8 9-8 9 8 9 8"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 8c1.6-2.8 4.4-4 7-4"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-text text-lg font-semibold">Sunny Beach</h3>
            </header>
            <div className="absolute left-0 right-0 top-50 z-10 p-8 m-4 backdrop-blur-md bg-primary/5 rounded-2xl">
              <p className="text-sm text-green ">
                Feel the sand between your toes and the sea breeze on your face.
                Our private beach setup invites you to relax, enjoy the waves,
                and soak up the sun before the night party kicks in!
              </p>
            </div>
          </div>
        </Card>

        {/* Card 3 — Girls theme */}
        <Card>
          <div
            className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl group card-fade-in"
            style={{ animationDelay: "240ms" }}
          >
            <Image
              src="/jg1.png"
              alt="Girls group"
              fill
              sizes="320px"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-transparent" />
            <header className="relative z-10 flex items-center gap-3 p-4 backdrop-blur-lg bg-primary/50">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 21c2-6 8-6 8-6s6 0 8 6"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-text text-lg font-semibold">
                Ultimate Hangout
              </h3>
            </header>
            <div className="absolute left-0 right-0 top-50 z-10 p-8 m-4 backdrop-blur-md bg-primary/5 rounded-2xl">
              <p className="text-sm text-green ">
                Bring your crew and join the ultimate hangout! Exclusive beach
                vibes, boat rides, and music make this a perfect getaway for you
                and your friends. Fun, laughter, and memories guaranteed!
              </p>
            </div>
          </div>
        </Card>
      </CardSwap>
    </div>
  );
}

export default CardSwapItem;
