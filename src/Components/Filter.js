import React, { useState, useEffect } from 'react';
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

  return (
    <div className="filter-container">
      <div className="filter-content">
        <div className="filter-chips-wrapper">
          {/* All Categories Chip */}
          <button
            className={`filter-chip ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('all')}
          >
            <span className="chip-text">ყველა</span>
            {selectedCategory === 'all' && (
              <span className="chip-indicator"></span>
            )}
          </button>

          {/* Category Chips */}
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              <span className="chip-text">{category}</span>
              {selectedCategory === category && (
                <span className="chip-indicator"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;