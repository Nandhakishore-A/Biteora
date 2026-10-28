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
  },
  {
    name: "Iced Caramel Macchiato",
    description: "Freshly pulled espresso poured over cold velvety milk, vanilla syrup and rich buttery caramel drizzle",
    price: 139,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 195,
    prepTime: "10 mins",
    isVeg: true,
    tag: "Barista Pick",
    calories: "180 kcal"
  },
  {
    name: "Royal Kesar Badam Milk",
    description: "Slow-simmered whole milk infused with Kashmiri saffron strands, crushed almonds, pistachios and green cardamom",
    price: 119,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 160,
    prepTime: "10 mins",
    isVeg: true,
    tag: "Traditional",
    calories: "220 kcal"
  },

  // Expanded Biryani
  {
    name: "Hyderabadi Mutton Dum Biryani",
    description: "Tender pieces of goat meat marinated in spiced yogurt and browned onions, dum cooked with royal long-grain basmati rice",
    price: 349,
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 520,
    prepTime: "35 mins",
    isVeg: false,
    tag: "Chef Special",
    calories: "620 kcal"
  },
  {
    name: "Paneer Tikka Biryani",
    description: "Clay-oven roasted malai paneer cubes tossed in aromatic biryani masala, layered with saffron basmati rice",
    price: 219,
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 290,
    prepTime: "25 mins",
    isVeg: true,
    tag: "Popular",
    calories: "480 kcal"
  },

  // Expanded Pizza
  {
    name: "Farmhouse Veggie Supreme Pizza",
    description: "Loaded with bell peppers, baby corn, black olives, red onions and garden mushrooms over melted mozzarella",
    price: 279,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 360,
    prepTime: "25 mins",
    isVeg: true,
    tag: "Bestseller",
    calories: "540 kcal"
  },
  {
    name: "Smoky BBQ Chicken Pizza",
    description: "Tender shredded chicken glazed in honey BBQ sauce, smoked gouda, red onion slices and fresh cilantro",
    price: 329,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 410,
    prepTime: "25 mins",
    isVeg: false,
    tag: "Chef Special",
    calories: "610 kcal"
  },

  // Expanded Burger
  {
    name: "Truffle Mushroom Swiss Burger",
    description: "Savory sautéed cremini mushrooms with Swiss cheese melt, black truffle mayo and crisp butter lettuce on a brioche bun",
    price: 219,
    category: "Burger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 280,
    prepTime: "20 mins",
    isVeg: true,
    tag: "Gourmet",
    calories: "490 kcal"
  },
  {
    name: "Peri Peri Crispy Chicken Burger",
    description: "Extra crunchy golden chicken breast tossed in African bird's eye chili dust with spicy garlic aioli and crunchy slaw",
    price: 199,
    category: "Burger",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 330,
    prepTime: "20 mins",
    isVeg: false,
    tag: "Trending",
    calories: "510 kcal"
  },

  // Expanded South Indian
  {
    name: "Ghee Podi Idli Platter (4 Pcs)",
    description: "Steamed fluffy rice cakes tossed in pure desi ghee and spicy gun powder masala, served with coconut chutney",
    price: 99,
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 460,
    prepTime: "15 mins",
    isVeg: true,
    tag: "Must Try",
    calories: "240 kcal"
  },
  {
    name: "Medu Vada Sambar Combo (3 Pcs)",
    description: "Crispy golden lentil fritters seasoned with crushed black pepper, curry leaves and ginger, served with piping hot sambar",
    price: 89,
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 380,
    prepTime: "15 mins",
    isVeg: true,
    tag: "Classic",
    calories: "280 kcal"
  },

  // Expanded Chinese
  {
    name: "Schezwan Chicken Fried Rice",
    description: "Wok-fried Jasmine rice with juicy chicken bites, scrambled eggs, bell peppers and fiery homemade Schezwan sauce",
    price: 189,
    category: "Chinese",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 260,
    prepTime: "20 mins",
    isVeg: false,
    tag: "Popular",
    calories: "490 kcal"
  },
  {
    name: "Crispy Chilli Paneer Dry",
    description: "Golden fried cottage cheese cubes tossed with garlic, green chilies, bell peppers and tangy dark soy reduction",
    price: 179,
    category: "Chinese",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 320,
    prepTime: "15 mins",
    isVeg: true,
    tag: "Chef Special",
    calories: "380 kcal"
  },

  // Expanded Snacks
  {
    name: "Dahi Puri Chaat Explosion (6 Pcs)",
    description: "Crispy puffed puris filled with boiled potatoes and chickpeas, smothered in chilled beaten sweet yogurt and tamarind chutney",
    price: 79,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 420,
    prepTime: "10 mins",
    isVeg: true,
    tag: "Street Favorite",
    calories: "210 kcal"
  },
  {
    name: "Loaded Cheesy Corn Nachos",
    description: "Stone-ground corn tortilla chips baked with sweet corn kernels, jalapenos, melted cheddar and fresh tomato salsa",
    price: 149,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.6,
    reviewsCount: 230,
    prepTime: "15 mins",
    isVeg: true,
    tag: "Crunchy",
    calories: "390 kcal"
  },

  // Expanded Desserts
  {
    name: "Classic New York Cheesecake",
    description: "Dense and velvety cream cheese filling baked on a golden buttery graham cracker crust, topped with fresh strawberry compote",
    price: 169,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 440,
    prepTime: "10 mins",
    isVeg: true,
    tag: "Bestseller",
    calories: "360 kcal"
  },
  {
    name: "Warm Molten Choco Lava Cake",
    description: "Individual dark chocolate cake baked with a flowing center of melted ganache, served with dusted icing sugar",
    price: 129,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 390,
    prepTime: "15 mins",
    isVeg: true,
    tag: "Chef Special",
    calories: "410 kcal"
  },

  // Expanded Healthy
  {
    name: "Quinoa Avocado Super Bowl",
    description: "Fluffy tri-color quinoa, sliced Haas avocado, roasted chickpeas, baby spinach, cherry tomatoes and lemon-tahini dressing",
    price: 269,
    category: "Healthy",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 360,
    prepTime: "15 mins",
    isVeg: true,
    tag: "Superfood",
    calories: "380 kcal"
  },
  {
    name: "Grilled Mediterranean Chicken Salad",
    description: "Herb-marinated grilled chicken breast slices on mixed greens, Kalamata olives, English cucumbers, feta and olive oil vinaigrette",
    price: 259,
    category: "Healthy",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 290,
    prepTime: "20 mins",
    isVeg: false,
    tag: "High Protein",
    calories: "410 kcal"
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
