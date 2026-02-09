import React from 'react';
import '../Styles/Contact.css';

const facebook = process.env.PUBLIC_URL + '/f.png';
const whatsapp = process.env.PUBLIC_URL + '/w.png';

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-header">
          <h1 className="contact-title2">კონტაქტი</h1>
          <p className="contact-subtitle">დაგვიკავშირდით ნებისმიერ დროს</p>
        </div>

        <div className="contact-info-grid">
          {/* Phone */}
          <a href="tel:+995555802060" className="contact-card clickable">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="contact-card-title">ტელეფონი</h3>
            <p className="contact-text">+995 555 80 20 60</p>
          </a>

          {/* Address */}
          <div className="contact-card">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="contact-card-title">მისამართი</h3>
            <p className="contact-text">თბილისი, ტარიელის ქუჩა 39</p>
          </div>

          {/* WhatsApp */}
          <a 
            href="https://wa.me/995555802060" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-card clickable"
          >
            <div className="contact-icon">
              <img src={whatsapp} alt="WhatsApp" className="contact-icon-img" />
            </div>
            <h3 className="contact-card-title">WhatsApp</h3>
          </a>

          {/* Facebook */}
          <a 
            href="https://www.facebook.com/share/18Jd7JF2ow/?mibextid=wwXIfr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-card clickable"
          >
            <div className="contact-icon">
              <img src={facebook} alt="Facebook" className="contact-icon-img" />
            </div>
            <h3 className="contact-card-title">Facebook</h3>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;