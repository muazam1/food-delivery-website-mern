import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaTrash, FaEnvelope, FaSearch } from 'react-icons/fa';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch('/api/messages', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                const data = await res.json();
                setMessages(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching messages:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this message?')) return;
        try {
            const res = await fetch(`/api/messages/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (res.ok) {
                setMessages(messages.filter(msg => msg._id !== id));
                toast.success('Message deleted');
            }
        } catch (error) {
            toast.error('Error deleting message');
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Loading Inbox...</div>;

    return (
        <div className="admin-page">
            {/* Page Header / Search */}
            <div className="page-actions">
                <div className="search-bar">
                    <FaSearch />
                    <input type="text" placeholder="Search inbox..." />
                </div>
                <div style={{ fontWeight: '700', color: '#6B7280' }}>
                    Total: {messages.length} Messages
                </div>
            </div>

            {/* Inbox Table */}
            <div className="data-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '20%' }}>Sender</th>
                            <th style={{ width: '20%' }}>Subject</th>
                            <th style={{ width: '40%' }}>Message</th>
                            <th style={{ width: '15%' }}>Date</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.length === 0 ? (
                            <tr>
                                <td colspan="5" style={{ textAlign: 'center', padding: '40px', color: '#9CA3AF' }}>
                                    No new messages found.
                                </td>
                            </tr>
                        ) : (
                            messages.map(msg => (
                                <tr key={msg._id}>
                                    <td>
                                        <div className="product-cell">
                                            <div className="avatar" style={{ background: '#FEF3C7', color: '#D97706', fontSize: '12px' }}>
                                                <FaEnvelope />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span className="name">{msg.name}</span>
                                                <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{msg.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: '600', color: '#374151' }}>
                                        {msg.subject || 'No Subject'}
                                    </td>
                                    <td style={{ color: '#6B7280', fontSize: '14px', lineHeight: '1.4' }}>
                                        {msg.message.length > 60 ? msg.message.substring(0, 60) + '...' : msg.message}
                                    </td>
                                    <td style={{ fontSize: '13px', color: '#9CA3AF' }}>
                                        {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="text-right">
                                        <button
                                            onClick={() => handleDelete(msg._id)}
                                            className="icon-btn delete"
                                            title="Delete Message"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminMessages;