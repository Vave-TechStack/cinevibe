# CineVibe — Cinema Ticket Booking Platform

**Your Movie. Your Seat. Your Experience.**

A complete, production-quality cinema ticket booking DEMO application built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Prisma.

> ⚠️ **DEMO VERSION** — This is a demonstration build. Payments are simulated; no real money is charged. No real SMS/WhatsApp/email is sent.

---

## Features

### Public Website
- **Home** — Hero movie, Now Showing, Coming Soon, Offers, Facilities, About
- **Movies** — Searchable/filterable movie listing (language, genre, status)
- **Movie Details** — Poster, backdrop, cast, director, showtimes
- **Show Selection** — Date picker (7 days), screen selector, showtime cards
- **Seat Selection** — Interactive cinema seat map with 4 seat states and 3 categories
- **Checkout** — Customer details form with Zod validation, food & beverage ordering
- **Demo Payment** — UPI / Card / Net Banking / Wallet (simulated)
- **Booking Confirmation** — Ticket with QR code, download/print/email actions
- **My Booking** — Search by Booking ID or mobile number, cancellation
- **Offers** — Promo codes with copy-to-clipboard
- **Contact** — Cinema info, screens, contact form

### Seat Map
- **States:** Available, Selected, Booked, Blocked, Locked
- **Categories:** Premium (₹180), Executive (₹220), Recliner (₹350)
- **Rules:** Max 10 seats/booking, 5-minute seat lock, dynamic pricing

### Booking Flow
- Unique Booking ID: `CIN + YYYYMMDD + random`
- Unique Transaction ID: `TXN + YYYYMMDD + random`
- Pricing: Tickets + Food + Convenience Fee (₹30) + GST (12%)
- Cancellation: Free until 2 hours before show, then 20% fee

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 19, TypeScript (strict) |
| Styling | Tailwind CSS, shadcn/ui-style components |
| Animation | Framer Motion |
| Icons | Lucide React |
| Forms | React Hook Form, Zod |
| Database | Prisma ORM + PostgreSQL (schema ready) |
| QR Code | qrcode |

---

## Project Structure

```
D:\MovieHub
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout (providers, header, footer)
│   ├── page.tsx              # Home
│   ├── movies/page.tsx       # Movies listing
│   ├── movies/[id]/page.tsx  # Movie details
│   ├── show/[movieId]/page.tsx      # Show selection
│   ├── seats/[showId]/page.tsx      # Seat selection
│   ├── checkout/page.tsx     # Checkout
│   ├── payment/page.tsx      # Demo payment
│   ├── confirmation/[bookingId]/page.tsx  # Ticket
│   ├── my-booking/page.tsx   # Booking lookup
│   ├── offers/page.tsx       # Offers
│   └── contact/page.tsx      # Contact
├── components/
│   ├── ui/                   # Reusable primitives (Button, Card, Badge, Input, Modal, Toast...)
│   ├── Header.tsx, Footer.tsx
│   ├── MovieCard.tsx, SeatMap.tsx, BookingSummary.tsx
│   ├── ShowSelection.tsx, FoodSelector.tsx
│   ├── PaymentMethod.tsx, QRCode.tsx, States.tsx
│   └── SectionHeading.tsx
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   ├── data.ts               # Demo movies, screens, food, offers
│   ├── services.ts           # In-memory cinema service (booking, seats, locking)
│   ├── store.tsx             # React Context booking draft store
│   ├── validation.ts         # Zod schemas
│   └── utils.ts              # Helpers (formatting, ID generation)
├── prisma/
│   ├── schema.prisma         # Full Prisma schema (14 models)
│   └── seed.ts               # Database seed script
└── package.json
```

---

## Setup Instructions

### Prerequisites
- Node.js 18+ (tested on v24)
- npm 9+
- PostgreSQL 14+ (optional — the demo runs without it)

### Install

```bash
cd D:\MovieHub
npm install
```

### Environment

Copy `.env.example` to `.env` (already done). The only required variable for the demo is none — the app runs fully on in-memory demo data.

For production with PostgreSQL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/moviehub"
```

### Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

### Production Build

```bash
npm run build
npm start
```

### Database (optional, for production)

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

---

## Validation & Build Results

| Check | Result |
|-------|--------|
| TypeScript (`tsc --noEmit`) | ✅ Passed — 0 errors |
| ESLint (`npx eslint .`) | ✅ Passed — 0 errors |
| Production build (`next build`) | ✅ Passed — 11 routes compiled |
| Page smoke tests | ✅ All 10 public routes return HTTP 200 |

---

## Demo Data

- **5 Now Showing movies** + **3 Coming Soon** (fictional titles)
- **3 screens** (120 / 180 / 250 seats)
- **100 seats per show** (10 rows × 10 seats)
- **7 days of showtimes** (5 shows/day per screen)
- **8 food & beverage items**
- **4 offers** with promo codes

---

## Demo Flow

1. **Home** → click a movie card
2. **Movie Details** → "Book Tickets"
3. **Show Selection** → pick date, screen, time → "Select Seats"
4. **Seat Selection** → click seats (A4, A5) → "Continue to Checkout"
5. **Checkout** → enter name, mobile, email → add popcorn → "Proceed to Payment"
6. **Demo Payment** → choose method, enter test details → "Pay"
7. **Confirmation** → booking confirmed with QR ticket
8. **My Booking** → search by Booking ID or mobile → view/cancel

---

## Security Notes (Demo)

- All input validated with Zod schemas
- SQL-injection-safe by design (Prisma parameterized queries when DB is connected)
- No secrets exposed; `.env` holds only local config
- Passwords are hashed (bcrypt) in the seed script
- Demo payment explicitly labeled — no real gateway integration

---

## Future Production Integrations (architecture-ready)

Razorpay/Razorpay UPI, real QR scanner, SMS/WhatsApp/email (Twilio/SendGrid), multi-branch/multi-city cinemas, real-time seat locking (Redis/WebSockets), membership/loyalty, coupons, wallet, corporate bookings, POS integration, GST invoices, refund processing, staff/manager RBAC, analytics, cloud deployment.

---

## License

Demo/MVP for customer presentation. Not for production use.
