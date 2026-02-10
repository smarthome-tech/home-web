import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Filter from './Filter';
import '../Styles/LandingProducts.css';

function LandingProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const productsTopRef = useRef(null);

  const API_BASE_URL = "https://home-back-3lqs.onrender.com";
  const PRODUCTS_PER_PAGE = 8; // 2 rows × 4 columns

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
    setCurrentPage(1);

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

    const existingBasket = JSON.parse(localStorage.getItem('basket') || '[]');
    const existingProductIndex = existingBasket.findIndex(
      item => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      existingBasket[existingProductIndex].quantity =
        (existingBasket[existingProductIndex].quantity || 1) + 1;
    } else {
      existingBasket.push({
        ...product,
        quantity: 1
      });
    }

    localStorage.setItem('basket', JSON.stringify(existingBasket));

    const totalCount = existingBasket.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );

    window.dispatchEvent(new CustomEvent('basketUpdate', {
      detail: { count: totalCount }
    }));

    console.log('Product added to basket:', product.name);
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (productsTopRef.current) {
      productsTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <>
        <Filter
          products={[]}
          onFilterChange={() => { }}
        />
        <div className="products-container">
          <div className="products-content">
            <div className="products-grid">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="product-card skeleton">
                  <div className="skeleton-image"></div>
                  <div className="product-info">
                    <div className="skeleton-text skeleton-title"></div>
                    <div className="skeleton-text skeleton-price"></div>
                    <div className="skeleton-buttons">
                      <div className="skeleton-btn skeleton-btn-primary"></div>
                      <div className="skeleton-btn skeleton-btn-secondary"></div>
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

  return (
    <>
      <Filter
        products={products}
        onFilterChange={handleFilterChange}
      />

      <div className="products-container" ref={productsTopRef}>
        <div className="products-content">
          {filteredProducts.length === 0 && !loading && (
            <div className="empty-state">
              <p className="empty-text">პროდუქტი არ მოიძებნა ამ კატეგორიაში</p>
            </div>
          )}

          <div className="products-grid">
            {currentProducts.map((product) => (
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

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                ← წინა
              </button>

              <div className="pagination-numbers">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                className="pagination-btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                შემდეგი →
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LandingProducts;