import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Globe, Star } from 'lucide-react';
import api from '../api';

import CategoryGrid from '../components/CategoryGrid';

const heroImages = [
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Taj Mahal
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Goa Beach
    "https://images.unsplash.com/photo-1598890777032-bde83547de8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Rajasthan
    "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Kerala Backwaters
    "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"  // Himalayas
];

const customerImages = [
    "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&h=500&fit=crop",
];

const Home = ({ openEnquiryModal }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [activeCustomer, setActiveCustomer] = useState(2); // Center of 7 images
    const [popularPackages, setPopularPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await api.get('/packages');
                // Just take the first 3 for the preview
                setPopularPackages(res.data.slice(0, 3));
            } catch (err) {
                console.error("Error fetching packages:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();

        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCustomer((prev) => (prev + 1) % customerImages.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % heroImages.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    };
    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
                {/* Carousel Images */}
                {heroImages.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div
                            className="absolute inset-0 transform scale-105 animate-[pulse_10s_infinite]"
                            style={{
                                backgroundImage: `url("${img}")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
                    </div>
                ))}

                {/* Navigation Arrows */}
                <button
                    onClick={prevImage}
                    className="absolute left-4 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all text-white hidden md:block"
                >
                    <ChevronLeft size={32} />
                </button>
                <button
                    onClick={nextImage}
                    className="absolute right-4 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all text-white hidden md:block"
                >
                    <ChevronRight size={32} />
                </button>

                <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium mb-6 animate-fade-in">
                        ✨ Experience the Magic of India
                    </span>
                    <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight tracking-tight drop-shadow-lg font-display uppercase">
                        Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5F4A8B] via-white to-[#FEFACD]">Lé holidays</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-200 font-light font-sans">
                        Discover the rich heritage, vibrant culture, and breathtaking landscapes of India with our premium curated tours.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <Link to="/packages" className="btn btn-primary text-lg px-10 py-4 shadow-[#5F4A8B]/30">
                            View Packages
                        </Link>
                        <button
                            onClick={openEnquiryModal}
                            className="btn bg-white/10 backdrop-blur-md border border-white/50 text-white hover:bg-white hover:text-gray-900 text-lg px-10 py-4"
                        >
                            Enquire Now
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                    <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-3 bg-white rounded-full" />
                    </div>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentImage ? 'bg-[#5F4A8B] w-6' : 'bg-white/50 hover:bg-white'}`}
                        />
                    ))}
                </div>
            </section>

            {/* Category Grid Section */}
            <CategoryGrid />

            {/* Our Happy Customers Section */}
            <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-6xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Brush Script MT, cursive', fontStyle: 'italic' }}>
                            Our Happy Customers
                        </h2>
                        <div className="flex justify-center items-center gap-2">
                            <div className="w-32 h-0.5 bg-gray-300"></div>
                            <div className="w-16 h-1 bg-blue-400 rounded-full"></div>
                            <div className="w-32 h-0.5 bg-gray-300"></div>
                        </div>
                    </div>

                    {/* 3D Coverflow Carousel */}
                    <div className="relative h-[500px] flex items-center justify-center perspective-[1000px]">
                        {customerImages.map((img, index) => {
                            const offset = index - activeCustomer;
                            const isActive = index === activeCustomer;

                            // Calculate styles based on offset
                            let transform = '';
                            let zIndex = 0;
                            let opacity = 1;
                            let brightness = 1;

                            if (isActive) {
                                transform = 'scale(1.2) translateZ(100px)';
                                zIndex = 50;
                                brightness = 1.1;
                            } else {
                                const sign = Math.sign(offset);
                                const absOffset = Math.abs(offset);

                                // Limit visible items for performance and clutter reduction
                                if (absOffset > 3) opacity = 0;
                                else opacity = 1 - (absOffset * 0.15);

                                const rotateY = sign * 45; // Rotate towards center
                                const translateX = sign * 80 * absOffset; // Spread out 
                                const translateZ = -100 * absOffset; // Push back

                                transform = `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
                                zIndex = 40 - absOffset;
                                brightness = 1 - (absOffset * 0.2);
                            }

                            return (
                                <div
                                    key={index}
                                    onClick={() => setActiveCustomer(index)}
                                    className={`absolute transition-all duration-500 ease-in-out cursor-pointer rounded-2xl shadow-2xl overflow-hidden bg-white border-4 border-white`}
                                    style={{
                                        width: '280px',
                                        height: '400px',
                                        transform: transform,
                                        zIndex: zIndex,
                                        opacity: Math.abs(offset) > 3 ? 0 : 1,
                                        filter: `brightness(${brightness})`,
                                        left: '50%',
                                        marginLeft: '-140px', // Half of width to center
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt={`Happy Customer ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Reflection Effect */}
                                    <div className="absolute top-full left-0 right-0 h-full transform scale-y-[-1] opacity-20 bg-gradient-to-t from-white/0 to-white/80 pointer-events-none"
                                        style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover' }} />
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination Indicators */}
                    <div className="flex justify-center items-center gap-3 mt-8">
                        {customerImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveCustomer(index)}
                                className={`rounded-full transition-all duration-300 ${index === activeCustomer
                                    ? 'w-8 h-2.5 bg-blue-400'
                                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-blue-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </section>




            {/* Reason People Love Us Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-20">
                        <h2 className="text-6xl font-bold mb-4 text-gray-800" style={{ fontFamily: 'Brush Script MT, cursive' }}>Reason People Love Us</h2>
                        <p className="text-sm font-bold tracking-[0.3em] uppercase text-gray-500">Why Choose Us</p>
                    </div>

                    <div className="relative max-w-6xl mx-auto">
                        {/* Wavy Line Background - Hidden on mobile */}
                        <div className="absolute top-24 left-0 w-full hidden md:block z-0">
                            <svg viewBox="0 0 1200 120" className="w-full h-auto" preserveAspectRatio="none">
                                <path
                                    d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,40"
                                    fill="none"
                                    stroke="#5F4A8B"
                                    strokeOpacity="0.3"
                                    strokeWidth="3"
                                    strokeDasharray="10 10"
                                    className="animate-pulse"
                                />
                            </svg>
                            {/* Globe Icon at the end of path */}
                            <div className="absolute right-0 top-0 transform -translate-y-1/2 rotate-[-30deg] text-[#5F4A8B] animate-bounce">
                                <Globe size={42} fill="currentColor" />
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {/* Feature 1 - Diverse Destinations */}
                            <div className="flex flex-col items-center text-center group transform transition-all duration-300 hover:-translate-y-2 md:mt-12">
                                <div className="w-24 h-24 rounded-full bg-[#5F4A8B]/10 flex items-center justify-center mb-6 shadow-lg group-hover:bg-[#5F4A8B] transition-colors duration-300">
                                    <Globe size={40} className="text-[#5F4A8B] group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold font-serif mb-3 text-gray-800">Diverse Destinations</h3>
                                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                    We offer a diverse range of holiday destinations to suit every traveler's dream.
                                </p>
                            </div>

                            {/* Feature 2 - Fast Booking */}
                            <div className="flex flex-col items-center text-center group transform transition-all duration-300 hover:-translate-y-2 md:-mt-8">
                                <div className="w-24 h-24 rounded-full bg-[#5F4A8B]/10 flex items-center justify-center mb-6 shadow-lg group-hover:bg-[#5F4A8B] transition-colors duration-300">
                                    <Star size={40} className="text-[#5F4A8B] group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold font-serif mb-3 text-gray-800">Fast Booking</h3>
                                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                    People love us for our swift booking processes and diverse array of enveloping holiday destinations.
                                </p>
                            </div>

                            {/* Feature 3 - Value For Money */}
                            <div className="flex flex-col items-center text-center group transform transition-all duration-300 hover:-translate-y-2 md:mt-12">
                                <div className="w-24 h-24 rounded-full bg-[#5F4A8B]/10 flex items-center justify-center mb-6 shadow-lg group-hover:bg-[#5F4A8B] transition-colors duration-300">
                                    <div className="text-[#5F4A8B] group-hover:text-white transition-colors duration-300">
                                        <span className="text-4xl font-bold">₹</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold font-serif mb-3 text-gray-800">Value For Money</h3>
                                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                    We offer unbeatable value-for-money packages.
                                </p>
                            </div>

                            {/* Feature 4 - Support Team */}
                            <div className="flex flex-col items-center text-center group transform transition-all duration-300 hover:-translate-y-2 md:-mt-8">
                                <div className="w-24 h-24 rounded-full bg-[#5F4A8B]/10 flex items-center justify-center mb-6 shadow-lg group-hover:bg-[#5F4A8B] transition-colors duration-300">
                                    <Star size={40} className="text-[#5F4A8B] group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold font-serif mb-3 text-gray-800">Support Team</h3>
                                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                    Exceptional support, personalized assistance, prompt responses, and expert guidance throughout your journey.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stay Connected & Why Travel With Us Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#5F4A8B]/5 skew-x-12 transform translate-x-20" />
                <div className="container relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-16 text-center">
                        {/* Stay Connected - Centered */}
                        <div className="flex flex-col items-center">
                            <h2 className="text-4xl font-bold mb-12 text-[#5F4A8B] font-display uppercase tracking-wide">Stay Connected</h2>

                            <div className="flex flex-col md:flex-row gap-12">
                                {/* Phone */}
                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 bg-[#5F4A8B]/10 rounded-2xl flex items-center justify-center text-[#5F4A8B] shrink-0 group-hover:bg-[#5F4A8B] group-hover:text-white transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Call Us</p>
                                        <a href="tel:+919940882200" className="text-xl font-bold text-gray-800 hover:text-[#5F4A8B] transition-colors">
                                            +91 9940882200
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 bg-[#5F4A8B]/10 rounded-2xl flex items-center justify-center text-[#5F4A8B] shrink-0 group-hover:bg-[#5F4A8B] group-hover:text-white transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Email Us</p>
                                        <a href="mailto:contact@leholidays.com" className="text-xl font-bold text-gray-800 hover:text-[#5F4A8B] transition-colors">
                                            contact@leholidays.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Why Travel With Us Section Removed - Replaced by Reason People Love Us */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
