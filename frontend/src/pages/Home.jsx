import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, Star, Shield, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Taj Mahal
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Goa Beach
    "https://images.unsplash.com/photo-1598890777032-bde83547de8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Rajasthan
    "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Kerala Backwaters
    "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"  // Himalayas
];

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
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
                    <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight tracking-tight drop-shadow-lg">
                        Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-400">Le Holidays Getways</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-200 font-light">
                        Discover the rich heritage, vibrant culture, and breathtaking landscapes of India with our premium curated tours.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <Link to="/packages" className="btn btn-primary text-lg px-10 py-4 shadow-orange-500/50">
                            View Packages
                        </Link>
                        <Link to="/contact" className="btn bg-white/10 backdrop-blur-md border border-white/50 text-white hover:bg-white hover:text-gray-900 text-lg px-10 py-4">
                            Enquire Now
                        </Link>
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
                            className={`w-2 h-2 rounded-full transition-all ${index === currentImage ? 'bg-orange-500 w-6' : 'bg-white/50 hover:bg-white'}`}
                        />
                    ))}
                </div>
            </section>

            {/* Popular Packages Preview */}
            <section className="py-24 bg-gray-50">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-gray-900">Popular Packages</h2>
                        <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full" />
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Handpicked destinations for your perfect vacation.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Placeholder Cards */}
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={`https://source.unsplash.com/random/800x600/?india,travel&sig=${item}`}
                                        alt="Destination"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-orange-600 shadow-sm">
                                        5D/4N
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">Golden Triangle</h3>
                                        <div className="flex items-center text-yellow-500">
                                            <Star size={16} fill="currentColor" />
                                            <span className="ml-1 text-sm font-bold text-gray-600">4.8</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-6 line-clamp-2">Experience the magic of Delhi, Agra, and Jaipur in this classic tour designed for culture lovers.</p>
                                    <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                                        <div>
                                            <span className="text-sm text-gray-500 block">Starting from</span>
                                            <span className="text-2xl font-bold text-gray-900">₹15,999</span>
                                        </div>
                                        <Link to="/packages" className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                            <ArrowRight size={20} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-16">
                        <Link to="/packages" className="btn btn-outline px-10 py-3 border-2">View All Packages</Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50 skew-x-12 transform translate-x-20" />
                <div className="container relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6 text-gray-900">Why Travel With Us?</h2>
                            <p className="text-gray-600 text-lg mb-8">We don't just plan trips; we craft unforgettable experiences tailored to your desires.</p>

                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                                        <MapPin size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Handpicked Destinations</h3>
                                        <p className="text-gray-600">We personally verify every location to ensure quality and safety.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shrink-0">
                                        <Shield size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
                                        <p className="text-gray-600">Your safety is our priority with 24/7 support during your trip.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
                                        <Clock size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                                        <p className="text-gray-600">Our dedicated team is always available to assist you.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1598890777032-bde83547de8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Traveler"
                                className="rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block animate-bounce">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white" />
                                        ))}
                                    </div>
                                    <span className="font-bold text-gray-800">10k+</span>
                                </div>
                                <p className="text-gray-600 text-sm">Happy travelers explored India with us last year.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
