"use client";

import { useEffect, useState } from "react";
import { Link, Copy, Check, ExternalLink, ChevronRight, Sparkles } from "lucide-react";
import { encodeGuestName } from "@/lib/url";

export default function LinkGeneratorPage() {
  const [guestName, setGuestName] = useState("");
  const [origin, setOrigin] = useState("http://localhost:3000");
  const [copiedType, setCopiedType] = useState<"plain" | "encrypted" | null>(null);

  // Set the window location origin only on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Format clean name for plain URL (spaces to dashes)
  const plainSlug = guestName
    .trim()
    .replace(/\s+/g, "-");
  
  // Encrypted slug using Base64 URL helper
  const encryptedSlug = encodeGuestName(guestName);

  const plainUrl = `${origin}/invite/${plainSlug}`;
  const encryptedUrl = `${origin}/invite/${encryptedSlug}`;

  const handleCopy = (text: string, type: "plain" | "encrypted") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal py-12 px-6 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Decorative background frame */}
      <div className="absolute inset-4 border border-brand-gold/20 pointer-events-none rounded-sm"></div>
      <div className="absolute inset-6 border border-brand-gold/10 pointer-events-none rounded-sm"></div>

      <div className="max-w-xl w-full bg-white/70 backdrop-blur-md border border-brand-gold/20 rounded-2xl p-6 md:p-8 shadow-lg shadow-brand-gold/5 z-10">
        
        {/* Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold-dark mb-3">
            <Link size={22} />
          </div>
          <h1 className="font-serif text-3xl font-light text-brand-gold-dark">
            Invitation Link Generator
          </h1>
          <p className="text-xs text-brand-charcoal/60 mt-1 font-sans">
            Buat link undangan kustom untuk masing-masing tamu undangan Anda.
          </p>
        </div>

        {/* Input Form */}
        <div className="flex flex-col gap-2 mb-8">
          <label htmlFor="guest-name-input" className="text-xs font-semibold text-brand-charcoal/80 uppercase tracking-wider font-sans">
            Nama Tamu Undangan
          </label>
          <input
            id="guest-name-input"
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Contoh: Ajeng dan Partner"
            className="w-full bg-white border border-brand-gold/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold-dark shadow-sm transition-all font-sans"
            autoFocus
          />
        </div>

        {guestName.trim() ? (
          <div className="flex flex-col gap-6">
            
            {/* Encrypted Option (Recommended) */}
            <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-gold-dark text-white text-[9px] font-sans font-medium uppercase tracking-widest px-2.5 py-1 rounded-bl-lg flex items-center gap-1">
                <Sparkles size={10} /> Direkomendasikan
              </div>

              <div>
                <h3 className="text-xs font-semibold text-brand-gold-dark uppercase tracking-wider font-sans">
                  Link Terenkripsi (Aman)
                </h3>
                <p className="text-[10px] text-brand-charcoal/60 mt-0.5 leading-relaxed font-sans">
                  Menyembunyikan nama tamu langsung dari URL. Lebih rapi dan formal.
                </p>
              </div>

              <div className="bg-white border border-brand-gold/10 rounded-lg p-3 font-mono text-xs text-brand-charcoal/70 break-all select-all flex items-center justify-between gap-4">
                <span className="truncate pr-2">{encryptedUrl}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-1">
                <button
                  onClick={() => handleCopy(encryptedUrl, "encrypted")}
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-brand-gold-dark hover:bg-brand-gold text-white text-xs font-medium rounded-lg transition-all cursor-pointer shadow-sm"
                >
                  {copiedType === "encrypted" ? (
                    <>
                      <Check size={14} /> Berhasil Disalin
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Salin Link
                    </>
                  )}
                </button>
                <a
                  href={encryptedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-white border border-brand-gold/30 text-brand-charcoal hover:bg-brand-cream text-xs font-medium rounded-lg transition-all"
                >
                  <ExternalLink size={14} /> Buka Preview
                </a>
              </div>
            </div>

            {/* Plain Text Option */}
            <div className="bg-white border border-brand-gold/15 rounded-xl p-4 flex flex-col gap-3">
              <div>
                <h3 className="text-xs font-semibold text-brand-charcoal/80 uppercase tracking-wider font-sans">
                  Link Teks Biasa (Plain)
                </h3>
                <p className="text-[10px] text-brand-charcoal/65 mt-0.5 leading-relaxed font-sans">
                  Menampilkan nama tamu secara transparan di dalam URL.
                </p>
              </div>

              <div className="bg-brand-cream/40 border border-brand-gold/10 rounded-lg p-3 font-mono text-xs text-brand-charcoal/70 break-all select-all flex items-center justify-between gap-4">
                <span className="truncate pr-2">{plainUrl}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-1">
                <button
                  onClick={() => handleCopy(plainUrl, "plain")}
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-brand-cream hover:bg-brand-beige border border-brand-gold/20 text-brand-charcoal text-xs font-medium rounded-lg transition-all cursor-pointer"
                >
                  {copiedType === "plain" ? (
                    <>
                      <Check size={14} /> Berhasil Disalin
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Salin Link
                    </>
                  )}
                </button>
                <a
                  href={plainUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-white border border-brand-gold/30 text-brand-charcoal hover:bg-brand-cream text-xs font-medium rounded-lg transition-all"
                >
                  <ExternalLink size={14} /> Buka Preview
                </a>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-10 border border-dashed border-brand-gold/20 rounded-xl bg-brand-cream/30 flex flex-col items-center gap-2">
            <span className="text-sm font-serif italic text-brand-charcoal/40">
              Masukkan nama tamu di atas untuk meng-generate link...
            </span>
          </div>
        )}

        <div className="mt-8 text-center border-t border-brand-gold/10 pt-4">
          <a
            href="/"
            className="text-xs text-brand-gold-dark hover:underline font-sans inline-flex items-center gap-1"
          >
            Kembali ke Halaman Utama <ChevronRight size={14} />
          </a>
        </div>

      </div>
    </div>
  );
}
