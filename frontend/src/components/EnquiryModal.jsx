import React, { useState } from 'react';
import { X, Send, Calendar, MapPin, Users, Phone, Mail, User, Info } from 'lucide-react';
import api from '../api';

const EnquiryModal = ({ isOpen, onClose }) => {
    console.log("EnquiryModal isOpen:", isOpen);
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

    if (!isOpen) return null;

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
            onClose();
        } catch (err) {
            console.error(err);
            alert('Error submitting enquiry');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden animate-slide-up transform transition-all max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="bg-[#5F4A8B] p-4 text-white flex justify-center items-center shrink-0 relative">
                    <h2 className="text-3xl font-bold text-white">Enquire Now</h2>
                    <button
                        onClick={onClose}
                        className="absolute right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form Body - Scrollable */}
                <div className="p-8 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Name *</label>
                                <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors" required />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">City of Residence *</label>
                                <input name="city" value={formData.city} onChange={handleChange} placeholder="City, State" className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors" required />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email *</label>
                                <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="email@example.com" className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors" required />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number *</label>
                                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors" required />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">WhatsApp (Optional)</label>
                                <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp Number" className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors" />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Travel Destination *</label>
                                <input name="destination" value={formData.destination} onChange={handleChange} placeholder="Where do you want to go?" className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors" required />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Date of Travel *</label>
                                <input name="travelDate" value={formData.travelDate} onChange={handleChange} type="date" className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors bg-transparent" required />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">No. of People *</label>
                                <input name="peopleCount" value={formData.peopleCount} onChange={handleChange} type="number" placeholder="Count" className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors" required />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Vacation Type *</label>
                                <select name="vacationType" value={formData.vacationType} onChange={handleChange} className="w-full border-b-2 border-gray-200 py-3 focus:border-[#5F4A8B] outline-none transition-colors bg-transparent" required>
                                    <option value="">Select Vacation Type</option>
                                    <option value="Honeymoon">Honeymoon</option>
                                    <option value="Family">Family</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Corporate">Corporate</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#5F4A8B] text-white font-bold py-4 rounded-2xl hover:bg-[#4a396d] transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#5F4A8B]/20 mt-4 active:scale-95"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>SUBMIT</span>
                                    <Send size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EnquiryModal;
