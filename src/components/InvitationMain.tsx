"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Calendar, MapPin, Clock, Instagram, Copy, Check, Gift } from "lucide-react";
import Image from "next/image";
import { weddingConfig } from "@/wedding-config";
import Countdown from "./Countdown";
import RsvpGuestbook from "./RsvpGuestbook";

interface InvitationMainProps {
  guestName: string;
  isOpened?: boolean;
}

export default function InvitationMain({ guestName, isOpened = false }: InvitationMainProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  // Stagger variants for the Hero reveal animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  const scaleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full min-h-screen bg-brand-cream text-brand-charcoal overflow-x-hidden font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center border-b border-brand-gold/20 overflow-hidden bg-brand-gold-light">
        {/* Looped Fountain Video Background */}
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
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
        
        {/* Double Border Frame */}
        <div className="absolute inset-4 border border-brand-gold/25 pointer-events-none rounded-sm z-10"></div>
        <div className="absolute inset-6 border-2 border-double border-brand-gold/15 pointer-events-none rounded-sm z-10"></div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isOpened ? "visible" : "hidden"}
          className="z-10 flex flex-col items-center gap-4 max-w-2xl"
        >
          <motion.span 
            variants={itemVariants} 
            className="font-sans text-[10px] md:text-xs tracking-[0.35em] uppercase text-brand-gold-dark font-semibold"
          >
            The Wedding of
          </motion.span>
          
          <motion.h2 
            variants={itemVariants}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-brand-charcoal tracking-wide my-3"
          >
            {weddingConfig.groomNick} & {weddingConfig.brideNick}
          </motion.h2>
          
          {/* Hero Banner Illustration */}
          <motion.div
            variants={scaleVariants}
            className="relative w-64 h-64 md:w-80 md:h-80 my-4 overflow-hidden rounded-full border-4 border-double border-brand-gold/40 shadow-2xl shadow-brand-gold/10 bg-brand-champagne"
          >
            <Image
              src="/images/hero.png"
              alt={`${weddingConfig.groomNick} & ${weddingConfig.brideNick} Wedding`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 256px, 320px"
              priority
            />
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="font-sans text-xs md:text-sm text-brand-charcoal/70 max-w-md mx-auto leading-relaxed mt-2"
          >
            Maha suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Kami mengundang Anda untuk menghadiri pernikahan kami.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="mt-6 font-serif text-xl md:text-2xl text-brand-gold-dark tracking-widest font-semibold border-y-2 border-double border-brand-gold/30 py-2 px-10"
          >
            Kamis, 24 Desember 2026
          </motion.div>
        </motion.div>

        {/* Floating indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50">
          <span className="text-[9px] uppercase tracking-[0.25em] text-brand-charcoal/50">Scroll Down</span>
          <div className="w-[1px] h-8 bg-brand-gold/60 animate-bounce"></div>
        </div>
      </section>

      {/* 2. Quote Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="bg-brand-gold-light border border-brand-gold/20 rounded-2xl p-8 md:p-14 shadow-md relative overflow-hidden"
        >
          {/* Subtle gold line accent */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
          
          <p className="font-serif text-lg md:text-xl italic leading-relaxed text-brand-charcoal/90">
            "{weddingConfig.quoteText}"
          </p>
          <span className="block font-sans text-xs tracking-[0.2em] uppercase font-bold text-brand-gold-dark mt-6">
            {weddingConfig.quoteSource}
          </span>
        </motion.div>
      </section>

      {/* 3. Bride & Groom Profiles */}
      <section className="py-20 px-6 max-w-5xl mx-auto relative">
        <div className="text-center mb-20">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-gold-dark font-bold">Mempelai Pria & Wanita</span>
          <h3 className="font-serif text-3xl md:text-5xl font-light text-brand-charcoal mt-2 tracking-wide">Kedua Mempelai</h3>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto mt-4"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-around gap-16 relative">
          
          {/* Groom Profile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-full border-4 border-double border-brand-gold/45 shadow-lg bg-brand-champagne mb-8">
              <Image
                src="/images/groom.png"
                alt={weddingConfig.groomNick}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 224px"
              />
            </div>
            <h4 className="font-serif text-3xl font-normal text-brand-charcoal tracking-wide">{weddingConfig.groomName}</h4>
            <p className="font-sans text-xs text-brand-gold-dark font-semibold mt-1.5 uppercase tracking-[0.2em]">{weddingConfig.groomNick}</p>
            <p className="font-sans text-xs md:text-sm text-brand-charcoal/70 mt-4 leading-relaxed px-6 font-light">{weddingConfig.groomParent}</p>
            
            {weddingConfig.groomInstagram && (
              <a
                href={`https://instagram.com/${weddingConfig.groomInstagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-brand-gold-dark hover:text-brand-gold transition-colors text-xs font-semibold font-sans mt-5 border border-brand-gold/30 rounded-full px-4 py-2 bg-white/70 shadow-sm"
              >
                <Instagram size={14} />
                @{weddingConfig.groomInstagram}
              </a>
            )}
          </motion.div>

          {/* Decorative Divider */}
          <div className="font-serif text-5xl md:text-6xl text-brand-gold-dark font-light select-none py-4">
            &
          </div>

          {/* Bride Profile */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-full border-4 border-double border-brand-gold/45 shadow-lg bg-brand-champagne mb-8">
              <Image
                src="/images/bride.png"
                alt={weddingConfig.brideNick}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 224px"
              />
            </div>
            <h4 className="font-serif text-3xl font-normal text-brand-charcoal tracking-wide">{weddingConfig.brideName}</h4>
            <p className="font-sans text-xs text-brand-gold-dark font-semibold mt-1.5 uppercase tracking-[0.2em]">{weddingConfig.brideNick}</p>
            <p className="font-sans text-xs md:text-sm text-brand-charcoal/70 mt-4 leading-relaxed px-6 font-light">{weddingConfig.brideParent}</p>
            
            {weddingConfig.brideInstagram && (
              <a
                href={`https://instagram.com/${weddingConfig.brideInstagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-brand-gold-dark hover:text-brand-gold transition-colors text-xs font-semibold font-sans mt-5 border border-brand-gold/30 rounded-full px-4 py-2 bg-white/70 shadow-sm"
              >
                <Instagram size={14} />
                @{weddingConfig.brideInstagram}
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* 4. Countdown Timer */}
      <section className="py-20 bg-brand-gold-light border-y border-brand-gold/20 text-center">
        <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-brand-gold-dark font-bold">Menghitung Hari</span>
        <h3 className="font-serif text-3xl md:text-4xl font-light text-brand-charcoal mt-2 tracking-wide">Hari Istimewa Kami</h3>
        <Countdown targetDate={weddingConfig.marriageDate} />
      </section>

      {/* 5. Event Schedule */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-gold-dark font-bold">Agenda Momen Suci</span>
          <h3 className="font-serif text-3xl md:text-5xl font-light text-brand-charcoal mt-2 tracking-wide">Waktu & Tempat</h3>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto mt-4"></div>
        </div>

        <div className="max-w-2xl mx-auto">
          {weddingConfig.events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.9 }}
              className="bg-white border-2 border-double border-brand-gold/30 rounded-2xl p-8 md:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden text-center"
            >
              {/* Event card top accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-brand-gold"></div>
              
              <div>
                <h4 className="font-serif text-3xl font-medium text-brand-gold-dark mb-8 tracking-wide">{event.title}</h4>
                
                <div className="flex flex-col gap-6 text-sm text-brand-charcoal/80 max-w-md mx-auto">
                  <div className="flex flex-col items-center gap-1.5">
                    <Calendar size={20} className="text-brand-gold-dark mb-1" />
                    <span className="font-semibold text-xs tracking-wider uppercase text-brand-charcoal/60">Hari & Tanggal</span>
                    <span className="text-base text-brand-charcoal font-medium font-serif">{event.dateText}</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-1.5">
                    <Clock size={20} className="text-brand-gold-dark mb-1" />
                    <span className="font-semibold text-xs tracking-wider uppercase text-brand-charcoal/60">Waktu Acara</span>
                    <span className="text-base text-brand-charcoal font-medium font-serif">{event.time}</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-1.5">
                    <MapPin size={20} className="text-brand-gold-dark mb-1" />
                    <span className="font-semibold text-xs tracking-wider uppercase text-brand-charcoal/60">Lokasi Acara</span>
                    <span className="text-base text-brand-charcoal font-semibold font-serif leading-snug">{event.venue}</span>
                    <span className="text-xs text-brand-charcoal/60 leading-relaxed font-light">{event.address}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-10 max-w-sm w-full mx-auto">
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-brand-gold-dark hover:bg-brand-gold text-white text-center py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all shadow-md shadow-brand-gold/10 block"
                >
                  Buka Peta Navigasi
                </a>
                
                {/* Save to Calendar Button */}
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Shidqi+dan+Hesti&dates=20261224T010000Z/20261224T060000Z&details=Mohon+kehadiran+dan+doa+restu+Anda+pada+pernikahan+Shidqi+dan+Hesti.&location=${encodeURIComponent(event.venue + ', ' + event.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-transparent border border-brand-gold-dark text-brand-gold-dark hover:bg-brand-gold-dark hover:text-white text-center py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all block"
                >
                  Simpan Agenda Ke Kalender
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Digital Envelope / Gifts */}
      <section className="py-24 bg-brand-gold-light border-y border-brand-gold/20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold-dark">
              <Gift size={24} />
            </div>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-brand-gold-dark font-bold">Kado Pernikahan</span>
          <h3 className="font-serif text-3xl md:text-4xl font-light text-brand-charcoal mt-2 tracking-wide">Amplop Digital</h3>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto my-6"></div>
          <p className="text-sm text-brand-charcoal/70 max-w-md mx-auto leading-relaxed mb-12 font-light">
            Bagi keluarga dan kerabat yang ingin mengirimkan ucapan atau kado kasih secara digital, Anda dapat mentransfer ke rekening berikut:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto text-left mb-10">
            {weddingConfig.gifts.map((gift, idx) => (
              <div key={gift.accountNumber} className="bg-white border-2 border-double border-brand-gold/20 hover:border-brand-gold/40 rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all">
                <div>
                  <span className="text-xs uppercase tracking-widest text-brand-gold-dark font-bold font-sans">
                    {gift.bankName}
                  </span>
                  <div className="font-serif text-2xl font-medium text-brand-charcoal mt-3 tracking-wider">
                    {gift.accountNumber}
                  </div>
                  <div className="text-xs text-brand-charcoal/60 mt-1 uppercase font-semibold">
                    a.n. {gift.accountHolder}
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(gift.accountNumber, idx)}
                  className="mt-8 flex items-center justify-center gap-1.5 w-full py-3 bg-brand-champagne hover:bg-brand-gold hover:text-white border border-brand-gold/20 text-xs font-bold uppercase tracking-wider text-brand-charcoal/80 rounded-lg transition-all cursor-pointer shadow-sm"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check size={14} className="text-brand-gold-dark" />
                      Berhasil Disalin
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Salin Rekening
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white/60 border border-brand-gold/15 rounded-2xl p-6 max-w-2xl mx-auto text-left">
            <span className="text-xs uppercase tracking-widest text-brand-gold-dark font-bold font-sans block mb-1">Alamat Kirim Kado Kado Fisik</span>
            <p className="text-xs text-brand-charcoal/70 leading-relaxed font-sans">{weddingConfig.giftAddress}</p>
          </div>
        </div>
      </section>

      {/* 7. RSVP and Guestbook */}
      <section className="py-24">
        <div className="text-center mb-12">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-brand-gold-dark font-bold">Rsvp & Wishes</span>
          <h3 className="font-serif text-3xl md:text-4xl font-light text-brand-charcoal mt-2 tracking-wide">Doa Restu Tamu</h3>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto mt-4"></div>
        </div>
        <RsvpGuestbook defaultGuestName={guestName} />
      </section>

      {/* 8. Footer */}
      <footer className="bg-brand-charcoal text-brand-cream py-20 px-6 text-center relative overflow-hidden">
        {/* Luxury double border inside footer */}
        <div className="absolute inset-4 border border-brand-gold/15 pointer-events-none rounded-sm"></div>
        <div className="absolute inset-6 border-2 border-double border-brand-gold/10 pointer-events-none rounded-sm"></div>
        
        <div className="z-10 relative flex flex-col items-center gap-4">
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase opacity-75 text-brand-gold">Merupakan kehormatan bagi kami</p>
          
          <h4 className="font-serif text-4xl font-light tracking-widest text-brand-cream my-3">
            {weddingConfig.groomNick} & {weddingConfig.brideNick}
          </h4>
          
          <div className="w-16 h-[1px] bg-brand-gold/30 my-4"></div>
          
          <p className="text-[10px] font-sans opacity-50 tracking-wider">
            &copy; 2026 {weddingConfig.groomNick} & {weddingConfig.brideNick}. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
