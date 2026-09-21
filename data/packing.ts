export type PackingItem = {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
};

export const packingItems: PackingItem[] = [
  {
    id: "camera",
    name: "Camera",
    category: "MEMORIES",
    icon: "📷",
    description: "For the moments you will want to remember forever.",
  },
  {
    id: "passport",
    name: "Passport",
    category: "ESSENTIAL",
    icon: "🪪",
    description: "Your little ticket to somewhere beyond the familiar.",
  },
  {
    id: "headphones",
    name: "Headphones",
    category: "JOURNEY",
    icon: "🎧",
    description: "A soundtrack for long flights and quiet roads.",
  },
  {
    id: "sunglasses",
    name: "Sunglasses",
    category: "ESSENTIAL",
    icon: "🕶️",
    description: "For chasing golden light wherever you go.",
  },
  {
    id: "journal",
    name: "Journal",
    category: "MEMORIES",
    icon: "📓",
    description: "Write down the stories that photographs cannot capture.",
  },
  {
    id: "backpack",
    name: "Day Pack",
    category: "ADVENTURE",
    icon: "🎒",
    description: "Carry only what you need for the next adventure.",
  },
];