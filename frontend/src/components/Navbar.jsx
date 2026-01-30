import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold flex items-center gap-1">
                        <span className={`text-3xl ${scrolled || !isHome ? 'text-orange-500' : 'text-white'}`}>Le Holidays</span>
                        <span className={`text-3xl ${scrolled || !isHome ? 'text-green-600' : 'text-white'}`}>Getways</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['Home', 'Packages', 'Offers', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className={`font-medium text-lg transition-colors ${scrolled || !isHome ? 'text-gray-700 hover:text-orange-500' : 'text-white/90 hover:text-white'}`}
                            >
                                {item}
                            </Link>
                        ))}
                        <div className="bg-orange-500 text-white px-4 py-2 rounded-md font-bold text-lg shadow-lg">
                            +91 9940882200
                        </div>
                        <Link
                            to="/login"
                            className={`flex items-center space-x-1 px-5 py-2 rounded-full font-medium transition-all ${scrolled || !isHome
                                ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-orange-500/30'
                                : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/50'
                                }`}
                        >
                            <User size={18} />
                            <span>Login</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className={scrolled || !isHome ? 'text-gray-800' : 'text-white'}>
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 animate-fade-in">
                        <div className="flex flex-col space-y-4 px-6">
                            {['Home', 'Packages', 'Offers', 'Contact', 'Login'].map((item) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className="text-gray-700 hover:text-orange-500 font-medium text-lg border-b border-gray-100 pb-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                            <div className="text-orange-500 font-bold text-lg pt-2">
                                +91 9940882200
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
