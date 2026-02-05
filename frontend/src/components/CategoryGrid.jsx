import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    {
        title: "India Tour Packages",
        count: "98 TOURS",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Taj Mahal
        link: "/packages?category=India",
        size: "large"
    },
    {
        title: "International Tour Packages",
        count: "362 TOURS",
        image: "https://images.unsplash.com/photo-1524613032530-449a5d94c285?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Sydney Opera House
        link: "/packages?category=International",
        size: "large"
    },
    {
        title: "Honeymoon Packages",
        count: "17 TOURS",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Goa/Beach for Honeymoon
        link: "/packages?category=Honeymoon",
        size: "small"
    },
    {
        title: "Europe Tour Packages",
        count: "144 TOURS",
        image: "https://images.unsplash.com/photo-1471623432079-b009d30b6729?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // UK or Europe building
        link: "/packages?category=Europe",
        size: "small"
    },
    {
        title: "Educational Tour Packages",
        count: "15 TOURS",
        image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Students/Group
        link: "/packages?category=Educational",
        size: "small"
    }
];

const CategoryGrid = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">


                {/* Explicit Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Top Row: 2 Large Cards */}
                    {categories.slice(0, 2).map((cat, index) => (
                        <Link
                            to={cat.link}
                            key={index}
                            className="group relative h-[350px] rounded-xl overflow-hidden shadow-lg cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6">
                                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md font-display uppercase tracking-wide">{cat.title}</h3>
                                <span className="bg-[#FEFACD] text-[#5F4A8B] font-bold px-6 py-2 rounded text-sm tracking-wider uppercase transform group-hover:scale-105 transition-transform font-display">
                                    {cat.count}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Bottom Row: 3 Small Cards */}
                    {categories.slice(2, 5).map((cat, index) => (
                        <Link
                            to={cat.link}
                            key={index}
                            className="group relative h-[300px] rounded-xl overflow-hidden shadow-lg cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6">
                                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md leading-tight font-display uppercase tracking-wide">{cat.title}</h3>
                                <span className="bg-[#FEFACD] text-[#5F4A8B] font-bold px-4 py-2 rounded text-xs tracking-wider uppercase transform group-hover:scale-105 transition-transform font-display">
                                    {cat.count}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
