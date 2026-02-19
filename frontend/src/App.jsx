import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Checkout from './pages/Checkout';
import { AuthProvider } from './context/AuthContext';
import Services from './pages/Services';
import About from './pages/About';
import AdminMessages from './pages/AdminMessages';
import AdminLayout from './components/AdminLayout';
import AdminMenu from './pages/AdminMenu';
import AdminUsers from './pages/AdminUsers';
import AdminHome from './pages/AdminHome';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Footer from './components/Footer';
import './App.css';

import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Toaster position="top-center" />
          <Routes>
            {/* Public Routes with Navbar/Footer */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
            </Route>

            {/* Admin Routes with Sidebar Layout */}
            <Route path="/admin" element={
              <ErrorBoundary>
                <AdminLayout />
              </ErrorBoundary>
            }>
              <Route index element={<AdminHome />} />
              <Route path="menu" element={<AdminMenu />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="messages" element={<AdminMessages />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App;
