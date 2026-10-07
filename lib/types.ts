export type SeatStatus = "AVAILABLE" | "SELECTED" | "BOOKED" | "BLOCKED" | "LOCKED";
export type SeatCategory = "PREMIUM" | "EXECUTIVE" | "RECLINER";
export type MovieStatus = "NOW_SHOWING" | "COMING_SOON" | "INACTIVE";
export type BookingStatus = "CONFIRMED" | "CANCELLED" | "COMPLETED" | "EXPIRED";
export type PaymentStatus = "PAID" | "PENDING" | "FAILED" | "REFUNDED";
export type PaymentMethod = "UPI" | "CARD" | "NET_BANKING" | "WALLET";

export interface Movie {
  id: string;
  title: string;
  slug: string;
  synopsis: string;
  description: string;
  genre: string;
  language: string;
  duration: number;
  certification: string;
  rating: number;
  releaseDate: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl?: string;
  cast: string[];
  director: string;
  status: MovieStatus;
  featured: boolean;
}

export interface Screen {
  id: string;
  cinemaId: string;
  name: string;
  capacity: number;
}

export interface Cinema {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
}

export interface Show {
  id: string;
  movieId: string;
  screenId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "ACTIVE" | "DISABLED";
}

export interface SeatInfo {
  seatNumber: string;
  row: string;
  category: SeatCategory;
  price: number;
  status: SeatStatus;
}

export interface ShowSeat extends SeatInfo {
  showId: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  available: boolean;
}

export interface FoodOrderItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  code?: string;
  imageUrl: string;
  active: boolean;
}

export interface Booking {
  id: string;
  bookingId: string;
  showId: string;
  customerName: string;
  mobile: string;
  email?: string;
  seats: string[];
  ticketAmount: number;
  foodAmount: number;
  convenienceFee: number;
  gst: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  transactionId: string;
  paymentMethod: string;
  foodItems: FoodOrderItem[];
  createdAt: string;
  movie?: Movie;
  show?: Show;
  screen?: Screen;
  cinema?: Cinema;
}

export interface BookingDraft {
  movieId: string;
  showId: string;
  date: string;
  startTime: string;
  screenId: string;
  screenName: string;
  seats: string[];
  ticketAmount: number;
  foodItems: FoodOrderItem[];
  foodAmount: number;
  customerName: string;
  mobile: string;
  email: string;
  paymentMethod: PaymentMethod;
}

export interface PricingBreakdown {
  ticketAmount: number;
  foodAmount: number;
  convenienceFee: number;
  gst: number;
  total: number;
}

export interface DashboardStats {
  totalBookings: number;
  todayBookings: number;
  todayRevenue: number;
  ticketsSold: number;
  moviesRunning: number;
  upcomingMovies: number;
  occupancyPercent: number;
}
