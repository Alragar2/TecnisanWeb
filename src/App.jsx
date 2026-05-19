import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/admin/Login';
import Componentes from './pages/admin/Componentes';

// Layouts
import AdminLayout from './components/admin/AdminLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route - Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Componentes />} />
          <Route path="componentes" element={<Componentes />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;