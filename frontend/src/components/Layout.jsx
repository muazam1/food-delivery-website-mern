import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Cart from './Cart';

const Layout = () => {
    return (
        <div className="landing-layout">
            <Navbar />
            <Cart />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
