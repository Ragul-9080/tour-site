import React, { useState, useEffect } from 'react';
import api from '../api';
import { Tag, Clock, ArrowRight } from 'lucide-react';

const Offers = ({ openEnquiryModal }) => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/offers')
            .then(res => setOffers(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-12 animate-fade-in">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-[#5F4A8B] font-bold tracking-wider uppercase text-sm font-display">Limited Time Deals</span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-display uppercase tracking-wide">Exclusive Offers</h1>
                    <div className="w-24 h-1 bg-[#5F4A8B] mx-auto rounded-full" />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5F4A8B]"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                        {offers.map((offer, index) => (
                            <div key={offer.id} className={`group relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2 flex flex-col md:flex-row ${index % 2 === 0 ? 'bg-gradient-to-br from-[#5F4A8B] to-[#4a396d]' : 'bg-gradient-to-br from-[#4a396d] to-[#5F4A8B]'}`}>
                                {/* Image Section */}
                                <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                                    <img
                                        src={offer.image_url || `https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60`}
                                        alt={offer.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="relative z-10 p-8 md:p-12 md:w-3/5 text-white">
                                    {/* Background Pattern */}
                                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold border border-white/30 flex items-center gap-2">
                                            <Tag size={14} /> {offer.discount_percentage ? `${offer.discount_percentage}% OFF` : 'SPECIAL DEAL'}
                                        </span>
                                        {offer.valid_till && (
                                            <span className="text-white/80 text-sm flex items-center gap-1">
                                                <Clock size={14} /> Valid till {new Date(offer.valid_till).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight font-display uppercase tracking-wide">{offer.title}</h2>
                                    <p className="text-white/90 text-lg mb-8 max-w-md line-clamp-3">{offer.description}</p>

                                    <button
                                        onClick={openEnquiryModal}
                                        className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group-hover:gap-4"
                                    >
                                        Claim Offer <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Mock Offer if empty */}
                        {offers.length === 0 && (
                            <div className="group relative rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2 bg-gradient-to-br from-purple-500 to-pink-600 col-span-1 md:col-span-2">
                                <div className="relative z-10 text-center">
                                    <h2 className="text-3xl font-bold mb-4">More Offers Coming Soon!</h2>
                                    <p className="text-white/90">Stay tuned for exciting deals on your favorite destinations.</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Offers;
