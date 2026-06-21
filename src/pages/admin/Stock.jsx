import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Search, Plus, Minus, Trash2, Loader, ExternalLink, PackageOpen } from 'lucide-react';
import './AdminStyles.css';

const Stock = () => {
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    numParte: '',
    tipoPieza: '',
    cantidad: 1,
    linkCompra: '',
    ubicacion: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'stock'), orderBy('numParte', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setStockItems(docs);
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
      // Basic validation
      if (!formData.numParte || !formData.tipoPieza) {
        alert("El Nº de Parte y el Tipo de Pieza son obligatorios.");
        setIsSubmitting(false);
        return;
      }

      await addDoc(collection(db, 'stock'), {
        numParte: formData.numParte.trim().toUpperCase(),
        tipoPieza: formData.tipoPieza.trim(),
        cantidad: parseInt(formData.cantidad, 10) || 0,
        linkCompra: formData.linkCompra.trim(),
        ubicacion: formData.ubicacion.trim(),
        createdAt: new Date().toISOString()
      });
      
      // Reset form
      setFormData({
        numParte: '',
        tipoPieza: '',
        cantidad: 1,
        linkCompra: '',
        ubicacion: ''
      });
    } catch (error) {
      console.error("Error adding stock item: ", error);
      alert("Error al añadir la pieza al stock");
    } finally {
      setIsSubmitting(false);
    }
  };

  const adjustQuantity = async (id, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty < 0) return; // Prevent negative stock

    try {
      const stockRef = doc(db, 'stock', id);
      await updateDoc(stockRef, { cantidad: newQty });
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta pieza del inventario?")) {
      try {
        await deleteDoc(doc(db, 'stock', id));
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  // Filter components based on search term
  const filteredStock = stockItems.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    const numParteMatch = item.numParte?.toLowerCase().includes(searchLower);
    const tipoMatch = item.tipoPieza?.toLowerCase().includes(searchLower);
    return numParteMatch || tipoMatch;
  });

  return (
    <div className="componentes-page">
      <div className="admin-header-actions">
        <h2>Control de Stock</h2>
      </div>

      {/* Add Stock Form */}
      <div className="admin-card glass-panel fade-in">
        <h3>Registrar Nueva Pieza</h3>
        <form onSubmit={handleSubmit} className="component-form">
          <div className="form-row">
            <div className="form-group" style={{flex: 1}}>
              <label>Identificador</label>
              <input 
                type="text" 
                name="numParte" 
                value={formData.numParte} 
                onChange={handleInputChange} 
                required 
                placeholder="Ej. Tornillos T5"
              />
            </div>
            <div className="form-group" style={{flex: 1}}>
              <label>Tipo de Pieza</label>
              <input 
                type="text" 
                name="tipoPieza" 
                value={formData.tipoPieza} 
                onChange={handleInputChange} 
                required 
                placeholder="Ej. Pantalla OLED, Batería..."
              />
            </div>
            <div className="form-group" style={{width: '120px'}}>
              <label>Cantidad</label>
              <input 
                type="number" 
                name="cantidad" 
                value={formData.cantidad} 
                onChange={handleInputChange} 
                min="0"
                required 
              />
            </div>
            <div className="form-group" style={{flex: 1}}>
              <label>Ubicación</label>
              <input 
                type="text" 
                name="ubicacion" 
                value={formData.ubicacion} 
                onChange={handleInputChange}
                placeholder="Ej. Estantería B, Cajón 3..."
              />
            </div>
            <div className="form-group" style={{flex: 2}}>
              <label>Enlace de Compra (Opcional)</label>
              <input 
                type="url" 
                name="linkCompra" 
                value={formData.linkCompra} 
                onChange={handleInputChange}
                placeholder="https://proveedor.com/..."
              />
            </div>
          </div>
          <div className="form-actions" style={{justifyContent: 'flex-start'}}>
            <button type="submit" className="admin-btn primary" disabled={isSubmitting}>
              {isSubmitting ? <Loader className="spin" size={18} /> : <PackageOpen size={18} />}
              <span>Añadir al Inventario</span>
            </button>
          </div>
        </form>
      </div>

      {/* Stock List Section */}
      <div className="admin-card glass-panel fade-in list-section">
        <div className="list-header" style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <h3>Inventario Disponible</h3>
          <div className="search-bar" style={{width: '300px'}}>
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar por Identificador o Tipo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <Loader className="spin" size={32} />
            <p>Cargando inventario...</p>
          </div>
        ) : filteredStock.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron piezas en el stock.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Identificador</th>
                  <th>Tipo de Pieza</th>
                  <th>Ubicación</th>
                  <th style={{textAlign: 'center', width: '180px'}}>Cantidad en Stock</th>
                  <th style={{textAlign: 'center'}}>Comprar</th>
                  <th style={{textAlign: 'center'}}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredStock.map((item) => (
                  <tr key={item.id} style={{background: item.cantidad === 0 ? 'rgba(239, 68, 68, 0.05)' : 'transparent'}}>
                    <td className="font-medium">{item.numParte}</td>
                    <td>{item.tipoPieza}</td>
                    <td>{item.ubicacion || <span style={{color: 'var(--admin-text-secondary)', fontStyle: 'italic'}}>-</span>}</td>
                    
                    {/* Quick Adjust Quantity Column */}
                    <td>
                      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px'}}>
                        <button 
                          onClick={() => adjustQuantity(item.id, item.cantidad, -1)}
                          disabled={item.cantidad <= 0}
                          style={{
                            background: 'var(--admin-bg-secondary)', border: '1px solid var(--admin-glass-border)',
                            color: '#f8fafc', width: '32px', height: '32px', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: item.cantidad <= 0 ? 'not-allowed' : 'pointer',
                            opacity: item.cantidad <= 0 ? 0.5 : 1
                          }}
                        >
                          <Minus size={16} />
                        </button>
                        
                        <span style={{
                          fontSize: '1.2rem', fontWeight: 'bold', width: '30px', textAlign: 'center',
                          color: item.cantidad === 0 ? 'var(--admin-danger)' : '#f8fafc'
                        }}>
                          {item.cantidad}
                        </span>
                        
                        <button 
                          onClick={() => adjustQuantity(item.id, item.cantidad, 1)}
                          style={{
                            background: 'var(--admin-bg-secondary)', border: '1px solid var(--admin-glass-border)',
                            color: '#f8fafc', width: '32px', height: '32px', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                          }}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </td>
                    
                    <td style={{textAlign: 'center'}}>
                      {item.linkCompra ? (
                        <a 
                          href={item.linkCompra} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{color: 'var(--admin-accent)', display: 'inline-flex', alignItems: 'center', gap: '5px', textDecoration: 'none'}}
                        >
                          <ExternalLink size={16} />
                          <span style={{fontSize: '0.85rem'}}>Ver Web</span>
                        </a>
                      ) : (
                        <span style={{color: 'var(--admin-text-secondary)', fontSize: '0.85rem'}}>-</span>
                      )}
                    </td>
                    
                    <td style={{textAlign: 'center'}}>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        style={{background: 'none', border: 'none', color: 'var(--admin-danger)', cursor: 'pointer', padding: '5px'}}
                        title="Eliminar del inventario"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
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

export default Stock;
