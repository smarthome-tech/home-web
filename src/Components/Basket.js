import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Basket.css';

function Basket() {
  const [basketItems, setBasketItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadBasket();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [basketItems]);

  const loadBasket = () => {
    const basket = JSON.parse(localStorage.getItem('basket') || '[]');
    setBasketItems(basket);
  };

  const calculateTotal = () => {
    const total = basketItems.reduce((sum, item) => {
      return sum + (item.price * (item.quantity || 1));
    }, 0);
    setTotalPrice(total);
  };

  const updateBasketInStorage = (updatedBasket) => {
    localStorage.setItem('basket', JSON.stringify(updatedBasket));

    // Update header count
    const totalCount = updatedBasket.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );

    window.dispatchEvent(new CustomEvent('basketUpdate', {
      detail: { count: totalCount }
    }));
  };

  const removeFromBasket = (productId) => {
    const updatedBasket = basketItems.filter(item => item._id !== productId);
    setBasketItems(updatedBasket);
    updateBasketInStorage(updatedBasket);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromBasket(productId);
      return;
    }

    const updatedBasket = basketItems.map(item =>
      item._id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    setBasketItems(updatedBasket);
    updateBasketInStorage(updatedBasket);
  };

  const handleWhatsAppOrder = () => {
    if (basketItems.length === 0) return;

    const orderMessage = basketItems.map(item =>
      `${item.name} - რაოდენობა: ${item.quantity} - ₾${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const totalMessage = `\n\nსულ: ₾${totalPrice.toFixed(2)}`;
    const whatsappUrl = `https://wa.me/995555123456?text=${encodeURIComponent('შეკვეთა:\n\n' + orderMessage + totalMessage)}`;

    window.open(whatsappUrl, '_blank');
  };

  const handleFormOrder = () => {
    // Navigate to order page with basket items
    navigate('/order', { state: { basketItems, totalPrice } });
  };

  const handlePhoneCall = () => {
    window.location.href = 'tel:+995555123456';
  };

  if (basketItems.length === 0) {
    return (
      <div className="basket-container">
        <div className="basket-content">
          <div className="basket-header">
            <h1 className="basket-title">კალათა</h1>
          </div>

          <div className="basket-empty">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h2 className="empty-title">თქვენი კალათა ცარიელია</h2>
            <p className="empty-description">დაამატეთ პროდუქტები შესაძენად</p>
            <button
              className="continue-shopping-btn"
              onClick={() => navigate('/products')}
            >
              პროდუქტების ნახვა
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="basket-container">
      <div className="basket-content">
        <div className="basket-header">
          <h1 className="basket-title">კალათა</h1>
          <p className="basket-count">{basketItems.length} პროდუქტი</p>
        </div>

        <div className="basket-main">
          <div className="basket-items">
            {basketItems.map((item) => (
              <div key={item._id} className="basket-item">
                <div className="item-image-wrapper">
                  <img
                    src={item.mainImage}
                    alt={item.name}
                    className="item-image"
                  />
                </div>

                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">₾{item.price?.toFixed(2)}</p>
                </div>

                <div className="item-quantity">
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>

                <div className="item-total">
                  <p className="item-total-price">
                    ₾{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromBasket(item._id)}
                  aria-label="Remove item"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="basket-summary">
            <div className="summary-card">
              <h2 className="summary-title">შეკვეთის შეჯამება</h2>

              <div className="summary-row">
                <span className="summary-label">პროდუქტები ({basketItems.length})</span>
                <span className="summary-value">₾{totalPrice.toFixed(2)}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row summary-total">
                <span className="summary-label">სულ</span>
                <span className="summary-value">₾{totalPrice.toFixed(2)}</span>
              </div>

              <div className="contact-section">
                <p className="contact-title">შეკვეთის გაფორმება</p>

                <button
                  className="contact-btn form-order-btn"
                  onClick={handleFormOrder}
                >
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" fill="currentColor" />
                  </svg>
                  შეკვეთა
                </button>

                <button
                  className="contact-btn whatsapp-btn"
                  onClick={handleWhatsAppOrder}
                >
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor" />
                  </svg>
                  WhatsApp-ით შეკვეთა
                </button>

                <button
                  className="contact-btn phone-btn"
                  onClick={handlePhoneCall}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  ზარი: +995 555 80 20 60
                </button>

                <p className="contact-info">
                  დარეკეთ ან გამოგვიგზავნეთ შეკვეთა WhatsApp-ზე
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Basket;