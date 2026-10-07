"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Send, Navigation } from "lucide-react";
import { CINEMA, SCREENS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/SectionHeading";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <SectionHeading
        title="Contact Us"
        subtitle="We would love to hear from you. Reach out for any queries or feedback."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border border-cinema-border bg-cinema-card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
              <MapPin className="h-5 w-5 text-cinema-gold" />
              Visit Us
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cinema-gold" />
                <div>
                  <p className="font-semibold text-white">{CINEMA.name}</p>
                  <p className="text-sm text-gray-400">
                    {CINEMA.address}<br />
                    {CINEMA.city}, {CINEMA.state}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-cinema-gold" />
                <div>
                  <p className="font-semibold text-white">{CINEMA.phone}</p>
                  <p className="text-sm text-gray-400">Mon–Sun, 9:00 AM – 11:30 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-cinema-gold" />
                <div>
                  <p className="font-semibold text-white">hello@cinevibe.in</p>
                  <p className="text-sm text-gray-400">Response within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0 text-cinema-gold" />
                <div>
                  <p className="font-semibold text-white">Show Timings</p>
                  <p className="text-sm text-gray-400">10:00 AM – 11:30 PM, all days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-cinema-border bg-cinema-card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
              <Navigation className="h-5 w-5 text-cinema-gold" />
              Our Screens
            </h2>
            <div className="space-y-3">
              {SCREENS.map((screen) => (
                <div
                  key={screen.id}
                  className="flex items-center justify-between rounded-xl border border-cinema-border/50 bg-black/20 p-4"
                >
                  <div>
                    <p className="font-semibold text-white">{screen.name}</p>
                    <p className="text-xs text-gray-400">Dolby Atmos • 4K Laser</p>
                  </div>
                  <Badge variant="gold">{screen.capacity} seats</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-cinema-border bg-cinema-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
            <Send className="h-5 w-5 text-cinema-gold" />
            Send a Message
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for your message! Our team will get back to you soon. (Demo)");
            }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full Name" placeholder="John Doe" required />
              <Input label="Email" type="email" placeholder="john@example.com" required />
            </div>
            <Input label="Phone (optional)" placeholder="+91 98765 43210" />
            <Input label="Subject" placeholder="Booking query" required />
            <Textarea
              label="Message"
              placeholder="How can we help you?"
              required
              className="min-h-[150px]"
            />
            <Button type="submit" size="lg" className="w-full h-12">
              <Send className="h-5 w-5" />
              Send Message
            </Button>
          </form>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-cinema-border">
        <div className="relative h-64 sm:h-80">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cinema-gold/10 to-cinema-card">
            <div className="text-center">
              <MapPin className="mx-auto mb-3 h-10 w-10 text-cinema-gold" />
              <p className="font-bold text-white">CineVibe Grand</p>
              <p className="text-sm text-gray-400">{CINEMA.address}, {CINEMA.city}</p>
              <Link href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
                <Button variant="outline" size="sm">
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
