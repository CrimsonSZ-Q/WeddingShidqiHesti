"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MailOpen } from "lucide-react";
import { useEffect, useState } from "react";

interface CoverProps {
  guestName: string;
  onOpen: () => void;
}

export default function Cover({ guestName, onOpen }: CoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Delay to match slide-up transition before triggers audio and scroll enable
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-brand-cream text-brand-charcoal overflow-hidden p-6 md:p-12"
        >
          {/* Background Decorative Frame */}
          <div className="absolute inset-4 border border-brand-olive/30 pointer-events-none rounded-sm"></div>
          <div className="absolute inset-6 border border-brand-olive/15 pointer-events-none rounded-sm"></div>

          {/* Top Section */}
          <div className="text-center mt-12 z-10 flex flex-col gap-2">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-brand-olive-dark">
              The Wedding of
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-brand-olive-dark">
              Shidqi & Hesti
            </h1>
          </div>

          {/* Middle Invitation Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="z-10 bg-white/70 backdrop-blur-md border border-brand-olive/20 rounded-xl p-8 max-w-md w-full text-center shadow-lg shadow-brand-olive/5 flex flex-col gap-4"
          >
            <p className="font-sans text-sm text-brand-charcoal/70 tracking-wide">
              Kepad Yth. Bapak/Ibu/Saudara/i,
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-brand-charcoal py-2 border-y border-brand-olive/10">
              {guestName}
            </h2>
            <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed">
              Tanpa mengurangi rasa hormat, kami mengundang Anda untuk bergabung dalam momen kebahagiaan kami.
            </p>
          </motion.div>

          {/* Bottom Button */}
          <div className="mb-12 z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="flex items-center gap-2 bg-brand-olive-dark hover:bg-brand-olive text-white px-6 py-3 rounded-full text-sm font-sans tracking-widest uppercase transition-all duration-300 shadow-md shadow-brand-olive/20"
            >
              <MailOpen size={16} />
              Buka Undangan
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
