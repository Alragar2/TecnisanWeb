import React, { useState, useEffect } from 'react';
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Search, Plus, Trash2, Loader, Archive, Layers } from 'lucide-react';
import './AdminStyles.css';

const Ubicaciones = () => {
  const [estanterias, setEstanterias] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for adding a new item
  const [newItem, setNewItem] = useState({ numParte: '', estanteriaId: '' });
  const [isAddingItem, setIsAddingItem] = useState(false);
  
  // State for creating a new shelf
  const [isCreatingShelf, setIsCreatingShelf] = useState(false);

  useEffect(() => {
    // 1. Listen to Estanterias
    const qEstanterias = query(collection(db, 'estanterias'));
    const unsubEstanterias = onSnapshot(qEstanterias, (snapshot) => {
      const estDocs = [];
      snapshot.forEach(doc => estDocs.push({ id: doc.id, name: doc.id }));
      estDocs.sort((a, b) => a.name.localeCompare(b.name));
      setEstanterias(estDocs);
    });

    // 2. Listen to Ubicaciones
    const qUbicaciones = query(collection(db, 'ubicaciones'));
    const unsubUbicaciones = onSnapshot(qUbicaciones, (snapshot) => {
      const ubDocs = [];
      snapshot.forEach(doc => ubDocs.push({ id: doc.id, ...doc.data() }));
      setUbicaciones(ubDocs);
      setLoading(false);
    });

    return () => {
      unsubEstanterias();
      unsubUbicaciones();
    };
  }, []);

  const handleCreateShelf = async () => {
    const shelfName = window.prompt("Introduce el nombre de la nueva estantería:");
    if (!shelfName || !shelfName.trim()) return;

    setIsCreatingShelf(true);
    try {
      const cleanName = shelfName.trim();
      await setDoc(doc(db, 'estanterias', cleanName), {
        createdAt: new Date().toISOString()
      });
      // Optionally pre-select it in the dropdown if we want
      setNewItem(prev => ({ ...prev, estanteriaId: cleanName }));
    } catch (error) {
      console.error("Error creating shelf:", error);
      alert("Error al crear la estantería.");
    } finally {
      setIsCreatingShelf(false);
    }
  };

  const handleDeleteShelf = async (shelfId) => {
    // Check if it has items
    const hasItems = ubicaciones.some(ub => ub.estanteria === shelfId);
    if (hasItems) {
      alert("No puedes eliminar una estantería que tiene aparatos. Sácalos primero.");
      return;
    }

    if (window.confirm(`¿Seguro que quieres eliminar la ${shelfId}?`)) {
      try {
        await deleteDoc(doc(db, 'estanterias', shelfId));
      } catch (error) {
        console.error("Error deleting shelf:", error);
      }
    }
  };

  const handleAddItem = async (e) => {
    if (e) e.preventDefault();
    if (!newItem.numParte.trim() || !newItem.estanteriaId) {
      alert("El Nº de Parte y la Estantería son obligatorios.");
      return;
    }
    
    setIsAddingItem(true);
    try {
      const partId = newItem.numParte.trim().toUpperCase();
      await setDoc(doc(db, 'ubicaciones', partId), {
        numParte: partId,
        estanteria: newItem.estanteriaId,
        updatedAt: new Date().toISOString()
      });
      setNewItem(prev => ({ ...prev, numParte: '' })); // Keep the shelf selected for rapid entry
    } catch (error) {
      console.error("Error adding ubicacion:", error);
      alert("Error al añadir el aparato.");
    } finally {
      setIsAddingItem(false);
    }
  };

  const handleDeleteItem = async (partId) => {
    if (window.confirm('¿Seguro que quieres eliminar este aparato de la estantería?')) {
      try {
        await deleteDoc(doc(db, 'ubicaciones', partId));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  // Find where the searched item is
  const searchedItem = searchTerm.trim() 
    ? ubicaciones.find(ub => ub.numParte.toLowerCase().includes(searchTerm.toLowerCase()))
    : null;

  return (
    <div className="componentes-page">
      <div className="admin-header-actions" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2 style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
          Gestión de Estanterías
          {!loading && (
            <span style={{
              fontSize: '0.9rem', 
              background: 'rgba(59, 130, 246, 0.2)', 
              color: 'var(--admin-accent)', 
              padding: '4px 12px', 
              borderRadius: '20px',
              fontWeight: '500'
            }}>
              Total: {ubicaciones.length} aparatos
            </span>
          )}
        </h2>
        <button onClick={handleCreateShelf} className="admin-btn primary" disabled={isCreatingShelf}>
          {isCreatingShelf ? <Loader size={18} className="spin"/> : <Layers size={18}/>} 
          <span>Crear Estantería</span>
        </button>
      </div>

      {/* Top Controls: Search & Global Add */}
      <div className="admin-card glass-panel fade-in" style={{display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'flex-start'}}>
        
        {/* Add Item Form */}
        <div style={{flex: '1 1 400px'}}>
          <h3>Añadir Aparato a Estantería</h3>
          <form onSubmit={handleAddItem} style={{display: 'flex', gap: '15px', alignItems: 'flex-end'}}>
            <div className="form-group" style={{marginBottom: 0, flex: 1}}>
              <label>Nº Parte / Aparato</label>
              <input 
                type="text" 
                placeholder="Ej. PT-X920" 
                value={newItem.numParte}
                onChange={(e) => setNewItem({...newItem, numParte: e.target.value})}
              />
            </div>
            <div className="form-group" style={{marginBottom: 0, flex: 1}}>
              <label>Estantería Destino</label>
              <select 
                value={newItem.estanteriaId} 
                onChange={(e) => setNewItem({...newItem, estanteriaId: e.target.value})}
                className="admin-select"
                required
              >
                <option value="" disabled>Selecciona una...</option>
                {estanterias.map(est => (
                  <option key={est.id} value={est.id}>{est.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="admin-btn primary" disabled={isAddingItem || !newItem.numParte || !newItem.estanteriaId} style={{height: '46px'}}>
              {isAddingItem ? <Loader size={18} className="spin"/> : <Plus size={18}/>}
              Guardar
            </button>
          </form>
        </div>

        {/* Global Search */}
        <div style={{flex: '1 1 300px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '30px'}}>
          <h3>Localizador Rápido</h3>
          <div className="search-bar" style={{width: '100%'}}>
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar Nº de Parte..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchedItem && (
            <div className="search-result-highlight">
              <strong>{searchedItem.numParte}</strong> está en: <span>{searchedItem.estanteria}</span>
            </div>
          )}
        </div>
      </div>

      {/* Grid of Shelves */}
      {loading ? (
        <div className="loading-state"><Loader className="spin" size={32} /><p>Cargando estanterías...</p></div>
      ) : estanterias.length === 0 ? (
        <div className="empty-state">
          <Archive size={48} style={{color: 'var(--admin-text-secondary)', marginBottom: '15px'}} />
          <h3>No hay estanterías creadas</h3>
          <p>Haz clic en "Crear Estantería" arriba a la derecha para empezar a organizar tu almacén.</p>
        </div>
      ) : (
        <div className="shelves-grid">
          {estanterias.map(est => {
            const itemsInShelf = ubicaciones.filter(ub => ub.estanteria === est.id);
            const isHighlighted = searchedItem && searchedItem.estanteria === est.id;

            return (
              <div key={est.id} className={`shelf-card glass-panel fade-in ${isHighlighted ? 'highlighted' : ''}`}>
                <div className="shelf-header">
                  <h4>{est.name}</h4>
                  <button onClick={() => handleDeleteShelf(est.id)} className="delete-shelf-btn" title="Eliminar Estantería">
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div className="shelf-content">
                  <span className="shelf-count">{itemsInShelf.length} aparatos</span>
                  
                  {itemsInShelf.length === 0 ? (
                    <div className="shelf-empty">Vacía</div>
                  ) : (
                    <ul className="shelf-item-list">
                      {itemsInShelf.map(item => (
                        <li key={item.id} className={searchedItem && searchedItem.id === item.id ? 'item-highlight' : ''}>
                          <span className="item-name">{item.numParte}</span>
                          <button onClick={() => handleDeleteItem(item.id)} className="item-delete" title="Quitar de la estantería">
                            <X size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Small hack to use X icon since we missed importing it
import { X } from 'lucide-react';

export default Ubicaciones;
