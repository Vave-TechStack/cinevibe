"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { use } from "react";
import {
  CheckCircle2, Download, Printer, Mail, Home, Ticket,
  MapPin, Clock, Calendar, User, Phone, QrCode, Share2,
} from "lucide-react";
import { cinemaService } from "@/lib/services";
import { MOVIES, SCREENS, CINEMA } from "@/lib/data";
import { QRCode } from "@/components/QRCode";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime, formatINR } from "@/lib/utils";
import { toast } from "@/components/ui/toast";

interface ConfirmationPageProps {
  params: Promise<{ bookingId: string }>;
}

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { bookingId } = use(params);
  const booking = cinemaService.getBooking(bookingId);
  if (!booking) return notFound();

  const movie = MOVIES.find((m) => m.id === (cinemaService.getShow(booking.showId)?.movieId ?? ""));
  const show = cinemaService.getShow(booking.showId);
  const screen = SCREENS.find((s) => s.id === show?.screenId);

  const ticketData = JSON.stringify({
    bookingId: booking.bookingId,
    transactionId: booking.transactionId,
    movie: movie?.title,
    cinema: CINEMA.name,
    screen: screen?.name,
    date: show?.date,
    time: show?.startTime,
    seats: booking.seats,
    customer: booking.customerName,
    mobile: booking.mobile,
    total: booking.totalAmount,
  });

  const handleDownload = () => {
    const content = `
CINEVIBE GRAND — MOVIE TICKET
=============================
Booking ID:    ${booking.bookingId}
Transaction:   ${booking.transactionId}

Movie:         ${movie?.title}
Cinema:        ${CINEMA.name}
Screen:        ${screen?.name}
Date:          ${show?.date}
Time:          ${show?.startTime}
Seats:         ${booking.seats.join(", ")}

Customer:      ${booking.customerName}
Mobile:        ${booking.mobile}
Email:         ${booking.email ?? "-"}

Tickets:       ${formatINR(booking.ticketAmount)}
Food:          ${formatINR(booking.foodAmount)}
Convenience:   ${formatINR(booking.convenienceFee)}
GST:           ${formatINR(booking.gst)}
TOTAL PAID:    ${formatINR(booking.totalAmount)}

Payment:       ${booking.paymentMethod} (${booking.paymentStatus})
Status:        ${booking.status}

Thank you for booking with CineVibe!
    `.trim();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CineVibe-Ticket-${booking.bookingId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast("success", "Ticket downloaded", "Your ticket has been saved");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    const subject = `CineVibe Ticket — ${booking.bookingId}`;
    const body = encodeURIComponent(`Your CineVibe booking details:\n\nBooking ID: ${booking.bookingId}\nMovie: ${movie?.title}\nDate: ${show?.date} at ${show?.startTime}\nSeats: ${booking.seats.join(", ")}\nTotal: ${formatINR(booking.totalAmount)}`);
    window.location.href = `mailto:${booking.email ?? ""}?subject=${subject}&body=${body}`;
    toast("info", "Email client opened", "Your ticket details are ready to send");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 border border-green-500/40">
          <CheckCircle2 className="h-10 w-10 text-green-400" />
        </div>
        <h1 className="text-3xl font-black text-white sm:text-4xl">Booking Confirmed!</h1>
        <p className="mt-2 text-gray-400">
          Your tickets have been booked successfully. Show this ticket at the counter.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Badge variant="green" className="px-3 py-1.5 text-sm">
            Booking ID: {booking.bookingId}
          </Badge>
          <Badge variant="outline" className="px-3 py-1.5 text-sm">
            TXN: {booking.transactionId}
          </Badge>
        </div>
      </motion.div>

      {/* Ticket */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 overflow-hidden rounded-3xl border border-cinema-gold/30 bg-cinema-card shadow-2xl"
      >
        <div className="bg-gradient-to-r from-cinema-gold/20 via-cinema-card to-cinema-card px-6 py-4 border-b border-cinema-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ticket className="h-5 w-5 text-cinema-gold" />
              <span className="font-black text-white">CINEVIBE GRAND</span>
            </div>
            <Badge variant="gold">ADMIT {booking.seats.length}</Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-3">
          <div className="border-b border-cinema-border/50 p-6 md:border-b-0 md:border-r">
            <div className="relative mb-4 aspect-[2/3] w-32 overflow-hidden rounded-xl">
              <img src={movie?.posterUrl} alt={movie?.title} className="h-full w-full object-cover" />
            </div>
            <h2 className="text-xl font-black text-white">{movie?.title}</h2>
            <p className="mt-1 text-sm text-gray-400">{movie?.genre}</p>
            <p className="text-sm text-gray-400">{movie?.language} • {movie?.duration} min</p>
          </div>

          <div className="border-b border-cinema-border/50 p-6 md:border-b-0 md:border-r">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Cinema</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-white">
                  <MapPin className="h-4 w-4 text-cinema-gold" />
                  {CINEMA.name}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">{CINEMA.address}, {CINEMA.city}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Screen</p>
                <p className="mt-1 text-sm font-semibold text-white">{screen?.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Date & Time</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-white">
                  <Calendar className="h-4 w-4 text-cinema-gold" />
                  {formatDate(show?.date ?? "")}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-white">
                  <Clock className="h-4 w-4 text-cinema-gold" />
                  {formatTime(show?.startTime ?? "")}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Seats</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {booking.seats.map((seat) => (
                    <span
                      key={seat}
                      className="rounded-lg bg-cinema-gold px-2.5 py-1 text-sm font-black text-black"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col items-center">
              <div className="rounded-2xl border border-cinema-border bg-white p-3">
                <QRCode value={ticketData} size={160} />
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
                <QrCode className="h-3.5 w-3.5" />
                Scan at entry
              </p>
            </div>

            <div className="mt-6 space-y-2 border-t border-cinema-border/50 pt-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-cinema-gold" />
                <span className="text-gray-400">Name:</span>
                <span className="font-semibold text-white">{booking.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-cinema-gold" />
                <span className="text-gray-400">Mobile:</span>
                <span className="font-semibold text-white">{booking.mobile}</span>
              </div>
              <div className="flex justify-between border-t border-cinema-border/50 pt-3">
                <span className="font-bold text-white">Total Paid</span>
                <span className="text-xl font-black text-cinema-gold">{formatINR(booking.totalAmount)}</span>
              </div>
              <p className="text-xs text-gray-500">
                Paid via {booking.paymentMethod} • {booking.paymentStatus}
              </p>
            </div>
          </div>
        </div>

        {booking.foodItems && booking.foodItems.length > 0 && (
          <div className="border-t border-cinema-border/50 bg-black/20 px-6 py-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Food & Beverage
            </p>
            <div className="flex flex-wrap gap-2">
              {booking.foodItems.map((item) => (
                <Badge key={item.itemId} variant="outline">
                  {item.name} × {item.quantity}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        <Button onClick={handleDownload} variant="outline" className="h-12">
          <Download className="h-4 w-4" />
          Download
        </Button>
        <Button onClick={handlePrint} variant="outline" className="h-12">
          <Printer className="h-4 w-4" />
          Print
        </Button>
        <Button onClick={handleEmail} variant="outline" className="h-12">
          <Mail className="h-4 w-4" />
          Email
        </Button>
        <Link href="/" className="contents">
          <Button className="h-12">
            <Home className="h-4 w-4" />
            Home
          </Button>
        </Link>
      </motion.div>

      <div className="mt-6 flex justify-center gap-4">
        <Link href="/my-booking" className="text-sm font-semibold text-cinema-gold hover:text-yellow-400 transition-colors">
          View My Bookings
        </Link>
        <Link href="/movies" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
          Book More Movies
        </Link>
      </div>
    </div>
  );
}
