import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import ContactMap from './ContactMap';
import sectionsConfig from '../../config/sectionsConfig';
import '../../styles/sections/contact.css';

const Contact = () => {
  const { contact = {} } = sectionsConfig;
  const {
    title = 'Contacto',
    description = 'Si tienes alguna pregunta, no dudes en ponerte en contacto con nosotros.',
    address,
    phone,
    whatsapp,
    mapEmbedUrl,
    openingHours = [],
    phoneHours = '',
  } = contact;

  const phoneLink = phone ? `tel:${phone}` : null;
  const whatsappNumber = whatsapp ? whatsapp.replace(/\D/g, '') : null;
  const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}` : null;
  const mapSrc = mapEmbedUrl || (address ? `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed` : '');

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2>{title}</h2>
        <p>{description}</p>

        <div className="contact-grid">
          <div className="contact-left">
            <div className="card contact-form-wrap">
              <h3>Envíanos un mensaje</h3>
              <ContactForm />
            </div>
          </div>

          <div className="contact-right">
            <ContactInfo
              address={address}
              openingHours={openingHours}
              phone={phone}
              phoneHours={phoneHours}
              whatsapp={whatsapp}
              whatsappLink={whatsappLink}
            />
            <ContactMap mapSrc={mapSrc} address={address} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;