"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Film, Menu, X, Ticket, User, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { CINEMA } from "@/lib/data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/offers", label: "Offers" },
  { href: "/my-booking", label: "My Booking" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cinema-border/50 bg-cinema-navy/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cinema-gold to-yellow-600 shadow-lg shadow-cinema-gold/30 group-hover:shadow-cinema-gold/50 transition-shadow">
            <Film className="h-5 w-5 text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-white">
              Cine<span className="text-cinema-gold">Vibe</span>
            </span>
            <span className="hidden text-[10px] font-medium tracking-widest text-gray-500 uppercase sm:block">
              Your Movie. Your Seat. Your Experience.
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                pathname === link.href
                  ? "bg-cinema-gold/15 text-cinema-gold"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="hidden items-center gap-1.5 text-xs text-gray-400 lg:flex">
            <MapPin className="h-3.5 w-3.5 text-cinema-gold" />
            <span>{CINEMA.city}</span>
          </div>
          <Link
            href="/my-booking"
            className="flex items-center gap-2 rounded-lg bg-cinema-gold px-4 py-2 text-sm font-bold text-black transition-all hover:bg-yellow-400 shadow-lg shadow-cinema-gold/20"
          >
            <Ticket className="h-4 w-4" />
            Book Now
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-white hover:bg-white/10 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-cinema-border/50 bg-cinema-navy px-4 py-3 md:hidden animate-fade-in">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-cinema-gold/15 text-cinema-gold"
                    : "text-gray-300 hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/my-booking"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-cinema-gold px-4 py-3 text-sm font-bold text-black"
            >
              <Ticket className="h-4 w-4" />
              Book Now
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function UserMenu() {
  return (
    <div className="flex items-center gap-2">
      <User className="h-4 w-4 text-gray-400" />
      <span className="text-sm text-gray-300">Guest</span>
    </div>
  );
}

export function ContactInfo() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <Phone className="h-4 w-4 text-cinema-gold" />
      <span>{CINEMA.phone}</span>
    </div>
  );
}
