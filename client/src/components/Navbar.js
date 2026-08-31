import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/courses', label: 'Courses' },
    { to: '/services', label: 'Services' },
    { to: '/team', label: 'Team' },
    { to: '/portfolios', label: 'Portfolios' },
    { to: '/certificates', label: 'Certificates' },
    { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { settings } = useSettings();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const isActive = (path) => location.pathname === path;

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`} role="banner">
            <div className="navbar-container">
                {/* Brand / Logo Section */}
                <Link to="/" className="navbar-brand" aria-label={settings.companyName}>
                    <div className="navbar-logo">
                        <img src="/logo.png" alt={settings.companyName} />
                    </div>
                    <span className="navbar-brand-name">
                        {settings.companyName}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="navbar-nav" role="navigation" aria-label="Main navigation">
                    <ul className="navbar-menu">
                        {navLinks.map((link) => (
                            <li key={link.to} className="navbar-menu-item">
                                <Link
                                    to={link.to}
                                    className={`navbar-link ${isActive(link.to) ? 'active' : ''}`}
                                    aria-current={isActive(link.to) ? 'page' : undefined}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link to="/admissions" className="navbar-cta btn btn-primary">
                        Enroll Now
                    </Link>
                </nav>

                {/* Mobile Toggle Button */}
                <button
                    className="navbar-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                >
                    <span className="hamburger" aria-hidden="true">
                        <span className="hamburger-line" />
                        <span className="hamburger-line" />
                        <span className="hamburger-line" />
                    </span>
                </button>
            </div>

            {/* Mobile Navigation */}
            {menuOpen && (
                <div id="mobile-menu" className="navbar-mobile" role="navigation" aria-label="Mobile navigation">
                    <ul className="navbar-mobile-menu">
                        {navLinks.map((link) => (
                            <li key={link.to} className="navbar-mobile-item">
                                <Link
                                    to={link.to}
                                    className={`navbar-mobile-link ${isActive(link.to) ? 'active' : ''}`}
                                    onClick={() => setMenuOpen(false)}
                                    aria-current={isActive(link.to) ? 'page' : undefined}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link to="/admissions" className="navbar-mobile-cta btn btn-primary" onClick={() => setMenuOpen(false)}>
                        Enroll Now
                    </Link>
                </div>
            )}

            {menuOpen && (
                <div className="navbar-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />
            )}
        </header>
    );
}
