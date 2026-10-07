"use client";

import { notFound } from "next/navigation";
import { useState, useMemo, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, MapPin, AlertCircle, Timer } from "lucide-react";
import { MOVIES, SCREENS, CINEMA, SEAT_PRICES, MAX_SEATS_PER_BOOKING } from "@/lib/data";
import { cinemaService } from "@/lib/services";
import { SeatMap } from "@/components/SeatMap";
import { BookingSummary } from "@/components/BookingSummary";
import { useBooking } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatTime, formatINR } from "@/lib/utils";
import { toast } from "@/components/ui/toast";

interface SeatSelectionPageProps {
  params: Promise<{ showId: string }>;
}

export default function SeatSelectionPage({ params }: SeatSelectionPageProps) {
  const router = useRouter();
  const { showId } = use(params);
  const { draft, setSeats, setFood, updateDraft } = useBooking();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [foodItems, setFoodItems] = useState(draft?.foodItems ?? []);
  const [lockTimer, setLockTimer] = useState<number | null>(null);

  const show = useMemo(() => cinemaService.getShow(showId), [showId]);
  const movie = show ? MOVIES.find((m) => m.id === show.movieId) : undefined;
  const screen = show ? SCREENS.find((s) => s.id === show.screenId) : undefined;
  const seats = useMemo(() => cinemaService.getSeats(showId), [showId]);

  useEffect(() => {
    if (!draft || draft.showId !== showId) {
      if (show && movie) {
        updateDraft({
          movieId: movie.id,
          showId: show.id,
          date: show.date,
          startTime: show.startTime,
          screenId: show.screenId,
          screenName: screen?.name ?? "Screen 1",
        });
      }
    }
  }, [draft, showId, show, movie, screen, updateDraft]);

  useEffect(() => {
    if (selectedSeats.length > 0) {
      cinemaService.lockSeats(showId, selectedSeats);
      setLockTimer(300);
    } else {
      cinemaService.releaseSeats(showId, []);
      setLockTimer(null);
    }
    return () => {
      cinemaService.releaseSeats(showId, selectedSeats);
    };
  }, [selectedSeats, showId]);

  useEffect(() => {
    if (lockTimer === null) return;
    if (lockTimer <= 0) {
      setSelectedSeats([]);
      setLockTimer(null);
      toast("warning", "Seat lock expired", "Your selected seats were released");
      return;
    }
    const t = setTimeout(() => setLockTimer((v) => (v === null ? null : v - 1)), 1000);
    return () => clearTimeout(t);
  }, [lockTimer]);

  if (!show || !movie) return notFound();

  const handleSeatToggle = (seatNumber: string) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((s) => s !== seatNumber);
      }
      if (prev.length >= MAX_SEATS_PER_BOOKING) {
        toast("warning", "Seat limit reached", `Maximum ${MAX_SEATS_PER_BOOKING} seats per booking`);
        return prev;
      }
      return [...prev, seatNumber];
    });
  };

  const pricing = cinemaService.getPricing(selectedSeats, showId, foodItems);

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      toast("warning", "No seats selected", "Please select at least one seat");
      return;
    }
    setSeats(selectedSeats);
    setFood(foodItems);
    updateDraft({
      seats: selectedSeats,
      foodItems,
      foodAmount: pricing.foodAmount,
      ticketAmount: pricing.ticketAmount,
    });
    router.push("/checkout");
  };

  const selectedSeatDetails = seats.filter((s) => selectedSeats.includes(s.seatNumber));
  const totalTicketPrice = selectedSeatDetails.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 -ml-2 text-gray-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Showtimes
      </Button>

      <div className="mb-6 rounded-2xl border border-cinema-border bg-cinema-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-lg">
              <img src={movie.posterUrl} alt={movie.title} className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white sm:text-xl">{movie.title}</h1>
              <p className="mt-0.5 text-sm text-gray-400">
                {screen?.name} • {CINEMA.name}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-gray-400">
                <Clock className="h-3.5 w-3.5 text-cinema-gold" />
                {formatDate(show.date)} • {formatTime(show.startTime)}
              </p>
            </div>
          </div>
          {lockTimer !== null && (
            <Badge variant="gold" className="px-3 py-1.5">
              <Timer className="mr-1.5 h-3.5 w-3.5" />
              Seats locked: {Math.floor(lockTimer / 60)}:{(lockTimer % 60).toString().padStart(2, "0")}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-cinema-border bg-cinema-card p-5 sm:p-6">
            <h2 className="mb-6 text-lg font-bold text-white">Select Your Seats</h2>
            <SeatMap
              seats={seats}
              selectedSeats={selectedSeats}
              onSeatToggle={handleSeatToggle}
              maxSeats={MAX_SEATS_PER_BOOKING}
            />
          </div>

          {/* Price legend */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {Object.entries(SEAT_PRICES).map(([cat, price]) => (
              <div
                key={cat}
                className="rounded-xl border border-cinema-border bg-cinema-card p-3 text-center"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{cat}</p>
                <p className="mt-1 text-lg font-black text-cinema-gold">{formatINR(price)}</p>
              </div>
            ))}
          </div>

          {selectedSeats.length > 0 && (
            <div className="mt-4 rounded-xl border border-cinema-gold/30 bg-cinema-gold/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Selected Seats ({selectedSeats.length})
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selectedSeats.sort().map((seat) => (
                      <button
                        key={seat}
                        onClick={() => handleSeatToggle(seat)}
                        className="rounded-md bg-cinema-gold/20 px-2.5 py-1 text-xs font-bold text-cinema-gold border border-cinema-gold/40 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40 transition-all"
                        title="Click to remove"
                      >
                        {seat} ✕
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Ticket Price</p>
                  <p className="text-xl font-black text-cinema-gold">{formatINR(totalTicketPrice)}</p>
                </div>
              </div>
            </div>
          )}

          {selectedSeats.length === 0 && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-cinema-border bg-cinema-card/50 p-4 text-sm text-gray-400">
              <AlertCircle className="h-4 w-4 shrink-0 text-cinema-gold" />
              <span>Click on any available seat to select it. Booked and blocked seats cannot be selected.</span>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <BookingSummary
              movieTitle={movie.title}
              cinemaName={CINEMA.name}
              screenName={screen?.name ?? "Screen 1"}
              date={formatDate(show.date)}
              time={formatTime(show.startTime)}
              seats={selectedSeats}
              foodItems={foodItems}
              pricing={pricing}
              onContinue={handleContinue}
              continueLabel="Continue to Checkout"
              disabled={selectedSeats.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
