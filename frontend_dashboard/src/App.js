import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login-page';
import Dashboard from './pages/dashboard';
import MericCardList from './pages/dashboard/meric-card-list';
import ReviewPage from './pages/review-page';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />}>
        {/* Nested routes within Dashboard */}
        <Route index element={<MericCardList />} />  {/* Default content */}
        <Route path="reviews" element={<ReviewPage />} />  {/* Content for Đánh giá */}
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App; // Ensure that App is exported as the default
