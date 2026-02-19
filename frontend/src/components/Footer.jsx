import { FaXTwitter, FaInstagram, FaFacebookF, FaGooglePlusG } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer id="555">
            <div className="footer-container">
                <div className="flex wrapper gap-4">
                    <div className="footer-wrapper">
                        <Link to="/" className="logo">Foodie.</Link>
                        <p className="mt-one-half">
                            We will fill your tummy <br /> with delicious food with fast devlivery.
                        </p>
                        <div className="flex gap-2 mt-one-half">
                            <a href="https://twitter.com" target="_blank" className="social-icons">
                                <i className="fa-brands fa-x-twitter"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" className="social-icons">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="https://facebook.com" target="_blank" className="social-icons">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="https://google.com" target="_blank" className="social-icons">
                                <i className="fa-brands fa-google-plus-g"></i>
                            </a>
                        </div>
                    </div>
                    <ul className="footer-wrapper">
                        <li>
                            <h4>Our Menu</h4>
                        </li>
                        <li className="mt-one-half">
                            <a href="#" className="footer-link">Special</a>
                        </li>
                        <li className="mt-one-half">
                            <a href="#" className="footer-link">Popular</a>
                        </li>
                        <li className="mt-one-half">
                            <a href="#" className="footer-link">Category</a>
                        </li>
                    </ul>
                    <ul className="footer-wrapper">
                        <li>
                            <h4>Company</h4>
                        </li>
                        <li className="mt-one-half">
                            <a href="#" className="footer-link">Why Foodie</a>
                        </li>
                        <li className="mt-one-half">
                            <a href="#" className="footer-link">Partner with us</a>
                        </li>
                        <li className="mt-one-half">
                            <a href="#" className="footer-link">About us</a>
                        </li>
                        <li className="mt-one-half">
                            <a href="#" className="footer-link">FAQ's</a>
                        </li>
                    </ul>
                    <ul className="footer-wrapper">
                        <li>
                            <h4>Support</h4>
                        </li>
                        <li className="mt-one-half">
                            <a href="#" className="footer-link">Account</a>
                        </li>
                        <li className="mt-one-half">
                            <a href="#" className="footer-link">Support Center</a>
                        </li>
                        <li className="mt-one-half">
                            <a href="#" className="footer-link">Feedback</a>
                        </li>
                        <li className="mt-one-half">
                            <a href="#" className="footer-link">Contacts</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
