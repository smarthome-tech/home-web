import React, { useState, useEffect } from 'react';
import '../Styles/Filter.css';

function Filter({ products, onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (products && products.length > 0) {
      const uniqueCategories = [...new Set(
        products
          .map(product => product.classifications)
          .filter(Boolean)
      )];
      setCategories(uniqueCategories);
    }
  }, [products]);

  useEffect(() => {
    const handleClearFilter = () => {
      setSelectedCategory(null);
      onFilterChange('all');
    };
    window.addEventListener('clearFilter', handleClearFilter);
    return () => window.removeEventListener('clearFilter', handleClearFilter);
  }, [onFilterChange]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onFilterChange(category);
  };

  return (
    <div className="filter-container">
      <div className="filter-content">
        <div className="filter-chips-wrapper">
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