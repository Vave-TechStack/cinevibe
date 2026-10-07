"use client";

import { useState } from "react";
import { Search, Ticket, Calendar, Clock, MapPin, User, Phone, XCircle, RefreshCcw, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cinemaService } from "@/lib/services";
import { MOVIES, SCREENS, CINEMA } from "@/lib/data";
import { Booking } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/States";
import { formatDate, formatTime, formatINR } from "@/lib/utils";
import { toast } from "@/components/ui/toast";
import { bookingLookupSchema } from "@/lib/validation";

export default function MyBookingPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Booking[]>([]);
  const [searched, setSearched] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed.length < 3) {
      setError("Enter a Booking ID or 10-digit mobile number");
      return;
    }
    setError("");
    setSearched(true);

    let found: Booking[] = [];
    if (/^\d{10}$/.test(trimmed)) {
      found = cinemaService.getBookingsByMobile(trimmed);
    } else {
      const booking = cinemaService.getBooking(trimmed.toUpperCase());
      if (booking) found = [booking];
    }
    setResults(found);
    if (found.length === 0) {
      toast("info", "No bookings found", "Check your Booking ID or mobile number");
    }
  };

  const handleCancel = (bookingId: string) => {
    try {
      const result = cinemaService.cancelBooking(bookingId);
      toast("success", "Booking cancelled", `Refund of ${formatINR(result.refundAmount)} initiated`);
      setResults((prev) =>
        prev.map((b) => (b.bookingId === bookingId ? { ...result.booking } : b))
      );
      if (expandedId === bookingId) {
        setExpandedId(null);
      }
    } catch (err) {
      toast("error", "Cancellation failed", err instanceof Error ? err.message : "Please try again");
    }
  };

  const getMovieForBooking = (booking: Booking) => {
    const show = cinemaService.getShow(booking.showId);
    return {
      movie: MOVIES.find((m) => m.id === show?.movieId),
      show,
      screen: SCREENS.find((s) => s.id === show?.screenId),
    };
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="mb-2 text-2xl font-black text-white sm:text-3xl">My Booking</h1>
      <p className="mb-8 text-sm text-gray-400">
        Search and manage your bookings using your Booking ID or mobile number.
      </p>

      <div className="rounded-2xl border border-cinema-border bg-cinema-card p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Enter Booking ID (e.g., CIN202610071234) or mobile number"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="h-12 w-full rounded-xl border border-cinema-border bg-black/40 pl-12 pr-4 text-sm text-white placeholder:text-gray-500 focus:border-cinema-gold/60 focus:outline-none focus:ring-2 focus:ring-cinema-gold/20"
            />
          </div>
          <Button onClick={handleSearch} size="lg" className="h-12 px-8">
            <Search className="h-5 w-5" />
            Search
          </Button>
        </div>
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        <p className="mt-3 text-xs text-gray-500">
          Demo tip: Book a ticket first, then search with the Booking ID or the mobile number you used.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {searched && results.length === 0 && (
          <EmptyState
            title="No bookings found"
            description="We could not find any bookings matching your search. Please check your Booking ID or mobile number."
            actionLabel="Book Tickets Now"
            onAction={() => (window.location.href = "/movies")}
          />
        )}

        {results.map((booking) => {
          const { movie, show, screen } = getMovieForBooking(booking);
          const isExpanded = expandedId === booking.bookingId;
          const isCancelled = booking.status === "CANCELLED";

          return (
            <div
              key={booking.bookingId}
              className={`overflow-hidden rounded-2xl border transition-all ${
                isCancelled
                  ? "border-cinema-border/50 opacity-70"
                  : "border-cinema-border hover:border-cinema-gold/30"
              } bg-cinema-card`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : booking.bookingId)}
                className="w-full p-5 text-left"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg">
                      <img src={movie?.posterUrl} alt={movie?.title} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{movie?.title}</p>
                      <p className="mt-0.5 text-sm text-gray-400">
                        {formatDate(show?.date ?? "")} • {formatTime(show?.startTime ?? "")}
                      </p>
                      <p className="text-sm text-gray-400">
                        {screen?.name} • Seats: {booking.seats.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={isCancelled ? "red" : "green"}>
                      {booking.status}
                    </Badge>
                    <ChevronRight className={`h-5 w-5 text-gray-500 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-cinema-border/50 p-5 animate-fade-in">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 text-sm">
                      <p className="flex justify-between">
                        <span className="text-gray-400">Booking ID</span>
                        <span className="font-mono font-semibold text-white">{booking.bookingId}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-400">Transaction ID</span>
                        <span className="font-mono font-semibold text-white">{booking.transactionId}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-400">Customer</span>
                        <span className="font-semibold text-white">{booking.customerName}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-400">Mobile</span>
                        <span className="font-semibold text-white">{booking.mobile}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-400">Cinema</span>
                        <span className="font-semibold text-white">{CINEMA.name}</span>
                      </p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="flex justify-between">
                        <span className="text-gray-400">Ticket Price</span>
                        <span className="font-semibold text-white">{formatINR(booking.ticketAmount)}</span>
                      </p>
                      {booking.foodAmount > 0 && (
                        <p className="flex justify-between">
                          <span className="text-gray-400">Food & Beverage</span>
                          <span className="font-semibold text-white">{formatINR(booking.foodAmount)}</span>
                        </p>
                      )}
                      <p className="flex justify-between">
                        <span className="text-gray-400">Convenience Fee</span>
                        <span className="font-semibold text-white">{formatINR(booking.convenienceFee)}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-400">GST</span>
                        <span className="font-semibold text-white">{formatINR(booking.gst)}</span>
                      </p>
                      <p className="flex justify-between border-t border-cinema-border/50 pt-2">
                        <span className="font-bold text-white">Total Paid</span>
                        <span className="text-lg font-black text-cinema-gold">{formatINR(booking.totalAmount)}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Payment: {booking.paymentMethod} • {booking.paymentStatus}
                      </p>
                    </div>
                  </div>

                  {booking.foodItems && booking.foodItems.length > 0 && (
                    <div className="mt-4 rounded-xl border border-cinema-border/50 bg-black/20 p-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Food Items</p>
                      <div className="flex flex-wrap gap-2">
                        {booking.foodItems.map((item) => (
                          <Badge key={item.itemId} variant="outline">
                            {item.name} × {item.quantity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap gap-3">
                    {!isCancelled && (
                      <Button
                        onClick={() => handleCancel(booking.bookingId)}
                        variant="destructive"
                        size="sm"
                      >
                        <XCircle className="h-4 w-4" />
                        Cancel Booking
                      </Button>
                    )}
                    <Link href={`/confirmation/${booking.bookingId}`}>
                      <Button variant="outline" size="sm">
                        <Ticket className="h-4 w-4" />
                        View Ticket
                      </Button>
                    </Link>
                  </div>

                  {isCancelled && (
                    <p className="mt-3 text-xs text-yellow-400">
                      This booking has been cancelled. Refund initiated to the original payment method.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
