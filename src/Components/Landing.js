import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingProducts from './LandingProducts';
import Trust from './Trust';
import '../Styles/Landing.css';

function Landing({ resetSignal }) {
  const navigate = useNavigate();
  const [landingTitle, setLandingTitle] = useState("");
  const [landingDescription, setLandingDescription] = useState("");
  const [landingBanner, setLandingBanner] = useState("");
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "https://home-back-3lqs.onrender.com";

  useEffect(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => { window.scrollTo(0, 0); });
    setTimeout(() => { window.scrollTo(0, 0); }, 0);
  }, []);

  useEffect(() => {
    const loadLandingSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/settings`);
        if (res.ok) {
          const data = await res.json();
          const settings = data.settings;
          if (settings.landingTitle) setLandingTitle(settings.landingTitle);
          if (settings.landingDescription) setLandingDescription(settings.landingDescription);
          if (settings.landingBanner) setLandingBanner(settings.landingBanner);
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
    const generateNoise = (opacity) => {
      if (!!!document.createElement('canvas').getContext) return false;
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

  // Update meta tags when landing data loads
  useEffect(() => {
    if (!loading && landingTitle && landingDescription) {
      // Clean title and description for meta tags (remove line breaks)
      const cleanTitle = landingTitle.replace(/\n/g, ' ').trim();
      const cleanDescription = landingDescription.replace(/\n/g, ' ').trim();
      
      const pageTitle = cleanTitle || 'Davson - ჭკვიანი სახლი | ჭკვიანი საკეტები, სიგნალიზაცია, ავტომატიზაცია';
      const pageDescription = cleanDescription || 'Davson - ჭკვიანი სახლის სისტემები საქართველოში. ჭკვიანი საკეტები, სიგნალიზაცია, ავტომატური კარები, განათება, გათბობა.';

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
        ogUrl.setAttribute('content', 'https://damson.ge');
      } else {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        ogUrl.content = 'https://damson.ge';
        document.head.appendChild(ogUrl);
      }

      // Update og:image if banner exists
      if (landingBanner) {
        let ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
          ogImage.setAttribute('content', landingBanner);
        } else {
          ogImage = document.createElement('meta');
          ogImage.setAttribute('property', 'og:image');
          ogImage.content = landingBanner;
          document.head.appendChild(ogImage);
        }
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

      // Update Twitter Card image if banner exists
      if (landingBanner) {
        let twitterImage = document.querySelector('meta[name="twitter:image"]');
        if (twitterImage) {
          twitterImage.setAttribute('content', landingBanner);
        } else {
          twitterImage = document.createElement('meta');
          twitterImage.name = 'twitter:image';
          twitterImage.content = landingBanner;
          document.head.appendChild(twitterImage);
        }
      }
    }
  }, [loading, landingTitle, landingDescription, landingBanner]);

  return (
    <>
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
              <button
                className="apple-button apple-button-primary"
                onClick={() => navigate('/products')}
              >
                იხილეთ პროდუქტები
              </button>
              <button
                className="apple-button apple-button-secondary"
                onClick={() => navigate('/contact')}
              >
                დაგვიკავშირდით
              </button>
            </div>
          </div>
        </div>
      </div>
      <LandingProducts resetSignal={resetSignal} />
      <Trust />
    </>
  );
}

export default Landing;