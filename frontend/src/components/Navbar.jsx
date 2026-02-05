import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import useSettings from '../hooks/useSettings';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { settings } = useSettings();

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
                        <span className={`text-3xl font-display uppercase tracking-wide ${scrolled || !isHome ? 'text-[#5F4A8B]' : 'text-white'}`}>Lé holidays</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['Home', 'Packages', 'Offers', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className={`font-medium text-lg transition-colors ${scrolled || !isHome ? 'text-gray-700 hover:text-[#5F4A8B]' : 'text-white/90 hover:text-white'}`}
                            >
                                {item}
                            </Link>
                        ))}
                        <a
                            href={`tel:${settings.phone_number.replace(/\s/g, '')}`}
                            className="bg-[#5F4A8B] text-white px-4 py-2 rounded-md font-bold text-lg shadow-lg border border-white/20 hover:bg-[#4a396d] transition-colors font-display tracking-widest"
                        >
                            {settings.phone_number}
                        </a>
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
                            {['Home', 'Packages', 'Offers', 'Contact'].map((item) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className="text-gray-700 hover:text-[#5F4A8B] font-medium text-lg border-b border-gray-100 pb-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                            <a
                                href={`tel:${settings.phone_number.replace(/\s/g, '')}`}
                                className="text-[#5F4A8B] font-bold text-lg pt-2 hover:underline"
                            >
                                {settings.phone_number}
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
