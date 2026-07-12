"use client";

import { use, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Cover from "@/components/Cover";
import InvitationMain from "@/components/InvitationMain";
import MusicPlayer from "@/components/MusicPlayer";
import { weddingConfig } from "@/wedding-config";
import { decodeGuestName } from "@/lib/url";

interface InvitePageProps {
  params: Promise<{ guestName: string }>;
}

export default function GuestInvitePage({ params }: InvitePageProps) {
  const { guestName } = use(params);
  const [isOpened, setIsOpened] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const [isPlayingIntro, setIsPlayingIntro] = useState(false);

  // Lock scroll when cover or intro is active
  useEffect(() => {
    if (showCover || isPlayingIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showCover, isPlayingIntro]);

  const handleOpenInvitation = () => {
    // 1. Hide Cover
    setShowCover(false);
    // 2. Play intro video
    setIsPlayingIntro(true);
  };

  const handleIntroEnded = () => {
    // 3. Stop intro video overlay
    setIsPlayingIntro(false);
    // 4. Reveal main invitation and enable scrolling
    setIsOpened(true);
  };

  // Decode and format the guest name elegantly using the base64 utility
  const formattedName = decodeGuestName(guestName);

  return (
    <main className="relative min-h-screen w-full bg-brand-cream">
      {/* 1. Landing Cover Overlay */}
      <AnimatePresence>
        {showCover && (
          <Cover guestName={formattedName} onOpen={handleOpenInvitation} />
        )}
      </AnimatePresence>

      {/* 2. Cinematic Intro Video Overlay (Plays Once) */}
      <AnimatePresence>
        {isPlayingIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-45 bg-brand-cream flex items-center justify-center overflow-hidden"
          >
            <video
              autoPlay
              playsInline
              muted
              onEnded={handleIntroEnded}
              className="w-full h-full object-cover"
            >
              <source
                src="https://inv.wekita.id/wp-content/uploads/2025/08/PREMIUM-VINTAGE-01.mp4"
                type="video/mp4"
              />
            </video>
            
            {/* Quick Skip button for good UX */}
            <button
              onClick={handleIntroEnded}
              className="absolute bottom-10 right-6 bg-white/70 hover:bg-white text-brand-charcoal border border-brand-gold/30 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all z-50 cursor-pointer shadow-sm"
            >
              Lewati Video (Skip)
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Invitation Page */}
      <div 
        className={
          isOpened 
            ? "opacity-100 transition-opacity duration-1000" 
            : "opacity-0 pointer-events-none h-screen overflow-hidden"
        }
      >
        <InvitationMain guestName={formattedName} isOpened={isOpened} />
      </div>

      {/* 4. Floating Music Player (Starts as soon as cover is opened) */}
      <MusicPlayer url={weddingConfig.audioUrl} autoPlay={!showCover} />
    </main>
  );
}
