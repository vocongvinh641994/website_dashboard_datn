import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login-page';
import Dashboard from './pages/dashboard';

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default App; // Ensure that App is exported as the default
