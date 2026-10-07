/**
 * Prisma Seed Script for CineVibe
 *
 * This script seeds the PostgreSQL database with demo data.
 * Run with: npx prisma db seed
 *
 * Note: The demo currently uses an in-memory service layer (lib/services.ts)
 * so the app runs without a live database. This seed script is provided
 * for production readiness when PostgreSQL is available.
 *
 * To use with a real database:
 * 1. Set DATABASE_URL in .env
 * 2. Run: npx prisma db push
 * 3. Run: npx prisma db seed
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding CineVibe database...");

  // Create cinema
  const cinema = await prisma.cinema.upsert({
    where: { id: "cinema-1" },
    update: {},
    create: {
      id: "cinema-1",
      name: "CineVibe Grand",
      address: "14, MG Road, Brigade Metropolis",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      phone: "+91 80 4567 8900",
    },
  });

  // Create screens
  const screens = await Promise.all([
    prisma.screen.upsert({
      where: { id: "screen-1" },
      update: {},
      create: {
        id: "screen-1",
        cinemaId: cinema.id,
        name: "Screen 1",
        capacity: 120,
      },
    }),
    prisma.screen.upsert({
      where: { id: "screen-2" },
      update: {},
      create: {
        id: "screen-2",
        cinemaId: cinema.id,
        name: "Screen 2",
        capacity: 180,
      },
    }),
    prisma.screen.upsert({
      where: { id: "screen-3" },
      update: {},
      create: {
        id: "screen-3",
        cinemaId: cinema.id,
        name: "Screen 3",
        capacity: 250,
      },
    }),
  ]);

  // Create admin
  // NOTE: In production, hash passwords with bcrypt. For the demo seed,
  // we store a placeholder hash. Install bcryptjs and hash "admin123" for real use.
  const passwordHash =
    "$2a$10$DemoHashPlaceholderReplaceWithBcryptHashForProductionUse";

  await prisma.admin.upsert({
    where: { email: "admin@cinevibe.in" },
    update: {},
    create: {
      email: "admin@cinevibe.in",
      passwordHash,
      name: "Demo Admin",
      role: "SUPER_ADMIN",
    },
  });

  // Create food items
  const foodItems = [
    { name: "Popcorn (Small)", category: "Popcorn", price: 120, description: "Freshly popped, lightly salted" },
    { name: "Popcorn (Medium)", category: "Popcorn", price: 180, description: "Buttery perfection" },
    { name: "Popcorn (Large)", category: "Popcorn", price: 240, description: "Jumbo tub" },
    { name: "Coke", category: "Beverages", price: 90, description: "Ice-cold 300ml" },
    { name: "Pepsi", category: "Beverages", price: 90, description: "Ice-cold 300ml" },
    { name: "Mineral Water", category: "Beverages", price: 40, description: "Pure 500ml" },
    { name: "Popcorn + Coke Combo", category: "Combos", price: 260, description: "Medium popcorn + Coke" },
    { name: "Large Popcorn + 2 Drinks", category: "Combos", price: 420, description: "Large popcorn + two drinks" },
  ];

  for (const item of foodItems) {
    await prisma.foodItem.upsert({
      where: { id: `food-${foodItems.indexOf(item) + 1}` },
      update: {},
      create: {
        id: `food-${foodItems.indexOf(item) + 1}`,
        ...item,
        available: true,
      },
    });
  }

  // Create offers
  const offers = [
    { title: "Weekend Special", description: "Flat 20% off on all tickets, Sat & Sun", discount: 20, code: "WEEKEND20" },
    { title: "Student Offer", description: "15% off for students with valid ID", discount: 15, code: "STUDENT15" },
    { title: "Food Combo Deal", description: "Free Coke with every large popcorn", discount: 90, code: "POPCOKE" },
    { title: "Card Offer", description: "10% off on HDFC & SBI cards", discount: 10, code: "CARD10" },
  ];

  for (const offer of offers) {
    await prisma.offer.upsert({
      where: { id: `offer-${offers.indexOf(offer) + 1}` },
      update: {},
      create: {
        id: `offer-${offers.indexOf(offer) + 1}`,
        ...offer,
        active: true,
      },
    });
  }

  console.log("Database seeded successfully!");
  console.log("Admin email: admin@cinevibe.in");
  console.log("Admin password: admin123 (DEMO ONLY)");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
