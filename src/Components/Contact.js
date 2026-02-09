import React from 'react';
import '../Styles/Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-header">
          <h1 className="contact-title">კონტაქტი</h1>
          <p className="contact-subtitle">დაგვიკავშირდით ნებისმიერ დროს</p>
        </div>

        <div className="contact-info-grid">
          {/* Phone */}
          <div className="contact-card">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="contact-card-title">ტელეფონი</h3>
            <a href="tel:+995555802060" className="contact-link">555 80 20 60</a>
          </div>

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

          {/* Facebook */}
          <div className="contact-card">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="contact-card-title">Facebook</h3>
            <a 
              href="https://www.facebook.com/share/18Jd7JF2ow/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-link"
            >
              ფეისბუქზე გადასვლა
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;