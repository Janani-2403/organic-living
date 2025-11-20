import React, { useEffect, useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../data/fetchProducts";
import { useStore } from "../context/StoreContext";
import "../styles/home.css"; 
import whyChooseImg from "../assets/why choose.jpg";


export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useStore();

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <>
      {/*  Hero Section */}
      <HeroCarousel />

      {/* Featured Products Section */}
      <section className="container home-section fade-in">
        <h2 className="section-title">🌿 Featured Organic Products</h2>
        <p className="section-subtitle">
          Discover our best-selling organic fruits, vegetables, and groceries.
        </p>

        <div className="grid product-grid">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </div>

        <div className="center-btn">
          <a href="/shop" className="shop-btn">
            Shop All Products →
          </a>
        </div>
      </section>

      {/*  Why Choose Organic Section */}
      <section className="about-organic fade-in">
        <div className="about-content container">
          <div className="about-text">
            <h3>Why Choose Organic?</h3>
            <p>
              Organic farming keeps you and the planet healthy. Our produce is
              free from synthetic fertilizers, chemicals, and GMOs — ensuring
              every bite is pure and natural.
            </p>
            <ul>
              <li>✅ 100% Certified Organic Produce</li>
              <li>🌱 Locally Sourced from Trusted Farmers</li>
              <li>🚚 Freshly Delivered to Your Doorstep</li>
              <li>💚 Environmentally Friendly Practices</li>
            </ul>
          </div>

          <div className="about-image">
           <img
  src={whyChooseImg}
  alt="Organic farm"
  loading="lazy"
/>
          </div>
        </div>
      </section>

      {/*  Testimonials Section */}
      <section className="testimonials fade-in">
        <h3 className="section-title">What Our Customers Say</h3>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <blockquote>
              “The vegetables are so fresh and flavorful — tastes just like
              homegrown!”
            </blockquote>
            <cite>— Ananya, Chennai</cite>
          </div>

          <div className="testimonial-card">
            <blockquote>
              “Amazing organic store! Fast delivery and beautiful packaging.”
            </blockquote>
            <cite>— Rajesh, Coimbatore</cite>
          </div>

          <div className="testimonial-card">
            <blockquote>
              “Their fruits are simply the best — juicy, sweet, and organic.”
            </blockquote>
            <cite>— Priya, Bengaluru</cite>
          </div>
        </div>
      </section>
    </>
  );
}
