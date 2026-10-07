"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { use } from "react";
import {
  Star, Clock, Globe, Calendar, Users, Clapperboard, Play,
  ChevronRight, Ticket, Share2, Heart,
} from "lucide-react";
import { MOVIES, getShowsForMovie, SCREENS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "@/lib/utils";

interface MovieDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const { id } = use(params);
  const movie = MOVIES.find((m) => m.id === id);
  if (!movie) return notFound();

  const shows = getShowsForMovie(movie.id);
  const todayShows = shows.filter((s) => s.date === new Date().toISOString().slice(0, 10));
  const durationHours = Math.floor(movie.duration / 60);
  const durationMins = movie.duration % 60;

  return (
    <div className="animate-fade-in">
      {/* Backdrop hero */}
      <section className="relative h-[400px] sm:h-[500px]">
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-navy via-cinema-navy/70 to-cinema-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-navy/80 via-transparent to-transparent" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 pb-10 sm:flex-row sm:items-end sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative shrink-0"
          >
            <div className="relative h-[280px] w-[200px] overflow-hidden rounded-2xl border-2 border-cinema-gold/30 shadow-2xl sm:h-[340px] sm:w-[240px]">
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
          >
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge variant="gold">{movie.status === "NOW_SHOWING" ? "Now Showing" : "Coming Soon"}</Badge>
              <Badge variant="outline">{movie.certification}</Badge>
              <Badge variant="outline">{movie.language}</Badge>
            </div>
            <h1 className="text-3xl font-black text-white sm:text-5xl">
              {movie.title}
            </h1>
            <p className="mt-2 text-lg text-gray-300">{movie.synopsis}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-cinema-gold text-cinema-gold" />
                <span className="font-bold text-white">{movie.rating}</span>
                <span className="text-gray-500">/10</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-cinema-gold" />
                {durationHours}h {durationMins}m
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-cinema-gold" />
                {movie.language}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-cinema-gold" />
                {formatDate(movie.releaseDate)}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {movie.status === "NOW_SHOWING" && (
                <Link href={`/show/${movie.id}`}>
                  <Button size="lg" className="h-12 px-8">
                    <Ticket className="h-5 w-5" />
                    Book Tickets
                  </Button>
                </Link>
              )}
              <Button size="lg" variant="outline" className="h-12 px-8">
                <Play className="h-5 w-5" />
                Watch Trailer
              </Button>
              <Button size="lg" variant="ghost" className="h-12 w-12 px-0">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="ghost" className="h-12 w-12 px-0">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="mb-3 text-xl font-bold text-white">About the Movie</h2>
              <p className="text-gray-300 leading-relaxed">{movie.description}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-cinema-border bg-cinema-card p-5">
                <h3 className="mb-3 flex items-center gap-2 font-bold text-white">
                  <Users className="h-5 w-5 text-cinema-gold" />
                  Cast
                </h3>
                <ul className="space-y-2">
                  {movie.cast.map((actor) => (
                    <li key={actor} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="h-6 w-6 rounded-full bg-cinema-gold/20" />
                      {actor}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-cinema-border bg-cinema-card p-5">
                <h3 className="mb-3 flex items-center gap-2 font-bold text-white">
                  <Clapperboard className="h-5 w-5 text-cinema-gold" />
                  Director
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="h-6 w-6 rounded-full bg-cinema-gold/20" />
                  {movie.director}
                </div>
                <div className="mt-4 space-y-2 border-t border-cinema-border/50 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Genre</span>
                    <span className="font-semibold text-white">{movie.genre}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Language</span>
                    <span className="font-semibold text-white">{movie.language}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Duration</span>
                    <span className="font-semibold text-white">
                      {durationHours}h {durationMins}m
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Certification</span>
                    <span className="font-semibold text-white">{movie.certification}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Showtimes sidebar */}
          <div>
            <div className="rounded-2xl border border-cinema-border bg-cinema-card p-5">
              <h3 className="mb-4 flex items-center gap-2 font-bold text-white">
                <Calendar className="h-5 w-5 text-cinema-gold" />
                Today's Showtimes
              </h3>
              {todayShows.length === 0 ? (
                <p className="text-sm text-gray-400">No shows today.</p>
              ) : (
                <div className="space-y-3">
                  {SCREENS.map((screen) => {
                    const screenShows = todayShows.filter((s) => s.screenId === screen.id);
                    if (screenShows.length === 0) return null;
                    return (
                      <div key={screen.id}>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          {screen.name}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {screenShows.map((show) => (
                            <Link
                              key={show.id}
                              href={`/seats/${show.id}`}
                              className="rounded-lg border border-cinema-border bg-black/30 px-3 py-2 text-sm font-bold text-white transition-all hover:border-cinema-gold/50 hover:bg-cinema-gold/10 hover:text-cinema-gold"
                            >
                              {formatTime(show.startTime)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {movie.status === "NOW_SHOWING" && (
                <Link href={`/show/${movie.id}`} className="mt-5 block">
                  <Button className="w-full">
                    View All Showtimes
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
