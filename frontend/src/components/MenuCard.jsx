import { useCart } from '../context/CartContext';

const MenuCard = ({ product }) => {
    const { addToCart } = useCart();
    const { name, price, image } = product;

    // Smart image path logic
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

    return (
        <div className="order-card">
            <div className="card-img-container">
                <img
                    src={getImageUrl(image)}
                    alt={name}
                    onError={(e) => { e.target.src = 'https://placehold.co/100?text=No+Img'; }}
                />
            </div>
            <h4>{name}</h4>
            <h4 className="price">{price}</h4>
            <button
                onClick={() => addToCart(product)}
                className="btn cursor-pointer"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default MenuCard;
