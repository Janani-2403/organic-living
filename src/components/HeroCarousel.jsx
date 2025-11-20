import React, { useEffect, useRef, useState, useCallback } from "react";
import "../styles/hero.css";

const slides = [
  {
    id: 1,
    title: "Farm Fresh • 100% Organic",
    subtitle: "From local farms to your table",
    image:
      "https://sb.ecobnb.net/app/uploads/sites/3/2021/01/organic-food-benefits.jpg",
  },
  {
    id: 2,
    title: "Healthy Living",
    subtitle: "Natural, nutritious & sustainable",
    image:
      "https://media.istockphoto.com/id/1465642013/photo/a-vibrant-green-soybean-field-nestled-in-a-natural-setting.jpg?s=612x612&w=0&k=20&c=ukaUysAFOmCHYpOkVHZi-dYjKXNMh-QnIq40KEG3NuQ=",
  },
  {
    id: 3,
    title: "Pure & Natural",
    subtitle: "No chemicals, just goodness",
    image:
      "https://www.diabetesaustralia.com.au/wp-content/uploads/iStock-643764514-1-e1538548522256.jpg",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  const startAutoSlide = useCallback(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(timer.current);
  }, [startAutoSlide]);

  // Swipe gesture support
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;

    if (diff > 50) setIndex((i) => (i - 1 + slides.length) % slides.length);
    if (diff < -50) setIndex((i) => (i + 1) % slides.length);

    touchStartX.current = null;
  };

  return (
    <section className="hero" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${s.image})` }}
        >
          <div className="overlay">
            <h1 className="fade-text">{s.title}</h1>
            <p className="fade-text">{s.subtitle}</p>
            <a href="/shop" className="btn fade-text">Shop Now</a>
          </div>
        </div>
      ))}

      <div className="hero-dots">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            className={`dot ${i === index ? "active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
