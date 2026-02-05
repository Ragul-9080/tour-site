import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Packages from './pages/Packages';
import Offers from './pages/Offers';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

import FloatingButtons from './components/FloatingButtons';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';


function AppContent() {
    const location = useLocation();
    const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

    const openEnquiryModal = () => setIsEnquiryModalOpen(true);
    const closeEnquiryModal = () => setIsEnquiryModalOpen(false);

    React.useEffect(() => {
        // Prevent automatic popup on admin/login routes
        const isAdminRoute = ['/admin', '/super-admin', '/login'].some(route =>
            location.pathname === route || location.pathname.startsWith(`${route}/`)
        );

        if (isAdminRoute) return;

        const timer = setTimeout(() => {
            openEnquiryModal();
        }, 15000); // Open automatically after 15 seconds
        return () => clearTimeout(timer);
    }, [location.pathname]);

    const checkHideRoutes = (routes) => {
        return routes.some(route => location.pathname === route || location.pathname.startsWith(`${route}/`));
    };

    const hideFooterRoutes = ['/login', '/admin', '/super-admin'];
    const hideNavbarRoutes = ['/admin', '/super-admin'];
    const hideFloatingButtonsRoutes = ['/admin', '/super-admin'];

    const shouldHideFooter = checkHideRoutes(hideFooterRoutes);
    const shouldHideNavbar = checkHideRoutes(hideNavbarRoutes);
    const shouldHideFloatingButtons = checkHideRoutes(hideFloatingButtonsRoutes);
    const shouldHideEnquiryModal = checkHideRoutes(hideNavbarRoutes) || location.pathname === '/login';

    return (
        <div className="min-h-screen bg-gray-50">
            {!shouldHideNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Home openEnquiryModal={openEnquiryModal} />} />
                <Route path="/packages" element={<Packages openEnquiryModal={openEnquiryModal} />} />
                <Route path="/offers" element={<Offers openEnquiryModal={openEnquiryModal} />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute role="admin" />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                </Route>
                <Route element={<ProtectedRoute role="super_admin" />}>
                    <Route path="/super-admin" element={<SuperAdminDashboard />} />
                </Route>
            </Routes>
            {!shouldHideFooter && <Footer openEnquiryModal={openEnquiryModal} />}
            {!shouldHideFloatingButtons && <FloatingButtons onEnquireClick={openEnquiryModal} />}
            {!shouldHideEnquiryModal && <EnquiryModal isOpen={isEnquiryModalOpen} onClose={closeEnquiryModal} />}
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
