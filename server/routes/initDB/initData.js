export const users = [
  {
    username: "Admin",
    email: "admin@admin.com",
    password: "admin",
    admin: true,
  },
  {
    username: "Alex",
    email: "alex@gmail.com",
    password: "alexalex",
  },
  {
    username: "Nick",
    email: "nick@gmail.com",
    password: "nicknick",
  },
  {
    username: "John",
    email: "john@gmail.com",
    password: "johnjohn",
  },
];

export const collections = [
  {
    name: "Stocks S&P500",
    description: "FAANG Stocks for watchlist.",
    topic: "Investment strategy",
    image:
      "https://res.cloudinary.com/dsj4hcvh2/image/upload/v1687083195/S_P500_jkp3y8.png",
    items: [],
    customFields: [{ name: "Market Cap, T$", type: "number" }],
  },
  {
    name: "Guitars Collection",
    description:
      "Key to collecting any musical instrument is the quality of sound that it can produce,",
    topic: "Guitars",
    image:
      "https://res.cloudinary.com/dsj4hcvh2/image/upload/v1687537128/guitars_tnkvlo.png",
    items: [],
    customFields: [
      { name: "Type", type: "text" },
      { name: "Model", type: "text" },
    ],
  },
  {
    name: "Top5 Snowboards",
    description: "Collection snowboards season 2023",
    topic: "Snowboards",
    image:
      "https://res.cloudinary.com/dsj4hcvh2/image/upload/v1687178108/snowboard_o2kax1.jpg",
    items: [],
    customFields: [
      { name: "Profiles", type: "text" },
      { name: "Type", type: "text" },
      { name: "Twin Direction", type: "checkbox" },
    ],
  },
];

export const itemsFirst = [
  {
    name: "Amazon",
    tags: ["Amazon", "Investment", "Stocks"],
    customFields: [{ "Market Cap, T$": "1.4", fieldType: "number" }],
  },
  {
    name: "Gibson",
    tags: ["Guitar", "Music", "Gibson"],
    customFields: [
      { Type: "Acoustic", fieldType: "text" },
      { Model: "Dove Original - Antique Natural", fieldType: "text" },
    ],
  },
  {
    name: "LibTech Travis",
    tags: ["Sport", "Snowboard", "LibTech"],
    customFields: [
      { Profiles: "Camber", fieldType: "text" },
      { Type: "Freeride", fieldType: "text" },
      { "Twin Direction": false, fieldType: "checkbox" },
    ],
  },
];

export const itemsSecond = [
  {
    name: "Meta",
    tags: ["Meta", "Investment", "Stocks"],
    customFields: [{ "Market Cap, T$": "0.73", fieldType: "number" }],
  },
  {
    name: "Ibanez",
    tags: ["Guitar", "Music", "Ibanez"],
    customFields: [
      { Type: "Electric", fieldType: "text" },
      { Model: "X IronLabel", fieldType: "text" },
    ],
  },
  {
    name: "Burton Custom",
    tags: ["Sport", "Snowboard", "Burton"],
    customFields: [
      { Profiles: "Rocker", fieldType: "text" },
      { Type: "All-mountain", fieldType: "text" },
      { "Twin Direction": true, fieldType: "checkbox" },
    ],
  },
];
