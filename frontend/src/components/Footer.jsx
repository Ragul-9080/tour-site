import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import useSettings from '../hooks/useSettings';

const Footer = ({ openEnquiryModal }) => {
    const { settings } = useSettings();

    return (
        <footer className="bg-[#1a1329] text-gray-300 font-sans">
            {/* Top Subscription Bar */}
            <div className="bg-white py-12 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <Mail size={48} className="text-gray-300" />
                                <Phone size={20} className="text-[#5F4A8B] absolute -bottom-1 -right-1" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-display text-gray-800">Get Updates & More</h3>
                                <p className="text-gray-500">Thoughtful thoughts to your inbox</p>
                            </div>
                        </div>

                        <div className="flex w-full max-w-xl shadow-xl shadow-black/5 rounded-xl overflow-hidden">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="flex-grow bg-gray-50 border-y border-l border-gray-200 px-6 py-4 focus:outline-none focus:bg-white text-gray-800"
                            />
                            <button className="bg-[#1a1329] hover:bg-black text-[#FEFACD] font-bold px-10 py-4 transition-all uppercase tracking-widest text-sm">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Corporate Office */}
                        <div>
                            <h3 className="text-2xl font-display uppercase tracking-wider text-white mb-8 border-b border-[#FEFACD]/30 pb-2 inline-block">Corporate Office</h3>
                            <div className="space-y-4 text-sm leading-relaxed">
                                <p className="font-bold text-gray-100 italic">Lé holidays Pvt LTD,</p>
                                <p>Novel Tech Park,<br />Opposite to 1 MG Mall,<br />MG Road, Bangalore - 560042<br />Karnataka, India.</p>
                            </div>
                        </div>

                        {/* Head Office */}
                        <div>
                            <h3 className="text-2xl font-display uppercase tracking-wider text-white mb-8 border-b border-[#FEFACD]/30 pb-2 inline-block">Head Office</h3>
                            <div className="space-y-4 text-sm leading-relaxed">
                                <p className="font-bold text-gray-100 italic">Lé holidays Pvt LTD,</p>
                                <p>No.1, Gemini Parsn,<br />Kodambakkam High Road,<br />Nungambakkam, Chennai - 600006<br />Tamil Nadu, India.</p>
                            </div>
                        </div>

                        {/* Branches */}
                        <div className="lg:col-span-2">
                            <h3 className="text-2xl font-display uppercase tracking-wider text-white mb-8 border-b border-[#FEFACD]/30 pb-2 inline-block">Our Branches</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 text-sm">
                                {['Mumbai', 'Hyderabad', 'Bangalore', 'Chennai', 'Coimbatore', 'Erode', 'Madurai', 'Trichy', 'Salem', 'Kochi', 'Vellore', 'Pondicherry', 'Nagercoil', 'Kanyakumari'].map(city => (
                                    <div key={city} className="hover:text-[#FEFACD] transition-colors cursor-pointer flex items-center gap-2 group">
                                        <div className="w-1 h-1 bg-[#FEFACD]/40 rounded-full group-hover:w-2 transition-all" />
                                        {city}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 pt-12 border-t border-white/10">
                        {/* Call Us */}
                        <div className="border-l-2 border-[#FEFACD] pl-6">
                            <h4 className="text-xs uppercase tracking-widest text-[#FEFACD] mb-4 font-bold">Call Us</h4>
                            <a href={`tel:${settings.phone_number}`} className="text-2xl font-bold text-white hover:text-[#FEFACD] transition-colors font-display">
                                {settings.phone_number}
                            </a>
                        </div>

                        {/* Email Us */}
                        <div className="border-l-2 border-[#FEFACD] pl-6">
                            <h4 className="text-xs uppercase tracking-widest text-[#FEFACD] mb-4 font-bold">Email Us</h4>
                            <a href={`mailto:${settings.contact_email}`} className="text-2xl font-bold text-white hover:text-[#FEFACD] transition-colors font-display break-all">
                                {settings.contact_email}
                            </a>
                        </div>

                        {/* Follow Us */}
                        <div className="border-l-2 border-[#FEFACD] pl-6">
                            <h4 className="text-xs uppercase tracking-widest text-[#FEFACD] mb-4 font-bold">Follow Us</h4>
                            <div className="flex gap-6 mt-2">
                                <a href="#" className="p-2 bg-white/5 hover:bg-[#5F4A8B] rounded-lg text-white transition-all hover:-translate-y-1"><Facebook size={20} /></a>
                                <a href="#" className="p-2 bg-white/5 hover:bg-[#5F4A8B] rounded-lg text-white transition-all hover:-translate-y-1"><Instagram size={20} /></a>
                                <a href="#" className="p-2 bg-white/5 hover:bg-[#5F4A8B] rounded-lg text-white transition-all hover:-translate-y-1"><Linkedin size={20} /></a>
                                <a href="#" className="p-2 bg-white/5 hover:bg-[#5F4A8B] rounded-lg text-white transition-all hover:-translate-y-1"><Youtube size={20} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="bg-black/40 py-6 border-t border-white/5">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-sm text-gray-500">
                            Copyright © {new Date().getFullYear()} by <span className="text-white font-medium italic">Lé holidays Pvt Ltd.</span> All Rights Reserved.
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest font-medium">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <span className="text-white/20">|</span>
                            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
                            <span className="text-white/20">|</span>
                            <a href="#" className="hover:text-white transition-colors">Cancellation & Refund Policy</a>
                        </div>
                        <button
                            onClick={openEnquiryModal}
                            className="bg-[#FEFACD] text-[#5F4A8B] px-8 py-3 rounded-lg font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-[#FEFACD]/10"
                        >
                            ENQUIRE NOW
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
