import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import '../style.css';

const Checkout = () => {
    const { user } = useAuth();
    const { cart, totalPrice, clearCart } = useCart(); // Assuming a clearCart function exists or we'll add it
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('card');

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        // Simulate Order Placement
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Processing payment...',
                success: <b>Order placed successfully!</b>,
                error: <b>Could not place order.</b>,
            }
        ).then(() => {
            // navigate('/order-success'); // In a real app
            navigate('/');
        });
    };

    useEffect(() => {
        if (!user) {
            navigate('/signin');
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <section className="checkout-section">
            <div className="wrapper">
                <div className="checkout-header">
                    <h5>CHECKOUT</h5>
                    <h2>Complete Your Order</h2>
                </div>

                <div className="checkout-container">
                    {/* LEFT: Order Summary (Yellow Box) */}
                    <div className="order-summary-card">
                        <h3 className="card-title">Order Summary</h3>

                        <div className="order-items-list">
                            {cart.map((item) => (
                                <div key={item.id} className="order-item">
                                    <div className="order-img">
                                        <img src={`/${item.image}`} alt={item.name} />
                                    </div>
                                    <div className="order-info">
                                        <h4>{item.name}</h4>
                                        <p>Qty: {item.quantity}</p>
                                    </div>
                                    <p className="order-price">
                                        ${(parseFloat(String(item.price).replace(/[^0-9.]/g, "")) * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="order-total-row">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* RIGHT: Shipping Form */}
                    <div className="shipping-form-card">
                        <form className="shipping-form" onSubmit={handlePlaceOrder}>
                            <h3 className="card-title">Shipping Details</h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-input" required />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" className="form-input" required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-input" required />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" className="form-input" required />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="tel" className="form-input" required />
                                </div>
                            </div>

                            {/* Payment Method Selection */}
                            <h3 className="card-title mt-6">Payment Method</h3>
                            <div className="payment-selector">
                                <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                        className="hidden-radio"
                                    />
                                    <span className="radio-circle"></span>
                                    <span>Credit/Debit Card</span>
                                </label>

                                <label className={`payment-option ${paymentMethod === 'easypaisa' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="easypaisa"
                                        checked={paymentMethod === 'easypaisa'}
                                        onChange={() => setPaymentMethod('easypaisa')}
                                        className="hidden-radio"
                                    />
                                    <span className="radio-circle"></span>
                                    <span>EasyPaisa</span>
                                </label>

                                <label className={`payment-option ${paymentMethod === 'jazzcash' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="jazzcash"
                                        checked={paymentMethod === 'jazzcash'}
                                        onChange={() => setPaymentMethod('jazzcash')}
                                        className="hidden-radio"
                                    />
                                    <span className="radio-circle"></span>
                                    <span>JazzCash</span>
                                </label>

                                <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={() => setPaymentMethod('cod')}
                                        className="hidden-radio"
                                    />
                                    <span className="radio-circle"></span>
                                    <span>Cash on Delivery</span>
                                </label>
                            </div>

                            {/* Conditional Payment Inputs */}
                            <div className="payment-details mt-4">
                                {paymentMethod === 'card' && (
                                    <div className="space-y-4">
                                        <div className="form-group">
                                            <label>Card Number</label>
                                            <input type="text" placeholder="1234 5678 9123 0000" className="form-input" />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Expiry Date</label>
                                                <input type="text" placeholder="MM/YY" className="form-input" />
                                            </div>
                                            <div className="form-group">
                                                <label>CVC</label>
                                                <input type="text" placeholder="123" className="form-input" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {(paymentMethod === 'easypaisa' || paymentMethod === 'jazzcash') && (
                                    <div className="form-group">
                                        <label>Mobile Number</label>
                                        <input type="tel" placeholder="03XX-XXXXXXX" className="form-input" />
                                    </div>
                                )}

                                {paymentMethod === 'cod' && (
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center text-gray-500">
                                        <p>You will pay ${totalPrice.toFixed(2)} upon delivery.</p>
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="btn-checkout-submit">
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;