import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "../styles/navbar.css";

export default function Navbar() {
  const { cart } = useStore();
  const count = cart.reduce((s, i) => s + (i.qty || 1), 0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const formatName = (name) => (name ? name.split(" ")[0] : "");

  return (
    <header className="site-header">
      <div className="header-inner">

        {/* Brand */}
        <div className="brand-container">
          <Link to="/" className="brand">🌿 Organic Living</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav desktop-nav">
          <NavLink to="/" end className="nav-link">Home</NavLink>
          <NavLink to="/shop" className="nav-link">Shop</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
        </nav>

        {/* Desktop Buttons */}
        <div className="header-actions">
          <Link to="/cart" className="cart-btn">🛒 Cart ({count})</Link>
          {user ? (
            <>
              <span className="user-name">👋 {formatName(user.displayName)}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-btn login">Login</Link>
              <Link to="/register" className="auth-btn register">Register</Link>
            </>
          )}
        </div>

        {/* Hamburger (mobile/tablet only) */}
        <button className="menu-toggle" onClick={() => setMenuOpen(true)}>☰</button>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)}></div>}

      {/* Mobile Sidebar Menu */}
      <nav className={`nav mobile-nav ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" end className="nav-link" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/shop" className="nav-link" onClick={() => setMenuOpen(false)}>Shop</NavLink>
        <NavLink to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>About</NavLink>
        <NavLink to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</NavLink>

        <div className="mobile-actions">
          <Link to="/cart" className="cart-btn" onClick={() => setMenuOpen(false)}>
            🛒 Cart ({count})
          </Link>

          {user ? (
            <>
              <span className="user-name">👋 {formatName(user.displayName)}</span>
              <button className="logout-btn" onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-btn login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="auth-btn register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      </nav>

    </header>
  );
}
