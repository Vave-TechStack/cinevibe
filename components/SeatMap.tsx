"use client";

import { useMemo } from "react";
import { Monitor, Armchair, Lock, Ban } from "lucide-react";
import { ShowSeat, SeatCategory, SeatStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SeatMapProps {
  seats: ShowSeat[];
  selectedSeats: string[];
  onSeatToggle: (seatNumber: string) => void;
  maxSeats?: number;
}

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"];
const SEATS_PER_ROW = 10;

const categoryStyles: Record<SeatCategory, { available: string; selected: string; label: string }> = {
  PREMIUM: {
    available: "bg-white/15 border-white/30 hover:bg-cinema-gold/40 hover:border-cinema-gold",
    selected: "bg-cinema-gold border-cinema-gold text-black",
    label: "Premium",
  },
  EXECUTIVE: {
    available: "bg-blue-500/20 border-blue-400/40 hover:bg-blue-400/50 hover:border-blue-300",
    selected: "bg-blue-400 border-blue-300 text-black",
    label: "Executive",
  },
  RECLINER: {
    available: "bg-purple-500/20 border-purple-400/40 hover:bg-purple-400/50 hover:border-purple-300",
    selected: "bg-purple-400 border-purple-300 text-black",
    label: "Recliner",
  },
};

const statusStyles: Record<SeatStatus, string> = {
  AVAILABLE: "",
  SELECTED: "",
  BOOKED: "bg-red-500/25 border-red-500/40 cursor-not-allowed opacity-60",
  BLOCKED: "bg-gray-500/25 border-gray-500/40 cursor-not-allowed opacity-40",
  LOCKED: "bg-yellow-500/25 border-yellow-500/40 cursor-not-allowed opacity-60",
};

export function SeatMap({ seats, selectedSeats, onSeatToggle, maxSeats = 10 }: SeatMapProps) {
  const seatMap = useMemo(() => {
    const map = new Map<string, ShowSeat>();
    seats.forEach((seat) => map.set(seat.seatNumber, seat));
    return map;
  }, [seats]);

  const handleSeatClick = (seat: ShowSeat) => {
    if (seat.status === "BOOKED" || seat.status === "BLOCKED" || seat.status === "LOCKED") return;
    const isSelected = selectedSeats.includes(seat.seatNumber);
    if (!isSelected && selectedSeats.length >= maxSeats) return;
    onSeatToggle(seat.seatNumber);
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-2 flex items-center gap-2 text-cinema-gold">
          <Monitor className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-[0.3em]">Screen</span>
        </div>
        <div className="h-2 w-full max-w-md rounded-full bg-gradient-to-r from-transparent via-cinema-gold/60 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.4)]" />
        <div className="mt-1 h-1 w-full max-w-md rounded-full bg-cinema-gold/20" />
      </div>

      <div className="mx-auto max-w-2xl space-y-2">
        {ROWS.map((row, rowIndex) => (
          <div key={row} className="flex items-center justify-center gap-1.5 sm:gap-2">
            <span className="w-6 text-center text-xs font-bold text-gray-500">{row}</span>
            <div className="flex gap-1.5 sm:gap-2">
              {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
                const seatNumber = `${row}${i + 1}`;
                const seat = seatMap.get(seatNumber);
                if (!seat) return null;
                const isSelected = selectedSeats.includes(seatNumber);
                const category = categoryStyles[seat.category];
                const isDisabled =
                  seat.status === "BOOKED" || seat.status === "BLOCKED" || seat.status === "LOCKED";
                const isLimitReached =
                  !isSelected && selectedSeats.length >= maxSeats;

                return (
                  <button
                    key={seatNumber}
                    onClick={() => handleSeatClick(seat)}
                    disabled={isDisabled || isLimitReached}
                    title={`${seatNumber} - ${category.label} ₹${seat.price} - ${seat.status}`}
                    className={cn(
                      "relative flex h-8 w-8 items-center justify-center rounded-lg border text-[10px] font-bold transition-all duration-150 sm:h-9 sm:w-9 sm:text-xs",
                      isSelected
                        ? category.selected
                        : category.available,
                      statusStyles[seat.status],
                      isLimitReached && "opacity-40 cursor-not-allowed",
                      !isDisabled && !isSelected && "active:scale-90",
                      isSelected && "shadow-lg shadow-cinema-gold/30 scale-105"
                    )}
                    aria-label={`Seat ${seatNumber}, ${category.label}, ${seat.status}`}
                  >
                    {seat.status === "BOOKED" && <Ban className="h-3 w-3 text-red-400" />}
                    {seat.status === "BLOCKED" && <Lock className="h-3 w-3 text-gray-500" />}
                    {seat.status === "LOCKED" && <Lock className="h-3 w-3 text-yellow-400" />}
                    {(seat.status === "AVAILABLE" || isSelected) && seatNumber}
                  </button>
                );
              })}
            </div>
            <span className="w-6 text-center text-xs font-bold text-gray-500">{row}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {(["PREMIUM", "EXECUTIVE", "RECLINER"] as SeatCategory[]).map((cat) => (
          <div key={cat} className="flex items-center gap-2">
            <div
              className={cn(
                "h-4 w-4 rounded border",
                cat === "PREMIUM" && "bg-white/15 border-white/30",
                cat === "EXECUTIVE" && "bg-blue-500/20 border-blue-400/40",
                cat === "RECLINER" && "bg-purple-500/20 border-purple-400/40"
              )}
            />
            <span className="text-xs text-gray-400">
              {categoryStyles[cat].label}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border bg-cinema-gold border-cinema-gold" />
          <span className="text-xs text-gray-400">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border bg-red-500/25 border-red-500/40" />
          <span className="text-xs text-gray-400">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border bg-gray-500/25 border-gray-500/40" />
          <span className="text-xs text-gray-400">Blocked</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
        <Armchair className="h-3.5 w-3.5" />
        <span>Click a seat to select. Click again to deselect. Max {maxSeats} seats per booking.</span>
      </div>
    </div>
  );
}
