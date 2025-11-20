import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import emailjs from "emailjs-com";
import "../styles/checkout.css";

export default function Checkout() {
  const { cart, clearCart } = useStore();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode
    ) {
      alert("⚠️ Please fill all details before placing your order.");
      return;
    }

    setLoading(true);
    const orderId = Math.floor(100000 + Math.random() * 900000);

    const orderItems = cart
      .map(
        (item) =>
          `${item.name} (x${item.qty || 1}) - ₹${(
            item.price * (item.qty || 1)
          ).toFixed(2)}`
      )
      .join("\n");

    const templateParams = {
      user_name: formData.name,
      order_email: formData.email,
      order_total: total.toFixed(2),
      order_items: orderItems,
      order_id: orderId,
    };

    try {
      await emailjs.send(
        "service_z8rh6og",
        "template_jju39bp",
        templateParams,
        "C-0TEWF8tdC9h7HXk"
      );

      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("❌ Failed to send confirmation email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <h2>🎉 Order Placed Successfully!</h2>
        <p>
          Thank you, <b>{formData.name}</b>! Your organic goodies are on their
          way 🌱
        </p>
        <p>
          We’ve sent an order confirmation to <b>{formData.email}</b>.
        </p>
      </div>
    );
  }

  return (
    <section className="checkout-container">
      <h2>Checkout</h2>
      <p className="delivery-note">🚚 Delivery Available Only in Tamil Nadu</p>

      <div className="checkout-content">
        {/* Billing Form */}
        <form className="billing-form" onSubmit={handlePlaceOrder}>
          <h3>Billing Details</h3>

          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} />
          <input type="text" name="address" placeholder="Address" onChange={handleChange} />
          <input type="text" name="city" placeholder="City" onChange={handleChange} />
          <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} />

          <button type="submit" className="place-order-btn" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          {cart.length > 0 ? (
            <>
              <div className="summary-list">
                {cart.map((item, index) => (
                  <div key={index} className="summary-row">
                    <img src={item.image} alt={item.name} className="summary-img" />
                    <span className="summary-name">{item.name}</span>
                    <span className="summary-qty">Qty: {item.qty || 1}</span>
                    <span className="summary-price">
                      ₹{(item.price * (item.qty || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total-row">
                <span>Total:</span>
                <span className="total-price">₹{total.toFixed(2)}</span>
              </div>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </section>
  );
}
