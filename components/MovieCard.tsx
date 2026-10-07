import Link from "next/link";
import Image from "next/image";
import { Star, Clock, Globe, Play } from "lucide-react";
import { Movie } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface MovieCardProps {
  movie: Movie;
  variant?: "default" | "compact" | "featured";
}

export function MovieCard({ movie, variant = "default" }: MovieCardProps) {
  const durationHours = Math.floor(movie.duration / 60);
  const durationMins = movie.duration % 60;
  const duration = `${durationHours}h ${durationMins}m`;

  if (variant === "featured") {
    return (
      <div className="group relative h-[520px] w-full overflow-hidden rounded-3xl">
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-navy via-cinema-navy/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-navy/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="gold">Now Showing</Badge>
            <Badge variant="outline">{movie.certification}</Badge>
            <Badge variant="outline">{movie.language}</Badge>
          </div>
          <h1 className="mb-3 text-4xl font-black text-white sm:text-6xl">
            {movie.title}
          </h1>
          <p className="mb-5 max-w-xl text-sm text-gray-300 sm:text-base line-clamp-2">
            {movie.synopsis}
          </p>
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-cinema-gold text-cinema-gold" />
              <span className="font-bold">{movie.rating}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-cinema-gold" />
              {duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-cinema-gold" />
              {movie.language}
            </span>
            <span className="text-gray-400">{movie.genre}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/movies/${movie.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cinema-gold to-yellow-500 px-7 py-3.5 text-base font-bold text-black shadow-xl shadow-cinema-gold/30 transition-all hover:from-yellow-400 hover:to-yellow-500 hover:shadow-cinema-gold/50"
            >
              <Play className="h-5 w-5 fill-black" />
              Book Tickets
            </Link>
            <Link
              href={`/movies/${movie.id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group block overflow-hidden rounded-2xl border border-cinema-border bg-cinema-card transition-all duration-300 hover:border-cinema-gold/40 hover:shadow-2xl hover:shadow-cinema-gold/10 hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-card via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge variant="gold" className="shadow-lg">
            <Star className="mr-1 h-3 w-3 fill-black" />
            {movie.rating}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-black/60 backdrop-blur-sm">
            {movie.certification}
          </Badge>
        </div>
        {movie.status === "COMING_SOON" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
            <Badge variant="gold" className="text-sm px-4 py-1.5">
              Coming Soon
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="mb-1 truncate text-base font-bold text-white group-hover:text-cinema-gold transition-colors">
          {movie.title}
        </h3>
        <p className="mb-2 text-xs text-gray-400">{movie.genre}</p>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Globe className="h-3 w-3 text-cinema-gold" />
            {movie.language}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-cinema-gold" />
            {duration}
          </span>
        </div>
        {movie.status === "NOW_SHOWING" && (
          <div className="mt-4">
            <span className="block w-full rounded-lg bg-gradient-to-r from-cinema-gold to-yellow-500 py-2.5 text-center text-sm font-bold text-black transition-all group-hover:from-yellow-400 group-hover:to-yellow-500">
              Book Now
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
