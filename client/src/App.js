import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbot';

import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Services from './pages/Services';
import WhyChooseUs from './pages/WhyChooseUs';
import Team from './pages/Team';
import Portfolios from './pages/Portfolios';
import Certificates from './pages/Certificates';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';

function ScrollToTop() {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

export default function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                {/* Public site */}
                <Route
                    path="/*"
                    element={
                        <>
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/courses" element={<Courses />} />
                                <Route path="/courses/:slug" element={<CourseDetails />} />
                                <Route path="/services" element={<Services />} />
                                <Route path="/why-choose-us" element={<WhyChooseUs />} />
                                <Route path="/team" element={<Team />} />
                                <Route path="/portfolios" element={<Portfolios />} />
                                <Route path="/certificates" element={<Certificates />} />
                                <Route path="/admissions" element={<Admissions />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/privacy" element={<Privacy />} />
                                <Route path="/terms" element={<Terms />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                            <Footer />
                            <WhatsAppButton />
                            <Chatbot />
                        </>
                    }
                />

                {/* Admin */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/*" element={<AdminLayout />} />
            </Routes>
        </>
    );
}
