import {
  Movie, Show, ShowSeat, SeatInfo, SeatCategory, SeatStatus,
  Booking, FoodItem, FoodOrderItem, Cinema, Screen,
  PricingBreakdown, DashboardStats,
} from "./types";
import {
  MOVIES, SCREENS, CINEMA, getShowsForMovie, FOOD_ITEMS,
  SEAT_PRICES, CONVENIENCE_FEE, GST_RATE, MAX_SEATS_PER_BOOKING,
  SEAT_LOCK_MINUTES, CANCELLATION_HOURS,
} from "./data";
import {
  generateBookingId, generateTransactionId, getToday, toISODate,
} from "./utils";

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"];
const SEATS_PER_ROW = 10;

function categoryForRow(rowIndex: number): SeatCategory {
  if (rowIndex >= 8) return "RECLINER";
  if (rowIndex >= 4) return "EXECUTIVE";
  return "PREMIUM";
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function generateSeatLayout(showId: string): ShowSeat[] {
  const seats: ShowSeat[] = [];
  const seed = hashString(showId);
  ROWS.forEach((row, ri) => {
    for (let s = 1; s <= SEATS_PER_ROW; s++) {
      const seatNumber = `${row}${s}`;
      const category = categoryForRow(ri);
      const price = SEAT_PRICES[category];
      const r = (seed + ri * 31 + s * 17) % 100;
      let status: SeatStatus = "AVAILABLE";
      if (r < 12) status = "BOOKED";
      else if (r < 16) status = "BLOCKED";
      seats.push({
        showId,
        seatNumber,
        row,
        category,
        price,
        status,
      });
    }
  });
  return seats;
}

class CinemaService {
  private seatCache = new Map<string, ShowSeat[]>();
  private bookings: Booking[] = [];
  private locks = new Map<string, { seats: string[]; lockedUntil: number }>();

  getMovies(): Movie[] {
    return MOVIES;
  }

  getMovie(id: string): Movie | undefined {
    return MOVIES.find((m) => m.id === id);
  }

  getNowShowing(): Movie[] {
    return MOVIES.filter((m) => m.status === "NOW_SHOWING");
  }

  getComingSoon(): Movie[] {
    return MOVIES.filter((m) => m.status === "COMING_SOON");
  }

  getCinema(): Cinema {
    return CINEMA;
  }

  getScreens(): Screen[] {
    return SCREENS;
  }

  getScreen(id: string): Screen | undefined {
    return SCREENS.find((s) => s.id === id);
  }

  getShows(movieId: string): Show[] {
    return getShowsForMovie(movieId);
  }

  getShow(showId: string): Show | undefined {
    return this.getShowsForAllMovies().find((s) => s.id === showId);
  }

  private getShowsForAllMovies(): Show[] {
    const all: Show[] = [];
    MOVIES.forEach((m) => {
      all.push(...getShowsForMovie(m.id));
    });
    return all;
  }

  getSeats(showId: string): ShowSeat[] {
    let seats = this.seatCache.get(showId);
    if (!seats) {
      seats = generateSeatLayout(showId);
      this.seatCache.set(showId, seats);
    }
    const now = Date.now();
    return seats.map((seat) => {
      const lock = this.locks.get(`${showId}:${seat.seatNumber}`);
      if (seat.status === "AVAILABLE" && lock && lock.lockedUntil > now) {
        return { ...seat, status: "LOCKED" as SeatStatus };
      }
      if (seat.status === "LOCKED" && (!lock || lock.lockedUntil <= now)) {
        return { ...seat, status: "AVAILABLE" as SeatStatus };
      }
      return seat;
    });
  }

  lockSeats(showId: string, seatNumbers: string[]): boolean {
    const seats = this.getSeats(showId);
    const now = Date.now();
    for (const num of seatNumbers) {
      const seat = seats.find((s) => s.seatNumber === num);
      if (!seat || (seat.status !== "AVAILABLE" && seat.status !== "LOCKED")) {
        return false;
      }
      const existing = this.locks.get(`${showId}:${num}`);
      if (existing && existing.lockedUntil > now && !seatNumbers.includes(num)) {
        return false;
      }
    }
    const lockedUntil = now + SEAT_LOCK_MINUTES * 60 * 1000;
    for (const num of seatNumbers) {
      this.locks.set(`${showId}:${num}`, { seats: [num], lockedUntil });
    }
    return true;
  }

  releaseSeats(showId: string, seatNumbers: string[]): void {
    for (const num of seatNumbers) {
      this.locks.delete(`${showId}:${num}`);
    }
  }

  getPricing(seatNumbers: string[], showId: string, foodItems: FoodOrderItem[] = []): PricingBreakdown {
    const seats = this.getSeats(showId);
    const ticketAmount = seatNumbers.reduce((sum, num) => {
      const seat = seats.find((s) => s.seatNumber === num);
      return sum + (seat ? seat.price : 0);
    }, 0);
    const foodAmount = foodItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const convenienceFee = seatNumbers.length > 0 ? CONVENIENCE_FEE : 0;
    const subtotal = ticketAmount + foodAmount + convenienceFee;
    const gst = Math.round(subtotal * GST_RATE * 100) / 100;
    return {
      ticketAmount,
      foodAmount,
      convenienceFee,
      gst,
      total: Math.round((subtotal + gst) * 100) / 100,
    };
  }

  getFoodItems(): FoodItem[] {
    return FOOD_ITEMS;
  }

  createBooking(draft: {
    showId: string;
    customerName: string;
    mobile: string;
    email?: string;
    seats: string[];
    foodItems: FoodOrderItem[];
    paymentMethod: string;
  }): Booking {
    const show = this.getShow(draft.showId);
    if (!show) throw new Error("Show not found");
    if (draft.seats.length === 0) throw new Error("At least one seat is required");
    if (draft.seats.length > MAX_SEATS_PER_BOOKING) {
      throw new Error(`Maximum ${MAX_SEATS_PER_BOOKING} seats per booking`);
    }
    const seats = this.getSeats(draft.showId);
    for (const num of draft.seats) {
      const seat = seats.find((s) => s.seatNumber === num);
      if (!seat) throw new Error(`Seat ${num} not found`);
      if (seat.status === "BOOKED" || seat.status === "BLOCKED") {
        throw new Error(`Seat ${num} is not available`);
      }
    }
    const pricing = this.getPricing(draft.seats, draft.showId, draft.foodItems);
    const booking: Booking = {
      id: `booking-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      bookingId: generateBookingId(),
      showId: draft.showId,
      customerName: draft.customerName,
      mobile: draft.mobile,
      email: draft.email,
      seats: [...draft.seats],
      ticketAmount: pricing.ticketAmount,
      foodAmount: pricing.foodAmount,
      convenienceFee: pricing.convenienceFee,
      gst: pricing.gst,
      totalAmount: pricing.total,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      transactionId: generateTransactionId(),
      paymentMethod: draft.paymentMethod,
      foodItems: draft.foodItems,
      createdAt: new Date().toISOString(),
    };
    const cached = this.seatCache.get(draft.showId);
    if (cached) {
      cached.forEach((seat) => {
        if (draft.seats.includes(seat.seatNumber)) {
          seat.status = "BOOKED";
        }
      });
    }
    for (const num of draft.seats) {
      this.locks.delete(`${draft.showId}:${num}`);
    }
    this.bookings.push(booking);
    return booking;
  }

  getBooking(bookingId: string): Booking | undefined {
    return this.bookings.find((b) => b.bookingId === bookingId);
  }

  getBookingsByMobile(mobile: string): Booking[] {
    return this.bookings.filter((b) => b.mobile === mobile);
  }

  getAllBookings(): Booking[] {
    return this.bookings;
  }

  cancelBooking(bookingId: string): { booking: Booking; refundAmount: number; cancellationFee: number } {
    const booking = this.getBooking(bookingId);
    if (!booking) throw new Error("Booking not found");
    if (booking.status !== "CONFIRMED") throw new Error("Booking is not active");
    const show = this.getShow(booking.showId);
    if (!show) throw new Error("Show not found");
    const showDateTime = new Date(`${show.date}T${show.startTime}:00`);
    const hoursUntilShow = (showDateTime.getTime() - Date.now()) / (1000 * 60 * 60);
    let cancellationFee = 0;
    if (hoursUntilShow < CANCELLATION_HOURS) {
      cancellationFee = Math.round(booking.ticketAmount * 0.2 * 100) / 100;
    }
    const refundAmount = Math.round((booking.totalAmount - cancellationFee) * 100) / 100;
    booking.status = "CANCELLED";
    booking.paymentStatus = "REFUNDED";
    const cached = this.seatCache.get(booking.showId);
    if (cached) {
      cached.forEach((seat) => {
        if (booking.seats.includes(seat.seatNumber)) {
          seat.status = "AVAILABLE";
        }
      });
    }
    return { booking, refundAmount, cancellationFee };
  }

  getDashboardStats(): DashboardStats {
    const today = toISODate(getToday(0));
    const todayBookings = this.bookings.filter((b) => b.createdAt.slice(0, 10) === today);
    const todayRevenue = todayBookings.reduce((sum, b) => sum + b.totalAmount, 0);
    const ticketsSold = this.bookings.reduce((sum, b) => sum + b.seats.length, 0);
    const totalSeats = this.getShowsForAllMovies().length * 100;
    const bookedSeats = this.bookings.reduce((sum, b) => sum + b.seats.length, 0);
    return {
      totalBookings: this.bookings.length,
      todayBookings: todayBookings.length,
      todayRevenue: Math.round(todayRevenue * 100) / 100,
      ticketsSold,
      moviesRunning: this.getNowShowing().length,
      upcomingMovies: this.getComingSoon().length,
      occupancyPercent: totalSeats > 0 ? Math.round((bookedSeats / totalSeats) * 100) : 0,
    };
  }
}

export const cinemaService = new CinemaService();
