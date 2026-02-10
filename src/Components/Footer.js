import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="footer-logo">Davson</h2>
            <p className="footer-tagline">ჭკვიანი სახლი თქვენი კომფორტისთვის</p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-column-title">ნავიგაცია</h3>
              <nav className="footer-nav">
                <Link to="/" className="footer-link">მთავარი</Link>
                <Link to="/products" className="footer-link">პროდუქტები</Link>
                <Link to="/contact" className="footer-link">კონტაქტი</Link>
              </nav>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">კონტაქტი</h3>
              <div className="footer-contact">
                <a href="tel:+995555802060" className="footer-link">+995 555 80 20 60</a>
                <p className="footer-text">თბილისი, ტარიელის ქუჩა 39</p>
              </div>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">სოციალური ქსელები</h3>
              <div className="footer-social">
                <a
                  href="https://www.facebook.com/share/18Jd7JF2ow/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-legal">
            <p className="footer-copyright">
              © 2025 SmartHome. Created by <span className="footer-creator">Apollo Creations</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;