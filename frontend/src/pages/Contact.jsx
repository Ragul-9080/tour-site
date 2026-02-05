import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import api from '../api';
import useSettings from '../hooks/useSettings';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const { settings } = useSettings();
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        if (typeof L !== 'undefined' && !mapInstance.current) {
            // New Delhi Coordinates
            const position = [28.6139, 77.2090];

            mapInstance.current = L.map('contact-map').setView(position, 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance.current);

            L.marker(position).addTo(mapInstance.current)
                .bindPopup('<b>Lé holidays</b><br>123 Tourism Plaza, New Delhi, India')
                .openPopup();
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/enquiries', formData);
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
        <div className="min-h-screen pt-24 pb-12 animate-fade-in">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Get in Touch</h1>
                    <div className="w-24 h-1 bg-[#5F4A8B] mx-auto rounded-full" />
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4 group">
                                    <div className="w-12 h-12 bg-[#5F4A8B]/20 rounded-2xl flex items-center justify-center text-[#5F4A8B] group-hover:bg-[#5F4A8B] group-hover:text-white transition-colors">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Phone</h3>
                                        <a
                                            href={`tel:${settings.phone_number.replace(/\s/g, '')}`}
                                            className="text-gray-600 hover:text-[#5F4A8B] hover:underline transition-colors"
                                        >
                                            {settings.phone_number}
                                        </a>
                                        <p className="text-gray-500 text-sm">Mon-Fri 9am-6pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 group">
                                    <div className="w-12 h-12 bg-[#FEFACD]/20 rounded-2xl flex items-center justify-center text-[#5F4A8B] group-hover:bg-[#FEFACD] group-hover:text-[#5F4A8B] transition-colors">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Email</h3>
                                        <a
                                            href={`mailto:${settings.contact_email}`}
                                            className="text-gray-600 hover:text-[#5F4A8B] hover:underline transition-colors"
                                        >
                                            {settings.contact_email}
                                        </a>
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

                        {/* Interactive Leaflet Map */}
                        <div id="contact-map" className="h-64 rounded-3xl overflow-hidden shadow-lg border border-gray-100 z-0"></div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm uppercase tracking-wide">Name</label>
                                    <input name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#5F4A8B] focus:ring-2 focus:ring-[#5F4A8B]/20 transition-all" placeholder="John Doe" required />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm uppercase tracking-wide">Phone</label>
                                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#5F4A8B] focus:ring-2 focus:ring-[#5F4A8B]/20 transition-all" placeholder="+91 98765 43210" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2 text-sm uppercase tracking-wide">Email</label>
                                <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#5F4A8B] focus:ring-2 focus:ring-[#5F4A8B]/20 transition-all" placeholder="john@example.com" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2 text-sm uppercase tracking-wide">Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#5F4A8B] focus:ring-2 focus:ring-[#5F4A8B]/20 transition-all h-32 resize-none" placeholder="Tell us about your travel plans..." required></textarea>
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
