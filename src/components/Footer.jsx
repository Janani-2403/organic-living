import React from "react";
import "../styles/footer.css";


export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-section">
          <h4>Organic Living</h4>
          <p>Fresh organic produce delivered to your doorstep.&#128666;</p> {/*   HTML numeric entity(decimal) */}
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">&#127969; Home</a></li>
            <li><a href="/shop">&#128722; Shop</a></li>
            <li><a href="/about">&#128100; About</a></li>
            <li><a href="/contact"> &#9993;  Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
         <div className="info-item">✉ organicliving@gmail.com</div>

        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} <strong>Organic Living</strong>. All rights reserved.
      </div>
    </footer>
  );
}
