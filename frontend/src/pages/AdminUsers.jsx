import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaTrash, FaUserShield, FaSearch, FaEnvelope } from 'react-icons/fa';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/users', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUsers(data);
                } else {
                    toast.error('Failed to fetch users');
                }
            } catch (error) {
                toast.error('Error fetching users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            const res = await fetch(`/api/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            if (res.ok) {
                setUsers(users.filter(user => user._id !== id));
                toast.success('User deleted');
            } else {
                toast.error('Failed to delete user');
            }
        } catch (error) {
            toast.error('Error deleting user');
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Loading Users...</div>;

    return (
        <div className="admin-page">
            {/* Top Action Bar */}
            <div className="page-actions">
                <div className="search-bar">
                    <FaSearch />
                    <input type="text" placeholder="Search users by name or email..." />
                </div>
                {/* Optional: Add Filter Button here if needed */}
            </div>

            {/* Users Table */}
            <div className="data-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>User Profile</th>
                            <th>Role</th>
                            <th>Email Address</th>
                            <th>Joined Date</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>
                                    <div className="product-cell">
                                        <div className="avatar" style={{ background: '#E0E7FF', color: '#4F46E5' }}>
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span className="name">{user.name}</span>
                                            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>ID: {user._id.slice(-4)}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`status-badge ${user.isAdmin ? 'active' : 'inactive'}`}
                                        style={user.isAdmin ? { background: '#F3E8FF', color: '#7E22CE' } : { background: '#F3F4F6', color: '#374151' }}>
                                        {user.isAdmin ? <><FaUserShield style={{ marginRight: '5px' }} /> Admin</> : 'Customer'}
                                    </span>
                                </td>
                                <td>
                                    <a href={`mailto:${user.email}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4B5563' }}>
                                        <FaEnvelope style={{ color: '#9CA3AF' }} /> {user.email}
                                    </a>
                                </td>
                                <td style={{ fontFamily: 'monospace', color: '#6B7280' }}>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="text-right">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="icon-btn delete"
                                        title="Delete User"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;