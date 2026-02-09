import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Filter from './Filter';
import '../Styles/LandingProducts.css';

function LandingProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  
  const API_BASE_URL = "https://home-back-3lqs.onrender.com";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        const data = await res.json();
        const productList = data.products || [];
        setProducts(productList);
        setFilteredProducts(productList);
      } catch (err) {
        console.error("Error loading products:", err);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Generate noise texture for product cards
    const generateNoise = (opacity = 0.12) => {
      if (!document.createElement('canvas').getContext) {
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

      document.documentElement.style.setProperty(
        '--noise-texture', 
        `url(${canvas.toDataURL("image/png")})`
      );
    };

    generateNoise();
  }, []);

  // Handle filter changes
  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        product => product.classifications === category
      );
      setFilteredProducts(filtered);
    }
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    
    // Get existing basket from localStorage
    const existingBasket = JSON.parse(localStorage.getItem('basket') || '[]');
    
    // Check if product already exists in basket
    const existingProductIndex = existingBasket.findIndex(
      item => item._id === product._id
    );
    
    if (existingProductIndex !== -1) {
      // If product exists, increase quantity
      existingBasket[existingProductIndex].quantity = 
        (existingBasket[existingProductIndex].quantity || 1) + 1;
    } else {
      // If product doesn't exist, add it with quantity 1
      existingBasket.push({
        ...product,
        quantity: 1
      });
    }
    
    // Save updated basket to localStorage
    localStorage.setItem('basket', JSON.stringify(existingBasket));
    
    // Dispatch custom event to update header basket count
    const totalCount = existingBasket.reduce(
      (total, item) => total + (item.quantity || 1), 
      0
    );
    
    window.dispatchEvent(new CustomEvent('basketUpdate', { 
      detail: { count: totalCount } 
    }));
    
    // Optional: Show a brief success message
    console.log('Product added to basket:', product.name);
  };

  if (loading) {
    return (
      <div className="products-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Filter Component */}
      <Filter 
        products={products} 
        onFilterChange={handleFilterChange}
      />

      <div className="products-container">
        <div className="products-content">
          {/* Show message if no products match filter */}
          {filteredProducts.length === 0 && !loading && (
            <div className="empty-state">
              <p className="empty-text">პროდუქტი არ მოიძებნა ამ კატეგორიაში</p>
            </div>
          )}

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div 
                key={product._id} 
                className="product-card"
                onClick={() => handleViewDetails(product._id)}
              >
                <div className="card-noise-overlay"></div>
                
                <div className="product-image-container">
                  {product.mainImage && (
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className="product-img"
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  
                  <p className="product-price">₾{product.price?.toFixed(2)}</p>
                  
                  <div className="product-actions">
                    <button 
                      className="add-to-cart-btn"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <span className="btn-text">კალათაში დამატება</span>
                    </button>
                    
                    <button 
                      className="details-btn icon-wrapper"
                      onClick={() => handleViewDetails(product._id)}
                    >
                      <span className="icon-copy">დეტალურად</span>
                      <span className="icon icon-after more" aria-hidden="true"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingProducts;