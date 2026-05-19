import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Search, Plus, CheckCircle, Circle, Loader } from 'lucide-react';
import './AdminStyles.css';

const Componentes = () => {
  const [componentes, setComponentes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    idComponente: '',
    numParte: '',
    fechaPedido: '',
    marca: '',
    modelo: '',
    descripcion: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'componentes'), orderBy('fechaPedido', 'desc'));
    
    // Real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setComponentes(docs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching components: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'componentes'), {
        ...formData,
        llegado: false,
        createdAt: new Date().toISOString()
      });
      // Reset form
      setFormData({
        idComponente: '',
        numParte: '',
        fechaPedido: '',
        marca: '',
        modelo: '',
        descripcion: ''
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error al añadir el componente");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const compRef = doc(db, 'componentes', id);
      await updateDoc(compRef, {
        llegado: !currentStatus
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Filter components based on search term (ID Componente or Nº Parte)
  const filteredComponentes = componentes.filter(comp => {
    const searchLower = searchTerm.toLowerCase();
    const idMatch = comp.idComponente?.toLowerCase().includes(searchLower);
    const numParteMatch = comp.numParte?.toLowerCase().includes(searchLower);
    return idMatch || numParteMatch;
  });

  return (
    <div className="componentes-page">
      <div className="admin-header-actions">
        <h2>Gestión de Componentes</h2>
      </div>

      {/* Form Section */}
      <div className="admin-card glass-panel fade-in">
        <h3>Añadir Nuevo Componente</h3>
        <form onSubmit={handleSubmit} className="component-form">
          <div className="form-row">
            <div className="form-group">
              <label>ID Componente</label>
              <input 
                type="text" 
                name="idComponente" 
                value={formData.idComponente} 
                onChange={handleInputChange} 
                required 
                placeholder="Ej. COMP-001"
              />
            </div>
            <div className="form-group">
              <label>Nº Parte</label>
              <input 
                type="text" 
                name="numParte" 
                value={formData.numParte} 
                onChange={handleInputChange} 
                required 
                placeholder="Ej. 40000"
              />
            </div>
            <div className="form-group">
              <label>Fecha Pedido</label>
              <input 
                type="date" 
                name="fechaPedido" 
                value={formData.fechaPedido} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Marca</label>
              <input 
                type="text" 
                name="marca" 
                value={formData.marca} 
                onChange={handleInputChange} 
                required 
                placeholder="Ej. Samsung"
              />
            </div>
            <div className="form-group">
              <label>Modelo</label>
              <input 
                type="text" 
                name="modelo" 
                value={formData.modelo} 
                onChange={handleInputChange} 
                required 
                placeholder="Ej. Galaxy S21"
              />
            </div>
          </div>
          <div className="form-group full-width">
            <label>Descripción</label>
            <textarea 
              name="descripcion" 
              value={formData.descripcion} 
              onChange={handleInputChange} 
              required 
              placeholder="Descripción detallada del componente..."
              rows="3"
            ></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="admin-btn primary" disabled={isSubmitting}>
              {isSubmitting ? <Loader className="spin" size={18} /> : <Plus size={18} />}
              <span>Añadir Componente</span>
            </button>
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="admin-card glass-panel fade-in list-section">
        <div className="list-header">
          <h3>Listado de Componentes</h3>
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              className="search-input"
              placeholder="Buscar por ID o Nº Parte..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <Loader className="spin" size={32} />
            <p>Cargando componentes...</p>
          </div>
        ) : filteredComponentes.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron componentes.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Estado</th>
                  <th>ID Componente</th>
                  <th>Nº Parte</th>
                  <th>Fecha Pedido</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {filteredComponentes.map((comp) => (
                  <tr key={comp.id} className={comp.llegado ? 'status-arrived' : 'status-pending'}>
                    <td className="status-cell">
                      <button 
                        onClick={() => toggleStatus(comp.id, comp.llegado)}
                        className={`status-toggle ${comp.llegado ? 'arrived' : 'pending'}`}
                        title={comp.llegado ? 'Marcar como no llegado' : 'Marcar como llegado'}
                      >
                        {comp.llegado ? <CheckCircle size={20} /> : <Circle size={20} />}
                        <span className="status-text">{comp.llegado ? 'Llegado' : 'Pendiente'}</span>
                      </button>
                    </td>
                    <td className="font-medium">{comp.idComponente}</td>
                    <td>{comp.numParte}</td>
                    <td>{comp.fechaPedido}</td>
                    <td>{comp.marca}</td>
                    <td>{comp.modelo}</td>
                    <td className="desc-cell">{comp.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Componentes;
