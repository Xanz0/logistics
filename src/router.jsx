import React from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RoleSelect from './pages/auth/RoleSelect';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import DriverDashboard from './pages/driver/DriverDashboard';
import { isAuthenticated, getUserRole } from './utils/auth';

const ProtectedRoute = ({ children, role }) => {
  if (!isAuthenticated()) return <Navigate to="/login" />;
  if (role && getUserRole() !== role) return <Navigate to="/login" />;
  return children;
};

export default function RouterComponent() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role" element={<RoleSelect />} />
        <Route path="/customer" element={
          <ProtectedRoute role="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/driver" element={
          <ProtectedRoute role="driver">
            <DriverDashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  );
}
