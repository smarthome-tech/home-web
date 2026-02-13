import React, { useEffect } from 'react';
import '../Styles/Contact.css';

const whatsapp = process.env.PUBLIC_URL + '/w.png';
const facebook = process.env.PUBLIC_URL + '/messenger.png';

function Contact() {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Update meta tags
    useEffect(() => {
        const pageTitle = 'კონტაქტი - Davson | დაგვიკავშირდით';
        const pageDescription = 'დაგვიკავშირდით Davson-ს. ტელეფონი: +995 555 80 20 60, მისამართი: თბილისი, ტარიელის ქუჩა 39. WhatsApp და Messenger მხარდაჭერა.';

        // Update title
        document.title = pageTitle;

        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', pageDescription);
        } else {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            metaDescription.content = pageDescription;
            document.head.appendChild(metaDescription);
        }

        // Update Open Graph title
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', pageTitle);
        } else {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            ogTitle.content = pageTitle;
            document.head.appendChild(ogTitle);
        }

        // Update Open Graph description
        let ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', pageDescription);
        } else {
            ogDescription = document.createElement('meta');
            ogDescription.setAttribute('property', 'og:description');
            ogDescription.content = pageDescription;
            document.head.appendChild(ogDescription);
        }

        // Update Open Graph URL
        let ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
            ogUrl.setAttribute('content', 'https://damson.ge/#/contact');
        } else {
            ogUrl = document.createElement('meta');
            ogUrl.setAttribute('property', 'og:url');
            ogUrl.content = 'https://damson.ge/#/contact';
            document.head.appendChild(ogUrl);
        }

        // Update Twitter Card title
        let twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.setAttribute('content', pageTitle);
        } else {
            twitterTitle = document.createElement('meta');
            twitterTitle.name = 'twitter:title';
            twitterTitle.content = pageTitle;
            document.head.appendChild(twitterTitle);
        }

        // Update Twitter Card description
        let twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) {
            twitterDescription.setAttribute('content', pageDescription);
        } else {
            twitterDescription = document.createElement('meta');
            twitterDescription.name = 'twitter:description';
            twitterDescription.content = pageDescription;
            document.head.appendChild(twitterDescription);
        }
    }, []);

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
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="contact-card-title">ტელეფონი</h3>
                        <p className="contact-text">+995 555 80 20 60</p>
                    </a>

                    {/* Address */}
                    <div className="contact-card">
                        <div className="contact-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                        <p className="contact-text">+995 555 80 20 60</p>
                    </a>

                    {/* Facebook */}
                    <a
                        href="https://m.me/61585859816614"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-card clickable"
                    >
                        <div className="contact-icon">
                            <img src={facebook} alt="Facebook" className="contact-icon-img" />
                        </div>
                        <h3 className="contact-card-title">Messenger</h3>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Contact;