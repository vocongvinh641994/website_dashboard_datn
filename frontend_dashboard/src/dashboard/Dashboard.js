import React from 'react';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar.js';
import Content from './content/Content';
import Footer from './footer/Footer';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Navbar />
            <Sidebar />
            <Content />
            <Footer />
        </div>
    );
};

export default Dashboard;
