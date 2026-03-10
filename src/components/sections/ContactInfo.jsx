import React from 'react';

const ContactInfo = ({ address, openingHours, phone, phoneHours, whatsapp, whatsappLink }) => {
  return (
    <div className="card contact-info">
      <h3>Dónde encontrarnos</h3>
      {address && <p><strong>Dirección:</strong><br />{address}</p>}
      {openingHours.length > 0 && (
        <div className="contact-hours" aria-label="Horario de apertura">
          <h4>Horario</h4>
          <ul className="hours-list">
            {openingHours.map((h, i) => (
              <li className="hours-item" key={i}>
                <span className="hours-day">{h.days}</span>
                <span className="hours-time">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {phone && (
        /* Cambiamos el <p> exterior por un <div> */
        <div className="contact-item"> 
          <strong>Teléfono:</strong><br />
          <a href={`tel:${phone}`}>{phone}</a><br />
          {phoneHours && <p className="phone-hours">{phoneHours}</p>}
        </div>
      )}

      {whatsapp && whatsappLink && (
        /* También recomiendo usar <div> aquí para ser consistentes */
        <div className="contact-item">
          <strong>WhatsApp:</strong><br />
          <a href={`tel:${whatsapp}`}>{whatsapp}</a><br />
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Enviar mensaje</a>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
