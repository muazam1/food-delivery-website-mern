import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaTrash, FaPlus, FaImage, FaSearch, FaTimes } from 'react-icons/fa';

const AdminMenu = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', price: '', image: null });
    const [preview, setPreview] = useState(null);

    const fetchRecipes = async () => {
        try {
            const res = await fetch('/api/recipes');
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }
            const data = await res.json();
            // Backend might return { data: [...] } or just [...]
            setRecipes(Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []));
        } catch (error) {
            console.error("Error fetching recipes:", error);
            toast.error("Failed to load menu items: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewItem({ ...newItem, image: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("You must be logged in as admin");
            return;
        }

        const formData = new FormData();
        formData.append('name', newItem.name);
        formData.append('price', newItem.price);
        if (newItem.image) {
            formData.append('image', newItem.image);
        }

        const toastId = toast.loading("Adding item...");

        try {
            const res = await fetch('/api/recipes', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                    // Do NOT set Content-Type header when sending FormData, browser does it automatically
                },
                body: formData
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Item added successfully", { id: toastId });
                setRecipes([data.data || data, ...recipes]);
                setShowForm(false);
                setNewItem({ name: '', price: '', image: null });
                setPreview(null);
            } else {
                toast.error(data.message || "Failed to add item", { id: toastId });
            }
        } catch (error) {
            console.error("Error adding item:", error);
            toast.error("Error adding item", { id: toastId });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this item?')) return;

        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/recipes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setRecipes(recipes.filter(item => item._id !== id));
                toast.success('Item deleted');
            } else {
                const data = await res.json();
                toast.error(data.message || 'Failed to delete item');
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error('Error deleting item');
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Loading Menu...</div>;

    return (
        <div className="admin-page">
            <div className="page-actions">
                <div className="search-bar">
                    <FaSearch />
                    <input type="text" placeholder="Search menu..." />
                </div>
                <button onClick={() => setShowForm(true)} className="btn-primary">
                    <FaPlus /> Add New Item
                </button>
            </div>

            {/* Modal */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Add Product</h3>
                            <button onClick={() => setShowForm(false)} className="close-btn"><FaTimes /></button>
                        </div>
                        <form className="modal-form" onSubmit={handleAdd}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    placeholder="e.g. Pasta"
                                    required
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input
                                    type="string"
                                    name="price"
                                    className="form-input"
                                    placeholder="0.00"
                                    required
                                    value={newItem.price}
                                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Image</label>
                                <div className="file-upload" style={{ backgroundImage: preview ? `url(${preview})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    {!preview && (
                                        <>
                                            <FaImage />
                                            <span>Click to upload image</span>
                                        </>
                                    )}
                                    <input type="file" onChange={handleFileChange} accept="image/*" />
                                </div>
                            </div>
                            <button type="submit" className="btn-primary full-width">Publish Item</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="data-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map(item => (
                            <tr key={item._id}>
                                <td>
                                    <div className="product-cell">
                                        {item.image ? (
                                            <img
                                                src={
                                                    item.image.startsWith('http')
                                                        ? item.image
                                                        : (item.image.startsWith('images/')
                                                            ? `/${item.image}`
                                                            : (item.image.startsWith('/uploads/')
                                                                ? item.image // Serve from frontend public/uploads
                                                                : (item.image.startsWith('/')
                                                                    ? `http://localhost:5000${item.image}`
                                                                    : `http://localhost:5000/${item.image}`)))
                                                }
                                                alt={item.name}
                                                style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', marginRight: '10px' }}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    // Simple gray placeholder
                                                    e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2040%2040%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1%22%3E%3Crect%20width%3D%2240%22%20height%3D%2240%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2210%22%20y%3D%2225%22%3EIMG%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                                                }}
                                            />
                                        ) : (
                                            <div className="img-placeholder">🍔</div>
                                        )}
                                        <span className="name">{item.name}</span>
                                    </div>
                                </td>
                                <td className="price-cell">${item.price}</td>
                                <td>
                                    <span className={`status-badge ${item.available !== false ? 'active' : 'inactive'}`}>
                                        {item.available !== false ? 'In Stock' : 'Sold Out'}
                                    </span>
                                </td>
                                <td className="text-right">
                                    <button onClick={() => handleDelete(item._id)} className="icon-btn delete"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminMenu;