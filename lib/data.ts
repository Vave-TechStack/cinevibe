import { Movie, FoodItem, Offer, Cinema, Screen, Show } from "./types";
import { getToday, toISODate } from "./utils";

const img = (id: number, w = 400, h = 600) =>
  `https://picsum.photos/seed/cinevibe${id}/${w}/${h}`;

const backdrop = (id: number, w = 1280, h = 720) =>
  `https://picsum.photos/seed/cinevibe-bg${id}/${w}/${h}`;

export const CINEMA: Cinema = {
  id: "cinema-1",
  name: "CineVibe Grand",
  address: "14, MG Road, Brigade Metropolis",
  city: "Bengaluru",
  state: "Karnataka",
  phone: "+91 80 4567 8900",
};

export const SCREENS: Screen[] = [
  { id: "screen-1", cinemaId: "cinema-1", name: "Screen 1", capacity: 120 },
  { id: "screen-2", cinemaId: "cinema-1", name: "Screen 2", capacity: 180 },
  { id: "screen-3", cinemaId: "cinema-1", name: "Screen 3", capacity: 250 },
];

export const MOVIES: Movie[] = [
  {
    id: "movie-1",
    title: "Echoes of Eternity",
    slug: "echoes-of-eternity",
    synopsis: "A time-traveling physicist races to prevent a catastrophe that erased her from history.",
    description:
      "Dr. Anaya Rao discovers a fracture in spacetime that threatens to unravel reality itself. With the help of a rogue engineer, she must journey across parallel timelines to close the rift — before the echoes of eternity consume the present. A sweeping sci-fi epic with heart-pounding action and emotional depth.",
    genre: "Sci-Fi, Action",
    language: "English",
    duration: 152,
    certification: "U/A",
    rating: 8.7,
    releaseDate: toISODate(getToday(0)),
    posterUrl: img(101),
    backdropUrl: backdrop(101),
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    cast: ["Ananya Rao", "Vikram Singh", "Elena Moreau", "Rajesh Kumar"],
    director: "Arjun Mehta",
    status: "NOW_SHOWING",
    featured: true,
  },
  {
    id: "movie-2",
    title: "The Last Laugh",
    slug: "the-last-laugh",
    synopsis: "A retired comedian returns to the stage for one final, unforgettable show.",
    description:
      "After forty years in the spotlight, legendary comedian Mohan Das announces his farewell tour. But when an old rival resurfaces, the final show becomes a battle of wit, heart, and redemption. A laugh-out-loud dramedy that celebrates the magic of live comedy.",
    genre: "Comedy, Drama",
    language: "Hindi",
    duration: 128,
    certification: "U",
    rating: 8.2,
    releaseDate: toISODate(getToday(0)),
    posterUrl: img(102),
    backdropUrl: backdrop(102),
    cast: ["Mohan Das", "Priya Nair", "Kabir Bedi", "Sneha Reddy"],
    director: "Farah Khan",
    status: "NOW_SHOWING",
    featured: false,
  },
  {
    id: "movie-3",
    title: "Midnight Protocol",
    slug: "midnight-protocol",
    synopsis: "A cyber-thriller about a hacker who uncovers a conspiracy at midnight.",
    description:
      "When a brilliant hacker intercepts a classified transmission at exactly midnight, she is pulled into a deadly conspiracy spanning governments and corporations. Every click could be her last. A taut, stylish cyber-thriller that never lets go.",
    genre: "Thriller, Mystery",
    language: "English",
    duration: 134,
    certification: "A",
    rating: 8.9,
    releaseDate: toISODate(getToday(0)),
    posterUrl: img(103),
    backdropUrl: backdrop(103),
    cast: ["Zara Khan", "Dev Patel", "Mia Chen", "Omar Farouk"],
    director: "Nina Shah",
    status: "NOW_SHOWING",
    featured: false,
  },
  {
    id: "movie-4",
    title: "Royal Heist",
    slug: "royal-heist",
    synopsis: "A crew of charming thieves plans the perfect robbery of a royal palace.",
    description:
      "Inspired by true events, a ragtag crew of master thieves sets out to pull the impossible: stealing the legendary Star of Vijayapur from a heavily guarded royal palace. But nothing goes according to plan in this dazzling, twist-filled caper.",
    genre: "Action, Adventure",
    language: "Hindi",
    duration: 145,
    certification: "U/A",
    rating: 8.4,
    releaseDate: toISODate(getToday(0)),
    posterUrl: img(104),
    backdropUrl: backdrop(104),
    cast: ["Aryan Kapoor", "Divya Menon", "Javed Sheikh", "Riya Sen"],
    director: "Vikram Bhatt",
    status: "NOW_SHOWING",
    featured: false,
  },
  {
    id: "movie-5",
    title: "Whispers in the Wind",
    slug: "whispers-in-the-wind",
    synopsis: "A poignant love story set against the misty hills of the Western Ghats.",
    description:
      "Two strangers meet on a misty mountain train and share a single, magical evening. Years later, they search for each other across the hills they once called home. A lyrical, soul-stirring romance that lingers long after the credits roll.",
    genre: "Romance",
    language: "Kannada",
    duration: 141,
    certification: "U",
    rating: 8.6,
    releaseDate: toISODate(getToday(0)),
    posterUrl: img(105),
    backdropUrl: backdrop(105),
    cast: ["Arjun Reddy", "Meera Iyer", "Kiran Rao", "Sumanth"],
    director: "Lakshmi Prasad",
    status: "NOW_SHOWING",
    featured: false,
  },
  {
    id: "movie-6",
    title: "Galactic Guardians: Rise",
    slug: "galactic-guardians-rise",
    synopsis: "The galaxy's last hope assembles as an ancient evil awakens.",
    description:
      "When the ancient void entity Kael returns to deviver the galaxy, five unlikely heroes from distant worlds must unite as the Galactic Guardians. Epic space battles, cosmic magic, and the power of friendship collide in this blockbuster finale.",
    genre: "Sci-Fi, Fantasy",
    language: "English",
    duration: 168,
    certification: "U/A",
    rating: 9.1,
    releaseDate: toISODate(getToday(21)),
    posterUrl: img(106),
    backdropUrl: backdrop(106),
    cast: ["Chris Nova", "Gal Gadot", "Idris Elba", "Zendaya"],
    director: "James Cameron",
    status: "COMING_SOON",
    featured: false,
  },
  {
    id: "movie-7",
    title: "The Silent Court",
    slug: "the-silent-court",
    synopsis: "A deaf lawyer fights for justice in a hearing world.",
    description:
      "Based on an inspiring true story, a deaf lawyer battles prejudice and corruption to defend an innocent man in the high court. A powerful courtroom drama about dignity, determination, and the meaning of justice.",
    genre: "Drama, Legal",
    language: "Hindi",
    duration: 139,
    certification: "U/A",
    rating: 8.8,
    releaseDate: toISODate(getToday(14)),
    posterUrl: img(107),
    backdropUrl: backdrop(107),
    cast: ["Rani Mukerji", "Amitabh Bachchan", "Vicky Kaushal", "Tabu"],
    director: "Sriram Raghavan",
    status: "COMING_SOON",
    featured: false,
  },
  {
    id: "movie-8",
    title: "Neon Nights",
    slug: "neon-nights",
    synopsis: "A street racer enters the underground neon circuit to save his brother.",
    description:
      "In the neon-lit underbelly of Mumbai, a gifted street racer must win the impossible Midnight Circuit to save his brother from a dangerous syndicate. Adrenaline, style, and heart — all at 200 mph.",
    genre: "Action, Racing",
    language: "Hindi",
    duration: 132,
    certification: "U/A",
    rating: 8.3,
    releaseDate: toISODate(getToday(30)),
    posterUrl: img(108),
    backdropUrl: backdrop(108),
    cast: ["Tiger Shroff", "Nora Fatehi", "Sunny Leone", "Jackie Shroff"],
    director: "Ahmed Khan",
    status: "COMING_SOON",
    featured: false,
  },
];

export const SHOW_TIMES = ["10:00", "13:30", "16:30", "19:30", "22:30"];

export function getShowsForMovie(movieId: string): Show[] {
  const shows: Show[] = [];
  const movie = MOVIES.find((m) => m.id === movieId);
  if (!movie) return shows;
  const screens = SCREENS.slice(0, movie.id === "movie-1" ? 3 : 2);
  for (let day = 0; day < 7; day++) {
    const date = toISODate(getToday(day));
    screens.forEach((screen, si) => {
      SHOW_TIMES.forEach((time, ti) => {
        if ((day + si + ti) % 5 === 4) return;
        const [h, m] = time.split(":").map(Number);
        const endH = (h + Math.floor(movie.duration / 60)) % 24;
        const endM = (m + (movie.duration % 60)) % 60;
        shows.push({
          id: `show-${movieId}-${day}-${screen.id}-${ti}`,
          movieId,
          screenId: screen.id,
          date,
          startTime: time,
          endTime: `${endH.toString().padStart(2, "0")}:${endM.toString().padStart(2, "0")}`,
          status: "ACTIVE",
        });
      });
    });
  }
  return shows;
}

export const FOOD_ITEMS: FoodItem[] = [
  { id: "food-1", name: "Popcorn (Small)", category: "Popcorn", price: 120, description: "Freshly popped, lightly salted", imageUrl: img(201, 200, 200), available: true },
  { id: "food-2", name: "Popcorn (Medium)", category: "Popcorn", price: 180, description: "Buttery perfection, medium tub", imageUrl: img(202, 200, 200), available: true },
  { id: "food-3", name: "Popcorn (Large)", category: "Popcorn", price: 240, description: "Jumbo tub for the ultimate snack", imageUrl: img(203, 200, 200), available: true },
  { id: "food-4", name: "Coke", category: "Beverages", price: 90, description: "Ice-cold 300ml", imageUrl: img(204, 200, 200), available: true },
  { id: "food-5", name: "Pepsi", category: "Beverages", price: 90, description: "Ice-cold 300ml", imageUrl: img(205, 200, 200), available: true },
  { id: "food-6", name: "Mineral Water", category: "Beverages", price: 40, description: "Pure 500ml", imageUrl: img(206, 200, 200), available: true },
  { id: "food-7", name: "Popcorn + Coke Combo", category: "Combos", price: 260, description: "Medium popcorn + 300ml Coke", imageUrl: img(207, 200, 200), available: true },
  { id: "food-8", name: "Large Popcorn + 2 Drinks", category: "Combos", price: 420, description: "Large popcorn + two 300ml drinks", imageUrl: img(208, 200, 200), available: true },
];

export const OFFERS: Offer[] = [
  { id: "offer-1", title: "Weekend Special", description: "Flat 20% off on all tickets, Sat & Sun", discount: 20, code: "WEEKEND20", imageUrl: img(301, 600, 400), active: true },
  { id: "offer-2", title: "Student Offer", description: "15% off for students with valid ID", discount: 15, code: "STUDENT15", imageUrl: img(302, 600, 400), active: true },
  { id: "offer-3", title: "Food Combo Deal", description: "Free Coke with every large popcorn", discount: 90, code: "POPCOKE", imageUrl: img(303, 600, 400), active: true },
  { id: "offer-4", title: "Card Offer", description: "10% off on HDFC & SBI credit/debit cards", discount: 10, code: "CARD10", imageUrl: img(304, 600, 400), active: true },
];

export const SEAT_PRICES: Record<string, number> = {
  PREMIUM: 180,
  EXECUTIVE: 220,
  RECLINER: 350,
};

export const CONVENIENCE_FEE = 30;
export const GST_RATE = 0.12;
export const MAX_SEATS_PER_BOOKING = 10;
export const SEAT_LOCK_MINUTES = 5;
export const CANCELLATION_HOURS = 2;
