import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, LogOut } from 'lucide-react';
import api from '../api';
import useSettings from '../hooks/useSettings';

const SuperAdminDashboard = () => {
    const navigate = useNavigate();
    const [admins, setAdmins] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [newAdmin, setNewAdmin] = React.useState({ name: '', email: '', password: '', role: 'admin' });
    const [loading, setLoading] = React.useState(true);
    const { settings, updateSetting } = useSettings();

    React.useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await api.get('/auth/admins');
            setAdmins(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching admins:', error);
            setLoading(false);
        }
    };

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/create-admin', newAdmin);
            setShowModal(false);
            setNewAdmin({ name: '', email: '', password: '', role: 'admin' });
            fetchAdmins();
            alert('Admin created successfully');
        } catch (error) {
            console.error('Error creating admin:', error);
            alert('Failed to create admin');
        }
    };

    const handleDeleteAdmin = async (id) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            try {
                await api.delete(`/auth/admin/${id}`);
                fetchAdmins();
            } catch (error) {
                console.error('Error deleting admin:', error);
                alert('Failed to delete admin');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="container py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
                <button onClick={handleLogout} className="btn bg-red-500 text-white hover:bg-red-600 flex items-center gap-2">
                    <LogOut size={20} /> Logout
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Total Admins</h3>
                    <p className="text-3xl font-bold mt-2">{admins.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Total Packages</h3>
                    <p className="text-3xl font-bold mt-2">24</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Site Phone Number</h3>
                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="text"
                            className="border p-2 rounded w-full font-bold"
                            value={settings.phone_number || ''}
                            onChange={(e) => updateSetting('phone_number', e.target.value)}
                        />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Site Email</h3>
                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="email"
                            className="border p-2 rounded w-full font-bold"
                            value={settings.contact_email || ''}
                            onChange={(e) => updateSetting('contact_email', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">Manage Admins</h2>
                    <button onClick={() => setShowModal(true)} className="btn btn-primary text-sm shadow-md">Create New Admin</button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 font-medium text-gray-600">Name</th>
                            <th className="p-4 font-medium text-gray-600">Email</th>
                            <th className="p-4 font-medium text-gray-600">Role</th>
                            <th className="p-4 font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr><td colSpan="4" className="p-4 text-center">Loading...</td></tr>
                        ) : admins.length === 0 ? (
                            <tr><td colSpan="4" className="p-4 text-center">No admins found</td></tr>
                        ) : (
                            admins.map((admin) => (
                                <tr key={admin.id}>
                                    <td className="p-4">{admin.name}</td>
                                    <td className="p-4">{admin.email}</td>
                                    <td className="p-4 capitalize">{admin.role}</td>
                                    <td className="p-4">
                                        <button onClick={() => handleDeleteAdmin(admin.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create Admin Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Create New Admin</h2>
                        <form onSubmit={handleCreateAdmin}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    className="input w-full border p-2 rounded"
                                    value={newAdmin.name}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    className="input w-full border p-2 rounded"
                                    value={newAdmin.email}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    className="input w-full border p-2 rounded"
                                    value={newAdmin.password}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Role</label>
                                <select
                                    className="input w-full border p-2 rounded"
                                    value={newAdmin.role}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowModal(false)} className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">Cancel</button>
                                <button type="submit" className="btn bg-[#5F4A8B] hover:bg-[#4a396d] text-white px-4 py-2 rounded shadow-md transition-all active:scale-95">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuperAdminDashboard;
