export type Taste = {
  id: string;
  name: string;
  country: string;
  region: string;
  description: string;
  image: string;
  accent: string;
};

export const tastes: Taste[] = [
  {
    id: "sushi",
    name: "Sushi",
    country: "Japan",
    region: "EAST ASIA",
    description:
      "Delicate flavors, precise craft and centuries of tradition served in every bite.",
    image: "/images/taste/sushi.jpg",
    accent: "#38BDF8",
  },
  {
    id: "pizza",
    name: "Neapolitan Pizza",
    country: "Italy",
    region: "SOUTHERN EUROPE",
    description:
      "Wood-fired dough, fresh ingredients and the unmistakable soul of Naples.",
    image: "/images/taste/pizza.jpg",
    accent: "#FF8A3D",
  },
  {
    id: "pad-thai",
    name: "Pad Thai",
    country: "Thailand",
    region: "SOUTHEAST ASIA",
    description:
      "A balance of sweet, sour, salty and spicy flavors found in the heart of Bangkok.",
    image: "/images/taste/pad-thai.jpg",
    accent: "#F5C76B",
  },
  {
    id: "croissant",
    name: "Croissant",
    country: "France",
    region: "WESTERN EUROPE",
    description:
      "Golden layers, buttery aroma and the simple pleasure of a Parisian morning.",
    image: "/images/taste/croissant.jpg",
    accent: "#F5C76B",
  },
];