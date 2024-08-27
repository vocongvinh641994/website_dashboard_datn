import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <a href="#">Reports</a>
            <a href="#">Analytics</a>
            <a href="#">Settings</a>
            <a href="#">Logout</a>
        </div>
    );
};

export default Sidebar;
