import React, { useState, useEffect } from 'react';
import '../Styles/About.css';

function Services() {
    const [servicesText, setServicesText] = useState("");
    const [loading, setLoading] = useState(true);
    const API_BASE_URL = "https://home-back-3lqs.onrender.com";

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Load services text from backend
        const loadServicesText = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/settings`);
                if (res.ok) {
                    const data = await res.json();
                    const settings = data.settings;
                    if (settings.servicesText) {
                        setServicesText(settings.servicesText);
                    }
                }
            } catch (err) {
                console.error("Error loading services text:", err);
            } finally {
                setLoading(false);
            }
        };
        loadServicesText();
    }, []);

    // Update meta tags when services text loads
    useEffect(() => {
        const pageTitle = 'სერვისები - Davson | ჭკვიანი სახლის მომსახურება';
        
        // Create description from first paragraph or use default
        const firstParagraph = servicesText.split('\n\n')[0]?.trim() || 
            'Davson-ის სერვისები: ჭკვიანი სახლის სისტემების დაყენება, მომსახურება, ტექნიკური მხარდაჭერა. პროფესიონალური მომსახურება თბილისში.';
        
        const pageDescription = firstParagraph.length > 160 
            ? firstParagraph.substring(0, 157) + '...' 
            : firstParagraph;

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
            ogUrl.setAttribute('content', 'https://damson.ge/#/services');
        } else {
            ogUrl = document.createElement('meta');
            ogUrl.setAttribute('property', 'og:url');
            ogUrl.content = 'https://damson.ge/#/services';
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
    }, [servicesText]);

    return (
        <div className="about-container">
            <div className="about-content">
                <h1 className="about-title">სერვისები</h1>
                {loading ? (
                    <>
                        <div className="about-skeleton"></div>
                        <div className="about-skeleton"></div>
                        <div className="about-skeleton"></div>
                    </>
                ) : (
                    servicesText.split('\n\n').map((paragraph, index) => (
                        paragraph.trim() && (
                            <p key={index} className="about-text">
                                {paragraph.trim()}
                            </p>
                        )
                    ))
                )}
            </div>
        </div>
    );
}

export default Services;