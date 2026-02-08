import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../Styles/Filter.css';

function Filter({ products, onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Extract unique categories from products
    if (products && products.length > 0) {
      const uniqueCategories = [...new Set(
        products
          .map(product => product.classifications)
          .filter(Boolean) // Remove null/undefined
      )];
      setCategories(uniqueCategories);
    }
  }, [products]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onFilterChange(category);
  };

  const handleArrowClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="filter-container">
      <div className="filter-content">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          slidesPerView="auto"
          spaceBetween={8}
          className="filter-swiper"
        >
          {/* All Categories Chip */}
          <SwiperSlide className="swiper-slide-auto">
            <button
              className={`filter-chip ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('all')}
            >
              <span className="chip-text">ყველა</span>
              {selectedCategory === 'all' && (
                <span className="chip-indicator"></span>
              )}
            </button>
          </SwiperSlide>

          {/* Category Chips */}
          {categories.map((category) => (
            <SwiperSlide key={category} className="swiper-slide-auto">
              <button
                className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                <span className="chip-text">{category}</span>
                {selectedCategory === category && (
                  <span className="chip-indicator"></span>
                )}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button 
          className="swiper-button-prev-custom scroll-arrow scroll-arrow-left"
          onClick={handleArrowClick}
          onMouseDown={handleArrowClick}
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button 
          className="swiper-button-next-custom scroll-arrow scroll-arrow-right"
          onClick={handleArrowClick}
          onMouseDown={handleArrowClick}
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Filter;