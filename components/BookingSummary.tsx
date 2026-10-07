"use client";

import { Ticket, UtensilsCrossed, Receipt, CreditCard, ArrowRight } from "lucide-react";
import { PricingBreakdown, FoodOrderItem } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BookingSummaryProps {
  movieTitle: string;
  cinemaName: string;
  screenName: string;
  date: string;
  time: string;
  seats: string[];
  foodItems: FoodOrderItem[];
  pricing: PricingBreakdown;
  onContinue: () => void;
  continueLabel?: string;
  disabled?: boolean;
}

export function BookingSummary({
  movieTitle,
  cinemaName,
  screenName,
  date,
  time,
  seats,
  foodItems,
  pricing,
  onContinue,
  continueLabel = "Proceed to Checkout",
  disabled = false,
}: BookingSummaryProps) {
  return (
    <div className="rounded-2xl border border-cinema-border bg-cinema-card p-5 shadow-xl">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
        <Receipt className="h-5 w-5 text-cinema-gold" />
        Booking Summary
      </h3>

      <div className="mb-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Movie</span>
          <span className="font-semibold text-white text-right max-w-[60%] truncate">{movieTitle}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Cinema</span>
          <span className="font-semibold text-white">{cinemaName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Screen</span>
          <span className="font-semibold text-white">{screenName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Date</span>
          <span className="font-semibold text-white">{date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Time</span>
          <span className="font-semibold text-white">{time}</span>
        </div>
      </div>

      <div className="mb-4 rounded-xl border border-cinema-border/50 bg-black/30 p-3">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
          <Ticket className="h-4 w-4 text-cinema-gold" />
          Seats ({seats.length})
        </div>
        {seats.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {seats.map((seat) => (
              <span
                key={seat}
                className="rounded-md bg-cinema-gold/20 px-2 py-1 text-xs font-bold text-cinema-gold border border-cinema-gold/30"
              >
                {seat}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500">No seats selected</p>
        )}
      </div>

      {foodItems.length > 0 && (
        <div className="mb-4 rounded-xl border border-cinema-border/50 bg-black/30 p-3">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
            <UtensilsCrossed className="h-4 w-4 text-cinema-gold" />
            Food & Beverage
          </div>
          <div className="space-y-1.5">
            {foodItems.map((item) => (
              <div key={item.itemId} className="flex justify-between text-xs">
                <span className="text-gray-300">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-semibold text-white">
                  {formatINR(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2 border-t border-cinema-border/50 pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Ticket Price</span>
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
          <span className="text-gray-400">GST (12%)</span>
          <span className="font-semibold text-white">{formatINR(pricing.gst)}</span>
        </div>
        <div className="flex justify-between border-t border-cinema-border/50 pt-3">
          <span className="font-bold text-white">Total Amount</span>
          <span className="text-xl font-black text-cinema-gold">{formatINR(pricing.total)}</span>
        </div>
      </div>

      <Button
        onClick={onContinue}
        disabled={disabled || seats.length === 0}
        className="mt-5 w-full h-12 text-base"
        size="lg"
      >
        {continueLabel}
        <ArrowRight className="h-5 w-5" />
      </Button>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-500">
        <CreditCard className="h-3.5 w-3.5" />
        <span>Secure checkout • 100% demo payment</span>
      </div>
    </div>
  );
}
