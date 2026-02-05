import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/auth/login', { email, password });
            const { user } = res.data;

            localStorage.setItem('user', JSON.stringify(user));

            if (user.role === 'admin') {
                navigate('/admin');
            } else if (user.role === 'super_admin') {
                navigate('/super-admin');
            }
        } catch (err) {
            alert('Invalid credentials or Server Error');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in" style={{
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
        }}>
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#5F4A8B] via-white to-[#FEFACD]" />

                <div>
                    <h2 className="mt-6 text-center text-4xl font-extrabold text-[#5F4A8B] font-display uppercase tracking-widest">Admin Portal</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to manage tours and enquiries
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2 text-sm ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none rounded-xl relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#5F4A8B] focus:border-[#5F4A8B] focus:z-10 sm:text-sm transition-all"
                                    placeholder="mail.leholidays@gmail.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2 text-sm ml-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none rounded-xl relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#5F4A8B] focus:border-[#5F4A8B] focus:z-10 sm:text-sm transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#5F4A8B] hover:bg-[#4a396d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5F4A8B] transition-all shadow-lg shadow-[#5F4A8B]/30"
                        >
                            {loading ? 'Signing in...' : (
                                <>
                                    Sign in
                                    <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                                        <ArrowRight size={20} className="text-[#5F4A8B] group-hover:text-white transition-colors" />
                                    </span>
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-xs text-gray-400 p-4 rounded-xl border border-gray-100 bg-white/50 backdrop-blur-sm">
                    <p className="font-medium text-gray-500 mb-1">Demo Credentials:</p>
                    <p>Admin: admin@example.com / admin</p>
                    <p>Super Admin: superadmin@example.com / superadmin</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
