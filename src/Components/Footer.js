import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Footer.css';

const whatsapp = process.env.PUBLIC_URL + '/w.png';
const facebook = process.env.PUBLIC_URL + '/messenger.png';

function Footer() {
  const [currentLogo, setCurrentLogo] = useState("");
  const location = useLocation();
  const API_BASE_URL = "https://home-back-3lqs.onrender.com";

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/settings`);
        if (res.ok) {
          const data = await res.json();
          setCurrentLogo(data.settings?.logo || "");
        }
      } catch (err) {
        console.error("Error loading logo:", err);
      }
    };
    loadLogo();
  }, []);

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link" onClick={handleLogoClick}>
              {currentLogo ? (
                <img src={currentLogo} alt="Logo" className="footer-logo-image" />
              ) : (
                <h2 className="footer-logo">Davson</h2>
              )}
            </Link>
            <p className="footer-tagline">ჭკვიანი სახლი თქვენი კომფორტისთვის</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-column-title">ნავიგაცია</h3>
              <nav className="footer-nav">
                <Link to="/" className="footer-link">მთავარი</Link>
                <Link to="/products" className="footer-link">პროდუქტები</Link>
                <Link to="/services" className="footer-link">სერვისები</Link>
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
                <a href="https://wa.me/995555802060"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-social-link"
                >
                  <img src={whatsapp} alt="WhatsApp" className="footer-social-icon" />
                  WhatsApp
                </a>
                <a href="https://m.me/61585859816614"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-social-link"
                >
                  <img src={facebook} alt="Messenger" className="footer-social-icon" />
                  Messenger
                </a>
              </div>
            </div>
          </div>
        </div>
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