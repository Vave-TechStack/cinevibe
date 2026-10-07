"use client";

import { notFound } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { ArrowLeft, MapPin, Ticket } from "lucide-react";
import { MOVIES, SCREENS, CINEMA, getShowsForMovie } from "@/lib/data";
import { ShowSelection } from "@/components/ShowSelection";
import { Show } from "@/lib/types";
import { useBooking } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

interface ShowSelectionPageProps {
  params: Promise<{ movieId: string }>;
}

export default function ShowSelectionPage({ params }: ShowSelectionPageProps) {
  const router = useRouter();
  const { movieId } = use(params);
  const { setDraft } = useBooking();
  const movie = MOVIES.find((m) => m.id === movieId);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedScreenId, setSelectedScreenId] = useState<string | null>(null);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  if (!movie) return notFound();

  const shows = getShowsForMovie(movie.id);

  const handleShowSelect = (show: Show) => {
    setSelectedShow(show);
    const screen = SCREENS.find((s) => s.id === show.screenId);
    setDraft({
      movieId: movie.id,
      showId: show.id,
      date: show.date,
      startTime: show.startTime,
      screenId: show.screenId,
      screenName: screen?.name ?? "Screen 1",
      seats: [],
      ticketAmount: 0,
      foodItems: [],
      foodAmount: 0,
      customerName: "",
      mobile: "",
      email: "",
      paymentMethod: "UPI",
    });
    toast("success", "Show selected", "Continue to select your seats");
  };

  const handleContinue = () => {
    if (!selectedShow) {
      toast("warning", "Select a showtime", "Please choose a show time to continue");
      return;
    }
    router.push(`/seats/${selectedShow.id}`);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 -ml-2 text-gray-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </Button>

      <div className="mb-8 rounded-2xl border border-cinema-border bg-cinema-card p-5">
        <div className="flex items-center gap-4">
          <div className="relative h-24 w-18 shrink-0 overflow-hidden rounded-xl">
            <img src={movie.posterUrl} alt={movie.title} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-black text-white sm:text-2xl">{movie.title}</h1>
            <p className="mt-1 text-sm text-gray-400">
              {movie.genre} • {movie.language} • {movie.duration} min
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-400">
              <MapPin className="h-4 w-4 text-cinema-gold" />
              {CINEMA.name}, {CINEMA.city}
            </p>
          </div>
        </div>
      </div>

      <ShowSelection
        movie={movie}
        shows={shows}
        screens={SCREENS}
        selectedDate={selectedDate}
        selectedScreenId={selectedScreenId}
        selectedShow={selectedShow}
        onDateChange={setSelectedDate}
        onScreenChange={setSelectedScreenId}
        onShowSelect={handleShowSelect}
      />

      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={!selectedShow}
          size="lg"
          className="h-12 px-8"
        >
          <Ticket className="h-5 w-5" />
          Select Seats
        </Button>
      </div>
    </div>
  );
}
