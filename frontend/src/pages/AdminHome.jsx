import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaUtensils, FaEnvelope, FaPlus, FaArrowRight, FaDollarSign } from 'react-icons/fa';

const AdminHome = () => {
    const [stats, setStats] = useState({ users: 0, menuItems: 0, messages: 0, sales: 1250.00 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: `Bearer ${token}` };

                const [usersRes, menuRes, messagesRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/api/users`, { headers }),
                    fetch(`${import.meta.env.VITE_API_URL}/api/recipes`),
                    fetch(`${import.meta.env.VITE_API_URL}/api/messages`, { headers })
                ]);

                const usersData = await usersRes.json();
                const menuData = await menuRes.json();
                const messagesData = await messagesRes.json();

                setStats({
                    users: Array.isArray(usersData) ? usersData.length : 0,
                    menuItems: Array.isArray(menuData.data) ? menuData.data.length : (Array.isArray(menuData) ? menuData.length : 0),
                    messages: Array.isArray(messagesData) ? messagesData.length : 0,
                    sales: 0.00 // Static for now as no Order API exists
                });
            } catch (error) {
                console.error("Error fetching admin stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="admin-page">
            {/* Welcome Banner */}
            <div className="welcome-banner">
                <div className="banner-content">
                    <h1>Welcome back, Admin 👋</h1>
                    <p>Here is what’s happening with your store today.</p>
                </div>
                <Link to="/admin/menu" className="btn-banner">
                    <FaPlus /> Add Product
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <StatCard
                    title="Total Revenue"
                    value={`$${stats.sales.toLocaleString()}`}
                    icon={<FaDollarSign />}
                    color="green"
                />
                <StatCard
                    title="Active Users"
                    value={stats.users}
                    icon={<FaUsers />}
                    color="blue"
                    link="/admin/users"
                />
                <StatCard
                    title="Menu Items"
                    value={stats.menuItems}
                    icon={<FaUtensils />}
                    color="gold"
                    link="/admin/menu"
                />
                <StatCard
                    title="Messages"
                    value={stats.messages}
                    icon={<FaEnvelope />}
                    color="purple"
                    link="/admin/messages"
                />
            </div>

            {/* Bottom Grid */}
            <div className="dashboard-grid">
                <div className="card-panel">
                    <div className="card-header">
                        <h3>Quick Actions</h3>
                    </div>
                    <div className="action-buttons">
                        <Link to="/admin/menu" className="action-btn">
                            <div className="icon-box gold"><FaUtensils /></div>
                            <div className="text">
                                <h4>Update Menu</h4>
                                <p>Edit items & prices</p>
                            </div>
                            <FaArrowRight className="arrow" />
                        </Link>
                        <Link to="/admin/messages" className="action-btn">
                            <div className="icon-box purple"><FaEnvelope /></div>
                            <div className="text">
                                <h4>Read Inbox</h4>
                                <p>Check inquiries</p>
                            </div>
                            <FaArrowRight className="arrow" />
                        </Link>
                    </div>
                </div>

                <div className="card-panel">
                    <div className="card-header">
                        <h3>System Health</h3>
                    </div>
                    <div className="system-status">
                        <div className="status-row">
                            <span className="status-label"><span className="dot green"></span> Server Status</span>
                            <span className="status-value green">Online</span>
                        </div>
                        <div className="status-row">
                            <span className="status-label"><span className="dot blue"></span> Database</span>
                            <span className="status-value blue">Connected</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color, link }) => {
    const CardContent = (
        <div className={`stat-card ${color}`}>
            <div className="stat-icon">{icon}</div>
            <div className="stat-info">
                <p className="stat-title">{title}</p>
                <h3>{value}</h3>
            </div>
        </div>
    );
    return link ? <Link to={link}>{CardContent}</Link> : CardContent;
};

export default AdminHome;