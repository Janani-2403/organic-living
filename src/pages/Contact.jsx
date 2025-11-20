import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";
import "../styles/contact.css";
import { FaXTwitter } from "react-icons/fa6";

export default function Contact() {
  return (
    <section className="contact-section">
      <h2 className="contact-title">Contact Us</h2>

      <div className="contact-container">

        {/* LEFT SIDE: CONTACT INFO */}
        <div className="contact-info-box">
          <h3>We're here to help 🌿</h3>
          <p>
            Have questions about our organic groceries, delivery, or wholesale orders?
            Reach out to us anytime!
          </p>

          <div className="info-item"><FaMapMarkerAlt /> Elumathur, Erode District, Tamil Nadu 638104</div>
          <div className="info-item"><FaPhoneAlt /> +91 98765 43210</div>
          <div className="info-item"><FaEnvelope /> organicliving@gmail.com</div>

          <h4>Follow Us</h4>
          <div className="social-row">
            <a href="https://www.instagram.com/"><FaInstagram /></a>
            <a href="https://www.facebook.com/"><FaFacebook /></a>
            <a href="twitter.com"><FaXTwitter /></a>
          </div>
        </div>

        {/* RIGHT SIDE: MAP */}
        <div className="contact-map-box">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15655.937609567178!2d77.76197024479391!3d11.188789623776502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba97a2348bb7be5%3A0xfdddf2a74bd8e96d!2sElumathur%2C%20Tamil%20Nadu%20638104!5e0!3m2!1sen!2sin!4v1763392939338!5m2!1sen!2sin"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </section>
  );
}
