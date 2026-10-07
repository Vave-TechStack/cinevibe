"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, User, Phone, Mail, UtensilsCrossed, Ticket, MapPin, Clock, Calendar } from "lucide-react";
import { useBooking } from "@/lib/store";
import { cinemaService } from "@/lib/services";
import { MOVIES, SCREENS, CINEMA, FOOD_ITEMS } from "@/lib/data";
import { BookingSummary } from "@/components/BookingSummary";
import { FoodSelector } from "@/components/FoodSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { customerSchema } from "@/lib/validation";
import { formatDate, formatTime, formatINR } from "@/lib/utils";
import { toast } from "@/components/ui/toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { draft, setCustomer, setFood, updateDraft } = useBooking();
  const [name, setName] = useState(draft?.customerName ?? "");
  const [mobile, setMobile] = useState(draft?.mobile ?? "");
  const [email, setEmail] = useState(draft?.email ?? "");
  const [foodItems, setFoodItems] = useState(draft?.foodItems ?? []);
  const [errors, setErrors] = useState<{ name?: string; mobile?: string; email?: string }>({});

  if (!draft) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-black text-white">No booking in progress</h1>
        <p className="mt-2 text-gray-400">Please select a movie and seats first.</p>
        <Button onClick={() => router.push("/movies")} className="mt-6">
          Browse Movies
        </Button>
      </div>
    );
  }

  const movie = MOVIES.find((m) => m.id === draft.movieId);
  const screen = SCREENS.find((s) => s.id === draft.screenId);
  const show = cinemaService.getShow(draft.showId);
  const seats = cinemaService.getSeats(draft.showId);
  const pricing = cinemaService.getPricing(draft.seats, draft.showId, foodItems);

  const handleValidate = () => {
    const result = customerSchema.safeParse({ name, mobile, email });
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field as keyof typeof errors] = err.message;
      });
      setErrors(fieldErrors);
      toast("error", "Validation failed", "Please check your details");
      return false;
    }
    setErrors({});
    return true;
  };

  const handleContinue = () => {
    if (draft.seats.length === 0) {
      toast("error", "No seats selected", "Please go back and select seats");
      return;
    }
    if (!handleValidate()) return;
    setCustomer(name, mobile, email);
    setFood(foodItems);
    updateDraft({ foodItems, foodAmount: pricing.foodAmount });
    router.push("/payment");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 -ml-2 text-gray-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Seats
      </Button>

      <h1 className="mb-8 text-2xl font-black text-white sm:text-3xl">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Booking details */}
          <div className="rounded-2xl border border-cinema-border bg-cinema-card p-5">
            <h2 className="mb-4 flex items-center gap-2 font-bold text-white">
              <Ticket className="h-5 w-5 text-cinema-gold" />
              Booking Details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg">
                  <img src={movie?.posterUrl} alt={movie?.title} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-white">{movie?.title}</p>
                  <p className="mt-1 text-sm text-gray-400">{movie?.genre}</p>
                  <p className="mt-1 text-sm text-gray-400">{movie?.language}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-gray-300">
                  <MapPin className="h-4 w-4 text-cinema-gold" />
                  {CINEMA.name} — {screen?.name}
                </p>
                <p className="flex items-center gap-2 text-gray-300">
                  <Calendar className="h-4 w-4 text-cinema-gold" />
                  {formatDate(draft.date)}
                </p>
                <p className="flex items-center gap-2 text-gray-300">
                  <Clock className="h-4 w-4 text-cinema-gold" />
                  {formatTime(draft.startTime)}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {draft.seats.map((seat) => (
                    <span
                      key={seat}
                      className="rounded-md bg-cinema-gold/20 px-2 py-0.5 text-xs font-bold text-cinema-gold border border-cinema-gold/30"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Customer details */}
          <div className="rounded-2xl border border-cinema-border bg-cinema-card p-5">
            <h2 className="mb-4 flex items-center gap-2 font-bold text-white">
              <User className="h-5 w-5 text-cinema-gold" />
              Customer Details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Full Name *"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
              />
              <Input
                label="Mobile Number *"
                placeholder="9876543210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                error={errors.mobile}
                maxLength={10}
              />
              <Input
                label="Email Address (optional)"
                placeholder="john@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                className="sm:col-span-2"
              />
            </div>
          </div>

          {/* Food & Beverage */}
          <div className="rounded-2xl border border-cinema-border bg-cinema-card p-5">
            <h2 className="mb-4 flex items-center gap-2 font-bold text-white">
              <UtensilsCrossed className="h-5 w-5 text-cinema-gold" />
              Food & Beverage <span className="text-xs font-normal text-gray-500">(Optional)</span>
            </h2>
            <FoodSelector
              items={FOOD_ITEMS}
              selectedItems={foodItems}
              onChange={setFoodItems}
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <BookingSummary
              movieTitle={movie?.title ?? ""}
              cinemaName={CINEMA.name}
              screenName={screen?.name ?? "Screen 1"}
              date={formatDate(draft.date)}
              time={formatTime(draft.startTime)}
              seats={draft.seats}
              foodItems={foodItems}
              pricing={pricing}
              onContinue={handleContinue}
              continueLabel="Proceed to Payment"
              disabled={draft.seats.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
