"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star, Clock, Globe, ArrowRight, Ticket, Popcorn, CreditCard,
  ShieldCheck, Sparkles, Volume2, Armchair, Car, UtensilsCrossed,
  ChevronRight, Flame, Calendar, MapPin,
} from "lucide-react";
import { MOVIES, OFFERS, CINEMA, SCREENS } from "@/lib/data";
import { MovieCard } from "@/components/MovieCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const facilities = [
  { icon: Sparkles, title: "Dolby Atmos", description: "Immersive 360° surround sound" },
  { icon: Armchair, title: "Recliner Seats", description: "Premium comfort seating" },
  { icon: Popcorn, title: "Food & Beverages", description: "Gourmet snacks & combos" },
  { icon: Car, title: "Free Parking", description: "Ample parking space" },
  { icon: Volume2, title: "4K Projection", description: "Crystal clear visuals" },
  { icon: ShieldCheck, title: "Secure Booking", description: "100% safe transactions" },
];

export default function HomePage() {
  const featured = MOVIES.find((m) => m.featured) ?? MOVIES[0];
  const nowShowing = MOVIES.filter((m) => m.status === "NOW_SHOWING");
  const comingSoon = MOVIES.filter((m) => m.status === "COMING_SOON");

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <MovieCard movie={featured} variant="featured" />
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-cinema-border/50 bg-cinema-dark/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4 sm:px-6">
          {[
            { value: "5+", label: "Movies Running" },
            { value: "3", label: "Premium Screens" },
            { value: "550+", label: "Seats Total" },
            { value: "4.8", label: "User Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-black text-cinema-gold sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Now Showing */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <SectionHeading
          title="Now Showing"
          subtitle="Catch the latest blockbusters on the big screen"
          actionLabel="View All Movies"
          actionHref="/movies"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {nowShowing.map((movie, i) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="border-y border-cinema-border/50 bg-cinema-dark/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <SectionHeading
            title="Coming Soon"
            subtitle="Exciting releases heading to CineVibe"
            badge="Releasing Soon"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {comingSoon.map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <SectionHeading
          title="Exclusive Offers"
          subtitle="Amazing deals on tickets, food, and more"
          actionLabel="All Offers"
          actionHref="/offers"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERS.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                href="/offers"
                className="group relative block overflow-hidden rounded-2xl border border-cinema-border transition-all hover:border-cinema-gold/40 hover:shadow-xl hover:shadow-cinema-gold/10"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={offer.imageUrl}
                    alt={offer.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cinema-navy via-cinema-navy/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Badge variant="gold" className="mb-2">
                    {offer.discount}% OFF
                  </Badge>
                  <h3 className="font-bold text-white">{offer.title}</h3>
                  <p className="mt-1 text-xs text-gray-400 line-clamp-1">{offer.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section className="border-y border-cinema-border/50 bg-cinema-dark/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <SectionHeading
            title="Cinema Facilities"
            subtitle="World-class amenities for the ultimate movie experience"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility, i) => (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group flex items-start gap-4 rounded-2xl border border-cinema-border bg-cinema-card p-5 transition-all hover:border-cinema-gold/30 hover:bg-cinema-card/80"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cinema-gold/10 transition-all group-hover:bg-cinema-gold/20">
                  <facility.icon className="h-6 w-6 text-cinema-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{facility.title}</h3>
                  <p className="mt-1 text-sm text-gray-400">{facility.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="gold" className="mb-4">About CineVibe Grand</Badge>
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              Where Every Seat is the <span className="text-cinema-gold">Best Seat</span>
            </h2>
            <p className="mt-4 text-gray-300 leading-relaxed">
              CineVibe Grand is a state-of-the-art multiplex featuring three premium screens,
              Dolby Atmos sound, 4K laser projection, and luxurious recliner seating.
              Whether it is a blockbuster premiere or an intimate indie film, we deliver
              an unforgettable cinematic experience.
            </p>
            <p className="mt-3 text-gray-400 leading-relaxed">
              Located in the heart of the city, CineVibe Grand offers seamless online booking,
              gourmet food & beverages, and free parking — all designed to make your movie night perfect.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/movies">
                <Button size="lg">
                  Explore Movies
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  <MapPin className="h-4 w-4" />
                  Find Us
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-cinema-border shadow-2xl">
              <Image
                src="https://picsum.photos/seed/cinevibe-about/800/450"
                alt="CineVibe Grand Cinema"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinema-navy/60 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-cinema-border bg-cinema-dark p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cinema-gold/20">
                  <Ticket className="h-5 w-5 text-cinema-gold" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Book in 30 seconds</p>
                  <p className="text-xs text-gray-400">Fast, easy, secure</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-cinema-gold/30 bg-gradient-to-br from-cinema-gold/10 via-cinema-card to-cinema-card p-8 text-center sm:p-12"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cinema-gold/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cinema-gold/10 blur-3xl" />
          <div className="relative">
            <Flame className="mx-auto mb-4 h-10 w-10 text-cinema-gold" />
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              Ready for Movie Night?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-300">
              Grab your favorite seats before they are gone. Book now and experience cinema like never before.
            </p>
            <Link href="/movies" className="mt-8 inline-block">
              <Button size="lg" className="h-14 px-10 text-lg">
                Book Tickets Now
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
