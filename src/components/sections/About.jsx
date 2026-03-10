import React from 'react';
import sectionsConfig from '../../config/sectionsConfig';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2>{sectionsConfig.about.title}</h2>
        <p>
          {sectionsConfig.about.description}
        </p>
        <p>
          {sectionsConfig.about.description2}
        </p>
        <p>
          {sectionsConfig.about.description3}
        </p>
        <div className="about-features">
          <div className="about-feature">
            <div className="feature-icon">🔧</div>
            <h3>Profesionalidad</h3>
            <p>Técnicos cualificados y certificados</p>
          </div>
          <div className="about-feature">
            <div className="feature-icon">✅</div>
            <h3>Garantía</h3>
            <p>Todas nuestras reparaciones con garantía oficial de 90 días en la avería de reparación</p>
          </div>
          <div className="about-feature">
            <div className="feature-icon">💰</div>
            <h3>Presupuesto</h3>
            <p>Depósito para el diagnóstico del electrodoméstico dependiendo el aparato</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;