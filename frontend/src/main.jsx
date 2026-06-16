import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// Easing functions for smooth animations
        const easingFunctions = {
          linear: (t) => t,
          easeOut: (t) => 1 - Math.pow(1 - t, 3),
          easeInOut: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
          easeOutQuad: (t) => t * (2 - t)
        };

        // AnimatedCounter Component - Reusable number animation
        function AnimatedCounter({ target = 100, duration = 2000, suffix = '', prefix = '', easing = 'easeOut', decimals = 0 }) {
          const [count, setCount] = useState(0);
          const animationRef = useRef(null);
          const startTimeRef = useRef(null);

          useEffect(() => {
            const animate = (currentTime) => {
              if (startTimeRef.current === null) {
                startTimeRef.current = currentTime;
              }

              const elapsed = currentTime - startTimeRef.current;
              const progress = Math.min(elapsed / duration, 1);
              const easedProgress = easingFunctions[easing](progress);
              const currentValue = Math.floor(target * easedProgress * Math.pow(10, decimals)) / Math.pow(10, decimals);

              setCount(currentValue);

              if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
              }
            };

            animationRef.current = requestAnimationFrame(animate);

            return () => {
              if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
              }
            };
          }, [target, duration, easing, decimals]);

          const displayValue = decimals > 0 ? count.toFixed(decimals) : String(Math.floor(count));

          return (
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
              {prefix}{displayValue}{suffix}
            </span>
          );
        }

        const WHATSAPP_NUMBER = "919560535741"; 
        const CALL_NUMBER = "+919560535741";
        const SECOND_NUMBER = "9560574178";
        const EMAIL_ADDRESS = "tubdelhi@outlook.com";

        const formatIndianNumber = (num) => {
          const digits = num.replace(/\D/g, '');
          if (digits.length === 12 && digits.startsWith('91')) {
            return `+91 ${digits.slice(2, 4)} ${digits.slice(4, 8)} ${digits.slice(8)}`;
          }
          if (digits.length === 10) {
            return `+91 ${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
          }
          return num;
        };

        const menuData = {
          "Muscle Gain": [
            { id: "mg1", name: "The Fit Bowl", ingredients: "Grilled Chicken 150g + Quinoa + Broccoli + Bell Peppers + Carrot + Onion + Boiled Egg + Lemon + Olive Oil + Sesame Seeds", recipe: [
                { id: 'p1', qty: 1 },
                { id: 'b3', qty: 1 },
                { id: 'v1', qty: 1 },
                { id: 'v2', qty: 1 },
                { id: 'v3', qty: 1 },
                { id: 'v7', qty: 1 },
                { id: 'p7', qty: 1 },
                { id: 'd1', qty: 1 },
                { id: 'd2', qty: 1 },
                { id: 't4', qty: 1 }
              ], price: 179, image: "/uploads/the_fit_bowl.webp", badges: ["Best Seller", "High Protein"] },
            { id: "mg2", name: "Grilled Chicken Bowl", ingredients: "Grilled Chicken + Egg + Brown Rice + Fresh Salad + Lemon Juice + Pumpkin Seeds", calories: 650, protein: 65, carbs: 58, fats: 20, price: 179, image: "/uploads/grilled_chicken_bowl.webp", badges: ["Extra Protein"] },
            { id: "mg3", name: "Paneer Bowl", ingredients: "Paneer + Tofu + Quinoa + Sauté Veg + Olive Oil + Tomato Slice + Mix Seeds", calories: 680, protein: 45, carbs: 52, fats: 34, price: 179, image: "/uploads/paneer_bowl.webp", badges: ["Vegetarian"] },
            { id: "bk3", name: "Paneer Bulking Bowl", ingredients: "Paneer + Brown Rice + Chickpea + Sautéed Vegetable + Soya Chunks + Almonds + Sesame Seeds", calories: 820, protein: 60, carbs: 90, fats: 36, price: 229, image: "/uploads/paneer_bulking_bowl.webp", badges: ["Vegetarian Bulk"] },
            { id: "bk1", name: "Bulking Chicken Bowl", ingredients: "Chicken + White Rice + Avocado + Black Beans + Salad + Vegetable + Curd", calories: 750, protein: 55, carbs: 80, fats: 26, price: 279, image: "/uploads/bulking_chicken_bowl.webp", badges: ["Calorie Dense"] }
          ],
          "Fat Loss": [
            { id: "fl1", name: "Green Bowl", ingredients: "Lettuce + Cucumber + Broccoli + Chickpea + Lemon & Black Pepper Dressing + Mix Seeds", calories: 380, protein: 22, carbs: 34, fats: 14, price: 149, image: "/uploads/green_bowl.webp", badges: ["Vegan", "Low Calorie"] },
            { id: "fl2", name: "Lean Chicken Bowl", ingredients: "Chicken + Lettuce + Cucumber + Tomato Slice + Olive Oil + Lemon + Spinach", calories: 450, protein: 60, carbs: 18, fats: 14, price: 179, image: "/uploads/lean_chicken_bowl.webp", badges: ["Keto Friendly"] },
            { id: "fl3", name: "Lean Veg Bowl (Tofu Fiber)", ingredients: "Tofu + Quinoa + Sauté Vegetable + Mix Seeds + Lettuce + Cherry Tomato", calories: 420, protein: 35, carbs: 40, fats: 12, price: 179, image: "/uploads/lean_veg_bowl.webp", badges: ["Vegan", "High Fiber"] }
          ],
          "Max Protein": [
            { id: "mp1", name: "100gm Protein Chicken Bowl", ingredients: "Chicken Breast + Whole Egg + Fresh Salad + White Rice", calories: 850, protein: 100, carbs: 35, fats: 20, price: 329, image: "/uploads/100gm_protein_chicken_bowl.webp", badges: ["100g Protein", "Beast Mode"] },
            { id: "mp2", name: "100gm Protein Veg Bowl", ingredients: "Paneer + Tofu + Soya Chunks + Fresh Salad", calories: 820, protein: 100, carbs: 45, fats: 32, price: 329, image: "/uploads/100gm_protein_veg_bowl.webp", badges: ["100g Protein", "Veg Max"] }
          ],
          "Premium Salads": [
            { id: "sl1", name: "Egg Protein Salad", ingredients: "2 whole eggs + 2 egg whites + boiled chickpeas + lettuce + cucumber + carrot + light dressing + herbs & seasoning", calories: 360, protein: 28, carbs: 26, fats: 14, price: 199, image: "/uploads/egg_chickpeas_salad.webp", badges: ["Fresh", "High Protein"] },
            { id: "sl2", name: "Paneer Protein Salad", ingredients: "Paneer (120g) + boiled chickpeas + lettuce + cucumber + carrot + light dressing + herbs & seasoning", calories: 460, protein: 25, carbs: 26, fats: 24, price: 219, image: "/uploads/paneer_chickpeas_salad.webp", badges: ["Fresh", "Vegetarian"] },
            { id: "sl3", name: "Avocado & Chickpea Salad", ingredients: "Avocado + Chickpea + Lettuce + Cherry Tomatoes + Olive Oil Dressing", calories: 350, protein: 12, carbs: 28, fats: 20, price: 229, image: "/uploads/avocado_chickpea_salad.webp", badges: ["Fresh", "Vegan"] },
            { id: "sl4", name: "Protein Power Chicken Salad", ingredients: "Grilled chicken (150g) + boiled chickpeas + lettuce + cucumber + carrot + olive oil dressing + herbs & seasoning", calories: 420, protein: 48, carbs: 26, fats: 11, price: 229, image: "/uploads/chicken_chickpeas_salad.webp", badges: ["Fresh", "High Protein"] }
          ],
          "Breakfast": [
            { id: "bf4", name: "Poha Bowl", ingredients: "Poha + Paneer + Soya Chunks + Peanuts + Veggies", calories: 480, protein: 24, carbs: 55, fats: 12, price: 149, image: "/uploads/poha_bowl.webp", badges: ["Clean Eating", "Energy Boost"] },
            { id: "bf3", name: "Egg Breakfast Bowl", ingredients: "Eggs + Toast + Curd + Fruits", calories: 400, protein: 24, carbs: 30, fats: 17, price: 179, image: "/uploads/egg_breakfast_bowl.webp", badges: ["High Protein", "Energy Boost"] },
            { id: "bf5", name: "Fruit n Oat Bowl", ingredients: "Oats + Mixed Fruits + Chia Seeds", calories: 320, protein: 9, carbs: 50, fats: 8, price: 179, image: "/uploads/fruit_n_oat_bowl.webp", badges: ["Low Calorie", "Clean Eating"] },
            { id: "bf1", name: "Chicken Breakfast Salad Bowl", ingredients: "Chicken + Quinoa + Cucumber + Tomatoes + Lettuce + Onion + Carrot + Curd + Mixed Seeds", calories: 450, protein: 36, carbs: 40, fats: 14, price: 189, image: "/uploads/chicken_quinoa_salad_bowl.webp", badges: ["High Protein", "Clean Eating"] },
            { id: "bf2", name: "Paneer Breakfast Salad Bowl", ingredients: "Paneer + Quinoa + Cucumber + Cherry Tomatoes + Lettuce + Carrot + Curd + Flax or Chia Seeds", calories: 440, protein: 21, carbs: 38, fats: 16, price: 199, image: "/uploads/paneer_quinoa_salad_bowl.webp", badges: ["High Protein", "Low Calorie"] },
            { id: "bf7", name: "Sprouts Morning Bowl", ingredients: "Mixed Sprouts + Onion + Tomatoes + Cucumber + Coriander + Lemon + Chaat Masala", calories: 240, protein: 15, carbs: 20, fats: 6, price: 199, image: "/uploads/sprout_morning_bowl.webp", badges: ["Low Calorie", "Clean Eating"] },
            { id: "bf6", name: "Fruit n Nuts Bowl", ingredients: "Oats + Fruits + Nuts + Seeds Mix", calories: 500, protein: 11, carbs: 60, fats: 22, price: 249, image: "/uploads/fruit_n_nuts_oat_bowl.webp", badges: ["Energy Boost", "Clean Eating"] }
          ],
          "Guilt-Free Add-ons": [
            { id: "gf1", name: "Whey Protein Berry Smoothie", ingredients: "Isolate Whey + Mixed Berries + Almond Milk (No Sugar)", description: "A thick, creamy post-workout blend packed with premium isolate and antioxidant-rich berries.", calories: 180, protein: 25, carbs: 10, fats: 3, price: 149, image: "/uploads/green_bowl.webp", badges: ["Coming Soon"], upcoming: true },
            { id: "gf2", name: "Citrus Detox Water", ingredients: "Lemon + Mint + Cucumber + Chia Seeds", description: "Infused with crisp citrus and essential electrolytes to crush bloating and keep you hydrated.", calories: 15, protein: 0, carbs: 3, fats: 0, price: 69, image: "/uploads/green_bowl.webp", badges: ["Coming Soon"], upcoming: true },
            { id: "gf3", name: "Keto Almond Brownie", ingredients: "Almond Flour + Dark Chocolate + Stevia + Whey Protein", description: "Decadent keto-friendly brownie made with almond flour, dark chocolate and protein for guilt-free recovery.", calories: 210, protein: 12, carbs: 8, fats: 14, price: 129, image: "/uploads/green_bowl.webp", badges: ["Coming Soon"], upcoming: true }
          ]
        };

        const MOISTURE_KEYWORDS = [
          'dressing', 'curd', 'yogurt', 'olive oil', 'lemon', 'vinaigrette',
          'sauce', 'avocado', 'cucumber', 'tomato', 'mint'
        ];

        const menuItemHasMoisture = (ingredientsText) => {
          const normalized = (ingredientsText || '').toLowerCase();
          return MOISTURE_KEYWORDS.some(keyword => normalized.includes(keyword));
        };

        const builderIngredients = {
          bases: [
            { id: 'b1', name: 'White Rice', price: 0, calories: 104, protein: 1.6, carbs: 22.4, fats: 0.4 },
            { id: 'b2', name: 'Brown Rice', price: 0, calories: 88, protein: 2.4, carbs: 19.2, fats: 0.6 },
            { id: 'b3', name: 'Quinoa', price: 0, calories: 96, protein: 3.2, carbs: 16.8, fats: 1.4 },
            { id: 'b4', name: 'Lettuce Mix', price: 0, calories: 10, protein: 1, carbs: 2, fats: 0.1 },
            { id: 'b5', name: 'Spinach', price: 0, calories: 12, protein: 2, carbs: 1.5, fats: 0.2 },
            { id: 'b6', name: 'Sprouts', price: 0, calories: 30, protein: 3, carbs: 5, fats: 0.2 }
          ],
          proteins: [
            { id: 'p1', name: 'Grilled Chicken', price: 0, calories: 248, protein: 46.5, carbs: 0, fats: 5.3 },
            { id: 'p2', name: 'Peri Peri Chicken', price: 0, calories: 263, protein: 45, carbs: 0, fats: 5.7 },
            { id: 'p3', name: 'Paneer', price: 0, calories: 270, protein: 18, carbs: 9, fats: 21 },
            { id: 'p4', name: 'Tofu', price: 0, calories: 144, protein: 15, carbs: 2, fats: 8 },
            { id: 'p5', name: 'Soya Chunks', price: 0, calories: 110, protein: 16, carbs: 5, fats: 1 },
            { id: 'p6', name: 'Chickpeas', price: 0, calories: 130, protein: 7, carbs: 22, fats: 2 },
            { id: 'p7', name: 'Boiled Eggs', price: 0, calories: 155, protein: 13, carbs: 1, fats: 11 }
          ],
          veggies: [
            { id: 'v1', name: 'Broccoli', price: 0, calories: 4.5, protein: 0.3, carbs: 0.8, fats: 0.0, premium: false },
            { id: 'v2', name: 'Bell Peppers', price: 0, calories: 3.6, protein: 0.2, carbs: 0.8, fats: 0.0, premium: false },
            { id: 'v3', name: 'Carrot', price: 0, calories: 3.8, protein: 0.2, carbs: 0.9, fats: 0.0, premium: false },
            { id: 'v4', name: 'Cucumber', price: 0, calories: 2.4, protein: 0.2, carbs: 0.5, fats: 0.0, premium: false },
            { id: 'v5', name: 'Cherry Tomatoes', price: 0, calories: 2.7, protein: 0.2, carbs: 0.6, fats: 0.0, premium: false },
            { id: 'v6', name: 'Sweet Corn', price: 0, calories: 10.5, protein: 0.3, carbs: 2.3, fats: 0.2, premium: false },
            { id: 'v7', name: 'Onion', price: 0, calories: 3.0, protein: 0.2, carbs: 0.6, fats: 0, premium: false },
            { id: 'v8', name: 'Avocado (Premium)', price: 80, calories: 80, protein: 1, carbs: 4, fats: 7, premium: true }
          ],
          addons: [
            { id: 'a1', name: 'Extra Chicken', price: 40, calories: 120, protein: 23, carbs: 0, fats: 3 },
            { id: 'a2', name: 'Extra Paneer', price: 35, calories: 110, protein: 7, carbs: 3, fats: 8 },
            { id: 'a3', name: 'Extra Egg', price: 15, calories: 78, protein: 6, carbs: 1, fats: 5 },
            { id: 'a4', name: 'Extra Avocado', price: 80, calories: 80, protein: 1, carbs: 4, fats: 7 },
            { id: 'a6', name: 'Greek Yogurt Dressing', price: 20, calories: 60, protein: 4, carbs: 4, fats: 2 },
            { id: 'a9', name: 'Almonds', price: 20, calories: 35, protein: 1, carbs: 1, fats: 3 },
            { id: 'a10', name: 'Peri Peri Sauce', price: 20, calories: 20, protein: 0, carbs: 2, fats: 0 },
            { id: 'a11', name: 'Mint Yogurt (Curd)', price: 25, calories: 35, protein: 2, carbs: 4, fats: 1 },
            { id: 'a12', name: 'Honey Mustard', price: 20, calories: 30, protein: 0, carbs: 6, fats: 0 }
          ],
          toppings: [
            { id: 't2', name: 'Pumpkin Seeds', price: 0, calories: 30, protein: 2, carbs: 1, fats: 2 },
            { id: 't3', name: 'Sunflower Seeds', price: 0, calories: 30, protein: 1, carbs: 1, fats: 2 },
            { id: 't4', name: 'Sesame Seeds', price: 0, calories: 25, protein: 1, carbs: 1, fats: 2 },
            { id: 't5', name: 'Mix Seeds', price: 0, calories: 35, protein: 2, carbs: 2, fats: 3 }
          ],
          dressings: [
            { id: 'd1', name: 'Lemon', price: 0, calories: 5, protein: 0, carbs: 1, fats: 0 },
            { id: 'd2', name: 'Black Pepper', price: 0, calories: 0, protein: 0, carbs: 0, fats: 0 },
            { id: 'd3', name: 'Olive Oil', price: 0, calories: 45, protein: 0, carbs: 0, fats: 5 },
            { id: 'd4', name: 'Classic Salt', price: 0, calories: 0, protein: 0, carbs: 0, fats: 0 },
            { id: 'd5', name: 'Chaat Masala', price: 0, calories: 0, protein: 0, carbs: 0, fats: 0 },
            { id: 'd6', name: 'Vinaigrette', price: 0, calories: 40, protein: 0, carbs: 2, fats: 4 },
            { id: 'd7', name: 'Jalapeño', price: 0, calories: 0, protein: 0, carbs: 0, fats: 0 }
          ]
        };

        const findBuilderIngredient = (ingredientId) => {
          return Object.values(builderIngredients).flat().find(item => item.id === ingredientId);
        };

        const computeRecipeMacros = (recipe = []) => {
          const totals = { calories: 0, protein: 0, carbs: 0, fats: 0 };

          recipe.forEach(({ id, qty = 1 }) => {
            const ingredient = findBuilderIngredient(id);
            if (!ingredient) return;
            totals.calories += (ingredient.calories || 0) * qty;
            totals.protein += (ingredient.protein || 0) * qty;
            totals.carbs += (ingredient.carbs || 0) * qty;
            totals.fats += (ingredient.fats || 0) * qty;
          });

          return {
            calories: Number(totals.calories.toFixed(1)),
            protein: Number(totals.protein.toFixed(1)),
            carbs: Number(totals.carbs.toFixed(1)),
            fats: Number(totals.fats.toFixed(1))
          };
        };

        const menuDataWithCalculatedMacros = Object.fromEntries(
          Object.entries(menuData).map(([category, items]) => {
            const mappedItems = items.map(item => {
              if (!item.recipe) return item;
              return {
                ...item,
                ...computeRecipeMacros(item.recipe)
              };
            });
            return [category, mappedItems];
          })
        );

        const balancedMenuData = Object.fromEntries(
          Object.entries(menuDataWithCalculatedMacros).map(([category, items]) => {
            const balancedItems = items.map((item) => {
              if (item.upcoming || menuItemHasMoisture(item.ingredients)) {
                return item;
              }

              const nextBadges = item.badges ? [...item.badges] : [];
              if (!nextBadges.includes('Balanced')) {
                nextBadges.push('Balanced');
              }

              return {
                ...item,
                ingredients: `${item.ingredients} + Light Lemon-Mint Dressing`,
                badges: nextBadges
              };
            });

            return [category, balancedItems];
          })
        );

        const categories = Object.keys(balancedMenuData);

        const generateDates = () => {
            const dates = [];
            const now = new Date();
            const openHour = 11;
            const closeHour = 23;
            
            const availableFrom = new Date(now.getTime() + 60 * 60 * 1000);
            let todayEnd = new Date(now);
            todayEnd.setHours(closeHour, 0, 0, 0);
            
            let startOffset = 0;
            if (availableFrom >= todayEnd) {
                startOffset = 1;
            }
            
            for (let i = startOffset; i < startOffset + 5; i++) {
                let d = new Date(now);
                d.setDate(d.getDate() + i);
                
                let label = d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
                if (i === 0) label = `Today (${label})`;
                else if (i === 1) label = `Tomorrow (${label})`;
                
                dates.push({ label, value: i, dateValue: formatDeliveryValue(d) });
            }
            return dates;
        };

        const formatDeliveryValue = (date) => {
            if (!date) return '';
            const d = new Date(date);
            if (Number.isNaN(d.getTime())) return '';
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        };

        const generateTimeSlots = (dayOffset) => {
            const slots = [];
            const now = new Date();
            const targetDate = new Date(now);
            targetDate.setDate(targetDate.getDate() + parseInt(dayOffset));
            
            const isToday = parseInt(dayOffset) === 0;
            
            let availableFrom;
            if (isToday) {
                availableFrom = new Date(now.getTime() + 60 * 60 * 1000);
            } else {
                availableFrom = new Date(targetDate);
                availableFrom.setHours(0, 0, 0, 0);
            }
            
            const openHour = 11;
            const closeHour = 23;
            
            let slotStart = new Date(targetDate);
            slotStart.setHours(openHour, 0, 0, 0);
            
            if (availableFrom > slotStart) {
                const minutes = availableFrom.getMinutes();
                if (minutes > 0 && minutes <= 30) {
                    slotStart = new Date(availableFrom);
                    slotStart.setMinutes(30, 0, 0);
                } else if (minutes > 30) {
                    slotStart = new Date(availableFrom);
                    slotStart.setHours(slotStart.getHours() + 1, 0, 0, 0);
                } else {
                    slotStart = new Date(availableFrom);
                    slotStart.setMinutes(0, 0, 0);
                }
            }
            
            const endOfDay = new Date(targetDate);
            endOfDay.setHours(closeHour, 0, 0, 0);
            
            const formatTime = (date) => {
                let hours = date.getHours();
                let mins = date.getMinutes();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12;
                mins = mins < 10 ? '0' + mins : mins;
                return `${hours}:${mins} ${ampm}`;
            };

            // Add an explicit ASAP option to communicate the 1-hour wait time
            if (isToday) {
                const openTimeToday = new Date(targetDate);
                openTimeToday.setHours(openHour, 0, 0, 0);
                if (availableFrom > openTimeToday && availableFrom < endOfDay) {
                    slots.push(`ASAP (in ~60 mins)`);
                }
            }

            while (slotStart < endOfDay) {
                let slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000);
                if (slotEnd > endOfDay) break;
                slots.push(`${formatTime(slotStart)} - ${formatTime(slotEnd)}`);
                slotStart = slotEnd;
            }
            
            return slots;
        };

        function App() {
          // Menu scroll management state
          const [activeMenuTab, setActiveMenuTab] = useState(categories[0]);
          const scrollContainerRef = useRef(null);
          const tabsContainerRef = useRef(null);
          const isTabClicking = useRef(false);

          const [cart, setCart] = useState([]);
          const [isCartOpen, setIsCartOpen] = useState(false);
          const [isCheckoutStep, setIsCheckoutStep] = useState(false);
          const [toast, setToast] = useState({ message: '', visible: false });
          const [userDetails, setUserDetails] = useState({ name: '', phone: '', deliveryType: 'home', address: '', landmark: '', dateOffset: 0, dateLabel: '', dateValue: '', timeSlot: '', gymPromoCode: '' });
          const [availableDates, setAvailableDates] = useState([]);
          const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
          const [promoMessage, setPromoMessage] = useState({ type: '', text: '' }); // 'error' or 'success'
          const [appliedPromoCode, setAppliedPromoCode] = useState('');
          const [promoInputValue, setPromoInputValue] = useState('');
          
          // Valid promo codes with discount percentages
          const VALID_PROMO_CODES = {
              'PMP5': 0.05,      // 5% off
              'FFULE5': 0.05,    // 5% off
              'NEULFIT5': 0.05,  // 5% off
              'FIRST5': 0.05,    // 5% off
              'TUB5': 0.05       // 5% off
          };

          const BASE_BOWL_PRICE = 199;
          const [currentStepIndex, setCurrentStepIndex] = useState(0);
          const [selectedBase, setSelectedBase] = useState(null);
          const [selectedProtein, setSelectedProtein] = useState(null);
          const [selectedVeggies, setSelectedVeggies] = useState([]);
          const [selectedAddons, setSelectedAddons] = useState([]);
          const [selectedToppings, setSelectedToppings] = useState([]);
          const [selectedDressings, setSelectedDressings] = useState([]);
          const [dismissedDryComboSignature, setDismissedDryComboSignature] = useState('');

          const [timeLeft, setTimeLeft] = useState("");

          // Lock background scrolling when cart modal is open
          useEffect(() => {
              if (isCartOpen) {
                  document.body.style.overflow = 'hidden';
              } else {
                  document.body.style.overflow = 'unset';
              }
              return () => { document.body.style.overflow = 'unset'; };
          }, [isCartOpen]);

          useEffect(() => {
              if (isCartOpen) {
                  const dates = generateDates();
                  setAvailableDates(dates);
                  
                  const initialDateOffset = dates.length > 0 ? dates[0].value : 0;
                  const slots = generateTimeSlots(initialDateOffset);
                  setAvailableTimeSlots(slots);
                  
                  setUserDetails(prev => ({ 
                      ...prev, 
                      dateOffset: initialDateOffset,
                      dateLabel: dates[0] ? dates[0].label : '',
                      dateValue: dates[0] ? dates[0].dateValue : '',
                      timeSlot: slots.includes(prev.timeSlot) ? prev.timeSlot : (slots[0] || '') 
                  }));
              }
          }, [isCartOpen]);

          // FOMO Countdown Timer
          useEffect(() => {
              const timer = setInterval(() => {
                  const now = new Date();
                  const target = new Date();
                  target.setHours(22, 0, 0, 0); 
                  if (now > target) target.setDate(target.getDate() + 1); 
                  const diff = target - now;
                  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                  const s = Math.floor((diff % (1000 * 60)) / 1000);
                  setTimeLeft(`${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`);
              }, 1000);
              return () => clearInterval(timer);
          }, []);

          // Single-Track Smooth Scrolling Observer
          useEffect(() => {
            const container = scrollContainerRef.current;
            if (!container) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    if (isTabClicking.current) return;

                    let maxRatio = 0;
                    let visibleCategory = null;

                    entries.forEach((entry) => {
                        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                            maxRatio = entry.intersectionRatio;
                            visibleCategory = entry.target.getAttribute('data-category');
                        }
                    });

                    if (visibleCategory && visibleCategory !== activeMenuTab) {
                        setActiveMenuTab(visibleCategory);
                        
                        if (tabsContainerRef.current) {
                            const activeTabElement = document.getElementById(`tab-${visibleCategory.replace(/[^a-zA-Z0-9]/g, '')}`);
                            if (activeTabElement) {
                                const tabContainer = tabsContainerRef.current;
                                const scrollLeft = activeTabElement.offsetLeft - (tabContainer.offsetWidth / 2) + (activeTabElement.offsetWidth / 2);
                                tabContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                            }
                        }
                    }
                },
                { root: container, threshold: 0.6 }
            );

            const cards = container.querySelectorAll('.menu-card');
            cards.forEach(card => observer.observe(card));

            return () => observer.disconnect();
          }, [activeMenuTab]);

          const handleTabClick = (category) => {
              isTabClicking.current = true;
              setActiveMenuTab(category);
              
              if (tabsContainerRef.current) {
                  const activeTabElement = document.getElementById(`tab-${category.replace(/[^a-zA-Z0-9]/g, '')}`);
                  if (activeTabElement) {
                      const tabContainer = tabsContainerRef.current;
                      const scrollLeft = activeTabElement.offsetLeft - (tabContainer.offsetWidth / 2) + (activeTabElement.offsetWidth / 2);
                      tabContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                  }
              }

              const targetElement = document.getElementById(`first-item-${category.replace(/[^a-zA-Z0-9]/g, '')}`);
              if (targetElement && scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({
                      left: targetElement.offsetLeft - 16,
                      behavior: 'smooth'
                  });
              }

              setTimeout(() => { isTabClicking.current = false; }, 600);
          };

          const scrollMenu = (direction) => {
            if (scrollContainerRef.current) {
              const itemWidth = window.innerWidth < 640 ? window.innerWidth * 0.85 : 340;
              const gap = 24;
              const scrollAmount = itemWidth + gap;
              
              scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
            }
          };

          const formatMacroValue = (value) => {
              if (typeof value !== 'number' || Number.isNaN(value)) return '0';
              const rounded = Number(value.toFixed(1));
              return rounded % 1 === 0 ? rounded.toFixed(0) : String(rounded);
          };

          const formatCurrency = (amount) => {
              if (typeof amount !== 'number' || Number.isNaN(amount)) return '0';
              return amount.toFixed(2).replace(/\.00$/, '');
          };

          const showToast = (message) => {
              setToast({ message, visible: true });
              setTimeout(() => setToast({ message: '', visible: false }), 3000);
          };

          const addToCart = (item, isCustom = false, customDetails = null, customAddons = []) => {
              const newItem = {
                  id: Math.random().toString(36).substr(2, 9),
                  name: isCustom ? "Custom Fitness Bowl" : item.name,
                  price: isCustom ? item.price : item.price,
                  image: isCustom ? "/uploads/the_fit_bowl.webp" : item.image,
                  ingredients: isCustom ? null : item.ingredients,
                  isCustom,
                  customDetails,
                  customAddons
              };
              setCart([...cart, newItem]);
              showToast(`${newItem.name} added to cart!`);
          };

          const removeFromCart = (indexToRemove) => {
              const newCart = cart.filter((_, idx) => idx !== indexToRemove);
              setCart(newCart);
              if(newCart.length === 0) {
                  setIsCheckoutStep(false); 
                  setUserDetails(prev => ({...prev, gymPromoCode: ''}));
              }
          };

          const getAddonIcon = (addonName) => {
              if (/egg/i.test(addonName)) return '🥚';
              if (/avocado/i.test(addonName)) return '🥑';
              if (/cheese/i.test(addonName)) return '🧀';
              if (/yogurt|curd/i.test(addonName)) return '🥛';
              if (/hummus/i.test(addonName)) return '🥄';
              if (/guacamole/i.test(addonName)) return '🥑';
              return '✨';
          };

          const toggleCartAddon = (cartIndex, addon) => {
              setCart(prevCart => prevCart.map((item, idx) => {
                  if (idx !== cartIndex) return item;
                  const existing = Array.isArray(item.customAddons) ? item.customAddons : [];
                  const isSelected = existing.includes(addon.name);
                  const nextAddons = isSelected ? existing.filter(name => name !== addon.name) : [...existing, addon.name];
                  const priceDelta = addon.price || 0;
                  return {
                      ...item,
                      customAddons: nextAddons,
                      price: isSelected ? item.price - priceDelta : item.price + priceDelta
                  };
              }));
          };

          const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
          const discountMultiplier = VALID_PROMO_CODES[appliedPromoCode] || 0;
          const discountAmount = Math.floor(cartTotal * discountMultiplier);
          const finalTotal = cartTotal - discountAmount;

          const applyPromoCode = () => {
              const code = promoInputValue.toUpperCase().trim();
              if (!code) {
                  setPromoMessage({ type: 'error', text: '❌ Please enter a promo code' });
                  return;
              }
              if (VALID_PROMO_CODES[code]) {
                  setAppliedPromoCode(code);
                  setPromoMessage({ type: 'success', text: `✅ Code applied! ${VALID_PROMO_CODES[code] * 100}% off` });
                  setPromoInputValue('');
              } else {
                  setPromoMessage({ type: 'error', text: '❌ Invalid or expired promo code' });
                  setPromoInputValue('');
              }
          };

          const removePromoCode = () => {
              setAppliedPromoCode('');
              setPromoInputValue('');
              setPromoMessage({ type: '', text: '' });
          };

          const formatOrderDatePart = () => {
              const now = new Date();
              return `${String(now.getDate()).padStart(2, '0')}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getFullYear()).slice(-2)}`;
          };

          const formatSlotPart = (slot) => {
              const slotText = String(slot || '').toUpperCase();
              const match = slotText.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM|A|P)?/);
              if (!match) return 'ASAP';
              let hour = parseInt(match[1], 10);
              const minutes = match[2] || '00';
              const meridiem = match[3] || (hour >= 12 ? 'P' : 'A');
              if (hour > 12) hour -= 12;
              if (hour === 0) hour = 12;
              return `${hour}${minutes}${meridiem.charAt(0)}`;
          };

          const finalizeOrder = async (e) => {
              e.preventDefault();
              if (!userDetails.name || !userDetails.phone || !userDetails.address) return;
              
              let itemsList = cart.map((item) => {
                  let text = `*${item.name}* (₹${item.price})`;
                  if (item.ingredients) {
                      text += `\n   _${item.ingredients}_`;
                  }
                  if (item.isCustom) {
                      const customText = item.customDetails.replace(/\n/g, ' ');
                      if (customText) text += `\n   _${customText}_`;
                      if (item.customAddons && item.customAddons.length > 0) {
                          text += `\n   Add-ons: ${item.customAddons.join(', ')}`;
                      }
                  }
                  return text;
              }).join('\n');

              const orderPayload = {
                  name: userDetails.name,
                  phone: userDetails.phone,
                  deliveryType: userDetails.deliveryType,
                  address: userDetails.address,
                  landmark: userDetails.landmark,
                  items: itemsList,
                  totalPrice: finalTotal,
                  deliveryDate: userDetails.dateValue || userDetails.dateLabel,
                  deliveryDateLabel: userDetails.dateLabel,
                  timeSlot: userDetails.timeSlot,
                  gymPromoCode: appliedPromoCode
              };

              let orderId = 'TUB-xxxx-xxxx-9701';

              try {
                  const response = await fetch('/api/orders', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(orderPayload)
                  });
                  const data = await response.json();
                  if (data && data.orderId) {
                      orderId = data.orderId;
                  }
              } catch (err) {
                  console.error("Error saving on server:", err);
              }

              let message = `*New Order from TUB Fit*\n*Order ID:* ${orderId}\n\n`;
              message += `*Customer Details:*\n👤 Name: ${userDetails.name}\n📱 Phone: ${userDetails.phone}\n📍 Delivery To: ${userDetails.deliveryType.toUpperCase()}\n📅 Date: ${userDetails.dateLabel}\n⏰ Time Slot: ${userDetails.timeSlot}\n🏠 Address/Location: ${userDetails.address}\n`;
              if (userDetails.landmark) {
                  message += `📍 Landmark: ${userDetails.landmark}\n`;
              }
              message += `\n*Order Items:*\n${itemsList}\n`;
              
              if (discountAmount > 0) {
                  message += `\n*Subtotal: ₹${cartTotal}*\n*Discount (${appliedPromoCode}): -₹${discountAmount}*\n*Final Amount: ₹${finalTotal}*`;
              } else {
                  message += `\n*Total Amount: ₹${finalTotal}*`;
              }
              
              window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
              setIsCartOpen(false);
              setCart([]);
              setIsCheckoutStep(false);
              setAppliedPromoCode('');
              setPromoInputValue('');
              setPromoMessage({ type: '', text: '' });
          };

          const openSubscription = (planName) => {
              const msg = `Hi TUB Fit! I am interested in subscribing to the *${planName}*. Please share the details!`;
              window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
          };

          const getFreeDietPlan = (planType) => {
              const msg = `Hi TUB Fit! I'd love to get the Free 7-Day ${planType} Diet Plan! 🥗`;
              window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
          };

          const selectBase = (item) => setSelectedBase(item);

          const selectProtein = (item) => setSelectedProtein(item);

          const toggleVeggie = (item) => {
            setSelectedVeggies(prev => prev.some(v => v.id === item.id) ? prev.filter(v => v.id !== item.id) : [...prev, item]);
          };

          const addAddon = (item) => {
            setSelectedAddons(prev => prev.some(a => a.id === item.id) ? prev.filter(a => a.id !== item.id) : [...prev, item]);
          };

          const toggleTopping = (item) => {
            setSelectedToppings(prev => prev.some(t => t.id === item.id) ? prev.filter(t => t.id !== item.id) : [...prev, item]);
          };

          const toggleDressing = (item) => {
            setSelectedDressings(prev => prev.some(d => d.id === item.id) ? prev.filter(d => d.id !== item.id) : [...prev, item]);
          };

          const removeSelectedItem = (item) => {
            if (item.group === 'base') {
              return;
            }

            if (!item.canRemove) {
              return;
            }

            if (item.group === 'protein') {
              setSelectedProtein(null);
              return;
            }

            if (item.group === 'veggies') {
              setSelectedVeggies(prev => prev.filter(v => v.id !== item.id));
              return;
            }

            if (item.group === 'addons') {
              setSelectedAddons(prev => prev.filter(a => a.id !== item.id));
              return;
            }

            if (item.group === 'toppings') {
              setSelectedToppings(prev => prev.filter(t => t.id !== item.id));
              return;
            }

            if (item.group === 'dressings') {
              setSelectedDressings(prev => prev.filter(d => d.id !== item.id));
            }
          };

          const VEGGIE_FREE_LIMIT = 4;
          const TOPPING_FREE_LIMIT = 2;
          const DRESSING_FREE_LIMIT = 1;
          const VEGGIE_EXTRA_PRICE = 15;
          const TOPPING_EXTRA_PRICE = 15;
          const DRESSING_EXTRA_PRICE = 10;
          const DRY_BASE_IDS = ['b1', 'b2', 'b3', 'b6'];
          const DRY_PROTEIN_IDS = ['p1', 'p2', 'p5', 'p7'];
          const DRY_VEGGIE_IDS = ['v1', 'v2', 'v3', 'v6', 'v7'];
          const DRY_TOPPING_IDS = ['t1', 't2', 't3', 't4', 't5'];
          const DRY_ADDON_IDS = ['a1', 'a2', 'a3', 'a5'];
          const MOIST_BASE_IDS = ['b4', 'b5'];
          const MOIST_PROTEIN_IDS = ['p3', 'p4', 'p6'];
          const MOIST_VEGGIE_IDS = ['v4', 'v5', 'v8'];
          const MOIST_ADDON_IDS = ['a4', 'a6'];
          const DRY_UPSELL_ADDON_IDS = ['a4', 'a6'];

          const selectedIngredientEntries = [
            selectedBase ? { group: 'base', id: selectedBase.id } : null,
            selectedProtein ? { group: 'protein', id: selectedProtein.id } : null,
            ...selectedVeggies.map(item => ({ group: 'veggies', id: item.id })),
            ...selectedToppings.map(item => ({ group: 'toppings', id: item.id })),
            ...selectedAddons.map(item => ({ group: 'addons', id: item.id }))
          ].filter(Boolean);

          const isDryIngredient = (entry) => {
            if (entry.group === 'base') return DRY_BASE_IDS.includes(entry.id);
            if (entry.group === 'protein') return DRY_PROTEIN_IDS.includes(entry.id);
            if (entry.group === 'veggies') return DRY_VEGGIE_IDS.includes(entry.id);
            if (entry.group === 'toppings') return DRY_TOPPING_IDS.includes(entry.id);
            if (entry.group === 'addons') return DRY_ADDON_IDS.includes(entry.id);
            return false;
          };

          const isMoistIngredient = (entry) => {
            if (entry.group === 'base') return MOIST_BASE_IDS.includes(entry.id);
            if (entry.group === 'protein') return MOIST_PROTEIN_IDS.includes(entry.id);
            if (entry.group === 'veggies') return MOIST_VEGGIE_IDS.includes(entry.id);
            if (entry.group === 'addons') return MOIST_ADDON_IDS.includes(entry.id);
            return false;
          };

          const dryComboSignature = [
            ...selectedIngredientEntries.map(entry => `${entry.group}:${entry.id}`),
            ...selectedDressings.map(item => `dressings:${item.id}`)
          ].sort().join('|');
          const hasSelectedCore = !!selectedBase && !!selectedProtein;
          const hasAnyMoisture = selectedDressings.length > 0 || selectedIngredientEntries.some(isMoistIngredient);
          const allSelectedAreDry = selectedIngredientEntries.length > 0 && selectedIngredientEntries.every(isDryIngredient);
          const dryComboDetected = hasSelectedCore && !hasAnyMoisture && allSelectedAreDry;

          const dryComboSuggestions = dryComboDetected
            ? builderIngredients.addons
                .filter(item => DRY_UPSELL_ADDON_IDS.includes(item.id))
                .filter(item => !selectedAddons.some(selected => selected.id === item.id))
            : [];

          const dryComboSuggestionsVisible = dryComboDetected
            && dryComboSuggestions.length > 0
            && dismissedDryComboSignature !== dryComboSignature;

          const acceptDryComboSuggestion = (suggestion) => {
            setSelectedAddons(prev => prev.some(item => item.id === suggestion.id) ? prev : [...prev, suggestion]);
            setDismissedDryComboSignature(dryComboSignature);
            showToast(`${suggestion.name} added (+\u20B9${suggestion.price}).`);
          };

          const dismissDryComboSuggestion = () => {
            setDismissedDryComboSignature(dryComboSignature);
          };

          const calculateCustomTotals = () => {
            let price = BASE_BOWL_PRICE;
            let calories = 0;
            let protein = 0;
            let carbs = 0;
            let fats = 0;

            const selectedItems = [
              selectedBase,
              selectedProtein,
              ...selectedVeggies,
              ...selectedAddons,
              ...selectedToppings,
              ...selectedDressings
            ].filter(Boolean);

            selectedItems.forEach(item => {
              calories += item.calories || 0;
              protein += item.protein || 0;
              carbs += item.carbs || 0;
              fats += item.fats || 0;
            });

            price += selectedAddons.reduce((sum, item) => sum + (item.price || 0), 0);
            price += selectedVeggies.filter(item => item.premium).reduce((sum, item) => sum + (item.price || 0), 0);

            const standardVeggiesCount = selectedVeggies.filter(item => !item.premium).length;
            if (standardVeggiesCount > VEGGIE_FREE_LIMIT) {
              price += (standardVeggiesCount - VEGGIE_FREE_LIMIT) * VEGGIE_EXTRA_PRICE;
            }

            const paidToppings = Math.max(0, selectedToppings.length - TOPPING_FREE_LIMIT);
            price += paidToppings * TOPPING_EXTRA_PRICE;

            const paidDressings = Math.max(0, selectedDressings.length - DRESSING_FREE_LIMIT);
            price += paidDressings * DRESSING_EXTRA_PRICE;

            return { price, calories, protein, carbs, fats };
          };
          const totals = calculateCustomTotals();
          const hasExtraIngredient = selectedVeggies.length > 0 || selectedAddons.length > 0 || selectedToppings.length > 0 || selectedDressings.length > 0;
          const canAddCustom = !!selectedBase && !!selectedProtein && hasExtraIngredient;

          const getSummaryItems = () => {
            const items = [];
            if (selectedBase) items.push({ key: `base-${selectedBase.id}`, id: selectedBase.id, group: 'base', name: selectedBase.name, price: 0, canRemove: false });
            if (selectedProtein) items.push({ key: `protein-${selectedProtein.id}`, id: selectedProtein.id, group: 'protein', name: selectedProtein.name, price: 0, canRemove: true });

            selectedVeggies.forEach((item, index) => {
              const price = item.premium ? item.price : index >= VEGGIE_FREE_LIMIT ? VEGGIE_EXTRA_PRICE : 0;
              const priceNote = item.premium
                ? 'Premium add-on charge applied.'
                : index >= VEGGIE_FREE_LIMIT
                  ? `Extra veggie charge applied (+₹${VEGGIE_EXTRA_PRICE}).`
                  : '';
              items.push({ key: `veggies-${item.id}`, id: item.id, group: 'veggies', name: item.name, price, canRemove: true, priceNote });
            });

            selectedAddons.forEach(item => items.push({ key: `addons-${item.id}`, id: item.id, group: 'addons', name: item.name, price: item.price, canRemove: true, priceNote: item.price > 0 ? 'Add-on charge applied.' : '' }));
            selectedToppings.forEach((item, index) => items.push({
              key: `toppings-${item.id}`,
              id: item.id,
              group: 'toppings',
              name: item.name,
              price: index >= TOPPING_FREE_LIMIT ? TOPPING_EXTRA_PRICE : 0,
              canRemove: true,
              priceNote: index >= TOPPING_FREE_LIMIT ? `Extra topping charge applied (+₹${TOPPING_EXTRA_PRICE}).` : ''
            }));
            selectedDressings.forEach((item, index) => items.push({
              key: `dressings-${item.id}`,
              id: item.id,
              group: 'dressings',
              name: item.name,
              price: index >= DRESSING_FREE_LIMIT ? DRESSING_EXTRA_PRICE : 0,
              canRemove: true,
              priceNote: index >= DRESSING_FREE_LIMIT ? `Extra dressing charge applied (+₹${DRESSING_EXTRA_PRICE}).` : ''
            }));
            return items;
          };
          const summaryItems = getSummaryItems();

          const handleAddCustomToCart = () => {
            if (!selectedBase || !selectedProtein) {
              showToast('Please select a base and protein before adding your custom bowl.');
              return;
            }
            if (!hasExtraIngredient) {
              showToast('Please add at least one veggie, topping, dressing, or addon to make the bowl worth ₹199.');
              return;
            }

            const selectedNames = [
              selectedBase?.name,
              selectedProtein?.name,
              ...selectedVeggies.map(item => item.name),
              ...selectedToppings.map(item => item.name),
              ...selectedDressings.map(item => item.name)
            ].filter(Boolean);

            const customAddons = selectedAddons.map(item => item.name);
            const details = `Ingredients: ${selectedNames.join(', ') || 'Custom Bowl'}`;
            addToCart({ name: "Build Your Own Bowl", price: totals.price }, true, details, customAddons);
            setSelectedBase(null);
            setSelectedProtein(null);
            setSelectedVeggies([]);
            setSelectedAddons([]);
            setSelectedToppings([]);
            setSelectedDressings([]);
            setDismissedDryComboSignature('');
            setCurrentStepIndex(0);
          };

          const steps = [
            { id: 'base', title: '1. Choose Your Base', description: 'Single choice. Pick one foundational bowl base.', icon: 'fa-bowl-food', items: builderIngredients.bases, action: selectBase, selected: selectedBase, isSingle: true },
            { id: 'protein', title: '2. Choose Your Protein', description: 'Single choice. Select your protein source.', icon: 'fa-dumbbell', items: builderIngredients.proteins, action: selectProtein, selected: selectedProtein, isSingle: true },
            { id: 'veggies', title: '3. Choose Your Veggies', description: (<>
                <div className="flex items-center gap-2 text-sm text-gray-600 leading-tight">
                  <span>🥦</span>
                  <span><strong className="font-semibold text-gray-900">4 veggies included</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 leading-tight">
                  <span>🥑</span>
                  <span>Avocado +₹80</span>
                </div>
              </>), icon: 'fa-leaf', items: builderIngredients.veggies, action: toggleVeggie, selected: selectedVeggies, isSingle: false },
            { id: 'toppings', title: '4. Choose Your Toppings', description: (<>
                <div className="flex items-center gap-2 text-sm text-gray-600 leading-tight">
                  <span>🥜</span>
                  <span><strong className="font-semibold text-gray-900">2 toppings included</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 leading-tight">
                  <span>➕</span>
                  <span>Extras add ₹15</span>
                </div>
              </>), icon: 'fa-seedling', items: builderIngredients.toppings, action: toggleTopping, selected: selectedToppings, isSingle: false },
            { id: 'dressings', title: '5. Choose Dressings', description: (<>
                <div className="flex items-center gap-2 text-sm text-gray-600 leading-tight">
                  <span>🥗</span>
                  <span><strong className="font-semibold text-gray-900">1 dressing included</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 leading-tight">
                  <span>➕</span>
                  <span>Extras add ₹10</span>
                </div>
              </>), icon: 'fa-prescription-bottle', items: builderIngredients.dressings, action: toggleDressing, selected: selectedDressings, isSingle: false },
          ];

          const currentStep = steps[currentStepIndex];
          const stepItems = currentStep.id === 'addons'
            ? currentStep.items.filter(opt => ['Extra Egg', 'Extra Avocado', 'Greek Yogurt Dressing'].includes(opt.name))
            : currentStep.items;
          const canProceedToNext = currentStep.id === 'base' ? !!selectedBase : currentStep.id === 'protein' ? !!selectedProtein : true;
          const canFinishCustom = currentStep.id === 'dressings' ? selectedDressings.length > 0 : true;
          const isFinalCustomStep = currentStepIndex === steps.length - 1;

          const goToSummaryCard = () => {
            const summaryCard = document.getElementById('summary-card');
            if (summaryCard) {
              summaryCard.scrollIntoView({ behavior: 'smooth' });
            }
          };

          return (
            <div className="bg-white text-gray-800 selection:bg-green-200 pb-20 md:pb-0 relative">
              
              {/* Toast Notification */}
              {toast.visible && (
                  <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce whitespace-nowrap">
                      <i className="fas fa-check-circle text-green-400"></i>
                      <span className="font-medium text-sm">{toast.message}</span>
                  </div>
              )}

              {/* Cart Modal Overlay */}
              {isCartOpen && (
                  <div className="fixed inset-0 bg-black/60 z-[100] flex justify-end">
                      <div className="bg-white w-full md:w-[420px] h-full flex flex-col shadow-2xl animate-slide-in-right">
                          <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                              <h3 className="font-bold text-xl text-gray-900">
                                  {isCheckoutStep ? "Delivery Details" : "Your Cart"}
                              </h3>
                              <button onClick={() => { setIsCartOpen(false); setIsCheckoutStep(false); }} className="text-gray-400 hover:text-gray-900 text-3xl leading-none">&times;</button>
                          </div>
                          
                          <div className="flex-1 overflow-y-auto p-6">
                              {cart.length === 0 ? (
                                  <div className="text-center text-gray-400 mt-20 flex flex-col items-center">
                                      <i className="fas fa-shopping-cart text-5xl mb-4 opacity-50"></i>
                                      <p>Your cart is empty</p>
                                      <button onClick={() => setIsCartOpen(false)} className="mt-6 px-6 py-2 bg-green-100 text-green-700 rounded-full font-semibold text-sm">Browse Menu</button>
                                  </div>
                              ) : !isCheckoutStep ? (
                                  <div className="space-y-4">
                                      {cart.map((item, idx) => (
                                          <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative flex gap-4 items-start">
                                              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-white shadow-sm" />
                                              <div className="flex-1 min-w-0">
                                                  <h4 className="font-bold text-gray-900 text-sm leading-tight">{item.name}</h4>
                                                  <p className="text-green-600 font-bold text-sm mt-1">₹{item.price}</p>
                                                  {item.isCustom && <p className="text-[10px] text-gray-500 mt-1 leading-relaxed line-clamp-2">{item.customDetails}</p>}
                                                  {item.isCustom && item.customAddons && item.customAddons.length > 0 && (
                                                    <p className="text-[10px] text-gray-600 mt-1 leading-relaxed">
                                                      <span className="font-semibold">Add-ons:</span> {item.customAddons.join(', ')}
                                                    </p>
                                                  )}
                                                  {(
                                                    <div className="mt-3 rounded-xl border border-green-200 bg-gradient-to-br from-green-50 via-white to-emerald-50 p-3 shadow-sm w-full">
                                                      <div className="flex items-center justify-between mb-2">
                                                        <p className="text-[11px] font-bold text-green-800 uppercase tracking-wide">Customize Add-ons</p>
                                                        <span className="text-[10px] text-green-600">Tap to add/remove</span>
                                                      </div>
                                                      <div className="flex gap-2 w-full overflow-x-auto pb-1 pr-1 hide-scrollbar">
                                                        {builderIngredients.addons
                                                        .map((rawAddon) => {
                                                          const addon = rawAddon.name === 'Extra Avocado' ? { ...rawAddon, name: 'Avocado', price: 80 } : rawAddon.name === 'Extra Egg' ? { ...rawAddon, name: 'Eggs' } : rawAddon.name === 'Greek Yogurt Dressing' ? { ...rawAddon, name: 'Yogurt' } : rawAddon;
                                                          const selected = (item.customAddons || []).includes(addon.name);
                                                          return (
                                                            <button
                                                              key={`cart-addon-${idx}-${addon.id}`}
                                                              type="button"
                                                              onClick={() => toggleCartAddon(idx, addon)}
                                                              className={`min-w-[130px] sm:min-w-[150px] shrink-0 rounded-lg border px-3 py-2.5 text-left transition-all ${selected ? 'border-green-500 bg-gradient-to-br from-green-100 to-emerald-100 shadow-sm ring-1 ring-green-300' : 'border-green-200 bg-white hover:border-green-400 hover:bg-green-50/60 hover:shadow-sm'}`}
                                                            >
                                                              <div className="flex flex-col items-start gap-1 min-h-[42px] min-w-0 w-full">
                                                                <span className={`text-[11px] font-semibold leading-tight break-words [overflow-wrap:anywhere] w-full ${selected ? 'text-green-900' : 'text-gray-700'}`}>
                                                                  {getAddonIcon(addon.name)} {addon.name}
                                                                </span>
                                                                <span className={`text-[10px] font-bold whitespace-nowrap px-2 py-0.5 rounded-full ${selected ? 'text-green-800 bg-white/80' : 'text-green-700 bg-green-50'}`}>
                                                                  {addon.price > 0 ? `+\u20B9${addon.price}` : 'Free'}
                                                                </span>
                                                              </div>
                                                            </button>
                                                          );
                                                        })}
                                                      </div>
                                                    </div>
                                                  )}
                                              </div>
                                              <button onClick={() => removeFromCart(idx)} className="shrink-0 text-red-300 hover:text-red-500 transition-colors bg-red-50 w-8 h-8 flex items-center justify-center rounded-full"><i className="fas fa-trash text-xs"></i></button>
                                          </div>
                                      ))}
                                      <div className="pt-6 mt-4 border-t border-gray-100">
                                          <div className="flex justify-between items-center text-sm mb-1">
                                              <span className="text-gray-500">Subtotal</span>
                                              <span className="font-semibold text-gray-900">₹{cartTotal}</span>
                                          </div>
                                          {discountAmount > 0 && (
                                              <div className="flex justify-between items-center text-sm mb-2 text-green-600">
                                                  <span>Discount ({appliedPromoCode})</span>
                                                  <span className="font-semibold">-₹{discountAmount}</span>
                                              </div>
                                          )}
                                          <div className="flex justify-between items-center pt-2">
                                              <span className="text-gray-900 font-bold">Total Amount</span>
                                              <span className="font-bold text-2xl text-gray-900">₹{finalTotal}</span>
                                          </div>
                                      </div>
                                      <p className="text-center text-xs text-gray-500 mt-2 italic">Free delivery on orders above ₹299. Standard delivery fees apply below.</p>
                                  </div>
                              ) : (
                                  <form id="checkoutForm" onSubmit={finalizeOrder} className="space-y-5">
                                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                          <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Order Summary</p>
                                          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                                              {cart.map((item, idx) => (
                                                  <div key={`checkout-${idx}`} className="text-xs text-gray-700">
                                                      <div className="flex justify-between gap-2">
                                                          <span className="font-medium">{item.name}</span>
                                                          <span className="font-semibold">{`\u20B9${item.price}`}</span>
                                                      </div>
                                                      {item.isCustom && item.customAddons && item.customAddons.length > 0 && (
                                                          <p className="text-[11px] text-gray-500 mt-1">
                                                              Add-ons: {item.customAddons.join(', ')}
                                                          </p>
                                                      )}
                                                  </div>
                                              ))}
                                          </div>
                                          <div className="mt-3 pt-3 border-t border-gray-200">
                                              <div className="flex justify-between text-xs mb-1">
                                                  <span className="text-gray-600">Subtotal</span>
                                                  <span className="font-semibold">₹{cartTotal}</span>
                                              </div>
                                              {discountAmount > 0 && (
                                                  <div className="flex justify-between text-xs mb-1 text-green-600">
                                                      <span>Discount ({appliedPromoCode})</span>
                                                      <span className="font-semibold">-₹{discountAmount}</span>
                                                  </div>
                                              )}
                                              <div className="flex justify-between font-bold text-sm mt-1">
                                                  <span className="text-gray-800">Total</span>
                                                  <span className="text-green-600">₹{finalTotal}</span>
                                              </div>
                                          </div>
                                      </div>
                                      <div>
                                          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                          <input required type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" value={userDetails.name} onChange={e => setUserDetails({...userDetails, name: e.target.value})} placeholder="e.g. Rahul Sharma" />
                                      </div>
                                      <div>
                                          <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                                          <input required type="tel" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" value={userDetails.phone} onChange={e => setUserDetails({...userDetails, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" />
                                      </div>
                                      <div className="flex flex-col sm:flex-row gap-3 mb-2">
                                          <div className="flex-1">
                                              <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Date</label>
                                              <select required className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" value={userDetails.dateOffset} onChange={e => {
                                                  const newOffset = parseInt(e.target.value);
                                                  const slots = generateTimeSlots(newOffset);
                                                  const selectedDateObj = availableDates.find(d => d.value === newOffset);
                                                  setAvailableTimeSlots(slots);
                                                  setUserDetails({...userDetails, dateOffset: newOffset, dateLabel: selectedDateObj ? selectedDateObj.label : '', dateValue: selectedDateObj ? selectedDateObj.dateValue : '', timeSlot: slots[0] || ''});
                                              }}>
                                                  {availableDates.map((d, idx) => (
                                                      <option key={idx} value={d.value}>{d.label}</option>
                                                  ))}
                                              </select>
                                          </div>
                                          <div className="flex-1">
                                              <label className="block text-sm font-semibold text-gray-700 mb-1">Time Slot</label>
                                              <select required className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" value={userDetails.timeSlot} onChange={e => setUserDetails({...userDetails, timeSlot: e.target.value})}>
                                                  {availableTimeSlots.map((slot, idx) => (
                                                      <option key={idx} value={slot}>{slot}</option>
                                                  ))}
                                              </select>
                                          </div>
                                      </div>
                                      <div>
                                          <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Location</label>
                                          <div className="flex gap-4 mb-3">
                                              <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 cursor-pointer transition-all ${userDetails.deliveryType === 'home' ? 'border-green-500 bg-green-50 text-green-700 font-bold' : 'border-gray-200 bg-white text-gray-500 hover:border-green-200'}`}>
                                                  <input type="radio" className="hidden" name="deliveryType" checked={userDetails.deliveryType === 'home'} onChange={() => setUserDetails({...userDetails, deliveryType: 'home'})} />
                                                  <i className="fas fa-home"></i> Home
                                              </label>
                                              <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 cursor-pointer transition-all ${userDetails.deliveryType === 'gym' ? 'border-green-500 bg-green-50 text-green-700 font-bold' : 'border-gray-200 bg-white text-gray-500 hover:border-green-200'}`}>
                                                  <input type="radio" className="hidden" name="deliveryType" checked={userDetails.deliveryType === 'gym'} onChange={() => setUserDetails({...userDetails, deliveryType: 'gym'})} />
                                                  <i className="fas fa-dumbbell"></i> Gym
                                              </label>
                                          </div>
                                          <textarea required className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 h-28 resize-none transition-all" value={userDetails.address} onChange={e => setUserDetails({...userDetails, address: e.target.value})} placeholder={userDetails.deliveryType === 'home' ? "House/Flat No, Building, Area..." : "Gym Name, Sector/Area..."}></textarea>
                                      </div>
                                      <div className="mt-4">
                                          <label className="block text-sm font-semibold text-gray-700 mb-2">Landmark (Optional)</label>
                                          <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" value={userDetails.landmark} onChange={e => setUserDetails({...userDetails, landmark: e.target.value})} placeholder={userDetails.deliveryType === 'home' ? "Landmark, e.g. Near Metro Station" : "Landmark or entrance note"} />
                                      </div>
                                      <div className="mt-4">
                                          <label className="block text-sm font-semibold text-gray-700 mb-2">Gym Promo Code (Optional)</label>
                                          {appliedPromoCode ? (
                                              <div className="flex gap-2 items-center">
                                                  <div className="flex-1 p-3.5 bg-green-50 border border-green-300 rounded-xl font-semibold text-green-700">
                                                      ✅ {appliedPromoCode} - {VALID_PROMO_CODES[appliedPromoCode] * 100}% off applied
                                                  </div>
                                                  <button type="button" onClick={removePromoCode} className="bg-red-500 text-white px-4 py-3.5 rounded-xl font-bold hover:bg-red-600 transition-all">Remove</button>
                                              </div>
                                          ) : (
                                              <div className="flex gap-2">
                                                  <input type="text" name="promo_code_no_autofill" autoComplete="off" className="flex-1 p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all uppercase" value={promoInputValue} onChange={e => setPromoInputValue(e.target.value.toUpperCase())} placeholder="Enter promo code" />
                                                  <button type="button" onClick={applyPromoCode} className="bg-green-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-green-700 transition-all">Apply</button>
                                              </div>
                                          )}
                                          {promoMessage.text && (
                                              <p className={`text-xs mt-2 font-semibold ${promoMessage.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>{promoMessage.text}</p>
                                          )}
                                      </div>
                                  </form>
                              )}
                          </div>
                          
                          <div className="p-6 border-t bg-white">
                              {cart.length > 0 && !isCheckoutStep && (
                                  <button onClick={() => setIsCheckoutStep(true)} className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black shadow-xl shadow-gray-900/20 flex justify-center items-center gap-2 transition-all">
                                      Proceed to Checkout <i className="fas fa-arrow-right"></i>
                                  </button>
                              )}
                              {isCheckoutStep && (
                                  <div className="flex gap-3">
                                      <button type="button" onClick={() => setIsCheckoutStep(false)} className="w-1/3 bg-gray-100 text-gray-800 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all">Back</button>
                                      <button type="submit" form="checkoutForm" className="w-2/3 bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1ebd5a] shadow-xl shadow-[#25D366]/30 flex justify-center items-center gap-2 transition-all">
                                          <i className="fab fa-whatsapp text-xl"></i> Send Order
                                      </button>
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              )}

              {/* Navigation */}
              <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-green-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                  <div className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                    <div className="bg-gradient-to-br from-[#4ade80] to-[#25D366] w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center relative border border-green-300 shrink-0">
                      <span className="text-transparent text-4xl mt-1" style={{ textShadow: '0 0 0 #064e3b' }}>💪</span>
                      <i className="fas fa-leaf absolute -top-2 -right-2 text-[22px] text-lime-200 transform rotate-[15deg] drop-shadow-md"></i>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="font-sans font-black text-3xl tracking-tighter flex items-baseline lowercase leading-none">
                        <span className="text-green-800">tub</span>
                        <span className="text-[#25D366] flex items-baseline">
                          f
                          <span className="relative inline-flex flex-col items-center justify-end mx-[0.5px]">
                            <i className="fas fa-leaf absolute -top-2 text-[12px] text-[#25D366] transform -rotate-12 drop-shadow-sm"></i>
                            <span>ı</span>
                          </span>
                          t
                        </span>
                      </div>
                      <p className="text-[9px] uppercase font-bold text-gray-400 tracking-[0.25em] pl-0.5 mt-1">The Ultimate Bowl</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-green-500/30">
                      <i className="fas fa-shopping-cart text-md"></i>
                      <span className="hidden sm:inline">{cart.length > 0 ? "View Cart" : "Order Now"}</span>
                      {cart.length > 0 && (
                        <span className="bg-white text-[#25D366] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ml-1">
                          {cart.length}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </nav>


              {/* Hero Section */}
              <section className="relative overflow-hidden bg-gradient-to-b from-[#F2FBF0] to-white py-16 md:py-28">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-gradient-to-br from-green-300/30 to-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[400px] h-[400px] bg-gradient-to-tr from-lime-200/30 to-green-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-green-100 shadow-sm text-green-700 font-bold text-xs tracking-wide uppercase mb-6">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      Fresh & Macro-Calculated
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
                      Custom Bowls for<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-emerald-600 drop-shadow-sm">
                        Every Fitness Goal
                      </span>
                    </h1>
                    <p className="text-lg md:text-xl font-medium text-gray-600 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
                      Chef-crafted, nutritionist-approved diet bowls delivered fresh to your door. Hit your macros without sacrificing taste.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start mb-10">
                      <a href="#menu" className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-full font-bold text-lg transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 flex items-center justify-center gap-3">
                        Order Now <i className="fas fa-arrow-right text-[#25D366]"></i>
                      </a>
                      <a href="#builder" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-full font-bold text-lg transition-all border border-gray-200 shadow-sm flex items-center justify-center gap-3 hover:-translate-y-1">
                        Build Custom Bowl <i className="fas fa-sliders-h text-gray-400"></i>
                      </a>
                    </div>

                    {/* Social Proof */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                      <div className="flex -space-x-3">
                        <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
                        <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="User" />
                        <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="User" />
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold shadow-sm">+2k</div>
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        <span className="text-yellow-400"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></span>
                        <br/>Loved by Delhi Athletes
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 relative w-full max-w-lg lg:max-w-xl flex justify-center mt-8 md:mt-0">
                    <div className="relative w-full aspect-square max-w-[400px] lg:max-w-[500px]">
                       <div className="absolute inset-0 bg-green-400/20 rounded-full blur-3xl transform scale-110"></div>
                       
                       <div className="relative rounded-full aspect-square overflow-hidden shadow-2xl ring-[12px] ring-white hover:scale-105 transition-transform duration-700 ease-out z-10">
                         <img src="/hero_section.webp" alt="Premium Fitness Bowl" className="w-full h-full object-cover" fetchpriority="high" />
                       </div>

                       {/* Floating Badges */}
                       <div className="absolute top-10 left-2 sm:-left-6 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-sm">
                            <i className="fas fa-fire"></i>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Calories</p>
                            <p className="text-sm font-black text-gray-800">~600 kcal</p>
                          </div>
                       </div>

                       <div className="absolute bottom-20 right-2 sm:-right-8 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 z-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center text-sm">
                            <i className="fas fa-dumbbell"></i>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Protein</p>
                            <p className="text-sm font-black text-gray-800">100g</p>
                          </div>
                       </div>

                       <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-2 rounded-full shadow-xl border-4 border-white flex items-center gap-2 z-20 whitespace-nowrap">
                          <i className="fas fa-leaf text-[#25D366]"></i>
                          <span className="font-bold text-sm tracking-wide">100% Fresh Ingredients</span>
                       </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Delivery Banner */}
              <section className="bg-gray-900 text-white py-4 border-b-4 border-green-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-center items-center gap-6 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-green-400 text-lg"></i>
                    <span>Delivering fresh across South Delhi</span>
                  </div>
                </div>
              </section>

              {/* Menu Section - SINGLE TRACK SEAMLESS SCROLL */}
              <section id="menu" className="py-20 bg-white overflow-hidden border-b border-gray-100 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Premium Menu</h3>
                    <div className="flex justify-center mb-3">
                      <div className="text-2xl animate-bounce text-green-600">
                        <i className="fas fa-hand-pointer mr-1"></i>
                        <i className="fas fa-arrow-right text-lg" style={{ animation: 'slideRight 1.5s ease-in-out infinite' }}></i>
                      </div>
                      <style>{`
                        @keyframes slideRight {
                          0%, 100% { transform: translateX(0); opacity: 0.5; }
                          50% { transform: translateX(8px); opacity: 1; }
                        }
                      `}</style>
                    </div>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-4">Swipe to view our bowls designed to help you reach your goals.</p>
                    <p className="text-xs text-gray-400 max-w-2xl mx-auto mb-6">👉 Nutritional values are approximate</p>

                    <div ref={tabsContainerRef} className="inline-flex bg-gray-50 p-1.5 rounded-full shadow-sm border border-gray-200 overflow-x-auto max-w-full hide-scrollbar relative scroll-smooth">
                      {categories.map(category => (
                        <button
                          key={category}
                          id={`tab-${category.replace(/[^a-zA-Z0-9]/g, '')}`}
                          onClick={() => handleTabClick(category)}
                          className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                            activeMenuTab === category ? 'bg-gray-900 text-white shadow-md' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                          }`}
                        >
                          {category === "Muscle Gain" && <span className="relative inline-flex items-center justify-center mr-2">
                              <span className="text-transparent" style={{ textShadow: '0 0 0 #166534' }}>💪</span>
                              <i className="fas fa-leaf absolute -top-1 -right-2 text-[13px] text-[#25D366] transform rotate-[15deg] drop-shadow-sm"></i>
                            </span>
                          }
                          {category === "Fat Loss" && "🔥 "}
                          {category === "Max Protein" && "💥 "}
                          {category === "Premium Salads" && "🥗 "}
                          {category === "Breakfast" && "🍳 "}
                          {category === "Guilt-Free Add-ons" && "🥤 "}
                          {category} <span className="ml-1 opacity-80 text-xs">({balancedMenuData[category].length})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <button onClick={() => scrollMenu('left')} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-10 bg-white w-12 h-12 rounded-full shadow-xl items-center justify-center text-gray-600 hover:text-green-600 border border-gray-100 transition-colors">
                        <i className="fas fa-chevron-left text-lg"></i>
                    </button>
                    <button onClick={() => scrollMenu('right')} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-10 bg-white w-12 h-12 rounded-full shadow-xl items-center justify-center text-gray-600 hover:text-green-600 border border-gray-100 transition-colors">
                        <i className="fas fa-chevron-right text-lg"></i>
                    </button>

                    <div ref={scrollContainerRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 px-4 sm:px-2 hide-scrollbar -mx-4 sm:mx-0 relative scroll-smooth">
                      
                      {categories.map((category, catIndex) => (
                          <React.Fragment key={category}>
                              {balancedMenuData[category].map((item, itemIndex) => (
                                <div 
                                    key={item.id} 
                                    data-category={category}
                                    id={itemIndex === 0 ? `first-item-${category.replace(/[^a-zA-Z0-9]/g, '')}` : undefined}
                                    className="menu-card real-menu-item min-w-[85vw] sm:min-w-[340px] max-w-[340px] snap-center snap-always bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col shrink-0 relative hover:-translate-y-1 transition-transform"
                                >
                                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                                    {item.upcoming ? (
                                      <div className="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-br from-gray-900 via-gray-800 to-green-950 shadow-inner">
                                        <i className="fas fa-utensils text-5xl text-emerald-500/30 mb-4"></i>
                                        <div className="border border-emerald-500/30 px-5 py-2 rounded-full bg-emerald-500/10 backdrop-blur-sm shadow-lg">
                                          <span className="font-bold tracking-widest uppercase text-xs text-emerald-400">Revealing Soon</span>
                                        </div>
                                      </div>
                                    ) : (
                                      <img src={item.image} alt={item.name} className="w-full h-full object-cover bg-white" loading="lazy" decoding="async" />
                                    )}
                                    <div className={`absolute top-4 right-4 backdrop-blur-sm px-3 py-1 rounded-full font-bold shadow-sm ${item.upcoming ? 'bg-black/40 text-emerald-300 border border-emerald-500/20' : 'bg-white/90 text-gray-900'}`}>
                                      {item.upcoming ? '₹???' : `₹${item.price}`}
                                    </div>
                                    {item.badges && (
                                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        {item.badges.map(badge => (
                                          <span key={badge} className={`${badge === 'Beast Mode' ? 'bg-red-600' : badge === 'Coming Soon' ? 'bg-purple-600' : badge === 'New' ? 'bg-orange-500' : 'bg-green-600/95'} backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider shadow-sm`}>{badge}</span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  <div className="p-6 flex flex-col flex-1 bg-gray-50">
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h4>
                                    {item.upcoming ? (
                                      <p className="text-sm text-gray-500 mb-6 flex-1 line-clamp-3">
                                        <span className="font-semibold text-gray-700">Ingredients:</span>{' '}
                                        <span className="text-gray-400 font-medium">{item.description || 'Classified chef secret blend...'}</span>
                                      </p>
                                    ) : (
                                      <p className="text-sm text-gray-500 mb-6 flex-1 line-clamp-3">
                                        <span className="font-semibold text-gray-700">Ingredients:</span>{' '}
                                        {item.ingredients}
                                      </p>
                                    )}
                                    <div className="flex flex-col gap-2 mb-6">
                                      <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-orange-50 text-orange-700 px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border border-orange-100">
                                          <i className="fas fa-fire"></i> {item.upcoming ? '???' : `~${item.calories} kcal`}
                                        </div>
                                        <div className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border border-blue-100">
                                          <i className="fas fa-dumbbell"></i> {item.upcoming ? '???' : `~${item.protein}g P`}
                                        </div>
                                      </div>
                                      {(item.carbs !== undefined || item.fats !== undefined) && (
                                        <div className="flex items-center gap-2">
                                          <div className="flex-1 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border border-emerald-100">
                                            <i className="fas fa-seedling"></i> {item.upcoming ? '???' : `~${formatMacroValue(item.carbs)}g Carbs`}
                                          </div>
                                          <div className="flex-1 bg-pink-50 text-pink-700 px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border border-pink-100">
                                            <i className="fas fa-droplet"></i> {item.upcoming ? '???' : `~${formatMacroValue(item.fats)}g Fats`}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    
                                    {item.upcoming ? (
                                        <button disabled className="w-full bg-gray-300 text-gray-500 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-not-allowed">
                                          <i className="fas fa-clock"></i> Coming Soon
                                        </button>
                                    ) : (
                                        (() => {
                                            const cartIndex = cart.findIndex(c => !c.isCustom && c.name === item.name);
                                            if (cartIndex !== -1) {
                                                return (
                                                    <button onClick={() => removeFromCart(cartIndex)} className="w-full bg-gray-900 hover:bg-red-500 text-white py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg group">
                                                        <i className="fas fa-check-circle text-green-400 group-hover:hidden"></i><i className="fas fa-times-circle hidden group-hover:inline"></i>
                                                        <span className="group-hover:hidden">Added to Cart</span><span className="hidden group-hover:inline">Remove</span>
                                                    </button>
                                                );
                                            }
                                            return (
                                                <button onClick={() => addToCart(item)} className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20">
                                                    <i className="fas fa-plus"></i> Add to Cart
                                                </button>
                                            );
                                        })()
                                    )}
                                  </div>
                                </div>
                              ))}
                              
                              {/* Visual Divider between categories */}
                              {catIndex < categories.length - 1 && (
                                  <div className="min-w-[16px] sm:min-w-[60px] shrink-0 snap-center flex flex-col items-center justify-center opacity-40">
                                      <div className="h-12 w-[2px] bg-gray-300 rounded-full mb-2"></div>
                                      <i className="fas fa-chevron-right text-gray-400 text-sm"></i>
                                      <div className="h-12 w-[2px] bg-gray-300 rounded-full mt-2"></div>
                                  </div>
                              )}
                          </React.Fragment>
                      ))}

                      <div className="min-w-[16px] sm:hidden shrink-0"></div>
                    </div>
                    
                    <p className="text-[10px] text-gray-400 text-center mt-6 italic">* All macros are calculated raw-weight by our certified nutritionists. ±5% variance may occur.</p>
                  </div>
                </div>
              </section>

              {/* WIZARD Custom Builder Section */}
              <section id="builder" className="py-12 md:py-20 bg-gradient-to-br from-white to-gray-50 border-t border-gray-100 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                  <div className="text-center mb-8 md:mb-12">
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Build Your Own Bowl 🛠️</h3>
                    <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">Exactly what you want, nothing you don't.</p>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* WIZARD LEFT SIDE */}
                    <div className="flex-1">
                      <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-lg border border-gray-100">
                        
                        <div className="mb-6 md:mb-8">
                          <div className="flex justify-between text-[10px] sm:text-xs font-bold text-gray-400 mb-2 md:mb-3 uppercase tracking-wider gap-2">
                            <span>Step {currentStepIndex + 1} of {steps.length}</span>
                            <span className="truncate max-w-[44vw] sm:max-w-none">{steps[currentStepIndex].title.split('. ')[1]}</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex">
                            {steps.map((_, i) => (
                              <div key={i} className={`h-full flex-1 border-r border-white transition-colors duration-500 ${i <= currentStepIndex ? 'bg-green-500' : 'bg-gray-100'}`}></div>
                            ))}
                          </div>
                        </div>

                        <div className="min-h-[200px] md:min-h-[250px]">
                          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                            <div className="bg-green-100 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-green-700 rounded-xl">
                              <i className={`${steps[currentStepIndex].icon} text-base md:text-lg`}></i>
                            </div>
                            <h4 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">{steps[currentStepIndex].title}</h4>
                          </div>

                          {true ? (
                            <>
                              <div className="text-sm text-gray-600 mb-4 md:mb-6 space-y-1">{currentStep.description}</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 content-start max-h-[48vh] md:max-h-none overflow-y-auto pr-1">
                                {stepItems.map(opt => {
                                  const isSelected = currentStep.isSingle
                                    ? currentStep.selected?.id === opt.id
                                    : currentStep.selected.some(item => item.id === opt.id);
                                  const label = opt.price > 0 ? `+INR ${opt.price}` : 'Included';
                                  const premiumTag = currentStep.id === 'veggies' && opt.premium ? 'Premium +INR 80' : '';
                                  let selectedChargeNote = '';

                                  if (isSelected && currentStep.id === 'addons' && (opt.price || 0) > 0) {
                                    selectedChargeNote = `Extra add-on charge applied (+INR ${opt.price}).`;
                                  }

                                  if (isSelected && currentStep.id === 'veggies') {
                                    const veggieIndex = selectedVeggies.findIndex(item => item.id === opt.id);
                                    if (opt.premium) {
                                      selectedChargeNote = `Premium veggie charge applied (+INR ${opt.price}).`;
                                    } else if (veggieIndex >= VEGGIE_FREE_LIMIT) {
                                      selectedChargeNote = `Extra veggie charge applied (+INR ${VEGGIE_EXTRA_PRICE}).`;
                                    }
                                  }

                                  if (isSelected && currentStep.id === 'toppings') {
                                    const toppingIndex = selectedToppings.findIndex(item => item.id === opt.id);
                                    if (toppingIndex >= TOPPING_FREE_LIMIT) {
                                      selectedChargeNote = `Extra topping charge applied (+INR ${TOPPING_EXTRA_PRICE}).`;
                                    }
                                  }

                                  if (isSelected && currentStep.id === 'dressings') {
                                    const dressingIndex = selectedDressings.findIndex(item => item.id === opt.id);
                                    if (dressingIndex >= DRESSING_FREE_LIMIT) {
                                      selectedChargeNote = `Extra dressing charge applied (+INR ${DRESSING_EXTRA_PRICE}).`;
                                    }
                                  }

                                  return (
                                    <button
                                      key={opt.id}
                                      onClick={() => currentStep.action(opt)}
                                      className={`p-3 md:p-4 rounded-xl border-2 text-left transition-all ${isSelected ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-100 hover:border-green-300 bg-white hover:bg-gray-50'}`}
                                    >
                                      <div className="flex justify-between items-start mb-1">
                                        <span className={`text-sm md:text-base font-semibold ${isSelected ? 'text-green-800' : 'text-gray-800'}`}>{opt.name}</span>
                                        {isSelected && <i className="fas fa-check-circle text-green-500"></i>}
                                      </div>
                                      <div className="text-[11px] md:text-xs text-gray-500 flex flex-wrap gap-x-2 gap-y-1 mt-1">
                                        <span className="font-medium text-green-700">{premiumTag || label}</span>
                                        <span>•</span><span>~{formatMacroValue(opt.calories)} kcal</span>
                                        <span>•</span><span>~{formatMacroValue(opt.protein)}g P</span>
                                      </div>
                                      {opt.carbs !== undefined && <div className="text-[11px] md:text-xs text-gray-400 mt-1">~{formatMacroValue(opt.carbs)}g Carbs • ~{formatMacroValue(opt.fats)}g Fats</div>}
                                      {selectedChargeNote && <div className="text-[11px] md:text-xs text-orange-600 font-medium mt-1">{selectedChargeNote}</div>}
                                    </button>
                                  );
                                })}
                              </div>
                            </>
                          ) : (
                            <div className="space-y-4">
                              <div className="rounded-3xl border border-green-700 bg-green-50 p-4 text-sm text-green-800">
                                Review your selections and add the bowl to your cart. The summary panel to the right updates instantly as you choose ingredients.
                              </div>
                              <div className="grid gap-3">
                                {summaryItems.length === 0 ? (
                                  <div className="text-center text-gray-500 py-10">No items selected yet. Start from the base and build your bowl.</div>
                                ) : summaryItems.map((item) => (
                                  <div key={item.key} className="flex justify-between items-center rounded-2xl border border-gray-200 bg-white p-4 text-sm">
                                    <div className="flex items-center gap-2">
                                      <span>{item.name}</span>
                                      {item.canRemove ? (
                                        <button onClick={() => removeSelectedItem(item)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label={`Remove ${item.name}`}>
                                          <i className="fas fa-times-circle"></i>
                                        </button>
                                      ) : (
                                        <span className="text-xs text-gray-400">Required</span>
                                      )}
                                    </div>
                                    <span className="font-semibold text-gray-800">{item.price === 0 ? 'Included' : `+\u20B9${item.price}`}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between mt-5 md:mt-8 pt-4 md:pt-6 border-t border-gray-100 gap-2">
                           <button onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))} className={`px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold transition-all flex items-center gap-2 text-sm md:text-base ${currentStepIndex === 0 ? 'opacity-0 pointer-events-none' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                             <i className="fas fa-chevron-left"></i> Back
                           </button>
                           
                           {currentStepIndex < steps.length - 1 ? (
                              <button disabled={!canProceedToNext} onClick={() => setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1))} className={`px-5 md:px-8 py-2.5 md:py-3 rounded-xl font-bold transition-all flex items-center gap-2 text-sm md:text-base ${canProceedToNext ? 'bg-gray-900 text-white hover:bg-black shadow-lg shadow-gray-900/20' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                                Next <i className="fas fa-chevron-right"></i>
                              </button>
                           ) : (
                              <button disabled={!canFinishCustom} onClick={goToSummaryCard} className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 text-sm md:text-base transition-all ${canFinishCustom ? 'bg-green-500 text-white hover:bg-emerald-500 shadow-lg shadow-green-500/20' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                                {canFinishCustom ? 'Your Bowl' : 'Choose a dressing'} <i className="fas fa-arrow-down"></i>
                              </button>
                           )}
                        </div>
                      </div>
                    </div>

                    {/* WIZARD RIGHT SIDE: Sticky Summary Card */}
                    <div className="lg:w-[380px]" id="summary-card">
                      <div className="relative lg:sticky lg:top-24 bg-gray-900 text-white rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl">
                        <h4 className="text-2xl font-bold mb-6">Your Bowl</h4>
                        
                        <div className="space-y-4 mb-8 min-h-[120px]">
                          <div className="flex justify-between items-center text-sm border-b border-gray-700 pb-2">
                            <span className="text-gray-300 font-medium">TUB Fit Base</span>
                            <span className="font-semibold text-white">₹{BASE_BOWL_PRICE}</span>
                          </div>
                          {summaryItems.map((item) => (
                            <div key={item.key} className="grid grid-cols-[1fr_auto_auto] items-start gap-2 text-sm border-b border-gray-700 pb-2 text-gray-400">
                              <div className="min-w-0">
                                <span className="block truncate">+ {item.name}</span>
                                {item.priceNote && (
                                  <span className="mt-1 block text-[10px] text-amber-300">{item.priceNote}</span>
                                )}
                              </div>
                              <span>{item.group === 'base' ? "Included" : item.price === 0 ? "Included" : `+\u20B9${item.price}`}</span>
                              {item.canRemove ? (
                                <button onClick={() => removeSelectedItem(item)} className="text-gray-500 hover:text-red-400 transition-colors text-xs" aria-label={`Remove ${item.name}`}>
                                  <i className="fas fa-times-circle"></i>
                                </button>
                              ) : (
                                <span className="text-[10px] text-gray-500">Required</span>
                              )}
                            </div>
                          ))}
                          {summaryItems.length === 0 && (
                            <p className="text-gray-500 text-xs italic text-center py-4">Add ingredients to calculate macros and price.</p>
                          )}
                        </div>

                        {dryComboSuggestionsVisible && (
                          <div className="mb-6 rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4">
                            <p className="text-sm text-amber-100 leading-relaxed">
                              Your bowl may feel dry. Add Avocado or Yogurt to improve texture and flavour.
                            </p>
                            <p className="mt-1 text-[11px] text-amber-200/90">Optional suggestion: tap any one to add, or dismiss.</p>
                            <div className="mt-3 space-y-2">
                              {dryComboSuggestions.map((suggestion) => (
                                <div key={suggestion.id} className="flex items-center justify-between gap-3 rounded-xl border border-amber-300/30 bg-black/20 px-3 py-2">
                                  <span className="text-sm text-white">{suggestion.name}</span>
                                  <button
                                    onClick={() => acceptDryComboSuggestion(suggestion)}
                                    className="rounded-lg bg-amber-400 px-3 py-1 text-xs font-semibold text-gray-900 hover:bg-amber-300 transition-colors"
                                  >
                                    +{`\u20B9${suggestion.price}`}
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 flex items-center justify-end gap-3">
                              <button
                                onClick={dismissDryComboSuggestion}
                                className="text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                              >
                                Dismiss
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="bg-gray-800 rounded-2xl p-5 mb-6">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-700/50 p-3 rounded-xl flex flex-col">
                              <span className="text-gray-400 text-xs mb-1">Calories</span>
                              <span className="text-white font-bold">~{formatMacroValue(totals.calories)} <span className="text-xs font-normal text-gray-400">kcal</span></span>
                            </div>
                            <div className="bg-gray-700/50 p-3 rounded-xl flex flex-col">
                              <span className="text-gray-400 text-xs mb-1">Protein</span>
                              <span className="text-white font-bold">~{formatMacroValue(totals.protein)} <span className="text-xs font-normal text-gray-400">g</span></span>
                            </div>
                            <div className="bg-gray-700/50 p-3 rounded-xl flex flex-col">
                              <span className="text-gray-400 text-xs mb-1">Carbs</span>
                              <span className="text-white font-bold">~{formatMacroValue(totals.carbs)} <span className="text-xs font-normal text-gray-400">g</span></span>
                            </div>
                            <div className="bg-gray-700/50 p-3 rounded-xl flex flex-col">
                              <span className="text-gray-400 text-xs mb-1">Fats</span>
                              <span className="text-white font-bold">~{formatMacroValue(totals.fats)} <span className="text-xs font-normal text-gray-400">g</span></span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-end mb-6">
                          <span className="text-gray-400">Total Amount</span>
                          <span className="text-3xl font-bold text-green-400">₹{formatCurrency(totals.price)}</span>
                        </div>

                        <button
                          onClick={handleAddCustomToCart}
                          disabled={!canAddCustom}
                          className={`w-full py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg ${canAddCustom ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                        >
                          <i className="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        {!canAddCustom && (
                          <p className="text-xs text-amber-200 text-center mt-3">Please select a base, protein, and at least one extra veggie, topping, dressing, or addon before adding your custom bowl.</p>
                        )}
                        <p className="text-[10px] text-gray-500 text-center mt-4 italic">* Macros are carefully calculated but ±5% variance may occur.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <p className="text-center text-sm text-gray-600 font-semibold">Custom bowls may take longer to prepare & deliver.</p>
                </div>
              </section>

              {/* Subscriptions / Meal Plans Section */}
              <section id="subscriptions" className="py-20 bg-gradient-to-b from-white to-gray-50 border-b border-gray-100 scroll-mt-24">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-12">
                          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4"><i className="fas fa-fire mr-1"></i> Consistency is Key</span>
                          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🥗 Subscription Plans</h3>
                          <p className="text-gray-500 max-w-2xl mx-auto">Skip the daily ordering. Get fresh, macro-calculated bowls delivered to your home or gym automatically with exclusive discounts.</p>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-8">
                          {/* Starter Plan - 10 Bowls */}
                          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all relative overflow-hidden">
                              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl shadow-md"><i className="fas fa-rocket"></i> Getting Started</div>
                              <h4 className="text-2xl font-bold text-gray-900 mb-2">Starter Plan</h4>
                              <p className="text-gray-700 font-semibold mb-1">10 Bowls</p>
                              <p className="text-blue-600 font-bold text-lg mb-4">Valid for 15 days</p>
                              <p className="text-gray-600 mb-1 text-sm">Up to ₹199 per bowl</p>
                              <p className="text-blue-500 font-bold mb-6">Save up to 5%</p>
                              
                              <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
                                  <p className="text-sm font-bold text-gray-900 mb-3">Includes:</p>
                                  <ul className="space-y-2 text-sm text-gray-700">
                                      <li className="flex items-center gap-2"><i className="fas fa-check text-blue-500"></i> Access to all bowls up to ₹199</li>
                                      <li className="flex items-center gap-2"><i className="fas fa-check text-blue-500"></i> Freshly prepared meals</li>
                                      <li className="flex items-center gap-2"><i className="fas fa-check text-blue-500"></i> Customizations available</li>
                                  </ul>
                              </div>
                              
                              <button onClick={() => openSubscription('Starter Plan – 10 Bowls (15 days, Save 5%)')} className="w-full py-4 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30">
                                  Get Started via WhatsApp
                              </button>
                          </div>

                          {/* Fitness Plan - 20 Bowls (FEATURED) */}
                          <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-3xl p-8 shadow-2xl shadow-gray-900/30 relative overflow-hidden transform md:-translate-y-4 border-2 border-green-500">
                              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-bl-xl shadow-md"><i className="fas fa-star"></i> Most Popular</div>
                              <h4 className="text-2xl font-bold mb-2">Fitness Plan</h4>
                              <p className="text-gray-300 font-semibold mb-1">20 Bowls</p>
                              <p className="text-green-400 font-bold text-lg mb-4">Valid for 30 days</p>
                              <p className="text-gray-300 mb-1 text-sm">Up to ₹249 per bowl</p>
                              <p className="text-green-400 font-bold mb-6">Save up to 10%</p>
                              
                              <div className="bg-green-900/30 rounded-xl p-4 mb-6 border border-green-500/30">
                                  <p className="text-sm font-bold text-white mb-3">Includes:</p>
                                  <ul className="space-y-2 text-sm text-gray-300">
                                      <li className="flex items-center gap-2"><i className="fas fa-check text-green-400"></i> Covers most of the menu</li>
                                      <li className="flex items-center gap-2"><i className="fas fa-check text-green-400"></i> High-protein & balanced meals</li>
                                      <li className="flex items-center gap-2"><i className="fas fa-check text-green-400"></i> Priority preparation</li>
                                  </ul>
                              </div>
                              
                              <button onClick={() => openSubscription('Fitness Plan – 20 Bowls (30 days, Save 10%)')} className="w-full py-4 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30">
                                  Get Started via WhatsApp
                              </button>
                          </div>

                          {/* Pro Plan - 30 Bowls */}
                          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all relative overflow-hidden">
                              <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl shadow-md"><i className="fas fa-crown"></i> Maximum Savings</div>
                              <h4 className="text-2xl font-bold text-gray-900 mb-2">🔥 Pro Plan</h4>
                              <p className="text-gray-700 font-semibold mb-1">30 Bowls</p>
                              <p className="text-purple-600 font-bold text-lg mb-4">Valid for 45 days</p>
                              <p className="text-gray-600 mb-1 text-sm">Covers full menu (up to ₹329)</p>
                              <p className="text-purple-600 font-bold mb-6">Save up to 15%</p>
                              
                              <div className="bg-purple-50 rounded-xl p-4 mb-6 border border-purple-200">
                                  <p className="text-sm font-bold text-gray-900 mb-3">Includes:</p>
                                  <ul className="space-y-2 text-sm text-gray-700">
                                      <li className="flex items-center gap-2"><i className="fas fa-check text-purple-600"></i> Full menu access</li>
                                      <li className="flex items-center gap-2"><i className="fas fa-check text-purple-600"></i> Custom bowl flexibility</li>
                                      <li className="flex items-center gap-2"><i className="fas fa-check text-purple-600"></i> Maximum value & savings</li>
                                  </ul>
                              </div>
                              
                              <button onClick={() => openSubscription('Pro Plan – 30 Bowls (45 days, Save 15%)')} className="w-full py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/30">
                                  Get Started via WhatsApp
                              </button>
                          </div>
                      </div>

                      {/* Important Notes */}
                        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-8">
                          <h5 className="text-lg font-bold text-gray-900 mb-4">ℹ️ Important Notes</h5>
                          <div className="grid md:grid-cols-2 gap-4">
                            <ul className="space-y-2 text-sm text-gray-700">
                              <li className="flex items-start gap-2"><i className="fas fa-info-circle text-amber-600 mt-0.5"></i> <span>Validity starts from first order</span></li>
                              <li className="flex items-start gap-2"><i className="fas fa-info-circle text-amber-600 mt-0.5"></i> <span>No delivery on Sundays</span></li>
                              <li className="flex items-start gap-2"><i className="fas fa-info-circle text-amber-600 mt-0.5"></i> <span>Unused bowls expire after validity</span></li>
                            </ul>
                            <ul className="space-y-2 text-sm text-gray-700">
                              <li className="flex items-start gap-2"><i className="fas fa-info-circle text-amber-600 mt-0.5"></i> <span>Extra charges apply if bowl exceeds plan value</span></li>
                              <li className="flex items-start gap-2"><i className="fas fa-info-circle text-amber-600 mt-0.5"></i> <span>Plans are non-refundable & non-transferable</span></li>
                              <li className="flex items-start gap-2"><i className="fas fa-info-circle text-amber-600 mt-0.5"></i> <span>Discounts are not cumulative across multiple plans</span></li>
                            </ul>
                          </div>
                        </div>

                      {/* Comparison Note */}
                      <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                          <p className="text-gray-700 font-medium mb-2">💡 <span className="font-bold">Pro Tip:</span> Subscribe today and enjoy exclusive discounts plus priority meal preparation!</p>
                          <p className="text-sm text-gray-600">All plans come with fresh, macro-calculated meals prepared by our certified nutritionists. Cancel or modify anytime.</p>
                      </div>
                  </div>
              </section>

              {/* Testimonials Section */}
              <section className="py-20 bg-gradient-to-br from-[#EAF7E4] to-[#DFF5D3] border-b border-gray-100">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-12">
                          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Athletes</h3>
                          <p className="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. See what the fitness community is saying.</p>
                      </div>
                      <div className="grid md:grid-cols-3 gap-6">
                          {[
                              { text: "TUB Fit completely changed my prep. Hitting my 180g protein goal has never been this easy or delicious.", name: "Rahul S.", role: "Fitness Coach" },
                              { text: "The custom builder is genius. I tweak my macros perfectly based on whether I'm bulking or cutting.", name: "Priya M.", role: "CrossFit Athlete" },
                              { text: "No seed oils, fresh ingredients, and delivered right to my gym. The best post-workout meal hands down.", name: "Vikram D.", role: "Gym Enthusiast" }
                          ].map((review, idx) => (
                              <div key={idx} className="bg-white p-8 rounded-3xl shadow-xl shadow-green-900/5 relative">
                                  <div className="flex gap-1 text-yellow-400 mb-4 text-sm">
                                      <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                                  </div>
                                  <p className="text-gray-600 italic mb-6 leading-relaxed">"{review.text}"</p>
                                  <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">{review.name.charAt(0)}</div>
                                      <div>
                                          <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                                          <p className="text-xs text-gray-500">{review.role}</p>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </section>

              {/* Free Diet Plan Lead Magnet */}
              <section className="py-16 bg-gray-900 text-white text-center">
                  <div className="max-w-3xl mx-auto px-4">
                      <i className="fas fa-file-pdf text-4xl text-green-400 mb-4"></i>
                      <h2 className="text-3xl font-bold mb-4">Not sure what to eat?</h2>
                      <p className="text-gray-400 mb-8 max-w-lg mx-auto">Download our Free 7-Day Diet Plans created by certified nutritionists. Complete with macro breakdowns and timings tailored for your specific goal.</p>
                      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                          <button onClick={() => getFreeDietPlan('Fat Loss')} className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg w-full sm:w-auto justify-center">
                              <i className="fab fa-whatsapp text-green-500 text-xl"></i> Fat Loss Plan
                          </button>
                          <button onClick={() => getFreeDietPlan('Muscle Gain')} className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#1ebd5a] transition-colors shadow-lg w-full sm:w-auto justify-center">
                              <i className="fab fa-whatsapp text-white text-xl"></i> Muscle Gain Plan
                          </button>
                      </div>
                  </div>
              </section>

              {/* Animated Stats Section */}
              <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Fuel Your Fitness</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">Real numbers, real results. See what makes TUB Fit the preferred choice for fitness enthusiasts.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      { label: 'Avg Calories Per Bowl', icon: 'fa-fire', target: 650, suffix: ' kcal', color: 'from-orange-500 to-red-500' },
                      { label: 'Max Protein Available', icon: 'fa-dumbbell', target: 100, suffix: 'g', color: 'from-blue-500 to-cyan-500' },
                      { label: 'Customizable Items', icon: 'fa-sliders-h', target: 38, suffix: '+', color: 'from-purple-500 to-pink-500' }
                    ].map((stat, idx) => (
                      <div key={idx} className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300 group">
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}></div>
                        <div className="relative z-10">
                          <div className={`mx-auto w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                            <i className={`fas ${stat.icon} text-2xl`}></i>
                          </div>
                          <div className="text-4xl md:text-5xl font-bold mb-2">
                            <AnimatedCounter target={stat.target} duration={2500} suffix={stat.suffix} easing="easeOutQuad" />
                          </div>
                          <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* About Us Section */}
              <section id="about" className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4ade80] to-[#25D366] shadow-lg mb-6 relative border border-green-500/50 shrink-0">
                    <span className="text-transparent text-5xl mt-1" style={{ textShadow: '0 0 0 #064e3b' }}>💪</span>
                    <i className="fas fa-leaf absolute -top-2.5 -right-2 text-[26px] text-lime-200 transform rotate-[15deg] drop-shadow-lg"></i>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">About TUB Fit</h3>
                  <div className="space-y-6 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    <p>TUB Fit was created with a simple goal — to make healthy eating easy, affordable, and effective for everyone who wants to transform their body.</p>
                    <p>Most gym-goers struggle with consistent nutrition. Either the food is unhealthy, expensive, or not designed for real fitness goals.</p>
                    <p>TUB Fit solves this by offering high-protein, balanced, and customizable meals designed for muscle gain, fat loss, and bulking.</p>
                    <p className="text-2xl font-bold text-gray-900 pt-4">This is not just food.<br/><span className="text-green-600">This is your fitness fuel.</span></p>
                  </div>
                </div>
              </section>

              {/* QR Code Section */}
              <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Scan to Order</h3>
                  <div className="inline-block p-4 bg-white rounded-2xl shadow-lg relative">
                    <div id="qrCodeContainer" style={{width: '150px', height: '150px'}}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 rounded-2xl shadow-md flex items-center justify-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#4ade80] to-[#25D366] rounded-xl flex items-center justify-center relative border border-green-300">
                        <span className="text-transparent text-2xl mt-0.5" style={{ textShadow: '0 0 0 #064e3b' }}>💪</span>
                        <i className="fas fa-leaf absolute -top-1.5 -right-1.5 text-[14px] text-lime-200 transform rotate-[15deg] drop-shadow-sm"></i>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4 max-w-md mx-auto">Scan this QR code with your phone to visit our website and place your order instantly</p>
                </div>
              </section>

              {/* Footer */}
              <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
                    <div>
                      <div className="flex items-center justify-center md:justify-start mb-6">
                      <div className="bg-gradient-to-br from-[#4ade80] to-[#25D366] w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center relative border border-green-500/50 shrink-0">
                        <span className="text-transparent text-5xl mt-1" style={{ textShadow: '0 0 0 #064e3b' }}>💪</span>
                        <i className="fas fa-leaf absolute -top-2.5 -right-2 text-[26px] text-lime-200 transform rotate-[15deg] drop-shadow-lg"></i>
                        </div>
                        <div className="font-sans font-black text-4xl tracking-tighter flex items-baseline lowercase leading-none">
                          <span className="text-white">tub</span>
                          <span className="text-green-400 flex items-baseline">
                            f
                            <span className="relative inline-flex flex-col items-center justify-end mx-[0.5px]">
                              <i className="fas fa-leaf absolute -top-2 text-[14px] text-green-400 transform -rotate-12"></i>
                              <span>ı</span>
                            </span>
                            t
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-4 pl-1">The Ultimate Bowl</p>
                      <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">Fueling your fitness journey with every bite. High protein, unmatched taste. A part of The Unique Bucket (TUB).</p>
                    </div>
                    <div className="flex flex-col gap-3 items-center md:items-start">
                      <h4 className="text-white font-semibold mb-2 text-lg">Quick Links</h4>
                      <a href="#menu" className="text-gray-400 hover:text-green-400 transition-colors">Our Menu</a>
                      <a href="#builder" className="text-gray-400 hover:text-green-400 transition-colors">Build Custom Bowl</a>
                      <a href="#subscriptions" className="text-gray-400 hover:text-green-400 transition-colors">Meal Plans</a>
                    </div>
                    <div className="flex flex-col gap-4 items-center md:items-start">
                      <h4 className="text-white font-semibold mb-2 text-lg">Contact Us</h4>
                      <a href={`tel:${CALL_NUMBER}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                        <i className="fas fa-phone text-green-400 text-lg"></i> <span>{formatIndianNumber(CALL_NUMBER)}</span>
                      </a>
                      <a href={`tel:${SECOND_NUMBER}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                        <i className="fas fa-phone text-green-400 text-lg"></i> <span>{formatIndianNumber(SECOND_NUMBER)}</span>
                      </a>
                      <a href={`mailto:${EMAIL_ADDRESS}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                        <i className="fas fa-envelope text-green-400 text-lg"></i> <span>{EMAIL_ADDRESS}</span>
                      </a>
                      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                        <i className="fab fa-whatsapp text-[#25D366] text-lg"></i> <span>{formatIndianNumber(WHATSAPP_NUMBER)}</span>
                      </a>
                      </div>
                  </div>
                  <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} TUB Fit - The Ultimate Bowl. All rights reserved.
                  </div>
                </div>
              </footer>

              {/* Floating Shopping Cart Button */}
              {cart.length > 0 && (
                  <button onClick={() => setIsCartOpen(true)} className="fixed bottom-24 md:bottom-6 right-6 z-40 bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center gap-3 px-6 animate-bounce" style={{ animationIterationCount: 3 }}>
                    <i className="fas fa-shopping-cart text-xl"></i>
                    <span className="font-bold text-lg bg-green-500 rounded-full w-7 h-7 flex items-center justify-center text-sm">{cart.length}</span>
                  </button>
              )}

              {/* MOBILE ONLY - Sticky Bottom Action Bar */}
              <div className="md:hidden fixed bottom-0 w-full z-50 flex shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">
                  <a href="#menu" className="flex-1 py-3 flex flex-col items-center justify-center bg-gray-900 text-white hover:bg-black transition-colors">
                      <i className="fas fa-book-open mb-1 text-xl"></i>
                      <span className="text-[10px] font-bold uppercase tracking-widest">Menu</span>
                  </a>
                  <a href="#builder" className="flex-1 py-3 flex flex-col items-center justify-center bg-[#25D366] text-white hover:bg-[#1ebd5a] transition-colors border-l border-green-400">
                      <i className="fas fa-tools mb-1 text-xl"></i>
                      <span className="text-[10px] font-bold uppercase tracking-widest">Build Bowl</span>
                  </a>
              </div>

            </div>
          );
        }

        try {
          const root = createRoot(document.getElementById('root'));
          root.render(<App />);
          window.__TUB_APP_MOUNTED__ = true;

          // Generate QR Code after React renders
          setTimeout(() => {
            const qrContainer = document.getElementById('qrCodeContainer');
            if (qrContainer && window.QRCode) {
              qrContainer.innerHTML = '';
              new QRCode(qrContainer, {
                        text: 'https://tubfit.theuniquebucket.com',
                width: 150,
                height: 150,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
              });
            }
          }, 100);
        } catch (error) {
          console.error('❌ Error rendering TUB Fit App:', error);
          document.getElementById('root').innerHTML = `
            <div style="padding: 20px; font-family: Arial, sans-serif; color: #d32f2f;">
              <h2>⚠️ Error Loading App</h2>
              <p><strong>Error:</strong> ${error.message}</p>
              <p><strong>Stack:</strong> ${error.stack}</p>
              <p>Check the browser console for more details (F12 → Console)</p>
            </div>
          `;
        }
