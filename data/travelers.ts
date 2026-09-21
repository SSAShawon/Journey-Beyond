export type TravelerType = {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
  traits: string[];
};

export const travelerTypes: TravelerType[] = [
  {
    id: "explorer",
    number: "01",
    name: "The Explorer",
    tagline: "Chasing the unknown.",
    description:
      "You travel to discover what lies beyond the map. Mountains, hidden trails and places few people have seen call your name.",
    image: "/images/travelers/explorer.jpg",
    accent: "#38BDF8",
    traits: ["Adventure", "Mountains", "Wild Places"],
  },
  {
    id: "dreamer",
    number: "02",
    name: "The Dreamer",
    tagline: "Finding beauty in stillness.",
    description:
      "You believe the best journeys move slowly. Sunset skies, quiet beaches and mornings with nowhere to be are your kind of escape.",
    image: "/images/travelers/dreamer.jpg",
    accent: "#F5C76B",
    traits: ["Sunsets", "Beaches", "Slow Travel"],
  },
  {
    id: "wanderer",
    number: "03",
    name: "The Wanderer",
    tagline: "Getting lost on purpose.",
    description:
      "You follow side streets, local voices and unexpected turns. The unplanned moments are usually the ones you remember.",
    image: "/images/travelers/wanderer.jpg",
    accent: "#FF8A3D",
    traits: ["Culture", "People", "Spontaneity"],
  },
  {
    id: "seeker",
    number: "04",
    name: "The Seeker",
    tagline: "Tasting every story.",
    description:
      "For you, a destination lives through its people, traditions and flavors. Every meal and conversation becomes part of the journey.",
    image: "/images/travelers/seeker.jpg",
    accent: "#FF8A3D",
    traits: ["Food", "Culture", "Stories"],
  },
];