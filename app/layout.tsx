import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/lib/store";
import { ToastProvider } from "@/components/ui/toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CineVibe — Book Movie Tickets Online | Your Movie. Your Seat. Your Experience.",
    template: "%s | CineVibe",
  },
  description:
    "Book movie tickets online at CineVibe Grand. View now showing movies, upcoming releases, showtimes, select your seats, and enjoy a premium cinema experience.",
  keywords: ["movie tickets", "cinema", "booking", "movies", "showtimes", "CineVibe"],
  authors: [{ name: "CineVibe" }],
  openGraph: {
    title: "CineVibe — Book Movie Tickets Online",
    description: "Your Movie. Your Seat. Your Experience.",
    type: "website",
    url: "https://cinevibe.in",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0E27",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} min-h-screen bg-cinema-navy font-sans text-white`}
      >
        <BookingProvider>
          <ToastProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ToastProvider>
        </BookingProvider>
      </body>
    </html>
  );
}
