"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicPlayerProps {
  url: string;
  autoPlay: boolean;
}

export default function MusicPlayer({ url, autoPlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Instantiate audio object only in browser
    audioRef.current = new Audio(url);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [url]);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.log("Auto-play blocked by browser. User interaction needed.", error));
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Audio playback error:", error));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="relative flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-md border border-brand-gold/30 text-brand-gold-dark rounded-full shadow-lg transition-colors cursor-pointer"
        aria-label="Toggle background music"
      >
        {/* Glowing aura when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-brand-gold/20 animate-ping opacity-75"></span>
        )}

        <div className={`relative ${isPlaying ? "music-spin" : ""}`}>
          <Music size={20} className={isPlaying ? "text-brand-gold-dark" : "text-brand-charcoal/50"} />
        </div>

        {/* Small indicator dot for sound state */}
        <div className="absolute -top-1 -right-1 bg-brand-gold-dark text-white rounded-full p-0.5 border border-white">
          {isPlaying ? <Volume2 size={10} /> : <VolumeX size={10} />}
        </div>
      </motion.button>
    </div>
  );
}
