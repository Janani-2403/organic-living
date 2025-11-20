import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../data/fetchProducts";
import { useStore } from "../context/StoreContext";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("all");
  const { addToCart } = useStore();

  // Fetch products
  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setFiltered(data);
    });
  }, []);

  // Unique categories
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // Filter by category
  const handleFilter = (cat) => {
    setCategory(cat);
    if (cat === "all") setFiltered(products);
    else setFiltered(products.filter((p) => p.category === cat));
  };

  return (
    <section className="container">
      <h2>Shop All Organic Products</h2>

      {/* Filter Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "0.8rem",
          marginBottom: "1.5rem",
          marginTop:"35px",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
           className={`btn outline ${category === cat ? "active" : ""}`}
            style={{
              borderColor: category === cat ? "var(--green)" : "#ccc",
              background:
                category === cat ? "var(--green)" : "transparent",
              color: category === cat ? "#fff" : "var(--green)",
              transition: "all 0.3s ease",
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Product Count */}
      <p style={{ textAlign: "center", color: "var(--muted)", marginTop: 0 }}>
        Showing All products
      </p>

      {/* Product Grid */}
      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "var(--muted)",
            marginTop: "2rem",
          }}
        >
          No products found in this category.
        </p>
      )}
    </section>
  );
}
