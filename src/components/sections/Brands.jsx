import React from 'react';
import '../../styles/sections/brands.css';
import { officialBrands } from '../../config/brandsConfig';
import BrandCard from './BrandCard';

const Brands = () => {
  return (
    <section id="brands" className="brands-section">
      <div className="container">
        <h2 className="section-title">Servicio Técnico Oficial</h2>
        <p className="section-subtitle">
          Somos servicio técnico autorizado de las siguientes marcas
        </p>
        <div className="brands-grid">
          {officialBrands.map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </div>
        <div className="brands-badge">
          <span className="badge-icon">✓</span>
          <span className="badge-text">Servicio Técnico Autorizado</span>
        </div>
      </div>
    </section>
  );
};

export default Brands;
