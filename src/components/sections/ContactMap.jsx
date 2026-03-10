import React from 'react';

const ContactMap = ({ mapSrc, address }) => {
  return (
    <div className="card contact-map">
      {mapSrc ? (
        <iframe
          title="Mapa - ubicación"
          src={mapSrc}
          width="100%"
          height="320"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="map-placeholder">Mapa no disponible</div>
      )}
      
      {address && (
        <p>
          <a
            className="btn btn--red"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir en Google Maps (se abre en pestaña nueva)"
          >
            Abrir en Google Maps
          </a>
        </p>
      )}
    </div>
  );
};

export default ContactMap;
