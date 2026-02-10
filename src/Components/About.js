import React, { useState, useEffect } from 'react'
import '../Styles/About.css'

function About() {
  const [aboutText, setAboutText] = useState("");
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "https://home-back-3lqs.onrender.com";

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Load about text from backend
    const loadAboutText = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/settings`);
        if (res.ok) {
          const data = await res.json();
          const settings = data.settings;
          if (settings.aboutText) {
            setAboutText(settings.aboutText);
          }
        }
      } catch (err) {
        console.error("Error loading about text:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAboutText();
  }, []);

  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">ჩვენს შესახებ</h1>
        {loading ? (
          <>
            <div className="about-skeleton"></div>
            <div className="about-skeleton"></div>
            <div className="about-skeleton"></div>
          </>
        ) : (
          aboutText.split('\n\n').map((paragraph, index) => (
            paragraph.trim() && (
              <p key={index} className="about-text">
                {paragraph.trim()}
              </p>
            )
          ))
        )}
      </div>
    </div>
  )
}

export default About