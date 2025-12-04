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
import { Ticket, TicketIcon } from "lucide-react";
import { BsTicketDetailed } from "react-icons/bs";
import { LuTicketsPlane } from "react-icons/lu";
import { MdSupportAgent } from "react-icons/md";

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
        icon: <VscAccount size={30} />,
        label: "Vendor",
        onClick: () => router.push("/vendor"),
      },
      {
        id: "contact",
        icon: <MdSupportAgent size={30} />,
        label: "Contact",
        onClick: () => router.push("/contact"),
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
