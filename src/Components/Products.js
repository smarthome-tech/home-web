import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Filter from './Filter';
import '../Styles/Products.css';
import Trust from './Trust';

function Products({ resetSignal }) {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 16;

  const API_BASE_URL = "https://home-back-3lqs.onrender.com";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    paginateProducts();
  }, [filteredProducts, currentPage]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/products`);
      const data = await res.json();
      const productList = data.products || [];
      setAllProducts(productList);
      setFilteredProducts(productList);
      const pages = Math.ceil(productList.length / productsPerPage);
      setTotalPages(pages);
    } catch (err) {
      console.error("Error loading products:", err);
      setAllProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const paginateProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setProducts(filteredProducts.slice(startIndex, endIndex));
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(allProducts);
      setTotalPages(Math.ceil(allProducts.length / productsPerPage));
    } else {
      const filtered = allProducts.filter(
        product => product.classifications === category
      );
      setFilteredProducts(filtered);
      setTotalPages(Math.ceil(filtered.length / productsPerPage));
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      existingBasket.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('basket', JSON.stringify(existingBasket));
    const totalCount = existingBasket.reduce(
      (total, item) => total + (item.quantity || 1), 0
    );
    window.dispatchEvent(new CustomEvent('basketUpdate', {
      detail: { count: totalCount }
    }));
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  if (loading) {
    return (
      <>
        <Filter products={[]} onFilterChange={() => { }} resetSignal={resetSignal} />
        <div className="products-page-container">
          <div className="products-page-content">
            <div className="products-page-grid">
              {[...Array(16)].map((_, index) => (
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
        products={allProducts}
        onFilterChange={handleFilterChange}
        resetSignal={resetSignal}
      />

      <div className="products-page-container">
        <div className="products-page-content">
          {products.length === 0 && !loading && (
            <div className="empty-state">
              <p className="empty-text">პროდუქტი არ მოიძებნა ამ კატეგორიაში</p>
            </div>
          )}

          <div className="products-page-grid">
            {products.map((product) => (
              <div
                key={product._id}
                className="product-card"
                onClick={() => handleViewDetails(product._id)}
              >
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
                      <span className="icon-icon-after more" aria-hidden="true"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                className="pagination-arrow"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="pagination-numbers">
                {getPageNumbers().map((pageNum, index) => (
                  pageNum === '...' ? (
                    <span key={`dots-${index}`} className="pagination-dots">...</span>
                  ) : (
                    <button
                      key={pageNum}
                      className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  )
                ))}
              </div>
              <button
                className="pagination-arrow"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}

          {products.length > 0 && (
            <div className="page-info">
              <p className="page-info-text">
                გვერდი {currentPage} / {totalPages} •
                ნაჩვენებია {((currentPage - 1) * productsPerPage) + 1}-{Math.min(currentPage * productsPerPage, filteredProducts.length)} / {filteredProducts.length}
              </p>
            </div>
          )}
        </div>
      </div>
      <Trust />
    </>
  );
}

export default Products;