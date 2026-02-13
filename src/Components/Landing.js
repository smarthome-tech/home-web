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

  // Strip HTML tags to get plain text for meta tags
  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  useEffect(() => {
    if (!loading && landingTitle && landingDescription) {
      const cleanTitle = stripHtml(landingTitle).replace(/\n/g, ' ').trim();
      const cleanDescription = stripHtml(landingDescription).replace(/\n/g, ' ').trim();

      const pageTitle = cleanTitle || 'Davson - ჭკვიანი სახლი | ჭკვიანი საკეტები, სიგნალიზაცია, ავტომატიზაცია';
      const pageDescription = cleanDescription || 'Davson - ჭკვიანი სახლის სისტემები საქართველოში. ჭკვიანი საკეტები, სიგნალიზაცია, ავტომატური კარები, განათება, გათბობა.';

      document.title = pageTitle;

      const setMeta = (selector, attr, value) => {
        let el = document.querySelector(selector);
        if (el) { el.setAttribute(attr, value); }
        else {
          el = document.createElement('meta');
          const [attrName, attrVal] = selector.match(/\[([^\]]+)="([^"]+)"\]/)?.slice(1) || [];
          if (attrName) el.setAttribute(attrName, attrVal);
          el.setAttribute(attr, value);
          document.head.appendChild(el);
        }
      };

      setMeta('meta[name="description"]', 'content', pageDescription);
      setMeta('meta[property="og:title"]', 'content', pageTitle);
      setMeta('meta[property="og:description"]', 'content', pageDescription);
      setMeta('meta[property="og:url"]', 'content', 'https://damson.ge');
      setMeta('meta[name="twitter:title"]', 'content', pageTitle);
      setMeta('meta[name="twitter:description"]', 'content', pageDescription);

      if (landingBanner) {
        setMeta('meta[property="og:image"]', 'content', landingBanner);
        setMeta('meta[name="twitter:image"]', 'content', landingBanner);
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
                {/* ── Render HTML from rich text editor ── */}
                <h1
                  className="landing-title"
                  dangerouslySetInnerHTML={{ __html: landingTitle }}
                />
                <p
                  className="landing-description"
                  dangerouslySetInnerHTML={{ __html: landingDescription }}
                />
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