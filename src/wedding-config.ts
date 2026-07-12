export interface WeddingEvent {
  title: string;
  time: string;
  dateText: string;
  venue: string;
  address: string;
  mapsUrl: string;
}

export interface GiftAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrCodeUrl?: string;
}

export interface WeddingConfig {
  brideName: string;
  brideNick: string;
  brideParent: string;
  brideInstagram?: string;
  groomName: string;
  groomNick: string;
  groomParent: string;
  groomInstagram?: string;
  marriageDate: string; // ISO format: YYYY-MM-DDTHH:mm:ss
  events: WeddingEvent[];
  gifts: GiftAccount[];
  giftAddress: string;
  audioUrl: string;
  quoteText: string;
  quoteSource: string;
}

export const weddingConfig: WeddingConfig = {
  brideName: "Hestiningsih, S.Si., Gr.",
  brideNick: "Hesti",
  brideParent: "Putri dari Bpk. Siswanto & Ibu Satini",
  brideInstagram: "hstining",
  groomName: "Shidqi Ramadhandy Rizqulloh, S.T.",
  groomNick: "Shidqi",
  groomParent: "Putra dari Bpk. Aan Hermawan & Ibu Yani Indra Cahyani",
  groomInstagram: "shidqy_ry",
  marriageDate: "2026-12-24T09:00:00", // 10 October 2026
  quoteText: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
  quoteSource: "QS. Ar-Rum: 21",
  events: [
    {
      title: "Akad Nikah",
      time: "09:00 - 11:30 WIB",
      dateText: "Kamis, 24 Desember 2026",
      venue: "Masjid Ramlie Musofa",
      address: "Jl. Danau Sunter Selatan No.12C - 14A, RT.13/RW.16, Sunter Agung, Kec. Tj. Priok, Jkt Utara, Daerah Khusus Ibukota Jakarta 14350",
      mapsUrl: "https://maps.app.goo.gl/koDS7Ew8MvAdxXPP7"
    }
  ],
  gifts: [
    {
      bankName: "Bank Jago",
      accountNumber: "107958236020",
      accountHolder: "Shidqi Ramadhandy Rizqulloh"
    },
    {
      bankName: "Bank BNI",
      accountNumber: "0976558012",
      accountHolder: "Hestiningsih"
    }
  ],
  giftAddress: "Gang Abadi 2 No 58, RT/RW 02/43, Ujung Harapan, Kec. Babelan, Kab Bekasi, Jawa Barat 17610 (u.p. Shidqi & Hesti)",
  audioUrl: "https://cdn.pixabay.com/download/audio/2023/07/13/audio_8b1f89defa.mp3?filename=paulyudin-romantic-wedding-157981.mp3"
};
