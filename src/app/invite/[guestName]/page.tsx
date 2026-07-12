"use client";

import { use, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
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
  const [showIntroDetails, setShowIntroDetails] = useState(false);

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

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    // Show names and circular image only after second 12
    if (video.currentTime >= 12) {
      setShowIntroDetails(true);
    } else {
      setShowIntroDetails(false);
    }
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
            {/* Background Video */}
            <video
              autoPlay
              playsInline
              muted
              onEnded={handleIntroEnded}
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-cover absolute inset-0 z-0"
            >
              <source
                src="https://inv.wekita.id/wp-content/uploads/2025/08/PREMIUM-VINTAGE-01.mp4"
                type="video/mp4"
              />
            </video>

            {/* Centered Content overlaying the video frame (appears after second 12) */}
            <AnimatePresence>
              {showIntroDetails && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="z-10 flex flex-col items-center text-center p-4 max-w-xs pointer-events-none -mt-20 md:mt-0"
                >
                  <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-brand-gold-dark font-semibold animate-pulse">
                    The Wedding of
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-light text-brand-charcoal tracking-wide mt-2 mb-3">
                    {weddingConfig.groomNick} & {weddingConfig.brideNick}
                  </h2>
                  <div className="relative w-40 h-40 md:w-48 md:h-48 overflow-hidden rounded-full border-4 border-double border-brand-gold/45 shadow-2xl bg-brand-champagne">
                    <Image
                      src="/images/banner.jpg"
                      alt={`${weddingConfig.groomNick} & ${weddingConfig.brideNick} Wedding`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 160px, 192px"
                      priority
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
