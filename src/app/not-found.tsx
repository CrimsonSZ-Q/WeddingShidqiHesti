import { HeartCrack } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
      {/* Decorative frame */}
      <div className="absolute inset-4 border border-brand-gold/20 pointer-events-none rounded-sm"></div>
      <div className="absolute inset-6 border border-brand-gold/10 pointer-events-none rounded-sm"></div>

      <div className="z-10 flex flex-col items-center gap-4 max-w-md">
        <HeartCrack size={48} className="text-brand-gold-dark animate-pulse" />
        <h1 className="font-serif text-3xl font-light text-brand-charcoal mt-2">
          Halaman Tidak Ditemukan
        </h1>
        <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed">
          Maaf, halaman yang Anda cari tidak dapat diakses langsung. Silakan gunakan link undangan resmi yang telah dibagikan secara khusus kepada Anda.
        </p>
      </div>
    </div>
  );
}
