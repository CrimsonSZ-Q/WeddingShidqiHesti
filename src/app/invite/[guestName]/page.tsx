"use client";

import { use, useState, useEffect } from "react";
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

  // Lock scroll when cover is active
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpened]);

  // Decode and format the guest name elegantly using the base64 utility
  const formattedName = decodeGuestName(guestName);

  return (
    <main className="relative min-h-screen w-full bg-brand-cream">
      {/* Landing Cover Overlay */}
      <Cover guestName={formattedName} onOpen={() => setIsOpened(true)} />

      {/* Main Invitation Page */}
      <InvitationMain guestName={formattedName} />

      {/* Floating Music Player */}
      <MusicPlayer url={weddingConfig.audioUrl} autoPlay={isOpened} />
    </main>
  );
}
