// import React from 'react';
// import {  Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import RoleSelect from './pages/auth/RoleSelect';
// import CustomerDashboard from './pages/customer/CustomerDashboard';
// import DriverDashboard from './pages/driver/DriverDashboard';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import { isAuthenticated, getUserRole } from './utils/auth';

// const ProtectedRoute = ({ children, role }) => {
//   if (!isAuthenticated()) return <Navigate to="/login" />;
//   if (role && getUserRole() !== role) return <Navigate to="/login" />;
//   return children;
// };

// export default function RouterComponent() {
//   return (
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/role" element={<RoleSelect />} />
//         <Route path="/customer" element={
//           <ProtectedRoute role="customer">
//             <CustomerDashboard />
//           </ProtectedRoute>
//         } />
//         <Route path="/driver" element={
//           <ProtectedRoute role="driver">
//             <DriverDashboard />
//           </ProtectedRoute>
//         } />
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//   );
// }

// src/router.jsx - To'g'ri versiya
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // ❌ BrowserRouter olib tashlandi
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import RoleSelect from './pages/auth/RoleSelect.jsx';
import CustomerDashboard from './pages/customer/CustomerDashboard.jsx';
import DriverDashboard from './pages/driver/DriverDashboard.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import { isAuthenticated, getUserRole } from './utils/auth.js';

const ProtectedRoute = ({ children, role }) => {
  if (!isAuthenticated()) return <Navigate to="/login" />;
  
  if (role) {
    const userRole = getUserRole();
    if (userRole !== role) {
      // Agar role mos kelmasa, uning dashboardiga yo'naltiramiz
      if (userRole === 'driver') {
        return <Navigate to="/driver" />;
      } else if (userRole === 'admin') {
        return <Navigate to="/admin" />;
      } else {
        return <Navigate to="/customer" />;
      }
    }
  }
  
  return children;
};

export default function RouterComponent() {
  return (
    // ❌ BrowserRouter OLIB TASHLANDI, faqat Routes qoldi
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
      
      <Route path="/admin" element={
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}