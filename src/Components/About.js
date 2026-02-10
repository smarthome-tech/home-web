import React, { useState, useEffect } from 'react'
import '../Styles/About.css'

function About() {
  const [aboutText, setAboutText] = useState(
    `SmartHome დაარსდა 2020 წელს მიზნით, რომ საქართველოში ხელმისაწვდომი 
გახადოს ჭკვიანი სახლის უახლესი ტექნოლოგიები. ჩვენ გვჯერა, რომ 
თანამედროვე ტექნოლოგიები უნდა იყოს მარტივი გამოსაყენებელი და 
ყველასთვის ხელმისაწვდომი.

დღეს ჩვენ ვთავაზობთ პროდუქტების ფართო არჩევანს - უსაფრთხოების 
სისტემებიდან დაწყებული, განათების გადაწყვეტილებებით დამთავრებული. 
ჩვენი გუნდი მუდმივად მუშაობს იმისთვის, რომ თქვენს სახლს მეტი 
კომფორტი და უსაფრთხოება მივანიჭოთ.

ჩვენ ვთავაზობთ არა მხოლოდ პროდუქტებს, არამედ სრულფასოვან 
გადაწყვეტილებებს თქვენი სახლის ავტომატიზაციისთვის. ჩვენი 
სპეციალისტები დაგეხმარებიან შერჩევაში, დაინსტალირებაში და 
მოგაწვდიან ყველა საჭირო ინფორმაციას.`
  );

  const API_BASE_URL = "https://home-back-3lqs.onrender.com";

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
      }
    };

    loadAboutText();
  }, []);

  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">ჩვენს შესახებ</h1>
        {aboutText.split('\n\n').map((paragraph, index) => (
          paragraph.trim() && (
            <p key={index} className="about-text">
              {paragraph.trim()}
            </p>
          )
        ))}
      </div>
    </div>
  )
}

export default About