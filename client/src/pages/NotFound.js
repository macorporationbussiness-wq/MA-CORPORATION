import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}>
            <h1 style={{ fontSize: '5rem', color: '#14B8A6' }}>404</h1>
            <p className="muted" style={{ fontSize: '1.2rem', marginBottom: 24 }}>The page you are looking for could not be found.</p>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
    );
}
