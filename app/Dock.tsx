"use client";

import React, { JSX, useMemo } from "react";
import { useRouter } from "next/navigation";
import Dock from "@/components/Dock";
import {
  VscAccount,
  VscArchive,
  VscHome,
  VscSettingsGear,
} from "react-icons/vsc";
import { Store, Ticket, TicketIcon } from "lucide-react";
import { BsTicketDetailed } from "react-icons/bs";
import { LuTicketsPlane } from "react-icons/lu";
import { MdSell, MdSupportAgent } from "react-icons/md";
import { GiJungle } from "react-icons/gi";

export default function Docks(): JSX.Element {
  const router = useRouter();

  const items = useMemo(
    () => [
      {
        id: "home",
        icon: <VscHome size={30} />,
        label: "Home",
        onClick: () => router.push("/"),
      },
      {
        id: "ticket",
        icon: <LuTicketsPlane size={30} />,
        label: "Ticket",
        onClick: () => router.push("/ticket"),
      },
      {
        id: "vendor",
        icon: <Store size={30} />,
        label: "Vendor",
        onClick: () => router.push("/vendor"),
      },
      {
        id: "about",
        icon: <GiJungle size={30} />,
        label: "About",
        onClick: () => router.push("/about"),
      },
    ],
    [router]
  );

  return (
    <div>
      <div className="relative z-40 cursor-target">
        <Dock
          items={items}
          panelHeight={80}
          baseItemSize={65}
          magnification={120}
          className="z-40"
        />
      </div>
    </div>
  );
}
