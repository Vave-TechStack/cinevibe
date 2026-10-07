"use client";

import { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { Show, Movie, Screen } from "@/lib/types";
import { formatDate, formatTime, getDayLabel, getToday, toISODate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ShowSelectionProps {
  movie: Movie;
  shows: Show[];
  screens: Screen[];
  selectedDate: string;
  selectedScreenId: string | null;
  selectedShow: Show | null;
  onDateChange: (date: string) => void;
  onScreenChange: (screenId: string) => void;
  onShowSelect: (show: Show) => void;
}

export function ShowSelection({
  movie,
  shows,
  screens,
  selectedDate,
  selectedScreenId,
  selectedShow,
  onDateChange,
  onScreenChange,
  onShowSelect,
}: ShowSelectionProps) {
  const [dateOffset, setDateOffset] = useState(0);
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = getToday(i);
    return { iso: toISODate(d), label: getDayLabel(d), date: d };
  });

  useEffect(() => {
    if (!selectedDate && dates[0]) {
      onDateChange(dates[0].iso);
    }
  }, []);

  const dateShows = shows.filter((s) => s.date === selectedDate);
  const groupedByScreen = screens
    .map((screen) => ({
      screen,
      shows: dateShows.filter((s) => s.screenId === screen.id),
    }))
    .filter((g) => g.shows.length > 0);

  const activeScreenId = selectedScreenId ?? groupedByScreen[0]?.screen.id ?? null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
          <Calendar className="h-5 w-5 text-cinema-gold" />
          Select Date
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dates.map((d) => (
            <button
              key={d.iso}
              onClick={() => onDateChange(d.iso)}
              className={cn(
                "flex min-w-[80px] flex-col items-center rounded-xl border px-4 py-3 transition-all",
                selectedDate === d.iso
                  ? "border-cinema-gold bg-cinema-gold/15 text-cinema-gold shadow-lg shadow-cinema-gold/10"
                  : "border-cinema-border bg-cinema-card text-gray-300 hover:border-cinema-gold/40 hover:bg-white/5"
              )}
            >
              <span className="text-xs font-medium text-gray-400">{d.label}</span>
              <span className="text-2xl font-black">{d.date.getDate()}</span>
              <span className="text-xs text-gray-400">
                {d.date.toLocaleDateString("en-IN", { month: "short" })}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
          <MapPin className="h-5 w-5 text-cinema-gold" />
          Select Screen
        </h2>
        <div className="flex flex-wrap gap-2">
          {groupedByScreen.map(({ screen }) => (
            <button
              key={screen.id}
              onClick={() => onScreenChange(screen.id)}
              className={cn(
                "rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all",
                activeScreenId === screen.id
                  ? "border-cinema-gold bg-cinema-gold/15 text-cinema-gold"
                  : "border-cinema-border bg-cinema-card text-gray-300 hover:border-cinema-gold/40 hover:bg-white/5"
              )}
            >
              {screen.name}
              <span className="ml-2 text-xs text-gray-500">({screen.capacity} seats)</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
          <Clock className="h-5 w-5 text-cinema-gold" />
          Show Times — {formatDate(selectedDate)}
        </h2>
        {groupedByScreen
          .filter((g) => g.screen.id === activeScreenId)
          .map(({ screen, shows: screenShows }) => (
            <div key={screen.id} className="mb-6">
              <p className="mb-3 text-sm font-semibold text-gray-400">{screen.name}</p>
              {screenShows.length === 0 ? (
                <p className="text-sm text-gray-500">No shows available for this date.</p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                  {screenShows.map((show) => (
                    <button
                      key={show.id}
                      onClick={() => onShowSelect(show)}
                      className={cn(
                        "group rounded-xl border p-4 text-center transition-all",
                        selectedShow?.id === show.id
                          ? "border-cinema-gold bg-cinema-gold/15 shadow-lg shadow-cinema-gold/10"
                          : "border-cinema-border bg-cinema-card hover:border-cinema-gold/50 hover:bg-white/5 hover:-translate-y-0.5"
                      )}
                    >
                      <span
                        className={cn(
                          "block text-lg font-black",
                          selectedShow?.id === show.id ? "text-cinema-gold" : "text-white"
                        )}
                      >
                        {formatTime(show.startTime)}
                      </span>
                      <span className="mt-1 block text-xs text-gray-400">
                        to {formatTime(show.endTime)}
                      </span>
                      <span className="mt-2 inline-block rounded-md bg-green-500/15 px-2 py-0.5 text-[10px] font-bold text-green-400 border border-green-500/30">
                        FASTEST
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        {groupedByScreen.length === 0 && (
          <div className="rounded-xl border border-cinema-border bg-cinema-card p-8 text-center">
            <p className="text-gray-400">No shows available for this date.</p>
            <p className="mt-1 text-sm text-gray-500">Try selecting a different date.</p>
          </div>
        )}
      </div>
    </div>
  );
}
