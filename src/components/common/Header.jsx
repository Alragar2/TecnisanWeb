import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cierra el menú al hacer clic en un enlace
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <p>Tecnisan</p>
        </div>
        
        {/* Botón hamburguesa (solo visible en móvil) */}
        <button 
          className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Menú principal"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Añadimos la clase 'active' si el menú está abierto */}
        <nav className={`navigation ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#hero" onClick={closeMenu}>Inicio</a></li>
            <li><a href="#brands" onClick={closeMenu}>Marcas</a></li>
            <li><a href="#about" onClick={closeMenu}>Sobre Nosotros</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;