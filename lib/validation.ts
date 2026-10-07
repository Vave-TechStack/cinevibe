import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email address").optional().or(z.literal("")),
});

export const bookingLookupSchema = z.object({
  query: z.string().min(3, "Enter a valid Booking ID or 10-digit mobile number"),
});

export const paymentSchema = z.object({
  method: z.enum(["UPI", "CARD", "NET_BANKING", "WALLET"]),
  upiId: z.string().optional(),
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
  netBankingBank: z.string().optional(),
  walletProvider: z.string().optional(),
});

export const movieSchema = z.object({
  title: z.string().min(2, "Title is required"),
  synopsis: z.string().min(10, "Synopsis must be at least 10 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  genre: z.string().min(2, "Genre is required"),
  language: z.string().min(2, "Language is required"),
  duration: z.number().int().min(30).max(600, "Duration must be under 600 minutes"),
  certification: z.string().min(1, "Certification is required"),
  rating: z.number().min(0).max(10, "Rating must be between 0 and 10"),
  releaseDate: z.string().min(1, "Release date is required"),
  posterUrl: z.string().url("Poster URL must be a valid URL"),
  backdropUrl: z.string().url("Backdrop URL must be a valid URL"),
  trailerUrl: z.string().url("Trailer URL must be a valid URL").optional(),
  cast: z.array(z.string()).min(1, "At least one cast member is required"),
  director: z.string().min(2, "Director is required"),
  status: z.enum(["NOW_SHOWING", "COMING_SOON", "INACTIVE"]),
  featured: z.boolean(),
});

export const showSchema = z.object({
  movieId: z.string().min(1, "Movie is required"),
  screenId: z.string().min(1, "Screen is required"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Start time must be HH:MM"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "End time must be HH:MM"),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
export type BookingLookupValues = z.infer<typeof bookingLookupSchema>;
export type PaymentFormValues = z.infer<typeof paymentSchema>;
export type MovieFormValues = z.infer<typeof movieSchema>;
export type ShowFormValues = z.infer<typeof showSchema>;
