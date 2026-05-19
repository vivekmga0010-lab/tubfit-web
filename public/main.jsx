import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const WHATSAPP_NUMBER = "919560535741"; 
const CALL_NUMBER = "+919560535741";
const EMAIL_ADDRESS = "tubdelhi@outlook.com";

const easingFunctions = {
  linear: (t) => t,
  easeOut: (t) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutQuad: (t) => t * (2 - t)
};

function AnimatedCounter({ target = 100, duration = 2000, suffix = '', prefix = '', easing = 'easeOut', decimals = 0 }) {
  const [count, setCount] = useState(0);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const animate = (currentTime) => {
      if (startTimeRef.current === null) startTimeRef.current = currentTime;
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFunctions[easing](progress);
      const currentValue = Math.floor(target * easedProgress * Math.pow(10, decimals)) / Math.pow(10, decimals);
      setCount(currentValue);
      if (progress < 1) animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [target, duration, easing, decimals]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : String(Math.floor(count));
  return (
    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
      {prefix}{displayValue}{suffix}
    </span>
  );
}

const menuData = {
  "Muscle Gain": [
    { id: "mg1", name: "The Fit Bowl", ingredients: "Chicken + Quinoa + Sauté Veg + Whole Egg + Lemon Juice + Olive Oil + Sesame Seeds", calories: 600, protein: 60, price: 179, image: "/uploads/the_fit_bowl.webp", badges: ["Best Seller", "High Protein"] },
    { id: "mg2", name: "Grilled Chicken Bowl", ingredients: "Grilled Chicken + Egg + Brown Rice + Fresh Salad + Lemon Juice + Pumpkin Seeds", calories: 650, protein: 65, price: 179, image: "/uploads/grilled_chicken_bowl.webp", badges: ["Extra Protein"] },
    { id: "bk1", name: "Bulking Chicken Bowl", ingredients: "Chicken + White Rice + Avocado + Black Beans + Salad + Vegetable + Curd", calories: 750, protein: 55, price: 279, image: "/uploads/bulking_chicken_bowl.webp", badges: ["Calorie Dense"] },
    { id: "bk2", name: "Chicken Sweet Potato Bowl", ingredients: "Chicken + Sweet Potato + Brown Rice + Vegetable + Whole Egg + Curd + Almonds + Mix Seeds", calories: 780, protein: 60, price: 229, image: "/uploads/chicken_sweet_potato_bowl.webp", badges: ["Complex Carbs"] },
    { id: "mg3", name: "Paneer Bowl", ingredients: "Paneer + Tofu + Quinoa + Sauté Veg + Olive Oil + Tomato Slice + Mix Seeds", calories: 680, protein: 45, price: 179, image: "/uploads/paneer_bowl.webp", badges: ["Vegetarian"] },
    { id: "bk3", name: "Paneer Bulking Bowl", ingredients: "Paneer + Brown Rice + Chickpea + Sautéed Vegetable + Soya Chunks + Almonds + Sesame Seeds", calories: 820, protein: 60, price: 229, image: "/uploads/paneer_bulking_bowl.webp", badges: ["Vegetarian Bulk"] }
  ],
  "Fat Loss": [
    { id: "fl1", name: "Green Bowl", ingredients: "Lettuce + Cucumber + Broccoli + Chickpea + Lemon & Black Pepper Dressing + Mix Seeds", calories: 380, protein: 22, price: 99, image: "/uploads/green_bowl.webp", badges: ["Vegan", "Low Calorie"] },
    { id: "fl2", name: "Lean Chicken Bowl", ingredients: "Chicken + Lettuce + Cucumber + Tomato Slice + Olive Oil + Lemon + Spinach", calories: 450, protein: 60, price: 179, image: "/uploads/lean_chicken_bowl.webp", badges: ["Keto Friendly"] },
    { id: "fl3", name: "Lean Veg Bowl (Tofu Fiber)", ingredients: "Tofu + Quinoa + Sauté Vegetable + Mix Seeds + Lettuce + Cherry Tomato", calories: 420, protein: 35, price: 179, image: "/uploads/lean_veg_bowl.webp", badges: ["Vegan", "High Fiber"] }
  ],
  "Max Protein": [
    { id: "mp1", name: "100gm Protein Chicken Bowl", ingredients: "Chicken Breast + Whole Egg + Fresh Salad + White Rice", calories: 850, protein: 100, price: 299, image: "/uploads/100gm_protein_chicken_bowl.webp", badges: ["100g Protein", "Beast Mode"] },
    { id: "mp2", name: "100gm Protein Veg Bowl", ingredients: "Paneer + Tofu + Soya Chunks + Fresh Salad", calories: 820, protein: 100, price: 299, image: "/uploads/100gm_protein_veg_bowl.webp", badges: ["100g Protein", "Veg Max"] }
  ],
  "Premium Salads": [
    { id: "sl1", name: "Avocado & Chickpea Salad", ingredients: "Avocado + Chickpea + Lettuce + Cherry Tomatoes + Olive Oil Dressing", calories: 350, protein: 12, price: 229, image: "/uploads/avocado_chickpea_salad.webp", badges: ["Fresh", "Vegan"] },
    { id: "sl2", name: "Grilled Chicken Caesar", ingredients: "Grilled Chicken + Romaine Lettuce + Parmesan + Croutons + Caesar Dressing", calories: 420, protein: 35, price: 279, image: "/uploads/grilled_chicken_caesar.webp", badges: ["Coming Soon"], upcoming: true },
    { id: "sl3", name: "Mediterranean Paneer", ingredients: "Paneer + Cucumber + Olives + Red Onion + Feta + Vinaigrette", calories: 380, protein: 18, price: 259, image: "/uploads/mediterranean_paneer.webp", badges: ["Coming Soon"], upcoming: true }
  ],
  "Guilt-Free Add-ons": [
    { id: "gf1", name: "Whey Protein Berry Smoothie", ingredients: "Isolate Whey + Mixed Berries + Almond Milk (No Sugar)", calories: 180, protein: 25, price: 149, image: "/uploads/green_bowl.webp", badges: ["Coming Soon"], upcoming: true },
    { id: "gf2", name: "Citrus Detox Water", ingredients: "Lemon + Mint + Cucumber + Chia Seeds", calories: 15, protein: 0, price: 69, image: "/uploads/green_bowl.webp", badges: ["Coming Soon"], upcoming: true },
    { id: "gf3", name: "Keto Almond Brownie", ingredients: "Almond Flour + Dark Chocolate + Stevia + Whey Protein", calories: 210, protein: 12, price: 129, image: "/uploads/green_bowl.webp", badges: ["Coming Soon"], upcoming: true },
    { id: "gf4", name: "Roasted Makhana", ingredients: "Fox Nuts + Light Ghee + Mild Spices", calories: 110, protein: 3, price: 89, image: "/uploads/green_bowl.webp", badges: ["Coming Soon"], upcoming: true },
    { id: "gf5", name: "Mixed Dry Fruits", ingredients: "Cashews + Walnuts + Almonds", calories: 180, protein: 5, price: 149, image: "/uploads/green_bowl.webp", badges: ["Coming Soon"], upcoming: true },
    { id: "gf6", name: "Roasted Chana", ingredients: "Roasted Black Gram + Spices", calories: 120, protein: 7, price: 59, image: "/uploads/green_bowl.webp", badges: ["Coming Soon"], upcoming: true }
  ]
};

const balancedMenuData = Object.fromEntries(
  Object.entries(menuData).map(([category, items]) => {
    const balancedItems = items.map((item) => {
      if (item.upcoming) return item;
      return { ...item, badges: [...(item.badges || []), "Balanced"] };
    });
    return [category, balancedItems];
  })
);

const builderIngredients = {
  bases: [
    { id: 'b1', name: 'White Rice', price: 0, calories: 130, protein: 2, carbs: 28, fats: 0.5 },
    { id: 'b2', name: 'Brown Rice', price: 0, calories: 110, protein: 3, carbs: 24, fats: 0.8 },
    { id: 'b3', name: 'Quinoa', price: 0, calories: 120, protein: 4, carbs: 21, fats: 1.8 },
    { id: 'b4', name: 'Lettuce Mix', price: 0, calories: 10, protein: 1, carbs: 2, fats: 0.1 },
    { id: 'b5', name: 'Spinach', price: 0, calories: 12, protein: 2, carbs: 1.5, fats: 0.2 },
    { id: 'b6', name: 'Sprouts', price: 0, calories: 30, protein: 3, carbs: 5, fats: 0.2 }
  ],
  proteins: [
    { id: 'p1', name: 'Grilled Chicken', price: 0, calories: 165, protein: 31, carbs: 0, fats: 3.5 },
    { id: 'p2', name: 'Peri Peri Chicken', price: 0, calories: 175, protein: 30, carbs: 0, fats: 3.8 },
    { id: 'p3', name: 'Paneer', price: 0, calories: 180, protein: 12, carbs: 6, fats: 14 },
    { id: 'p4', name: 'Tofu', price: 0, calories: 144, protein: 15, carbs: 2, fats: 8 },
    { id: 'p5', name: 'Soya Chunks', price: 0, calories: 110, protein: 16, carbs: 5, fats: 1 },
    { id: 'p6', name: 'Chickpeas', price: 0, calories: 130, protein: 7, carbs: 22, fats: 2 },
    { id: 'p7', name: 'Boiled Eggs', price: 0, calories: 155, protein: 13, carbs: 1, fats: 11 }
  ],
  veggies: [
    { id: 'v1', name: 'Broccoli', price: 0, calories: 30, protein: 2, carbs: 5, fats: 0.2, premium: false },
    { id: 'v2', name: 'Bell Peppers', price: 0, calories: 24, protein: 1, carbs: 5, fats: 0.2, premium: false },
    { id: 'v3', name: 'Carrot', price: 0, calories: 25, protein: 1, carbs: 6, fats: 0.1, premium: false },
    { id: 'v4', name: 'Cucumber', price: 0, calories: 16, protein: 1, carbs: 3, fats: 0.1, premium: false },
    { id: 'v5', name: 'Cherry Tomatoes', price: 0, calories: 18, protein: 1, carbs: 4, fats: 0.1, premium: false },
    { id: 'v6', name: 'Sweet Corn', price: 0, calories: 70, protein: 2, carbs: 15, fats: 1, premium: false },
    { id: 'v7', name: 'Onion', price: 0, calories: 20, protein: 1, carbs: 4, fats: 0, premium: false },
    { id: 'v8', name: 'Avocado (Premium)', price: 80, calories: 80, protein: 1, carbs: 4, fats: 7, premium: true }
  ],
  addons: [
    { id: 'a1', name: 'Extra Chicken', price: 40, qty: '75g', calories: 120, protein: 23, carbs: 0, fats: 3 },
    { id: 'a2', name: 'Extra Paneer', price: 35, qty: '50g', calories: 110, protein: 7, carbs: 3, fats: 8 },
    { id: 'a3', name: 'Extra Egg', price: 20, qty: '1 pcs', calories: 78, protein: 6, carbs: 1, fats: 5 },
    { id: 'a4', name: 'Extra Avocado', price: 80, qty: '50g', calories: 80, protein: 1, carbs: 4, fats: 7 },
    { id: 'a6', name: 'Greek Yogurt Dressing', price: 40, qty: '30g', calories: 60, protein: 4, carbs: 4, fats: 2 },
    { id: 'a7', name: 'Hummus Dip', price: 50, qty: '30g', calories: 90, protein: 3, carbs: 8, fats: 5 },
    { id: 'a8', name: 'Guacamole', price: 50, qty: '30g', calories: 95, protein: 2, carbs: 5, fats: 8 },
    { id: 'a9', name: 'Extra Tofu', price: 30, qty: '50g', calories: 72, protein: 8, carbs: 1, fats: 4 },
    { id: 'a10', name: 'Extra Soya Chunks', price: 20, qty: '30g', calories: 55, protein: 8, carbs: 3, fats: 0.5 }
  ],
  toppings: [
    { id: 't1', name: 'Almonds', price: 0, calories: 35, protein: 1, carbs: 1, fats: 3 },
    { id: 't2', name: 'Pumpkin Seeds', price: 0, calories: 30, protein: 2, carbs: 1, fats: 2 },
    { id: 't3', name: 'Sunflower Seeds', price: 0, calories: 30, protein: 1, carbs: 1, fats: 2 },
    { id: 't4', name: 'Sesame Seeds', price: 0, calories: 25, protein: 1, carbs: 1, fats: 2 },
    { id: 't5', name: 'Mix Seeds', price: 0, calories: 35, protein: 2, carbs: 2, fats: 3 }
  ],
  dressings: [
    { id: 'd1', name: 'Lemon + Black Pepper', price: 0, calories: 5, protein: 0, carbs: 1, fats: 0 },
    { id: 'd2', name: 'Olive Oil', price: 0, calories: 45, protein: 0, carbs: 0, fats: 5 },
    { id: 'd3', name: 'Peri Peri Sauce', price: 0, calories: 20, protein: 0, carbs: 2, fats: 0 },
    { id: 'd4', name: 'Mint Yogurt (Curd)', price: 0, calories: 35, protein: 2, carbs: 4, fats: 1 },
    { id: 'd5', name: 'Honey Mustard', price: 0, calories: 30, protein: 0, carbs: 6, fats: 0 },
    { id: 'd6', name: 'Classic Salt & Pepper', price: 0, calories: 2, protein: 0, carbs: 0, fats: 0 }
  ]
};

const categories = Object.keys(balancedMenuData);

function App() {
  const [activeMenuTab, setActiveMenuTab] = useState(categories[0]);
  const scrollContainerRef = useRef(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedProtein, setSelectedProtein] = useState(null);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedDressings, setSelectedDressings] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, { ...item, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const steps = [
    { id: 'base', title: '1. Choose Your Base', items: builderIngredients.bases, action: setSelectedBase, selected: selectedBase, isSingle: true },
    { id: 'protein', title: '2. Choose Your Protein', items: builderIngredients.proteins, action: setSelectedProtein, selected: selectedProtein, isSingle: true },
    { id: 'veggies', title: '3. Choose Your Veggies', items: builderIngredients.veggies, action: (v) => setSelectedVeggies(prev => prev.includes(v) ? prev.filter(i => i !== v) : [...prev, v]), selected: selectedVeggies, isSingle: false },
  ];

  return (
    <div className="bg-white min-h-screen">
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-green-100 shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black text-green-800">TUB FIT</h1>
          <button onClick={() => setIsCartOpen(true)} className="bg-[#25D366] text-white px-6 py-2 rounded-full font-bold">
            Cart ({cart.length})
          </button>
        </div>
      </nav>

      <section className="py-20 text-center bg-gradient-to-b from-green-50 to-white">
        <h2 className="text-5xl font-black mb-6">Custom Bowls for Every Goal</h2>
        <p className="text-xl text-gray-600 mb-10">Fresh, macro-calculated meals delivered in Delhi.</p>
        <div className="flex gap-4 justify-center">
          <a href="#menu" className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold">View Menu</a>
          <a href="#builder" className="bg-white border border-gray-200 px-8 py-4 rounded-full font-bold">Build Yours</a>
        </div>
      </section>

      <section id="menu" className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex gap-4 overflow-x-auto pb-10">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveMenuTab(cat)} className={`px-6 py-2 rounded-full whitespace-nowrap ${activeMenuTab === cat ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {balancedMenuData[activeMenuTab].map(item => (
            <div key={item.id} className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={item.image} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{item.ingredients}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black text-green-700">₹{item.price}</span>
                  <button onClick={() => addToCart(item)} className="bg-[#25D366] text-white px-6 py-2 rounded-xl font-bold">Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="builder" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-12">Build Your Own Bowl 🛠️</h2>
          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold mb-6">{steps[currentStepIndex].title}</h3>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {steps[currentStepIndex].items.map(item => (
                <button 
                  key={item.id} 
                  onClick={() => steps[currentStepIndex].action(item)}
                  className={`p-4 border-2 rounded-2xl text-left ${
                    (steps[currentStepIndex].isSingle ? steps[currentStepIndex].selected?.id === item.id : steps[currentStepIndex].selected.includes(item))
                    ? 'border-green-500 bg-green-50' : 'border-gray-100'
                  }`}
                >
                  <div className="font-bold">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.protein}g Protein</div>
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button disabled={currentStepIndex === 0} onClick={() => setCurrentStepIndex(i => i - 1)} className="px-8 py-2 bg-gray-100 rounded-full font-bold">Back</button>
              <button disabled={currentStepIndex === steps.length - 1} onClick={() => setCurrentStepIndex(i => i + 1)} className="px-8 py-2 bg-gray-900 text-white rounded-full font-bold">Next</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);