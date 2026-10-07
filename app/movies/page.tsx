"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Calendar, Globe, Star, Clock } from "lucide-react";
import { MOVIES } from "@/lib/data";
import { MovieCard } from "@/components/MovieCard";
import { EmptyState } from "@/components/States";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "all", label: "All Movies" },
  { id: "now", label: "Now Showing" },
  { id: "soon", label: "Coming Soon" },
];

export default function MoviesPage() {
  const [tab, setTab] = useState("all");
  const [language, setLanguage] = useState("all");
  const [genre, setGenre] = useState("all");
  const [search, setSearch] = useState("");

  const languages = useMemo(
    () => ["all", ...Array.from(new Set(MOVIES.map((m) => m.language)))],
    []
  );
  const genres = useMemo(() => {
    const allGenres = new Set<string>();
    MOVIES.forEach((m) => {
      m.genre.split(", ").forEach((g) => allGenres.add(g.trim()));
    });
    return ["all", ...Array.from(allGenres)];
  }, []);

  const filtered = useMemo(() => {
    return MOVIES.filter((movie) => {
      if (tab === "now" && movie.status !== "NOW_SHOWING") return false;
      if (tab === "soon" && movie.status !== "COMING_SOON") return false;
      if (language !== "all" && movie.language !== language) return false;
      if (genre !== "all" && !movie.genre.includes(genre)) return false;
      if (search && !movie.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [tab, language, genre, search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <SectionHeading
        title="Movies"
        subtitle="Browse all movies now showing and coming soon"
        badge="CineVibe Grand"
      />

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-xl border border-cinema-border bg-cinema-card pl-12 pr-4 text-sm text-white placeholder:text-gray-500 focus:border-cinema-gold/60 focus:outline-none focus:ring-2 focus:ring-cinema-gold/20"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold transition-all",
              tab === t.id
                ? "bg-cinema-gold text-black shadow-lg shadow-cinema-gold/20"
                : "bg-cinema-card text-gray-300 border border-cinema-border hover:border-cinema-gold/40 hover:text-white"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-lg border border-cinema-border bg-cinema-card px-3 py-2 text-sm text-white focus:border-cinema-gold/60 focus:outline-none"
          >
            {languages.map((l) => (
              <option key={l} value={l} className="bg-cinema-dark">
                {l === "all" ? "All Languages" : l}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="rounded-lg border border-cinema-border bg-cinema-card px-3 py-2 text-sm text-white focus:border-cinema-gold/60 focus:outline-none"
          >
            {genres.map((g) => (
              <option key={g} value={g} className="bg-cinema-dark">
                {g === "all" ? "All Genres" : g}
              </option>
            ))}
          </select>
        </div>
        <div className="ml-auto flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> 7 days</span>
          <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> {languages.length - 1} languages</span>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No movies found"
          description="Try adjusting your search or filters to find what you are looking for."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch("");
            setLanguage("all");
            setGenre("all");
            setTab("all");
          }}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((movie, i) => (
            <div
              key={movie.id}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-sm text-gray-500">
        Showing {filtered.length} of {MOVIES.length} movies
      </p>
    </div>
  );
}
