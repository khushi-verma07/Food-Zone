const chatbotController = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const lowerMessage = message.toLowerCase();
    let response = '';

    // Food Categories and Items
    const categories = {
      salad: ['Greek salad (₹150)', 'Veg salad (₹170)', 'Clover Salad (₹170)', 'Mix Salad (₹185)'],
      rolls: ['Lasagna Rolls (₹190)', 'Peri Peri Rolls (₹110)', 'Mix Rolls (₹90)', 'Veg Rolls (₹120)'],
      deserts: ['Ripple Ice Cream (₹120)', 'Fruit Ice Cream (₹150)', 'Jar Ice Cream (₹250)', 'Vanilla Ice Cream (₹100)'],
      sandwich: ['Plain Sandwich (₹120)', 'Vegan Sandwich (₹180)', 'Grilled Sandwich (₹200)', 'Bread Sandwich (₹240)'],
      cake: ['Cup Cake (₹120)', 'Strawberry Cake (₹150)', 'Vanilla-Current Cake (₹250)', 'Sliced Cake (₹150)'],
      pureveg: ['Garlic Mushroom (₹350)', 'Fried Cauliflower (₹220)', 'Mix Veg Pulao (₹450)', 'Rice Zucchini (₹350)'],
      pasta: ['Cheese Pasta (₹250)', 'Tomato Pasta (₹200)', 'Creamy Pasta (₹350)', 'MixVeg Pasta (₹240)'],
      noodles: ['Butter Noodles (₹240)', 'Veg Noodles (₹260)', 'Somen Noodles (₹320)', 'Cooked Noodles (₹350)']
    };

    // Greetings
    if (/\b(hello|hi|hey|good morning|good evening|namaste)\b/i.test(message)) {
      response = "Hello! Welcome to FoodZone! 🍕 I'm your food assistant. I can help you with our menu, orders, delivery, and more!";
    }
    // Menu categories
    else if (/\b(menu|categories|what do you have)\b/i.test(message)) {
      response = "🍽️ Our FoodZone Menu Categories:\n\n🥗 Salads - Fresh & Healthy\n🌯 Rolls - Tasty Wraps\n🍰 Desserts - Sweet Treats\n🥪 Sandwiches - Quick Bites\n🎂 Cakes - Special Occasions\n🥬 Pure Veg - Vegetarian Delights\n🍝 Pasta - Italian Favorites\n🍜 Noodles - Asian Cuisine\n\nAsk about any category for specific items!";
    }
    // Specific categories
    else if (/\b(salad|salads)\b/i.test(message)) {
      response = `🥗 Our Fresh Salads:\n${categories.salad.join('\n')}\n\nAll salads are made with fresh ingredients!`;
    }
    else if (/\b(roll|rolls)\b/i.test(message)) {
      response = `🌯 Our Delicious Rolls:\n${categories.rolls.join('\n')}\n\nPerfect for a quick meal!`;
    }
    else if (/\b(desert|dessert|ice cream|sweet)\b/i.test(message)) {
      response = `🍰 Our Sweet Desserts:\n${categories.deserts.join('\n')}\n\nPerfect way to end your meal!`;
    }
    else if (/\b(sandwich|sandwiches)\b/i.test(message)) {
      response = `🥪 Our Tasty Sandwiches:\n${categories.sandwich.join('\n')}\n\nFresh bread with amazing fillings!`;
    }
    else if (/\b(cake|cakes)\b/i.test(message)) {
      response = `🎂 Our Special Cakes:\n${categories.cake.join('\n')}\n\nPerfect for celebrations!`;
    }
    else if (/\b(pure veg|veg|vegetarian)\b/i.test(message)) {
      response = `🥬 Our Pure Veg Specials:\n${categories.pureveg.join('\n')}\n\n100% vegetarian & delicious!`;
    }
    else if (/\b(pasta|italian)\b/i.test(message)) {
      response = `🍝 Our Italian Pasta:\n${categories.pasta.join('\n')}\n\nAuthentic Italian flavors!`;
    }
    else if (/\b(noodles|chinese|asian)\b/i.test(message)) {
      response = `🍜 Our Asian Noodles:\n${categories.noodles.join('\n')}\n\nAuthentic Asian taste!`;
    }
    // Navigation & Routes
    else if (/\b(navigate|go to|page|route)\b/i.test(message)) {
      response = "🧭 FoodZone Navigation:\n\n🏠 Home (/) - Browse our menu\n🛒 Cart (/cart) - Review your order\n📋 Place Order (/order) - Checkout\n✅ Payment Success (/payment-success)\n📦 My Orders (/orders) - Track orders\n\nJust click on any section to navigate!";
    }
    // Order process
    else if (/\b(how to order|order process|place order)\b/i.test(message)) {
      response = "📋 How to Order:\n\n1️⃣ Browse our menu on Home page\n2️⃣ Add items to Cart\n3️⃣ Go to Cart to review\n4️⃣ Click Place Order\n5️⃣ Fill delivery details\n6️⃣ Make payment\n7️⃣ Track in My Orders\n\nIt's that simple! 🎉";
    }
    // Delivery & Payment
    else if (/\b(delivery|time|how long)\b/i.test(message)) {
      response = "🚚 Delivery Info:\n\n⏰ Delivery Time: 30-45 minutes\n📍 We deliver to your doorstep\n🔥 Food stays hot & fresh\n💰 Free delivery on orders above ₹300\n\nTrack your order in real-time!";
    }
    else if (/\b(payment|pay|razorpay|card)\b/i.test(message)) {
      response = "💳 Payment Options:\n\n✅ Credit/Debit Cards\n✅ Net Banking\n✅ UPI Payments\n✅ Razorpay Gateway\n🔒 100% Secure Payments\n\nAll major cards accepted!";
    }
    // Recommendations
    else if (/\b(recommend|suggest|popular|best)\b/i.test(message)) {
      response = "⭐ Top Recommendations:\n\n🔥 Most Popular:\n• Mix Veg Pulao (₹450)\n• Creamy Pasta (₹350)\n• Grilled Sandwich (₹200)\n\n💰 Best Value:\n• Mix Rolls (₹90)\n• Vanilla Ice Cream (₹100)\n• Plain Sandwich (₹120)\n\nWhat's your mood today?";
    }
    // Price ranges
    else if (/\b(price|cost|cheap|expensive|budget)\b/i.test(message)) {
      response = "💰 Price Ranges:\n\n🟢 Budget (₹90-150):\nRolls, Ice Creams, Basic Sandwiches\n\n🟡 Mid-range (₹150-250):\nSalads, Cakes, Pasta\n\n🔴 Premium (₹250-450):\nSpecial Cakes, Pure Veg, Gourmet Items\n\nSomething for every budget!";
    }
    // Contact & Support
    else if (/\b(contact|support|help|problem)\b/i.test(message)) {
      response = "🤝 Need Help?\n\n📞 24/7 Customer Support\n💬 Live Chat (that's me!)\n📧 Email Support\n🔄 Easy Returns/Refunds\n\nI'm here to help with anything!";
    }
    // Default response
    else {
      response = "🤖 I'm your FoodZone assistant! I can help with:\n\n🍽️ Menu & Categories\n🛒 Ordering Process\n🚚 Delivery Info\n💳 Payment Options\n⭐ Recommendations\n🧭 Navigation\n\nWhat would you like to know?";
    }

    res.json({ success: true, response });

  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({
      success: false,
      message: "Sorry, I'm having trouble right now. Please try again later."
    });
  }
};

export { chatbotController };