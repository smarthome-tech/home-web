import React, { useEffect } from 'react';
import '../Styles/Landing.css';

const transparentImage = process.env.PUBLIC_URL + '/trans.png';

function Landing() {
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
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-text">
          <h1 className="landing-title">
            ჭკვიანი სახლი <br />
            თქვენი კომფორტისთვის
          </h1>
          <p className="landing-description">
            თანამედროვე ტექნოლოგიები თქვენი სახლის<br />
            მართვისთვის 
          </p>
          <div className="landing-buttons">
            <button className="apple-button apple-button-primary">
              იხილეთ პროდუქტები
            </button>
            <button className="apple-button apple-button-secondary">
              დაგვიკავშირდით
            </button>
          </div>
        </div>
        <div className="landing-image-right">
          <img 
            src={transparentImage} 
            alt="Smart Home Device" 
            className="transparent-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;