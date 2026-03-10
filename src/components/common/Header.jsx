import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <p>Tecnisan</p>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#hero" title="Ir a la sección de inicio">Inicio</a></li>
            <li><a href="#brands" title="Ir a la sección de marcas">Marcas</a></li>
            <li><a href="#about" title="Ir a la sección sobre nosotros">Sobre Nosotros</a></li>
            <li><a href="#contact" title="Ir a la sección de contacto">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;