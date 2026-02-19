import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBagShopping, FaArrowRightFromBracket, FaBars, FaXmark, FaUser, FaCaretDown } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaArrowRightToBracket } from 'react-icons/fa6'; // Correct "Sign In" icon

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, logout } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
            <nav className="navbar flex between wrapper">
                <Link to="/" className="logo">Foodie.</Link>
                {/* FOR DESKTOP */}
                <ul className="navlist flex gap-3">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/menu" className="menu--class">Menu</Link>
                    </li>
                    <li>
                        <Link to="/services">Services</Link>
                    </li>
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="contact-Us">Contact</Link>
                    </li>
                    {user && user.isAdmin && (
                        <li>
                            <Link to="/admin" className="text-goldfinger font-bold">Admin Panel</Link>
                        </li>
                    )}
                </ul>
                <div className="destop-action flex gap-2">
                    <CartTrigger />
                    {user ? (
                        <div className="profile-container">
                            <div
                                className="profile-trigger flex items-center gap-2 cursor-pointer"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <div className="profile-icon">
                                    <FaUser />
                                </div>
                                <span className="profile-name">{user.name || "User"}</span>
                                <FaCaretDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </div>

                            {isDropdownOpen && (
                                <div className="profile-dropdown">
                                    <button onClick={logout} className="dropdown-item w-full text-left flex items-center gap-2">
                                        <FaArrowRightFromBracket className="rotate-180" />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/signin" className="btn sign-in-btn">
                            <span>Sign In</span>
                            <FaArrowRightToBracket />
                        </Link>
                    )}
                    <div onClick={toggleMenu} className="hamburger cursor-pointer">
                        {isOpen ? <FaXmark /> : <FaBars />}
                    </div>
                </div>
                {/* MOBILE MENU */}
                <ul className={`mobile-menu ${isOpen ? 'mobile-menu-active' : ''}`}>
                    <li>
                        <Link to="/" onClick={toggleMenu}>Home</Link>
                    </li>
                    <li>
                        <Link to="/menu" onClick={toggleMenu} className="menu--class">Menu</Link>
                    </li>
                    <li>
                        <Link to="/services" onClick={toggleMenu}>Services</Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={toggleMenu}>About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={toggleMenu} className="contact-Us">Contact</Link>
                    </li>
                    <li>
                        {user ? (
                            <button onClick={() => { logout(); toggleMenu(); }} className="btn sign-in-btn cursor-pointer">
                                Sign Out
                                &nbsp;
                                <FaArrowRightFromBracket className="rotate-180 inline" />
                            </button>
                        ) : (
                            <Link to="/signin" onClick={toggleMenu} className="btn sign-in-btn">
                                Sign In
                                &nbsp;
                                <FaArrowRightFromBracket className="inline" />
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

const CartTrigger = () => {
    const { toggleCart, totalItems } = useCart();
    return (
        <div onClick={toggleCart} className="cart-icon cursor-pointer">
            <FaBagShopping />
            <span className="cart-value text-sm flex items-center justify-center">
                {totalItems}
            </span>
        </div>
    );
};

export default Navbar;
