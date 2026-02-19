import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaMinus, FaPlus, FaXmark } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "../style.css"; // <--- Make sure to import the CSS file!

const Cart = () => {
    const {
        cart,
        isCartOpen,
        toggleCart,
        updateQuantity,
        removeFromCart,
        totalPrice
    } = useCart();

    const navigate = useNavigate();

    const { user } = useAuth(); // Assuming useAuth exposes 'user'

    const handleCheckout = () => {
        if (!user) {
            toast.error("Please sign in to checkout");
            navigate('/signin');
            toggleCart();
            return;
        }
        toggleCart();
        navigate('/checkout');
    };

    const getPrice = (price) => {
        return parseFloat(String(price).replace(/[^0-9.]/g, ""));
    };

    // Smart image path logic (Same as MenuCard)
    const getImageUrl = (img) => {
        if (!img) return 'https://placehold.co/100?text=No+Img';
        if (img.startsWith('http')) return img;

        // If it starts with /uploads or uploads, normalize it
        if (img.includes('uploads')) return img.startsWith('/') ? img : `/${img}`;

        // If it's a legacy image like "images/spaghetti.png" or "spaghetti.png"
        if (img.includes('images/') || img.endsWith('.png')) {
            if (img.includes('images/')) {
                return img.startsWith('/') ? img : `/${img}`;
            }
            return `/images/${img}`;
        }

        // Otherwise assume it's a new upload without path
        return `/uploads/${img}`;
    };

    if (!isCartOpen) return null;

    return (
        <div className="cart-wrapper">
            {/* Dark Backdrop */}
            <div className="cart-overlay" onClick={toggleCart}></div>

            {/* Sidebar */}
            <div className="cart-sidebar">

                {/* Header */}
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    <button onClick={toggleCart} className="close-btn">
                        <FaXmark />
                    </button>
                </div>

                {/* Body (Scrollable) */}
                <div className="cart-body">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        <div className="cart-items">
                            {cart.map((item) => (
                                <div className="cart-item" key={item.id}>
                                    <div className="item-img">
                                        <img
                                            src={getImageUrl(item.image)}
                                            alt={item.name}
                                            onError={(e) => { e.target.src = 'https://placehold.co/100?text=No+Img'; }}
                                        />
                                    </div>

                                    <div className="item-details">
                                        <div className="item-title-row">
                                            <h4>{item.name}</h4>
                                            <p>${(getPrice(item.price) * (item.quantity || 1)).toFixed(2)}</p>
                                        </div>

                                        <div className="item-controls">
                                            <div className="qty-selector">
                                                <button onClick={() => item.quantity > 1 ? updateQuantity(item.id, -1) : removeFromCart(item.id)}>
                                                    <FaMinus size={10} />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)}>
                                                    <FaPlus size={10} />
                                                </button>
                                            </div>

                                            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer (Fixed) */}
                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="subtotal">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="action-buttons">
                            <button className="btn-close" onClick={toggleCart}>CLOSE</button>
                            <button className="btn-checkout" onClick={handleCheckout}>CHECKOUT</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;