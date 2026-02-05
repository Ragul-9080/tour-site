import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import api from '../api';
import useSettings from '../hooks/useSettings';

const EnquiryFooter = () => {
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        email: '',
        phone: '',
        whatsapp: '',
        destination: '',
        travelDate: '',
        peopleCount: '',
        vacationType: ''
    });
    const [loading, setLoading] = useState(false);
    const { settings } = useSettings();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/enquiries', {
                name: formData.name,
                city: formData.city,
                email: formData.email,
                phone: formData.phone,
                whatsapp: formData.whatsapp,
                destination: formData.destination,
                travel_date: formData.travelDate,
                people_count: formData.peopleCount,
                vacation_type: formData.vacationType
            });

            alert('Enquiry submitted successfully!');
            setFormData({
                name: '',
                city: '',
                email: '',
                phone: '',
                whatsapp: '',
                destination: '',
                travelDate: '',
                peopleCount: '',
                vacationType: ''
            });
        } catch (err) {
            console.error(err);
            alert('Error submitting enquiry');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative py-20 overflow-hidden">
            {/* World Map Watermark */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg")',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Stay Connected */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl font-bold mb-12 text-gray-800">Stay Connected</h2>
                        <div className="space-y-8">
                            <div className="flex flex-col items-center lg:items-start space-y-2">
                                <div className="w-12 h-12 bg-[#5F4A8B]/20 rounded-full flex items-center justify-center text-[#5F4A8B] mb-2">
                                    <Phone size={24} />
                                </div>
                                <a
                                    href={`tel:${settings.phone_number.replace(/\s/g, '')}`}
                                    className="text-2xl font-bold text-gray-700 hover:text-[#5F4A8B] hover:underline transition-colors"
                                >
                                    {settings.phone_number}
                                </a>
                            </div>
                            <div className="flex flex-col items-center lg:items-start space-y-2">
                                <div className="w-12 h-12 bg-[#5F4A8B]/20 rounded-full flex items-center justify-center text-[#5F4A8B] mb-2">
                                    <Mail size={24} />
                                </div>
                                <a
                                    href={`mailto:${settings.contact_email}`}
                                    className="text-2xl font-bold text-gray-700 hover:text-[#5F4A8B] hover:underline transition-colors"
                                >
                                    {settings.contact_email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
                        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center lg:text-left">Book Your Dream Vacay Today!</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <input name="name" value={formData.name} onChange={handleChange} placeholder="Name *" className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors" required />
                            </div>
                            <div className="md:col-span-2">
                                <input name="city" value={formData.city} onChange={handleChange} placeholder="City of Residence *" className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors" required />
                            </div>
                            <div>
                                <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email *" className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors" required />
                            </div>
                            <div>
                                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number *" className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors" required />
                            </div>
                            <div className="md:col-span-2">
                                <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp" className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors" />
                            </div>
                            <div className="md:col-span-2">
                                <input name="destination" value={formData.destination} onChange={handleChange} placeholder="Travel Destination *" className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors" required />
                            </div>
                            <div>
                                <input name="travelDate" value={formData.travelDate} onChange={handleChange} type="date" placeholder="Date of Travel *" className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors" required />
                            </div>
                            <div>
                                <input name="peopleCount" value={formData.peopleCount} onChange={handleChange} type="number" placeholder="No. of People *" className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors" required />
                            </div>
                            <div className="md:col-span-2">
                                <select name="vacationType" value={formData.vacationType} onChange={handleChange} className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors bg-transparent" required>
                                    <option value="">Vacation Type *</option>
                                    <option value="Honeymoon">Honeymoon</option>
                                    <option value="Family">Family</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Corporate">Corporate</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 mt-6">
                                <button type="submit" disabled={loading} className="w-full bg-[#5F4A8B] text-white font-bold py-4 rounded-xl hover:bg-[#4a396d] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#5F4A8B]/30">
                                    {loading ? 'Submitting...' : 'ENQUIRE NOW'} <Send size={20} />
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default EnquiryFooter;
