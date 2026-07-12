"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MailOpen } from "lucide-react";
import { useState } from "react";
import { weddingConfig } from "@/wedding-config";

interface CoverProps {
  guestName: string;
  onOpen: () => void;
}

export default function Cover({ guestName, onOpen }: CoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Delay to allow slide-up transition to finish before starting music & scroll
    setTimeout(() => {
      onOpen();
    }, 850);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-brand-cream text-brand-charcoal overflow-hidden p-6 md:p-12"
        >
          {/* Looped Fountain Video Background */}
          <div className="absolute inset-0 z-0 opacity-35 pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://inv.wekita.id/wp-content/uploads/2025/08/PREMIUM-VINTAGE-01.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          {/* Luxury Corner Ornaments */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-brand-gold/45 pointer-events-none z-10"></div>
          <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-brand-gold/45 pointer-events-none z-10"></div>
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-brand-gold/45 pointer-events-none z-10"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-brand-gold/45 pointer-events-none z-10"></div>

          {/* Double Frame Border */}
          <div className="absolute inset-4 border border-brand-gold/25 pointer-events-none rounded-sm z-10"></div>
          <div className="absolute inset-6 border-2 border-double border-brand-gold/15 pointer-events-none rounded-sm z-10"></div>

          {/* Top Header */}
          <div className="text-center mt-16 z-10 flex flex-col gap-2">
            <span className="font-sans text-[10px] md:text-xs tracking-[0.35em] uppercase text-brand-gold-dark font-semibold">
              The Wedding of
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-brand-charcoal tracking-wide mt-2">
              {weddingConfig.groomNick} & {weddingConfig.brideNick}
            </h1>
          </div>

          {/* Middle Invitation Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
            className="z-10 bg-white/75 backdrop-blur-md border border-brand-gold/30 rounded-2xl p-8 max-w-md w-full text-center shadow-xl shadow-brand-gold/5 flex flex-col gap-5"
          >
            <p className="font-sans text-xs text-brand-charcoal/70 tracking-wide uppercase">
              Kepada Yth. Bapak/Ibu/Saudara/i
            </p>
            <h2 className="font-serif text-3xl font-medium text-brand-charcoal py-3 border-y-2 border-double border-brand-gold/20 tracking-wide">
              {guestName}
            </h2>
            <p className="font-sans text-[10px] text-brand-charcoal/60 leading-relaxed font-light">
              Tanpa mengurangi rasa hormat, kami mengundang Anda untuk bergabung dalam momen kebahagiaan suci kami.
            </p>
          </motion.div>

          {/* Bottom Button */}
          <div className="mb-16 z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="flex items-center gap-2 bg-brand-gold-dark hover:bg-brand-gold text-white px-8 py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md shadow-brand-gold/20 cursor-pointer"
            >
              <MailOpen size={15} />
              Buka Undangan
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
