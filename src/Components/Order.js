import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/Order.css';

function Order() {
    const [state, handleSubmit] = useForm("xdaleawb");
    const navigate = useNavigate();
    const location = useLocation();

    // Check if it's a single product or basket order
    const product = location.state?.product;
    const basketItems = location.state?.basketItems;
    const totalPrice = location.state?.totalPrice;

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Scroll to top when success state changes
    useEffect(() => {
        if (state.succeeded) {
            window.scrollTo(0, 0);
        }
    }, [state.succeeded]);

    // Clear basket when order is successfully submitted
    useEffect(() => {
        if (state.succeeded && basketItems && basketItems.length > 0) {
            // Clear the basket from localStorage
            localStorage.setItem('basket', JSON.stringify([]));

            // Update the header basket count to 0
            window.dispatchEvent(new CustomEvent('basketUpdate', {
                detail: { count: 0 }
            }));
        }
    }, [state.succeeded, basketItems]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Prepare order details for the form submission
    const getOrderDetails = () => {
        if (basketItems && basketItems.length > 0) {
            return basketItems.map(item =>
                `${item.name} - რაოდენობა: ${item.quantity} - ₾${(item.price * item.quantity).toFixed(2)}`
            ).join('\n') + `\n\nსულ: ₾${totalPrice.toFixed(2)}`;
        } else if (product) {
            return `${product.name} - ₾${product.price}`;
        }
        return '';
    };

    if (state.succeeded) {
        return (
            <div className="order-success">
                <div className="success-icon">✓</div>
                <h2>შეკვეთა წარმატებით გაიგზავნა!</h2>
                <p>ჩვენ მალე დაგიკავშირდებით</p>
                <button
                    onClick={() => navigate('/')}
                    className="back-home-btn"
                >
                    მთავარ გვერდზე დაბრუნება
                </button>
            </div>
        );
    }

    return (
        <div className="order-container">
            <div className="order-content">
                <button onClick={() => navigate(-1)} className="back-link">
                    <span className="back-icon">‹</span>
                    <span>უკან დაბრუნება</span>
                </button>

                <div className="order-header">
                    <h1 className="order-title">შეკვეთის გაფორმება</h1>
                    <p className="order-subtitle">შეავსეთ ქვემოთ მოცემული ფორმა</p>
                </div>

                {/* Single Product Display */}
                {product && !basketItems && (
                    <div className="order-product-info">
                        <div className="product-mini-card">
                            <img src={product.mainImage} alt={product.name} />
                            <div className="product-mini-details">
                                <h3>{product.name}</h3>
                                <p className="product-mini-price">₾{product.price?.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Basket Items Display */}
                {basketItems && basketItems.length > 0 && (
                    <div className="order-basket-info">
                        <h2 className="basket-items-title">თქვენი შეკვეთა</h2>
                        <div className="basket-items-list">
                            {basketItems.map((item) => (
                                <div key={item._id} className="basket-item-mini">
                                    <img src={item.mainImage} alt={item.name} className="basket-item-image" />
                                    <div className="basket-item-details">
                                        <h3 className="basket-item-name">{item.name}</h3>
                                        <p className="basket-item-quantity">რაოდენობა: {item.quantity}</p>
                                        <p className="basket-item-price">₾{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="basket-total-section">
                            <div className="basket-total">
                                <span className="total-label">სულ:</span>
                                <span className="total-amount">₾{totalPrice?.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="order-form">
                    {/* Hidden field for order details */}
                    <input
                        type="hidden"
                        name="order_details"
                        value={getOrderDetails()}
                    />

                    <div className="form-group">
                        <label htmlFor="name">სახელი და გვარი *</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="..."
                        />
                        <ValidationError
                            prefix="სახელი"
                            field="name"
                            errors={state.errors}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">ტელეფონის ნომერი *</label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+995 5XX XX XX XX"
                        />
                        <ValidationError
                            prefix="ტელეფონი"
                            field="phone"
                            errors={state.errors}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">მისამართი *</label>
                        <input
                            id="address"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            placeholder="ქალაქი, ქუჩა, შენობა"
                        />
                        <ValidationError
                            prefix="მისამართი"
                            field="address"
                            errors={state.errors}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={state.submitting}
                        className="submit-order-btn"
                    >
                        {state.submitting ? 'იგზავნება...' : 'შეკვეთის გაგზავნა'}
                    </button>

                    {state.errors && state.errors.length > 0 && (
                        <div className="form-error">
                            დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Order;