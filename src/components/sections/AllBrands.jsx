import React from 'react';
import '../../styles/sections/allbrands.css';

const AllBrands = () => {
  return (
    <section id="allbrands" className="allbrands-section">
      <div className="container">
        <div className="allbrands-content">
          <div className="allbrands-item">
            <div className="allbrands-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16H3V4h18m0-2H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h5v2H6v2h12v-2h-2v-2h5a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
              </svg>
            </div>
            <h3 className="allbrands-title">Televisores</h3>
            <p className="allbrands-description">
              Reparamos televisores de todas las marcas y modelos. 
              LED, LCD, OLED, QLED y Smart TV.
            </p>
            <div className="allbrands-badge">
              <span>Todas las marcas</span>
            </div>
          </div>

          <div className="allbrands-item">
            <div className="allbrands-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 3H4c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2m0 16H4V5h16v14m-7-2h-2v-2.41L8.41 17L7 15.59L9.59 13H7v-2h6v6z"/>
              </svg>
            </div>
            <h3 className="allbrands-title">Microondas</h3>
            <p className="allbrands-description">
              Reparación especializada de microondas de todas las marcas. 
              Con o sin grill.
            </p>
            <div className="allbrands-badge">
              <span>Todas las marcas</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AllBrands;
