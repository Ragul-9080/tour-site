import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit, LogOut } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('packages');
    const [packages, setPackages] = useState([]);
    const [offers, setOffers] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('package');
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchPackages();
        fetchOffers();
        fetchEnquiries();
    }, []);

    const fetchPackages = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/packages');
            setPackages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchEnquiries = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/enquiries');
            setEnquiries(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchOffers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/offers');
            setOffers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeletePackage = async (id) => {
        if (window.confirm('Are you sure?')) {
            await axios.delete(`http://localhost:5000/api/packages/${id}`);
            fetchPackages();
        }
    };

    const handleDeleteOffer = async (id) => {
        if (window.confirm('Are you sure?')) {
            await axios.delete(`http://localhost:5000/api/offers/${id}`);
            fetchOffers();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleOpenModal = (type) => {
        setModalType(type);
        setFormData({});
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({});
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (modalType === 'package') {
                await axios.post('http://localhost:5000/api/packages', formData);
                fetchPackages();
            } else {
                await axios.post('http://localhost:5000/api/offers', formData);
                fetchOffers();
            }
            handleCloseModal();
        } catch (err) {
            console.error(err);
            alert('Error creating item');
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
                    className={`pb-4 px-4 font-medium ${activeTab === 'packages' ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('packages')}
                >
                    Manage Packages
                </button>
                <button
                    className={`pb-4 px-4 font-medium ${activeTab === 'offers' ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('offers')}
                >
                    Manage Offers
                </button>
                <button
                    className={`pb-4 px-4 font-medium ${activeTab === 'enquiries' ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]' : 'text-gray-500'}`}
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
                                        <button className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
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
                                    <td className="p-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">{enq.status}</span></td>
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
                        <h2 className="text-2xl font-bold mb-4">Add New {modalType === 'package' ? 'Package' : 'Offer'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input name="title" onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-orange-500 focus:border-orange-500" required />
                            </div>
                            {modalType === 'package' ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Category</label>
                                        <select name="category" onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-orange-500 focus:border-orange-500" required>
                                            <option value="">Select Category</option>
                                            <option value="North India">North India</option>
                                            <option value="South India">South India</option>
                                            <option value="East India">East India</option>
                                            <option value="West India">West India</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Price</label>
                                        <input type="number" name="price" onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-orange-500 focus:border-orange-500" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                                        <input name="duration" onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-orange-500 focus:border-orange-500" placeholder="e.g. 5 Days / 4 Nights" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Destination</label>
                                        <input name="destination" onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-orange-500 focus:border-orange-500" required />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                                        <input type="number" name="discount_percentage" onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-orange-500 focus:border-orange-500" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Valid Till</label>
                                        <input type="date" name="valid_till" onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-orange-500 focus:border-orange-500" required />
                                    </div>
                                </>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input name="image_url" onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea name="description" onChange={handleInputChange} className="w-full border p-2 rounded focus:ring-orange-500 focus:border-orange-500" rows="3"></textarea>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
