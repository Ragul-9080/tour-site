import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tag, Clock, ArrowRight } from 'lucide-react';

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/offers')
            .then(res => setOffers(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 animate-fade-in">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-orange-500 font-bold tracking-wider uppercase text-sm">Limited Time Deals</span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Exclusive Offers</h1>
                    <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full" />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {offers.map((offer, index) => (
                            <div key={offer.id} className={`group relative rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2 ${index % 2 === 0 ? 'bg-gradient-to-br from-orange-400 to-red-600' : 'bg-gradient-to-br from-blue-500 to-indigo-700'}`}>
                                {/* Background Pattern */}
                                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black/10 rounded-full blur-2xl" />

                                <div className="relative z-10">
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

                                    <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{offer.title}</h2>
                                    <p className="text-white/90 text-lg mb-8 max-w-md">{offer.description}</p>

                                    <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group-hover:gap-4">
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
