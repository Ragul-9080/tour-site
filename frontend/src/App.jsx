import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Packages from './pages/Packages';
import Offers from './pages/Offers';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';

import FloatingButtons from './components/FloatingButtons';
import EnquiryFooter from './components/EnquiryFooter';
import { useLocation } from 'react-router-dom';

function AppContent() {
    const location = useLocation();
    const hideFooterRoutes = ['/contact', '/login', '/admin', '/super-admin'];
    const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/super-admin" element={<SuperAdminDashboard />} />
            </Routes>
            {!shouldHideFooter && <EnquiryFooter />}
            <FloatingButtons />
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
