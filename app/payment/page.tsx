"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { useBooking } from "@/lib/store";
import { cinemaService } from "@/lib/services";
import { MOVIES, SCREENS, CINEMA } from "@/lib/data";
import { PaymentMethodSelector } from "@/components/PaymentMethod";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime, formatINR } from "@/lib/utils";
import { toast } from "@/components/ui/toast";
import { PaymentMethod } from "@/lib/types";

export default function PaymentPage() {
  const router = useRouter();
  const { draft, setPaymentMethod } = useBooking();
  const [method, setMethod] = useState<PaymentMethod>("UPI");
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<"form" | "processing" | "success">("form");

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
  const pricing = cinemaService.getPricing(draft.seats, draft.showId, draft.foodItems);

  const handlePay = () => {
    setPaymentMethod(method);
    setStep("processing");
    setProcessing(true);

    setTimeout(() => {
      try {
        const booking = cinemaService.createBooking({
          showId: draft.showId,
          customerName: draft.customerName,
          mobile: draft.mobile,
          email: draft.email,
          seats: draft.seats,
          foodItems: draft.foodItems,
          paymentMethod: method,
        });
        setStep("success");
        setProcessing(false);
        toast("success", "Payment successful", `Booking ${booking.bookingId} confirmed`);
        setTimeout(() => {
          router.push(`/confirmation/${booking.bookingId}`);
        }, 1500);
      } catch (error) {
        setStep("form");
        setProcessing(false);
        toast("error", "Payment failed", error instanceof Error ? error.message : "Please try again");
      }
    }, 2500);
  };

  if (step === "processing") {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <div className="relative mb-8">
          <div className="h-24 w-24 animate-spin rounded-full border-4 border-cinema-gold/20 border-t-cinema-gold" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-cinema-gold" />
          </div>
        </div>
        <h2 className="text-2xl font-black text-white">Processing Payment</h2>
        <p className="mt-2 text-gray-400">Please do not close this window...</p>
        <div className="mt-8 w-full rounded-2xl border border-cinema-border bg-cinema-card p-5 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Amount</span>
            <span className="font-bold text-white">{formatINR(pricing.total)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-gray-400">Method</span>
            <span className="font-bold text-white">{method}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-gray-400">Movie</span>
            <span className="font-bold text-white">{movie?.title}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 -ml-2 text-gray-400 hover:text-white"
        disabled={processing}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Checkout
      </Button>

      <h1 className="mb-2 text-2xl font-black text-white sm:text-3xl">Payment</h1>
      <p className="mb-8 text-sm text-gray-400">Complete your booking securely</p>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <PaymentMethodSelector
            selected={method}
            onSelect={setMethod}
            onPay={handlePay}
            amount={pricing.total}
            processing={processing}
          />
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-20 rounded-2xl border border-cinema-border bg-cinema-card p-5">
            <h3 className="mb-4 font-bold text-white">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Movie</span>
                <span className="font-semibold text-white text-right max-w-[60%] truncate">{movie?.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cinema</span>
                <span className="font-semibold text-white">{CINEMA.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Screen</span>
                <span className="font-semibold text-white">{screen?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date & Time</span>
                <span className="font-semibold text-white">
                  {formatDate(draft.date)} • {formatTime(draft.startTime)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Seats</span>
                <span className="font-semibold text-white">{draft.seats.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Customer</span>
                <span className="font-semibold text-white">{draft.customerName}</span>
              </div>
            </div>
            <div className="mt-4 space-y-2 border-t border-cinema-border/50 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Tickets</span>
                <span className="font-semibold text-white">{formatINR(pricing.ticketAmount)}</span>
              </div>
              {pricing.foodAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Food & Beverage</span>
                  <span className="font-semibold text-white">{formatINR(pricing.foodAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Convenience Fee</span>
                <span className="font-semibold text-white">{formatINR(pricing.convenienceFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">GST</span>
                <span className="font-semibold text-white">{formatINR(pricing.gst)}</span>
              </div>
              <div className="flex justify-between border-t border-cinema-border/50 pt-3">
                <span className="font-bold text-white">Total</span>
                <span className="text-xl font-black text-cinema-gold">{formatINR(pricing.total)}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-500/10 p-3 text-xs text-green-400 border border-green-500/20">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Demo payment — no real money will be charged</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
