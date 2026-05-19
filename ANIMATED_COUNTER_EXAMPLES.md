# AnimatedCounter Component - Usage Guide

A lightweight, production-ready React component for animating numbers from 0 to a target value. Perfect for hero sections, stats banners, and landing pages.

## Component Props

```javascript
<AnimatedCounter 
  target={100}           // Final number to count to (required)
  duration={2000}        // Animation duration in milliseconds (default: 2000)
  suffix="kcal"          // Text to append after number (e.g., 'kcal', 'g', '+')
  prefix="₹"             // Text to prepend before number (e.g., '₹', '$')
  easing="easeOut"       // Animation easing: 'linear', 'easeOut', 'easeInOut', 'easeOutQuad'
  decimals={0}           // Number of decimal places (default: 0)
/>
```

## Available Easing Functions

- **linear**: Constant speed
- **easeOut**: Smooth deceleration (default, most natural)
- **easeInOut**: Accelerate then decelerate
- **easeOutQuad**: Gentle deceleration

## Examples

### 1. **Calorie Counter**
```jsx
<AnimatedCounter 
  target={650} 
  duration={2500} 
  suffix=" kcal" 
  easing="easeOutQuad" 
/>
// Output: 650 kcal (animates from 0 to 650)
```

### 2. **Protein Counter**
```jsx
<AnimatedCounter 
  target={60} 
  duration={2000} 
  suffix="g" 
  easing="easeOut" 
/>
// Output: 60g (animates from 0 to 60)
```

### 3. **Carb Counter with Decimals**
```jsx
<AnimatedCounter 
  target={45.5} 
  duration={2000} 
  suffix="g" 
  decimals={1}
  easing="easeOutQuad" 
/>
// Output: 45.5g
```

### 4. **Price Display**
```jsx
<AnimatedCounter 
  prefix="₹" 
  target={199} 
  duration={2500} 
  easing="easeOut" 
/>
// Output: ₹199
```

### 5. **Customer Count**
```jsx
<AnimatedCounter 
  target={5000} 
  duration={3000} 
  suffix=" customers" 
  easing="linear" 
/>
// Output: 5000 customers
```

### 6. **Fitness Metrics Dashboard**
```jsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  <div className="stat-card">
    <h3 className="text-sm text-gray-600 mb-2">Calories</h3>
    <div className="text-4xl font-bold">
      <AnimatedCounter target={650} suffix=" kcal" />
    </div>
  </div>
  
  <div className="stat-card">
    <h3 className="text-sm text-gray-600 mb-2">Protein</h3>
    <div className="text-4xl font-bold">
      <AnimatedCounter target={60} suffix="g" />
    </div>
  </div>
  
  <div className="stat-card">
    <h3 className="text-sm text-gray-600 mb-2">Carbs</h3>
    <div className="text-4xl font-bold">
      <AnimatedCounter target={45} suffix="g" />
    </div>
  </div>
  
  <div className="stat-card">
    <h3 className="text-sm text-gray-600 mb-2">Fats</h3>
    <div className="text-4xl font-bold">
      <AnimatedCounter target={15} suffix="g" />
    </div>
  </div>
</div>
```

### 7. **Hero Section Stats**
```jsx
<section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {[
        { label: 'Orders Served', target: 5000, suffix: '+' },
        { label: 'Happy Customers', target: 2500, suffix: '+' },
        { label: 'Calories Available', target: 800, suffix: ' max' },
        { label: 'Protein Options', target: 15, suffix: '+' }
      ].map((stat, idx) => (
        <div key={idx} className="text-center">
          <div className="text-5xl font-bold text-green-600 mb-2">
            <AnimatedCounter 
              target={stat.target} 
              suffix={stat.suffix} 
              duration={2500}
              easing="easeOutQuad"
            />
          </div>
          <p className="text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

## Integration Steps

1. **Add the Component** - Copy the `AnimatedCounter` function from `public/index.html`
2. **Place in Your Section** - Use anywhere you want animated numbers
3. **Customize Duration** - Adjust `duration` prop (milliseconds)
4. **Choose Easing** - Pick the animation style that fits your design
5. **Add Styling** - Wrap with your own Tailwind classes

## Performance Tips

- **Keep durations under 3 seconds** for better UX
- **Use `easeOutQuad` or `easeOut`** for most natural feel
- **Component is lightweight** - uses `requestAnimationFrame` for 60fps smooth animation
- **No external dependencies** - uses React's built-in hooks only
- **Memory efficient** - cleanup animation frame on unmount

## Browser Compatibility

- ✅ Chrome/Edge 16+
- ✅ Firefox 15+
- ✅ Safari 10+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Code Reference

The component uses `requestAnimationFrame` for smooth 60fps animations and handles cleanup properly on component unmount.

```javascript
const AnimatedCounter = ({ 
  target = 100, 
  duration = 2000, 
  suffix = '', 
  prefix = '', 
  easing = 'easeOut', 
  decimals = 0 
}) => {
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

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count);

  return (
    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
      {prefix}{displayValue}{suffix}
    </span>
  );
};
```

## Real-World Use Cases

- 📊 Dashboard statistics
- 💪 Fitness app metrics
- 🍽️ Menu item nutrition facts
- 📈 Sales/revenue counters
- 👥 User testimonials/social proof
- 🏆 Achievements & milestones
- 💵 Pricing displays
- 🎯 Goal progress indicators

---

**Ready to use!** The component is production-ready and integrated into the TUB Fit landing page in the "Fuel Your Fitness" stats section.
