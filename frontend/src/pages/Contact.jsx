import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '', phone: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/enquiries', formData);
            alert('Enquiry submitted successfully!');
            setFormData({ name: '', email: '', message: '', phone: '' });
        } catch (err) {
            alert('Error submitting enquiry');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 animate-fade-in">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Get in Touch</h1>
                    <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full" />
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4 group">
                                    <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Phone</h3>
                                        <p className="text-gray-600">+91 98765 43210</p>
                                        <p className="text-gray-500 text-sm">Mon-Fri 9am-6pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 group">
                                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Email</h3>
                                        <p className="text-gray-600">info@leholidaysgetways.com</p>
                                        <p className="text-gray-500 text-sm">Online support 24/7</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 group">
                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Office</h3>
                                        <p className="text-gray-600">123 Tourism Plaza, New Delhi, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-gray-200 h-64 rounded-3xl overflow-hidden shadow-inner relative">
                            <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Map" className="w-full h-full object-cover opacity-50" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="bg-white px-6 py-2 rounded-full shadow-lg font-bold text-gray-800 hover:scale-105 transition-transform">View on Google Maps</button>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm uppercase tracking-wide">Name</label>
                                    <input name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all" placeholder="John Doe" required />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm uppercase tracking-wide">Phone</label>
                                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all" placeholder="+91 98765 43210" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2 text-sm uppercase tracking-wide">Email</label>
                                <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all" placeholder="john@example.com" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2 text-sm uppercase tracking-wide">Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all h-32 resize-none" placeholder="Tell us about your travel plans..." required></textarea>
                            </div>
                            <button type="submit" disabled={loading} className="w-full btn btn-primary py-4 text-lg flex items-center justify-center gap-2 rounded-xl group">
                                {loading ? 'Sending...' : (
                                    <>Send Message <Send size={20} className="group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
