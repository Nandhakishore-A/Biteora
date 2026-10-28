export const dishes = [
  // Exact 8 Signature Dishes from Mockup
  {
    name: "Chicken Biryani",
    description: "Royal slow-cooked dum biryani with marinated juicy chicken, fragrant basmati rice, saffron and aromatic spices",
    price: 249,
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 420,
    prepTime: "30 mins",
    isVeg: false,
    tag: "Bestseller",
    calories: "520 kcal"
  },
  {
    name: "Margherita Pizza",
    description: "Authentic wood-fired crust with sweet San Marzano tomato puree, fresh mozzarella and fragrant garden basil",
    price: 299,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 380,
    prepTime: "25 mins",
    isVeg: true,
    tag: "Trending",
    calories: "580 kcal"
  },
  {
    name: "Classic Burger",
    description: "Flame-grilled crispy patty topped with melted cheddar cheese, lettuce, tomato and signature secret dressing",
    price: 179,
    category: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.6,
    reviewsCount: 310,
    prepTime: "20 mins",
    isVeg: false,
    tag: "Popular",
    calories: "450 kcal"
  },
  {
    name: "Masala Dosa",
    description: "Golden crispy fermented crepe filled with spiced potato masala, served with fresh coconut chutney and piping hot sambar",
    price: 129,
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 450,
    prepTime: "20 mins",
    isVeg: true,
    tag: "Chef Special",
    calories: "320 kcal"
  },
  {
    name: "Chicken Noodles",
    description: "Wok-tossed Hakka noodles with tender shredded chicken, crunchy bell peppers, cabbage and savory soy-garlic glaze",
    price: 199,
    category: "Chinese",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.5,
    reviewsCount: 290,
    prepTime: "25 mins",
    isVeg: false,
    tag: "Must Try",
    calories: "460 kcal"
  },
  {
    name: "Samosa (2 Pcs)",
    description: "Flaky golden fried pastry pockets packed with spiced cumin potatoes and green peas, served with sweet-tangy tamarind chutney",
    price: 59,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.6,
    reviewsCount: 520,
    prepTime: "15 mins",
    isVeg: true,
    tag: "Bestseller",
    calories: "260 kcal"
  },
  {
    name: "Chocolate Cake",
    description: "Decadent multi-layered Belgian dark chocolate sponge drenched in silky chocolate ganache and chocolate curls",
    price: 149,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 390,
    prepTime: "30 mins",
    isVeg: true,
    tag: "Sweet Bite",
    calories: "380 kcal"
  },
  {
    name: "Fresh Orange Juice",
    description: "100% pure cold-pressed Valencia oranges, full of natural vitamin C with zero added sugar or preservatives",
    price: 99,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.6,
    reviewsCount: 240,
    prepTime: "15 mins",
    isVeg: true,
    tag: "Refreshing",
    calories: "110 kcal"
  },

  // Healthy Bowls (Hero feature)
  {
    name: "Delicious Healthy Bowl",
    description: "Grilled chicken breast, ripe Hass avocado, charred sweet corn, cherry tomatoes, quinoa, black beans and lime cilantro dressing",
    price: 249,
    category: "Healthy",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 360,
    prepTime: "20 mins",
    isVeg: false,
    tag: "Special Offer",
    calories: "380 kcal"
  },
  {
    name: "Mediterranean Greek Salad",
    description: "Crisp garden cucumbers, kalamata olives, cherry tomatoes, diced bell peppers, creamy Greek feta and oregano olive oil",
    price: 189,
    category: "Healthy",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 210,
    prepTime: "15 mins",
    isVeg: true,
    tag: "Superfood",
    calories: "220 kcal"
  },

  // Additional Biryani
  {
    name: "Hyderabadi Mutton Biryani",
    description: "Tender dum-cooked mutton pieces layered with long-grain saffron basmati rice, fried caramelized onions and mint",
    price: 369,
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 480,
    prepTime: "35 mins",
    isVeg: false,
    tag: "Royal Feast",
    calories: "620 kcal"
  },
  {
    name: "Lucknowi Veg Biryani",
    description: "Rich royal rice cooked with fresh seasonal vegetables, paneer cubes, cashews, raisins and rose water",
    price: 219,
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 260,
    prepTime: "25 mins",
    isVeg: true,
    tag: "Chef Special",
    calories: "440 kcal"
  },

  // Additional Pizza
  {
    name: "Fiery Pepperoni Feast",
    description: "Thin crust loaded with spicy cured pepperoni slices, hot honey drizzle, fresh mozzarella and red chili flakes",
    price: 369,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 310,
    prepTime: "25 mins",
    isVeg: false,
    tag: "Bestseller",
    calories: "690 kcal"
  },
  {
    name: "Truffle Mushroom Gourmet Pizza",
    description: "Garlic cream base with sautéed portobello and cremini mushrooms, white truffle oil and fontina cheese",
    price: 389,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 230,
    prepTime: "25 mins",
    isVeg: true,
    tag: "Gourmet",
    calories: "610 kcal"
  },

  // Additional Burger
  {
    name: "Crispy Paneer Royale Burger",
    description: "Crispy golden spiced paneer patty with creamy chipotle mayo, crunchy pickled red onions and melted cheese",
    price: 189,
    category: "Burger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 340,
    prepTime: "20 mins",
    isVeg: true,
    tag: "Popular",
    calories: "390 kcal"
  },
  {
    name: "Smoky BBQ Bacon Burger",
    description: "Double smashed patty glazed with smoky hickory BBQ sauce, applewood bacon strips and aged cheddar",
    price: 249,
    category: "Burger",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 270,
    prepTime: "20 mins",
    isVeg: false,
    tag: "Trending",
    calories: "540 kcal"
  },

  // South Indian
  {
    name: "Idli Sambar Platter (3 Pcs)",
    description: "Steaming hot fluffy rice cakes served with aromatic lentil vegetable sambar and fresh ground coconut chutney",
    price: 99,
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 310,
    prepTime: "15 mins",
    isVeg: true,
    tag: "Comfort Food",
    calories: "210 kcal"
  },
  {
    name: "Crispy Medu Vada",
    description: "Crispy golden lentil fritters with crushed black peppercorns and curry leaves, served with tomato-onion chutney",
    price: 89,
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.6,
    reviewsCount: 190,
    prepTime: "15 mins",
    isVeg: true,
    tag: "Crispy",
    calories: "280 kcal"
  },

  // Chinese
  {
    name: "Veg Schezwan Fried Rice",
    description: "Wok-tossed basmati rice with fiery Schezwan peppers, spring onions, crunchy carrots and French beans",
    price: 179,
    category: "Chinese",
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 280,
    prepTime: "20 mins",
    isVeg: true,
    tag: "Spicy",
    calories: "380 kcal"
  },
  {
    name: "Crispy Chili Paneer Dry",
    description: "Wok-charred cottage cheese cubes tossed in spicy soy-chili reduction with diced bell peppers and spring greens",
    price: 219,
    category: "Chinese",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 340,
    prepTime: "20 mins",
    isVeg: true,
    tag: "Chef Special",
    calories: "340 kcal"
  },

  // Snacks
  {
    name: "Paneer Tikka Roll",
    description: "Char-grilled spiced paneer wrapped inside warm flaky paratha with mint-coriander dip and pickled red onions",
    price: 169,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 320,
    prepTime: "15 mins",
    isVeg: true,
    tag: "Popular",
    calories: "350 kcal"
  },
  {
    name: "Crispy Spring Rolls",
    description: "Golden fried crunchy wrappers stuffed with shredded vegetables and glass noodles, served with sweet chili sauce",
    price: 139,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.6,
    reviewsCount: 210,
    prepTime: "15 mins",
    isVeg: true,
    tag: "Crunchy",
    calories: "270 kcal"
  },

  // Desserts
  {
    name: "Belgian Chocolate Waffle",
    description: "Freshly ironed crispy golden waffle smothered with warm Belgian melted dark & milk chocolate and vanilla gelato",
    price: 189,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 460,
    prepTime: "20 mins",
    isVeg: true,
    tag: "Bestseller",
    calories: "420 kcal"
  },
  {
    name: "Gulab Jamun with Ice Cream",
    description: "Warm saffron syrup-soaked milk dumplings paired with rich Madagascar vanilla bean ice cream",
    price: 119,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 310,
    prepTime: "15 mins",
    isVeg: true,
    tag: "Classic",
    calories: "320 kcal"
  },

  // Beverages
  {
    name: "Fresh Mint Lime Mojito",
    description: "Chilled sparkling soda with freshly muddled garden mint, key lime slices and cane sugar over crushed ice",
    price: 110,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 220,
    prepTime: "10 mins",
    isVeg: true,
    tag: "Refreshing",
    calories: "120 kcal"
  },
  {
    name: "Alphonso Mango Lassi",
    description: "Creamy hand-churned yogurt smoothie blended with ripe Alphonso mango pulp and cardamom dust",
    price: 129,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 340,
    prepTime: "10 mins",
    isVeg: true,
    tag: "Chef Special",
    calories: "210 kcal"
  }
];

// Fallback mapped with deterministic 24-char hex IDs
export const fallbackCatalog = dishes.map((dish, i) => {
  const hexSuffix = (i + 1).toString(16).padStart(4, "0");
  return {
    ...dish,
    _id: `66000000000000000000${hexSuffix}`,
    createdAt: new Date().toISOString()
  };
});
