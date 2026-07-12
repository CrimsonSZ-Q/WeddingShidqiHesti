"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  hari: number;
  jam: number;
  menit: number;
  detik: number;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hari: 0, jam: 0, menit: 0, detik: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) return { hari: 0, jam: 0, menit: 0, detik: 0 };

      return {
        hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
        jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
        menit: Math.floor((difference / 1000 / 60) % 60),
        detik: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTime());

    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isMounted) return null; // Avoid hydration mismatch

  const timeItems = [
    { label: "Hari", value: timeLeft.hari },
    { label: "Jam", value: timeLeft.jam },
    { label: "Menit", value: timeLeft.menit },
    { label: "Detik", value: timeLeft.detik },
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-6 my-8">
      {timeItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm border border-brand-gold/20 rounded-xl p-3 md:p-5 w-20 md:w-24 shadow-sm"
        >
          <span className="font-serif text-2xl md:text-3xl font-light text-brand-gold-dark">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="font-sans text-[10px] md:text-xs tracking-wider uppercase text-brand-charcoal/60 mt-1">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
