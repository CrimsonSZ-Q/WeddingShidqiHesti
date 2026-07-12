import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pernikahan Shidqi & Hesti",
  description: "Undangan Online Pernikahan Shidqi & Hesti - Luxury Elegant Theme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body 
        className="min-h-full flex flex-col bg-brand-cream text-brand-charcoal font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
