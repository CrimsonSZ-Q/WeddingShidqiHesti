"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Instagram, Copy, Check, Gift } from "lucide-react";
import Image from "next/image";
import { weddingConfig } from "@/wedding-config";
import Countdown from "./Countdown";
import RsvpGuestbook from "./RsvpGuestbook";

interface InvitationMainProps {
  guestName: string;
}

export default function InvitationMain({ guestName }: InvitationMainProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="w-full min-h-screen bg-brand-cream text-brand-charcoal overflow-x-hidden">

      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center border-b border-brand-olive/20">
        <div className="absolute inset-4 border border-brand-olive/20 pointer-events-none rounded-sm"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="z-10 flex flex-col items-center gap-6"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-brand-olive-dark">
            Walimatul 'Ursy
          </span>

          <h2 className="font-serif text-5xl md:text-7xl font-light text-brand-olive-dark my-4">
            {weddingConfig.groomNick} & {weddingConfig.brideNick}
          </h2>

          {/* Hero Banner Illustration */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 my-4 overflow-hidden rounded-full border-4 border-white shadow-xl shadow-brand-olive/10 bg-brand-beige">
            <Image
              src="/images/hero.png"
              alt="Shidqi & Hesti Wedding"
              fill
              className="object-cover"
              priority
            />
          </div>

          <p className="font-sans text-sm md:text-base text-brand-charcoal/80 max-w-md mx-auto leading-relaxed mt-2">
            Kami dengan penuh rasa syukur mengundang Bapak/Ibu/Saudara/i untuk merayakan momen suci pernikahan kami.
          </p>

          <div className="mt-4 font-serif text-lg text-brand-olive-dark font-medium border-y border-brand-olive/20 py-2 px-8">
            Kamis, 24 Desember 2026
          </div>
        </motion.div>

        {/* Floating subtle indicator to scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
          <span className="text-[10px] uppercase tracking-widest text-brand-charcoal/60">Gulir ke bawah</span>
          <div className="w-[1px] h-8 bg-brand-olive-dark/50 animate-bounce"></div>
        </div>
      </section>

      {/* 2. Quote Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/40 backdrop-blur-sm border border-brand-olive/10 rounded-2xl p-8 md:p-12 shadow-sm"
        >
          <p className="font-serif text-base md:text-lg italic leading-relaxed text-brand-charcoal/80">
            "{weddingConfig.quoteText}"
          </p>
          <span className="block font-sans text-xs tracking-wider uppercase font-medium text-brand-olive-dark mt-6">
            {weddingConfig.quoteSource}
          </span>
        </motion.div>
      </section>

      {/* 3. Bride & Groom Profiles */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-olive-dark">Mempelai Wanita & Pria</span>
          <h3 className="font-serif text-3xl md:text-4xl font-light text-brand-charcoal mt-2">Kedua Mempelai</h3>
          <div className="w-12 h-[1px] bg-brand-olive-dark mx-auto mt-4"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-around gap-12">
          {/* Groom Profile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-full border-2 border-brand-olive/30 shadow-md bg-brand-beige mb-6">
              <Image
                src="/images/groom.png"
                alt={weddingConfig.groomNick}
                fill
                className="object-cover"
              />
            </div>
            <h4 className="font-serif text-2xl font-medium text-brand-charcoal">{weddingConfig.groomName}</h4>
            <p className="font-sans text-xs text-brand-charcoal/60 mt-1 uppercase tracking-wider">{weddingConfig.groomNick}</p>
            <p className="font-sans text-sm text-brand-charcoal/70 mt-4 leading-relaxed px-4">{weddingConfig.groomParent}</p>
            {weddingConfig.groomInstagram && (
              <a
                href={`https://instagram.com/${weddingConfig.groomInstagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-brand-olive-dark hover:text-brand-olive transition-colors text-xs font-medium font-sans mt-4 border border-brand-olive/20 rounded-full px-3 py-1.5 bg-white/50"
              >
                <Instagram size={14} />
                @{weddingConfig.groomInstagram}
              </a>
            )}
          </motion.div>

          {/* Decorative Divider */}
          <div className="font-serif text-5xl md:text-6xl text-brand-olive-dark font-light select-none">
            &
          </div>

          {/* Bride Profile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-full border-2 border-brand-olive/30 shadow-md bg-brand-beige mb-6">
              <Image
                src="/images/bride.png"
                alt={weddingConfig.brideNick}
                fill
                className="object-cover"
              />
            </div>
            <h4 className="font-serif text-2xl font-medium text-brand-charcoal">{weddingConfig.brideName}</h4>
            <p className="font-sans text-xs text-brand-charcoal/60 mt-1 uppercase tracking-wider">{weddingConfig.brideNick}</p>
            <p className="font-sans text-sm text-brand-charcoal/70 mt-4 leading-relaxed px-4">{weddingConfig.brideParent}</p>
            {weddingConfig.brideInstagram && (
              <a
                href={`https://instagram.com/${weddingConfig.brideInstagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-brand-olive-dark hover:text-brand-olive transition-colors text-xs font-medium font-sans mt-4 border border-brand-olive/20 rounded-full px-3 py-1.5 bg-white/50"
              >
                <Instagram size={14} />
                @{weddingConfig.brideInstagram}
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* 4. Countdown Timer */}
      <section className="py-16 bg-brand-beige/30 border-y border-brand-olive/15 text-center">
        <span className="font-sans text-xs tracking-[0.20em] uppercase text-brand-olive-dark">Menghitung Hari</span>
        <h3 className="font-serif text-3xl font-light text-brand-charcoal mt-2">Momen Bahagia</h3>
        <Countdown targetDate={weddingConfig.marriageDate} />
      </section>

      {/* 5. Event Schedule */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-olive-dark">Informasi Acara</span>
          <h3 className="font-serif text-3xl md:text-4xl font-light text-brand-charcoal mt-2">Waktu & Tempat</h3>
          <div className="w-12 h-[1px] bg-brand-olive-dark mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {weddingConfig.events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="bg-white/70 backdrop-blur-md border border-brand-olive/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              {/* Event card header decor */}
              <div className="absolute top-0 inset-x-0 h-1 bg-brand-olive"></div>

              <div>
                <h4 className="font-serif text-2xl font-medium text-brand-olive-dark mb-6">{event.title}</h4>

                <div className="flex flex-col gap-4 text-sm text-brand-charcoal/80">
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-brand-olive-dark shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Hari & Tanggal</span>
                      <span>{event.dateText}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-brand-olive-dark shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Waktu Acara</span>
                      <span>{event.time}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-brand-olive-dark shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">{event.venue}</span>
                      <span className="text-xs">{event.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-8">
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-brand-olive-dark hover:bg-brand-olive text-white text-center py-2.5 rounded-lg text-xs font-medium font-sans uppercase tracking-widest transition-colors shadow-sm block"
                >
                  Buka Peta Petunjuk
                </a>

                {/* Save to Calendar Button */}
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Shidqi+dan+Hesti&dates=20261224T010000Z/20261224T060000Z&details=Mohon+kehadiran+dan+doa+restu+Anda+pada+pernikahan+Shidqi+dan+Hesti.&location=${encodeURIComponent(event.venue + ', ' + event.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-transparent border border-brand-olive-dark text-brand-olive-dark hover:bg-brand-olive-dark hover:text-white text-center py-2.5 rounded-lg text-xs font-medium font-sans uppercase tracking-widest transition-all block"
                >
                  Simpan Kalender
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Digital Envelope / Gifts */}
      <section className="py-20 bg-brand-beige/25 border-y border-brand-olive/15 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-brand-olive/20 flex items-center justify-center text-brand-olive-dark">
              <Gift size={24} />
            </div>
          </div>
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-olive-dark">Wedding Gift</span>
          <h3 className="font-serif text-3xl font-light text-brand-charcoal mt-2">Kirim Kado / Amplop Digital</h3>
          <div className="w-12 h-[1px] bg-brand-olive-dark mx-auto my-6"></div>
          <p className="text-sm text-brand-charcoal/70 max-w-md mx-auto leading-relaxed mb-10">
            Bagi keluarga dan teman-teman yang ingin mengirimkan kado atau ucapan secara digital, dapat ditransfer melalui nomor rekening di bawah ini:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left mb-8">
            {weddingConfig.gifts.map((gift, idx) => (
              <div key={gift.accountNumber} className="bg-white border border-brand-olive/20 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-brand-olive-dark font-semibold font-sans">
                    {gift.bankName}
                  </span>
                  <div className="font-mono text-lg font-bold text-brand-charcoal/80 mt-2 tracking-wider">
                    {gift.accountNumber}
                  </div>
                  <div className="text-xs text-brand-charcoal/60 mt-1">
                    a.n. {gift.accountHolder}
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(gift.accountNumber, idx)}
                  className="mt-6 flex items-center justify-center gap-1.5 w-full py-2 bg-brand-cream hover:bg-brand-beige border border-brand-olive/20 text-xs font-semibold text-brand-charcoal/80 rounded-md transition-all cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check size={14} className="text-brand-olive-dark" />
                      Berhasil Disalin
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Salin No. Rekening
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white/50 border border-brand-olive/15 rounded-xl p-5 max-w-2xl mx-auto text-left">
            <span className="text-xs uppercase tracking-widest text-brand-olive-dark font-semibold font-sans">Alamat Pengiriman Kado Fisik</span>
            <p className="text-xs text-brand-charcoal/80 mt-2 leading-relaxed font-sans">{weddingConfig.giftAddress}</p>
          </div>
        </div>
      </section>

      {/* 7. RSVP and Guestbook */}
      <section className="py-20">
        <div className="text-center mb-10">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-olive-dark">Buku Tamu & RSVP</span>
          <h3 className="font-serif text-3xl font-light text-brand-charcoal mt-2">Beri Ucapan Restu</h3>
          <div className="w-12 h-[1px] bg-brand-olive-dark mx-auto mt-4"></div>
        </div>
        <RsvpGuestbook defaultGuestName={guestName} />
      </section>

      {/* 8. Footer */}
      <footer className="bg-brand-charcoal text-brand-cream py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-4 border border-brand-cream/10 pointer-events-none rounded-sm"></div>

        <div className="z-10 relative flex flex-col items-center gap-4">
          <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-75">Merupakan kehormatan & kebahagiaan bagi kami</p>

          <h4 className="font-serif text-3xl font-light tracking-wide text-brand-beige mt-2">
            {weddingConfig.groomNick} & {weddingConfig.brideNick}
          </h4>

          <div className="w-12 h-[1px] bg-brand-beige/30 my-4"></div>

          <p className="text-[11px] font-sans opacity-50 tracking-wider">
            &copy; 2026 Shidqi & Hesti. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
