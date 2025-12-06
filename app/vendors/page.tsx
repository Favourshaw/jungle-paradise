"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, MessageSquare } from "lucide-react";

export default function VendorPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black bg-cover bg-center relative p-6">
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70 backdrop-blur-xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-20 w-full max-w-lg rounded-2xl p-8 border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl"
      >
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center text-3xl font-bold text-white drop-shadow-xl"
        >
          Become a Vendor
        </motion.h1>

        <p className="mt-3 text-center text-white/80 text-sm leading-relaxed">
          Interested in showcasing your products or services at our event? Get
          in touch with us through the options below.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          {/* Call */}
          <motion.a
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            href="tel:+2348137642173"
            className="flex items-center gap-3 w-full bg-white/10 border border-white/20 backdrop-blur-xl 
                       p-4 rounded-xl text-white hover:bg-white/20 transition shadow-lg"
          >
            <Phone size={20} />
            <span>Call Us</span>
          </motion.a>

          {/* Text */}
          <motion.a
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            href="sms:+2348137642173"
            className="flex items-center gap-3 w-full bg-white/10 border border-white/20 backdrop-blur-xl 
                       p-4 rounded-xl text-white hover:bg-white/20 transition shadow-lg"
          >
            <MessageSquare size={20} />
            <span>Send a Text Message</span>
          </motion.a>

          {/* Email */}
          <motion.a
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            href="mailto:support@jungleparadise.xyz"
            className="flex items-center gap-3 w-full bg-white/10 border border-white/20 backdrop-blur-xl 
                       p-4 rounded-xl text-white hover:bg-white/20 transition shadow-lg"
          >
            <Mail size={20} />
            <span>Email Us</span>
          </motion.a>
        </div>

        {/* Back Home */}
        <motion.div whileTap={{ scale: 0.95 }} className="mt-10 text-center">
          <Link
            href="/"
            className="text-white/70 hover:text-white transition text-sm underline"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
