import React from 'react';
import sectionsConfig from '../../config/sectionsConfig';

const Footer = () => {
  const { contact = {} } = sectionsConfig;
  const { address, phone } = contact;

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Tecnisan. Todos los derechos reservados.</p>
        {address && <p>{address}</p>}
        {phone && <p>{phone}</p>}
        <ul className="footer-links">
          <li><a href="#contact">Contacto</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;