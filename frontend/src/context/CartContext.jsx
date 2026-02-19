import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cartProducts');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cartProducts', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        toast.success(`${product.name} added to cart!`);
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(0, (item.quantity || 1) + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = cart.reduce((sum, item) => {
        const price = parseFloat(String(item.price).replace(/[^0-9.]/g, ""));
        return sum + price * (item.quantity || 1);
    }, 0);

    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart, updateQuantity,
            isCartOpen, toggleCart, totalItems, totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};
