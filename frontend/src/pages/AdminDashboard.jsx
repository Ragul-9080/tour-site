import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit, LogOut } from 'lucide-react';
import api from '../api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('packages');
    const [packages, setPackages] = useState([]);
    const [offers, setOffers] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('package');
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchPackages();
        fetchOffers();
        fetchEnquiries();
    }, []);

    const fetchPackages = async () => {
        try {
            const res = await api.get('/packages');
            setPackages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchEnquiries = async () => {
        try {
            const res = await api.get('/enquiries');
            setEnquiries(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchOffers = async () => {
        try {
            const res = await api.get('/offers');
            setOffers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeletePackage = async (id) => {
        if (window.confirm('Are you sure?')) {
            await api.delete(`/packages/${id}`);
            fetchPackages();
        }
    };

    const handleDeleteOffer = async (id) => {
        if (window.confirm('Are you sure?')) {
            await api.delete(`/offers/${id}`);
            fetchOffers();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleEdit = (item, type) => {
        setModalType(type);
        setFormData(item);
        setIsEditing(true);
        setEditId(item.id);
        setIsModalOpen(true);
    };

    const handleOpenModal = (type) => {
        setModalType(type);
        setFormData({});
        setIsEditing(false);
        setEditId(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({});
        setIsEditing(false);
        setEditId(null);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                if (modalType === 'package') {
                    await api.put(`/packages/${editId}`, formData);
                    fetchPackages();
                } else {
                    await api.put(`/offers/${editId}`, formData);
                    fetchOffers();
                }
            } else {
                if (modalType === 'package') {
                    await api.post('/packages', formData);
                    fetchPackages();
                } else {
                    await api.post('/offers', formData);
                    fetchOffers();
                }
            }
            handleCloseModal();
        } catch (err) {
            console.error(err);
            alert(`Error ${isEditing ? 'updating' : 'creating'} item`);
        }
    };

    return (
        <div className="container py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="flex gap-4">
                    {(activeTab === 'packages' || activeTab === 'offers') && (
                        <button
                            onClick={() => handleOpenModal(activeTab === 'packages' ? 'package' : 'offer')}
                            className="btn btn-primary flex items-center gap-2"
                        >
                            <Plus size={20} /> Add New {activeTab === 'packages' ? 'Package' : 'Offer'}
                        </button>
                    )}
                    <button onClick={handleLogout} className="btn bg-red-500 text-white hover:bg-red-600 flex items-center gap-2">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-8 border-b">
                <button
                    className={`pb-4 px-4 font-medium ${activeTab === 'packages' ? 'border-b-2 border-[#5F4A8B] text-[#5F4A8B]' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('packages')}
                >
                    Manage Packages
                </button>
                <button
                    className={`pb-4 px-4 font-medium ${activeTab === 'offers' ? 'border-b-2 border-[#5F4A8B] text-[#5F4A8B]' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('offers')}
                >
                    Manage Offers
                </button>
                <button
                    className={`pb-4 px-4 font-medium ${activeTab === 'enquiries' ? 'border-b-2 border-[#5F4A8B] text-[#5F4A8B]' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('enquiries')}
                >
                    Enquiries
                </button>
            </div>

            {/* Content */}
            {activeTab === 'packages' && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 font-medium text-gray-600">Package Name</th>
                                <th className="p-4 font-medium text-gray-600">Category</th>
                                <th className="p-4 font-medium text-gray-600">Price</th>
                                <th className="p-4 font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {packages.map(pkg => (
                                <tr key={pkg.id}>
                                    <td className="p-4">{pkg.title}</td>
                                    <td className="p-4">{pkg.category}</td>
                                    <td className="p-4">₹{pkg.price}</td>
                                    <td className="p-4 flex space-x-2">
                                        <button onClick={() => handleEdit(pkg, 'package')} className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
                                        <button onClick={() => handleDeletePackage(pkg.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'offers' && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 font-medium text-gray-600">Offer Title</th>
                                <th className="p-4 font-medium text-gray-600">Discount</th>
                                <th className="p-4 font-medium text-gray-600">Valid Till</th>
                                <th className="p-4 font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {offers.map(offer => (
                                <tr key={offer.id}>
                                    <td className="p-4">{offer.title}</td>
                                    <td className="p-4">{offer.discount_percentage}%</td>
                                    <td className="p-4">{new Date(offer.valid_till).toLocaleDateString()}</td>
                                    <td className="p-4 flex space-x-2">
                                        <button onClick={() => handleEdit(offer, 'offer')} className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
                                        <button onClick={() => handleDeleteOffer(offer.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'enquiries' && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 font-medium text-gray-600">Customer</th>
                                <th className="p-4 font-medium text-gray-600">Email</th>
                                <th className="p-4 font-medium text-gray-600">Message</th>
                                <th className="p-4 font-medium text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {enquiries.map(enq => (
                                <tr key={enq.id}>
                                    <td className="p-4">{enq.name}</td>
                                    <td className="p-4">{enq.email}</td>
                                    <td className="p-4">{enq.message}</td>
                                    <td className="p-4"><span className="bg-[#5F4A8B]/10 text-[#5F4A8B] px-2 py-1 rounded text-xs font-medium">{enq.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit' : 'Add New'} {modalType === 'package' ? 'Package' : 'Offer'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input name="title" value={formData.title || ''} onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-[#5F4A8B] focus:border-[#5F4A8B]" required />
                            </div>
                            {modalType === 'package' ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Category</label>
                                        <select name="category" value={formData.category || ''} onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-[#5F4A8B] focus:border-[#5F4A8B]" required>
                                            <option value="">Select Category</option>
                                            <option value="North India">North India</option>
                                            <option value="South India">South India</option>
                                            <option value="East India">East India</option>
                                            <option value="West India">West India</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Price</label>
                                        <input type="number" name="price" value={formData.price || ''} onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-[#5F4A8B] focus:border-[#5F4A8B]" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                                        <input name="duration" value={formData.duration || ''} onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-[#5F4A8B] focus:border-[#5F4A8B]" placeholder="e.g. 5 Days / 4 Nights" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Destination</label>
                                        <input name="destination" value={formData.destination || ''} onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-[#5F4A8B] focus:border-[#5F4A8B]" required />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                                        <input type="number" name="discount_percentage" value={formData.discount_percentage || ''} onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-[#5F4A8B] focus:border-[#5F4A8B]" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Valid Till</label>
                                        <input type="date" name="valid_till" value={formData.valid_till || ''} onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-[#5F4A8B] focus:border-[#5F4A8B]" required />
                                    </div>
                                </>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input name="image_url" value={formData.image_url || ''} onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-[#5F4A8B] focus:border-[#5F4A8B]" />
                                {formData.image_url && (
                                    <div className="mt-2 h-32 rounded-lg overflow-hidden border">
                                        <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/600x400?text=Invalid+Image+URL';
                                        }} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea name="description" value={formData.description || ''} onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-[#5F4A8B] focus:border-[#5F4A8B]" rows="3"></textarea>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-[#5F4A8B] text-white rounded hover:bg-[#4a396d]">{isEditing ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
