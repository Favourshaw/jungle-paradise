import type { Metadata } from "next";
import { Eater, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Docks from "./Dock";
import Header from "@/components/Header";

<link
  href="https://fonts.googleapis.com/css2?family=Eater&family=Geist:wght@100..900&family=Sora:wght@100..800&display=swap"
  rel="stylesheet"
/>;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const eater = Eater({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-eater",
});

export const metadata: Metadata = {
  title: {
    default: "Jungle Paradise - Premium party Experience",
    template: "%s | Jungle Paradise",
  },
  description: "Experience the ultimate party adventure at Jungle Paradise. .",
  keywords: ["party", "adventure", "tickets", "nature", "safari"],
  authors: [{ name: "Jungle Paradise" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jungleparadise.xyz",
    title: "Jungle Paradise",
    description: "Premium party Experience",
    siteName: "Jungle Paradise",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jungle Paradise",
    description: "Premium party Experience",
    creator: "@jungleparadise",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}  ${eater.variable} antialiased`}>
        <div className={eater.className}>
          <Header />
          {children}

          <Docks />
        </div>
      </body>
    </html>
  );
}
