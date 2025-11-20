import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { StoreProvider } from "./context/StoreContext";

export default function App() {
  return (
  
      <StoreProvider>
        <div className="flex flex-col min-h-screen bg-[#f8f9f6] text-gray-900">
          {/* Navbar */}
          <Navbar />

          {/* Page Routes */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              {/* 404 Page */}
              <Route
                path="*"
                element={
                  <div className="container mx-auto text-center py-20">
                    <h2 className="text-3xl font-semibold mb-3 text-red-600">
                      404 - Page Not Found
                    </h2>
                    <p className="text-gray-600">
                      Sorry, we couldn’t find the page you’re looking for.
                    </p>
                  </div>
                }
              />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </StoreProvider>
    
  );
}
