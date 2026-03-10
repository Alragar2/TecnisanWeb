import React from 'react';
import fachada from '../../assets/fachada_tecnisan.webp';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-image" aria-hidden>
        <img src={fachada} alt="Fachada Tecnisan" />
      </div>

      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-title">Tecnisan</h1>
          <h2 className="hero-subtitle">Servicio Técnico Oficial</h2>
          <p className="hero-description">
            Expertos en reparación de electrodomésticos. Servicio técnico autorizado de las principales marcas.
          </p>
          <div className="hero-buttons">
            <a href="#brands" className="hero-button secondary">Ver Marcas</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;