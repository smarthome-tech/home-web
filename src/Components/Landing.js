import React, { useState, useEffect } from 'react';
import '../Styles/Landing.css';

function Landing() {
  const [landingTitle, setLandingTitle] = useState("");
  const [landingDescription, setLandingDescription] = useState("");
  const [landingBanner, setLandingBanner] = useState("");
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "https://home-back-3lqs.onrender.com";

  useEffect(() => {
    // Load landing settings from backend
    const loadLandingSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/settings`);
        if (res.ok) {
          const data = await res.json();
          const settings = data.settings;
          if (settings.landingTitle) {
            setLandingTitle(settings.landingTitle);
          }
          if (settings.landingDescription) {
            setLandingDescription(settings.landingDescription);
          }
          if (settings.landingBanner) {
            setLandingBanner(settings.landingBanner);
          }
        }
      } catch (err) {
        console.error("Error loading landing settings:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLandingSettings();
  }, []);

  useEffect(() => {
    // Generate noise background
    const generateNoise = (opacity) => {
      if (!!!document.createElement('canvas').getContext) {
        return false;
      }
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext('2d');
      canvas.width = 200;
      canvas.height = 200;
      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          const number = Math.floor(Math.random() * 60);
          ctx.fillStyle = `rgba(${number}, ${number}, ${number}, ${opacity})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
      const landingContainer = document.querySelector('.landing-container');
      if (landingContainer) {
        landingContainer.style.setProperty('--noise-bg', `url(${canvas.toDataURL("image/png")})`);
      }
    };
    generateNoise(0.15);
  }, []);

  return (
    <div className="landing-container" style={{
      backgroundImage: landingBanner ? `url(${landingBanner})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {landingBanner && <div className="landing-overlay"></div>}
      <div className="landing-content">
        <div className="landing-text">
          {loading ? (
            <>
              <div className="landing-skeleton landing-skeleton-title"></div>
              <div className="landing-skeleton landing-skeleton-title-line2"></div>
              <div className="landing-skeleton landing-skeleton-desc"></div>
              <div className="landing-skeleton landing-skeleton-desc-line2"></div>
            </>
          ) : (
            <>
              <h1 className="landing-title">
                {landingTitle.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < landingTitle.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>
              <p className="landing-description">
                {landingDescription.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < landingDescription.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </>
          )}
          <div className="landing-buttons">
            <button className="apple-button apple-button-primary">
              იხილეთ პროდუქტები
            </button>
            <button className="apple-button apple-button-secondary">
              დაგვიკავშირდით
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;