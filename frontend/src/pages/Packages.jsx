import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, MapPin, ArrowRight, Star } from 'lucide-react';

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/packages');
                setPackages(res.data);
            } catch (err) {
                console.error("Error fetching packages:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    const filteredPackages = filter === 'All' ? packages : packages.filter(pkg => pkg.category === filter);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 animate-fade-in">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Tour Packages</h1>
                    <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full" />
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Explore our wide range of meticulously crafted tour packages.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {['All', 'North India', 'South India', 'East India', 'West India'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${filter === cat
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {filteredPackages.map((pkg, index) => (
                            <div key={pkg.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={pkg.image_url || `https://source.unsplash.com/random/800x600/?india,${pkg.category}&sig=${pkg.id}`}
                                        alt={pkg.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-orange-600 shadow-sm flex items-center gap-1">
                                        <Clock size={14} /> {pkg.duration}
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                                        <div className="flex items-center text-white/90 text-sm">
                                            <MapPin size={14} className="mr-1" /> {pkg.destination || pkg.category}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{pkg.title}</h3>
                                        <div className="flex items-center text-yellow-500 text-sm font-bold">
                                            <Star size={14} fill="currentColor" className="mr-1" /> 4.8
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">{pkg.description || `Experience the beauty of ${pkg.category} with our exclusive package.`}</p>
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        <div>
                                            <span className="text-xs text-gray-500 block">Per Person</span>
                                            <span className="text-2xl font-bold text-gray-900">₹{pkg.price}</span>
                                        </div>
                                        <button className="btn btn-primary text-sm px-6 py-2">View Details</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Packages;
