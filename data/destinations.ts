export type Destination = {
  id: string;
  name: string;
  country: string;
  region: string;
  description: string;
  image: string;
  accent: string;
};

export const destinations: Destination[] = [
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    region: "EUROPE",
    description:
      "Where snow-covered peaks meet quiet valleys and every horizon feels endless.",
    image: "/images/destinations/swiss-alps.jpg",
    accent: "#38BDF8",
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    region: "AEGEAN SEA",
    description:
      "White villages, deep blue water and sunsets that transform the entire horizon.",
    image: "/images/destinations/santorini.jpg",
    accent: "#FF8A3D",
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "SOUTHEAST ASIA",
    description:
      "Tropical forests, ancient temples and slow mornings surrounded by the ocean.",
    image: "/images/destinations/bali.jpg",
    accent: "#F5C76B",
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "EAST ASIA",
    description:
      "Ancient streets, peaceful temples and a culture shaped by centuries of tradition.",
    image: "/images/destinations/kyoto.jpg",
    accent: "#FF8A3D",
  },
  {
    id: "patagonia",
    name: "Patagonia",
    country: "Argentina",
    region: "SOUTH AMERICA",
    description:
      "Wild mountains, endless horizons and landscapes built for the adventurous.",
    image: "/images/destinations/patagonia.jpg",
    accent: "#38BDF8",
  },
];