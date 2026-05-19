import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { LayoutDashboard, LogOut, Package, Menu, X, MapPin } from 'lucide-react';
import '../../pages/admin/AdminStyles.css';

const AdminLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loading) {
    return <div className="admin-loading">Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="admin-layout">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <h2>Tecnisan Admin</h2>
          <button className="mobile-close" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="admin-nav">
          <ul>
            <li>
              <Link 
                to="/admin/componentes" 
                className={`admin-nav-item ${location.pathname === '/admin/componentes' ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Package size={20} />
                <span>Componentes</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/ubicaciones" 
                className={`admin-nav-item ${location.pathname === '/admin/ubicaciones' ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <MapPin size={20} />
                <span>Ubicaciones</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="user-avatar">{user.email[0].toUpperCase()}</div>
            <span className="user-email">{user.email}</span>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        <header className="admin-topbar">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1>Panel de Control</h1>
        </header>
        
        <div className="admin-content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
