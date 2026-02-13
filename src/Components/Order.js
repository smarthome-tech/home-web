import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/Order.css';

function Order() {
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Scroll to top when success state changes
    useEffect(() => {
        if (isSuccess) {
            window.scrollTo(0, 0);
        }
    }, [isSuccess]);

    // Clear basket when order is successfully submitted
    useEffect(() => {
        if (isSuccess && basketItems && basketItems.length > 0) {
            // Clear the basket from localStorage
            localStorage.setItem('basket', JSON.stringify([]));

            // Update the header basket count to 0
            window.dispatchEvent(new CustomEvent('basketUpdate', {
                detail: { count: 0 }
            }));
        }
    }, [isSuccess, basketItems]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const formDataToSend = new FormData();
        formDataToSend.append('access_key', '260d40d9-6646-46bb-8cea-b1809f32ad58');
        formDataToSend.append('name', formData.name);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('order_details', getOrderDetails());
        formDataToSend.append('subject', 'ახალი შეკვეთა - Davson');
        formDataToSend.append('from_name', 'Davson Website');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formDataToSend
            });

            const data = await response.json();

            if (data.success) {
                setIsSuccess(true);
                // Reset form
                setFormData({
                    name: '',
                    phone: '',
                    address: ''
                });
            } else {
                setError('დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.');
            }
        } catch (err) {
            setError('დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.');
            console.error('Submit error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
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
                    <div className="form-group">
                        <label htmlFor="name">სახელი და გვარი *</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="თქვენი სახელი და გვარი"
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
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="submit-order-btn"
                    >
                        {isSubmitting ? 'იგზავნება...' : 'შეკვეთის გაგზავნა'}
                    </button>

                    {error && (
                        <div className="form-error">
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Order;