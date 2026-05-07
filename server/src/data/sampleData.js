export const restaurants = [
  {
    name: "Spice Street",
    description: "North Indian comfort food with rich curries and fresh breads.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80",
    cuisines: ["North Indian", "Biryani", "Tandoor"],
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: 35,
    location: "Sector 18"
  },
  {
    name: "Urban Wok",
    description: "Fast Indo-Chinese bowls, noodles, and spicy starters.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80",
    cuisines: ["Chinese", "Thai", "Asian"],
    rating: 4.3,
    deliveryTime: "30-40 min",
    deliveryFee: 25,
    location: "City Center"
  },
  {
    name: "Pizza Foundry",
    description: "Stone-baked pizzas, garlic breads, and loaded sides.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    cuisines: ["Pizza", "Italian", "Fast Food"],
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: 40,
    location: "Market Road"
  },
  {
    name: "Pune Misal House",
    description: "Fiery Puneri misal, pav, poha, and breakfast favorites.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
    cuisines: ["Maharashtrian", "Breakfast", "Street Food"],
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 25,
    location: "Kothrud, Pune"
  },
  {
    name: "Koregaon Kitchen",
    description: "Cafe-style meals, wraps, biryani, and desserts from Koregaon Park.",
    image: "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=900&q=80",
    cuisines: ["Cafe", "Biryani", "Continental"],
    rating: 4.4,
    deliveryTime: "25-35 min",
    deliveryFee: 35,
    location: "Koregaon Park, Pune"
  },
  {
    name: "Hinjewadi Bowl Co.",
    description: "Quick rice bowls, noodles, and office lunch combos.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
    cuisines: ["Asian", "Bowls", "Healthy"],
    rating: 4.2,
    deliveryTime: "30-45 min",
    deliveryFee: 30,
    location: "Hinjewadi, Pune"
  }
];

export const menuByRestaurant = {
  "Spice Street": [
    ["Paneer Butter Masala", "Creamy tomato gravy with soft paneer cubes.", 249, "Main Course", true],
    ["Chicken Biryani", "Aromatic basmati rice layered with spiced chicken.", 299, "Biryani", false],
    ["Garlic Naan", "Soft tandoor naan brushed with garlic butter.", 59, "Breads", true]
  ],
  "Urban Wok": [
    ["Veg Hakka Noodles", "Wok-tossed noodles with crunchy vegetables.", 179, "Noodles", true],
    ["Chilli Chicken", "Crispy chicken tossed in chilli garlic sauce.", 249, "Starters", false],
    ["Thai Curry Bowl", "Coconut curry served with jasmine rice.", 279, "Bowls", true]
  ],
  "Pizza Foundry": [
    ["Margherita Pizza", "Classic mozzarella, tomato, and basil.", 229, "Pizza", true],
    ["Farmhouse Pizza", "Loaded with capsicum, onion, corn, and olives.", 319, "Pizza", true],
    ["Cheese Garlic Bread", "Toasted bread with cheese and garlic butter.", 149, "Sides", true]
  ],
  "Pune Misal House": [
    ["Puneri Misal Pav", "Spicy sprout curry topped with farsan and served with pav.", 129, "Breakfast", true],
    ["Kanda Poha", "Light poha with onion, peanuts, lemon, and coriander.", 89, "Breakfast", true],
    ["Sabudana Khichdi", "Classic fasting-style sabudana with peanuts and potato.", 119, "Snacks", true]
  ],
  "Koregaon Kitchen": [
    ["Paneer Tikka Wrap", "Smoky paneer tikka wrapped with salad and mint sauce.", 199, "Wraps", true],
    ["Chicken Dum Biryani", "Slow-cooked biryani with tender chicken and raita.", 289, "Biryani", false],
    ["Chocolate Brownie", "Warm brownie with rich chocolate sauce.", 149, "Desserts", true]
  ],
  "Hinjewadi Bowl Co.": [
    ["Teriyaki Veg Bowl", "Rice bowl with teriyaki vegetables and sesame.", 219, "Bowls", true],
    ["Chicken Rice Bowl", "Grilled chicken, rice, vegetables, and house sauce.", 249, "Bowls", false],
    ["Schezwan Noodles", "Spicy wok-tossed noodles with vegetables.", 189, "Noodles", true]
  ]
};
