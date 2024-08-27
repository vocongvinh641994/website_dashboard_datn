import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <h1>Dashboard</h1>
            <div className="user-profile">
                <span>Welcome, User</span>
            </div>
        </div>
    );
};

export default Navbar;
