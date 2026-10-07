import Link from "next/link";
import { Film, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, CreditCard, ShieldCheck, RefreshCcw } from "lucide-react";
import { CINEMA } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-cinema-border/50 bg-cinema-navy">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cinema-gold to-yellow-600">
                <Film className="h-5 w-5 text-black" />
              </div>
              <span className="text-xl font-black text-white">
                Cine<span className="text-cinema-gold">Vibe</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your Movie. Your Seat. Your Experience. Premium cinema entertainment with the best seats, sound, and screens in the city.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-cinema-border text-gray-400 transition-all hover:border-cinema-gold/50 hover:text-cinema-gold"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              CineVibe Grand
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cinema-gold" />
                <span>{CINEMA.address},<br />{CINEMA.city}, {CINEMA.state}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-cinema-gold" />
                <span>{CINEMA.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-cinema-gold" />
                <span>hello@cinevibe.in</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/movies" className="hover:text-cinema-gold transition-colors">Now Showing</Link></li>
              <li><Link href="/movies" className="hover:text-cinema-gold transition-colors">Coming Soon</Link></li>
              <li><Link href="/offers" className="hover:text-cinema-gold transition-colors">Offers & Combos</Link></li>
              <li><Link href="/my-booking" className="hover:text-cinema-gold transition-colors">My Booking</Link></li>
              <li><Link href="/contact" className="hover:text-cinema-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Policies
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-cinema-gold" />
                <span>Secure Payments</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cinema-gold" />
                <span>Privacy Policy</span>
              </li>
              <li className="flex items-center gap-2">
                <RefreshCcw className="h-4 w-4 text-cinema-gold" />
                <span>Refund & Cancellation</span>
              </li>
              <li><Link href="/contact" className="hover:text-cinema-gold transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-cinema-border/50 pt-6 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} CineVibe Grand. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            DEMO VERSION — For presentation purposes only
          </p>
        </div>
      </div>
    </footer>
  );
}
