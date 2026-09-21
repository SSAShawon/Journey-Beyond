export type Stay = {
  id: string;
  name: string;
  location: string;
  category: string;
  description: string;
  image: string;
  price: string;
  accent: string;
};

export const stays: Stay[] = [
  {
    id: "amalfi-retreat",
    name: "Amalfi Retreat",
    location: "AMALFI COAST, ITALY",
    category: "CLIFFSIDE ESCAPE",
    description:
      "A quiet sanctuary carved into the cliffs, overlooking the endless Mediterranean.",
    image: "/images/stays/amalfi-retreat.jpg",
    price: "$420 / NIGHT",
    accent: "#FF8A3D",
  },
  {
    id: "bali-jungle-villa",
    name: "Jungle Villa",
    location: "UBUD, BALI",
    category: "TROPICAL HIDEAWAY",
    description:
      "Wake among emerald forests, private pools and the slow rhythm of island life.",
    image: "/images/stays/bali-jungle-villa.jpg",
    price: "$280 / NIGHT",
    accent: "#F5C76B",
  },
  {
    id: "alpine-lodge",
    name: "Alpine Lodge",
    location: "ZERMATT, SWITZERLAND",
    category: "MOUNTAIN RETREAT",
    description:
      "Warm interiors, snowy peaks and a front-row seat to the quiet beauty of the Alps.",
    image: "/images/stays/alpine-lodge.jpg",
    price: "$360 / NIGHT",
    accent: "#38BDF8",
  },
];