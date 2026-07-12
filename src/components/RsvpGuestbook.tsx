"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send, Users, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";
import { addRsvp, getRsvps, RsvpEntry } from "@/lib/supabase";

interface RsvpGuestbookProps {
  defaultGuestName: string;
}

export default function RsvpGuestbook({ defaultGuestName }: RsvpGuestbookProps) {
  // Form state
  const [name, setName] = useState(defaultGuestName || "");
  const [attendance, setAttendance] = useState<boolean | null>(null);
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [wishes, setWishes] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [wishesList, setWishesList] = useState<RsvpEntry[]>([]);
  const [isLoadingWishes, setIsLoadingWishes] = useState(true);

  // Sync defaultGuestName to name field
  useEffect(() => {
    if (defaultGuestName) {
      setName(defaultGuestName);
    }
  }, [defaultGuestName]);

  // Fetch comments/wishes on mount
  useEffect(() => {
    loadWishes();
  }, []);

  const loadWishes = async () => {
    setIsLoadingWishes(true);
    try {
      const data = await getRsvps();
      setWishesList(data);
    } catch (e) {
      console.error("Failed to load wishes:", e);
    } finally {
      setIsLoadingWishes(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Nama tidak boleh kosong.");
      return;
    }
    if (attendance === null) {
      setErrorMsg("Mohon konfirmasi kehadiran Anda.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const success = await addRsvp({
        name: name.trim(),
        attendance,
        guests_count: attendance ? guestsCount : 0,
        wishes: wishes.trim() || "",
      });

      if (success) {
        setIsSubmitted(true);
        // Show confetti if attending
        if (attendance) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#A3B19B", "#F5EFE6", "#D4AF37", "#E4D0D0"],
          });
        }
        // Refresh wishes list
        loadWishes();
      } else {
        setErrorMsg("Gagal menyimpan RSVP. Silakan coba lagi.");
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan sistem. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto px-4 py-8">
      {/* RSVP Form Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-md border border-brand-olive/20 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-brand-olive/15 flex items-center justify-center text-brand-olive-dark">
              <Check size={20} />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-medium text-brand-charcoal">
                Konfirmasi Kehadiran
              </h3>
              <p className="text-xs text-brand-charcoal/60">
                Silakan isi formulir di bawah untuk konfirmasi kehadiran Anda.
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Input Name */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="rsvp-name" className="text-xs font-sans font-medium text-brand-charcoal/80">
                    Nama Tamu
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Lengkap Anda"
                    className="w-full bg-brand-cream/50 border border-brand-olive/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-olive-dark transition-all font-sans"
                    required
                  />
                </div>

                {/* Presence Status */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-sans font-medium text-brand-charcoal/80">
                    Konfirmasi Kehadiran
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setAttendance(true)}
                      className={`py-3 rounded-lg border text-sm font-sans flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                        attendance === true
                          ? "bg-brand-olive text-white border-brand-olive shadow-sm"
                          : "bg-transparent text-brand-charcoal/70 border-brand-olive/30 hover:bg-brand-cream/50"
                      }`}
                    >
                      Hadir
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendance(false)}
                      className={`py-3 rounded-lg border text-sm font-sans flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                        attendance === false
                          ? "bg-brand-olive/40 text-brand-charcoal border-brand-olive/50 shadow-sm"
                          : "bg-transparent text-brand-charcoal/70 border-brand-olive/30 hover:bg-brand-cream/50"
                      }`}
                    >
                      Tidak Hadir
                    </button>
                  </div>
                </div>

                {/* Number of Guests (Attending only) */}
                <AnimatePresence>
                  {attendance === true && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden flex flex-col gap-1"
                    >
                      <label htmlFor="rsvp-count" className="text-xs font-sans font-medium text-brand-charcoal/80 flex items-center gap-1.5">
                        <Users size={14} /> Jumlah Tamu yang Hadir
                      </label>
                      <select
                        id="rsvp-count"
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full bg-brand-cream/50 border border-brand-olive/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-olive-dark transition-all font-sans"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} Orang
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Wishes / Ucapan */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="rsvp-wishes" className="text-xs font-sans font-medium text-brand-charcoal/80">
                    Ucapan & Doa Restu
                  </label>
                  <textarea
                    id="rsvp-wishes"
                    rows={4}
                    value={wishes}
                    onChange={(e) => setWishes(e.target.value)}
                    placeholder="Tuliskan ucapan selamat dan doa restu terbaik untuk kedua mempelai di sini..."
                    className="w-full bg-brand-cream/50 border border-brand-olive/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-olive-dark transition-all font-sans resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-red-500 text-xs font-sans">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-olive-dark hover:bg-brand-olive disabled:bg-brand-olive/50 text-white font-medium py-3 rounded-lg text-sm font-sans flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-sm mt-2"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Send size={16} /> Kirim Konfirmasi
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-brand-olive/20 flex items-center justify-center text-brand-olive-dark">
                  <Check size={32} />
                </div>
                <h4 className="font-serif text-xl font-medium text-brand-charcoal">
                  Terima Kasih Banyak!
                </h4>
                <p className="text-sm text-brand-charcoal/70 max-w-sm">
                  Konfirmasi kehadiran dan doa restu Anda telah berhasil dikirimkan. Sangat berarti bagi kami.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-brand-olive-dark hover:underline text-xs font-sans mt-4"
                >
                  Ubah konfirmasi RSVP
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Guestbook Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-md border border-brand-olive/20 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col h-[520px]"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-brand-olive/15 flex items-center justify-center text-brand-olive-dark">
            <MessageSquare size={20} />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-medium text-brand-charcoal">
              Wishes & Prayers
            </h3>
            <p className="text-xs text-brand-charcoal/60">
              Doa restu dari teman-teman dan keluarga ({wishesList.length} Ucapan)
            </p>
          </div>
        </div>

        {/* Wishes List Container */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 scrollbar-thin">
          {isLoadingWishes ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 text-brand-charcoal/40">
              <span className="w-8 h-8 border-2 border-brand-olive-dark border-t-transparent rounded-full animate-spin"></span>
              <p className="text-xs font-sans">Memuat ucapan...</p>
            </div>
          ) : wishesList.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-brand-charcoal/40 text-sm font-sans italic text-center p-6">
              Belum ada ucapan. Jadilah yang pertama mengirimkan ucapan selamat!
            </div>
          ) : (
            wishesList.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-brand-cream/40 border border-brand-olive/10 rounded-xl p-4 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-serif text-sm font-semibold text-brand-charcoal flex items-center gap-2">
                    {entry.name}
                    {entry.attendance ? (
                      <span className="bg-brand-olive/20 text-brand-olive-dark text-[9px] px-2 py-0.5 rounded-full font-sans font-medium uppercase tracking-wider">
                        Hadir
                      </span>
                    ) : (
                      <span className="bg-brand-charcoal/10 text-brand-charcoal/60 text-[9px] px-2 py-0.5 rounded-full font-sans font-medium uppercase tracking-wider">
                        Tidak Hadir
                      </span>
                    )}
                  </h5>
                  <span className="text-[10px] text-brand-charcoal/45 font-sans">
                    {new Date(entry.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {entry.wishes ? (
                  <p className="text-xs font-sans text-brand-charcoal/80 leading-relaxed whitespace-pre-wrap">
                    {entry.wishes}
                  </p>
                ) : (
                  <p className="text-xs font-sans text-brand-charcoal/40 italic">
                    Mengirimkan konfirmasi kehadiran.
                  </p>
                )}
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
