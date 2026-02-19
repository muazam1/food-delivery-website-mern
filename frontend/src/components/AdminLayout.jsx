import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaChartPie, FaUtensils, FaUsers, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const AdminLayout = () => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user || !user.isAdmin) return <AccessDenied />;

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: <FaChartPie /> },
        { path: '/admin/menu', label: 'Menu Items', icon: <FaUtensils /> },
        { path: '/admin/users', label: 'Customers', icon: <FaUsers /> },
        { path: '/admin/messages', label: 'Inbox', icon: <FaEnvelope /> },
    ];

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="pt-20">
                    <Link
                        to="/"
                        className="flex items-center gap-1 text-gray-500 text-sm hover:text-gray-800 transition-colors"
                    >
                        <FaSignOutAlt className="rotate-180" />
                        Back to Home
                    </Link>
                </div>
                <div className="sidebar-header">


                    <h2>Foodie<span className="text-gold">Admin</span>.</h2>
                </div>

                <nav className="sidebar-nav">
                    <p className="nav-label">Main Menu</p>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="admin-profile">
                        <div className="avatar">{user.name.charAt(0)}</div>
                        <div className="info">
                            <p className="name">{user.name}</p>
                            <p className="role">Administrator</p>
                        </div>
                    </div>

                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-content">
                <header className="admin-topbar">
                    <h2 className="page-title">
                        {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
                    </h2>
                    <span className="date-badge">
                        {new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' })}
                    </span>
                </header>

                <div className="content-scroll">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

const AccessDenied = () => (
    <div className="access-denied">
        <div className="denied-card">
            <div className="lock-icon">🔒</div>
            <h2>Access Restricted</h2>
            <p>You need admin permissions to view this dashboard.</p>
            <Link to="/signin" className="btn-primary">Back to Login</Link>
        </div>
    </div>
);

export default AdminLayout;