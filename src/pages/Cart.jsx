import React from "react";
import { useStore } from "../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/cart.css";

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateCartQty } = useStore();
  const navigate = useNavigate();

  const total = cart.reduce((s, i) => s + (i.price * (i.qty || 1)), 0);

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    updateCartQty(id, qty);
  };

  return (
    <section className=" cart-container" style={{ paddingBottom: "4rem" }}>
      <h2 style={{ color: "#1b5e20", marginBottom: "1.5rem" }}>Your Cart</h2>

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Your cart is empty.</p><br />
          <Link to="/shop" className="btn" style={{  color: "#fff", marginTop:"15px",padding:"10px",borderRadius:"30px" }}>
            Browse Products
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "1.6rem",
          }}
        >
          {/* Cart Items */}
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  padding: "1rem",
                  background: "#fff",
                  borderRadius: 8,
                  marginBottom: 12,
                  border: "1px solid #eee",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 100,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 .25rem 0", color: "#1b5e20" }}>
                    {item.name}
                  </h4>

                  {/* Quantity Controls */}
                  <div className="qty-controls">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, color: "#1b5e20" }}>
                    ₹{(item.price * (item.qty || 1)).toFixed(2)}
                  </div>
                  <button
                    className="btn outline"
                    style={{
                      marginTop: 8,
                      background: "transparent",
                      color: "#2e7d32",
                      borderColor: "#2e7d32",
                    }}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <aside
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: 8,
              border: "1px solid #eee",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              alignSelf: "start",
            }}
          >
            <h3 style={{ marginBottom: "1rem", color: "#1b5e20" }}>Summary</h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
            >
              <div>Subtotal</div>
              <div style={{ fontWeight: 700 }}>₹{total.toFixed(2)}</div>
            </div>

            <button
              className="btn"
              style={{
                width: "100%",
                marginBottom: 8,
                background: "#2e7d32",
                color: "#fff",
                fontWeight: 600,
              }}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

            <button
              className="btn outline"
              style={{
                width: "100%",
                color: "#fff",
                borderColor: "#2e7d32",
              }}
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}
