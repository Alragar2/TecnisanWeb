import React from 'react';
import sectionsConfig from '../../config/sectionsConfig';
import { Tv, Microwave, ChefHat, Settings } from 'lucide-react';
import '../../styles/sections/allbrands.css';

const getIconForService = (name) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('televisor')) return <Tv size={40} strokeWidth={1.5} />;
  if (lowerName.includes('microondas')) return <Microwave size={40} strokeWidth={1.5} />;
  if (lowerName.includes('robot') || lowerName.includes('cocina')) return <ChefHat size={40} strokeWidth={1.5} />;
  return <Settings size={40} strokeWidth={1.5} />;
};

const AllBrands = () => {
  const { allBrands = {} } = sectionsConfig;
  const { services = [] } = allBrands;

  return (
    <section id="allbrands" className="allbrands-section">
      <div className="container">
        <div className="allbrands-content">
          {services.map((service, index) => (
            <div className="allbrands-item" key={index}>
              <div className="allbrands-icon" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {getIconForService(service.name)}
              </div>
              <h3 className="allbrands-title">{service.name}</h3>
              <p className="allbrands-description">
                {service.description}
              </p>
              <div className="allbrands-badge">
                <span>{service.name === 'Robots de Cocina' ? 'Fuera de Garantía' : 'Todas las marcas'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllBrands;
