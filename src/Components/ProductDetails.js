import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Styles/ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://home-back-3lqs.onrender.com";
  
  // Store owner contact info
  const WHATSAPP_NUMBER = "995555123456"; // Replace with actual number
  const PHONE_NUMBER = "+995555123456"; // Replace with actual number

  useEffect(() => {
    // Scroll to top when component mounts or product ID changes
    window.scrollTo(0, 0);
    
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!res.ok) {
          throw new Error('პროდუქტი ვერ მოიძებნა');
        }
        const data = await res.json();
        setProduct(data.product || data);
      } catch (err) {
        console.error("Error loading product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
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

  const handleWhatsAppOrder = () => {
    if (!product) return;
    const message = `გამარჯობა! მინდა შევუკვეთო: ${product.name} (₾${product.price})`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  if (loading) {
    return (
      <div className="product-details-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-container">
        <div className="error-state">
          <h2>პროდუქტი ვერ მოიძებნა</h2>
          <button onClick={() => navigate('/')} className="back-btn">
            უკან დაბრუნება
          </button>
        </div>
      </div>
    );
  }

  // Combine main image with other photos for carousel
  const allImages = [
    product.mainImage,
    ...(product.otherPhotos || [])
  ].filter(Boolean);

  return (
    <div className="product-details-container">
      <div className="product-details-content">
        {/* Back Button */}
        <button onClick={() => navigate('/')} className="back-link">
          <span className="back-icon">‹</span>
          <span>პროდუქტები</span>
        </button>

        <div className="product-details-grid">
          {/* Left Side - Images */}
          <div className="product-gallery">
            {/* Main Image Display */}
            <div className="main-image-container">
              <img
                src={allImages[selectedImage]}
                alt={product.name}
                className="main-image"
              />
              
              {/* Status Badge - Show statusNote if available */}
              {product.statusNote && (
                <div className="status-badge">
                  {product.statusNote}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="thumbnail-gallery">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Product Info */}
          <div className="product-info-section">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              {product.classifications && (
                <p className="product-category">{product.classifications}</p>
              )}
            </div>

            <div className="product-price-section">
              <span className="product-price">₾{product.price?.toFixed(2)}</span>
            </div>

            {/* Status Information */}
            {(product.statusNote || product.expectedArrival) && (
              <div className="status-info-box">
                {product.statusNote && (
                  <p className="status-note">
                    <span className="status-icon">ℹ️</span>
                    {product.statusNote}
                  </p>
                )}
                {product.expectedArrival && (
                  <p className="expected-arrival">
                    <span className="status-icon">📅</span>
                    მოსალოდნელია: {new Date(product.expectedArrival).toLocaleDateString('ka-GE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="product-description-section">
                <h2 className="section-title">აღწერა</h2>
                <p className="product-description">{product.description}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                onClick={handleAddToCart}
                className="order-btn add-to-cart-btn"
                disabled={product.status === 'discontinued'}
              >
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
                </svg>
                კალათაში დამატება
              </button>

              <button 
                onClick={handleWhatsAppOrder}
                className="order-btn whatsapp-btn"
                disabled={product.status === 'discontinued'}
              >
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
                </svg>
                შეკვეთა WhatsApp-ით
              </button>

              <button 
                onClick={handleCall}
                className="order-btn call-btn"
              >
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" fill="currentColor"/>
                </svg>
                დარეკვა
              </button>
            </div>

            {/* Additional Info */}
            <div className="additional-info">
              <div className="info-item">
                <span className="info-label">პროდუქტის კოდი:</span>
                <span className="info-value">{product._id?.slice(-8).toUpperCase()}</span>
              </div>
              {product.uploadDate && (
                <div className="info-item">
                  <span className="info-label">დამატების თარიღი:</span>
                  <span className="info-value">
                    {new Date(product.uploadDate).toLocaleDateString('ka-GE')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;