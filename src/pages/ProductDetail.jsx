import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts } from "../data/fetchProducts";
import { useStore } from "../context/StoreContext";
import "../styles/productdetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { addToCart } = useStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [qty, setQty] = useState(1);

  const increaseQty = () => setQty((q) => q + 1);
  const decreaseQty = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const totalPrice = product?.price ? product.price * qty : 0;

  useEffect(() => {
    fetchProducts()
      .then((list) => {
        const found = list.find((p) => String(p.id) === String(id));
        setProduct(found || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <section className="container">
        <p>Loading product…</p>
      </section>
    );

  if (!product)
    return (
      <section className="container">
        <h2>Product not found</h2>
      </section>
    );

  return (
    <section className="container product-detail">
      <div className="detail-grid">
        
        {/* IMAGE COLUMN */}
        <div className="image-column">
          <div className="image-group">
            <img
              src={product?.image}
              alt={product?.name}
              onError={(e) => (e.target.src = "/assets/images/placeholder.jpg")}
            />

            {product?.image2 && (
              <img
                src={product.image2}
                alt={product.name + " second image"}
                onError={(e) => (e.target.src = "/assets/images/placeholder.jpg")}
              />
            )}
          </div>

          <h2>{product?.name}</h2>
          <p className="muted"><strong>Category:</strong> {product?.category}</p>
          <p className="desc">{product?.description}</p>

          {/* PRICE + QUANTITY ROW */}
          <div className="price-row">
            <p className="price">
              ₹{product?.price}
              <span>/ {product?.quantityType}</span>
            </p>

            <div className="qty-box">
              <button onClick={decreaseQty}>−</button>
              <span>{qty}</span>
              <button onClick={increaseQty}>+</button>
            </div>
          </div>

          {/* TOTAL PRICE */}
          <p className="total-price">
            Total: <strong>₹{totalPrice}</strong>
          </p>
        </div>

        {/* PRODUCT INFO */}
        <div className="detail-info">

          {/* PRODUCT DETAILS */}
          <div className="details-section">
            <h3>Product Details</h3>
            <table className="details-table">
              <tbody>
                <tr><td>Origin</td><td>{product?.origin}</td></tr>
                <tr><td>Shelf Life</td><td>{product?.shelfLife}</td></tr>
                <tr><td>Storage</td><td>{product?.storage}</td></tr>
                <tr><td>Packaging</td><td>{product?.packaging}</td></tr>
                <tr><td>Ingredients</td><td>{product?.ingredients}</td></tr>
              </tbody>
            </table>
          </div>

          {/* NUTRITION */}
          {product?.nutrition && (
            <div className="details-section">
              <h3>Nutritional Information (per 100g)</h3>
              <table className="details-table">
                <tbody>
                  {Object.entries(product.nutrition).map(([k, v]) => (
                    <tr key={k}>
                      <td className="capitalize">{k}</td>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* HIGHLIGHTS */}
          {product?.highlights && (
            <div className="details-section">
              <h3>Highlights</h3>
              <ul className="highlight-list">
                {product.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {/* BUTTONS */}
          <div className="btn-row">
            <button
              className="btn"
              onClick={() => addToCart({ ...product, qty, totalPrice })}
            >
              Add to Cart
            </button>

            <button
              className="btn outline"
              onClick={() => {
                addToCart({ ...product, qty, totalPrice });
                nav("/cart");
              }}
            >
              Buy Now
            </button>
          </div>

          <button className="btn outline back-btn" onClick={() => nav(-1)}>
            ← Back
          </button>

        </div>
      </div>
    </section>
  );
}
