import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';
import sectionsConfig from '../../config/sectionsConfig';

const WhatsAppButton = () => {
  const { whatsapp } = sectionsConfig.contact;
  if (!whatsapp) return null;
  
  // Format number for the wa.me link (remove spaces and non-digits)
  const whatsappNumber = whatsapp.replace(/\D/g, '');
  const link = `https://wa.me/${whatsappNumber}?text=Hola,%20quería%20hacer%20una%20consulta`;

  return (
    <a 
      href={link} 
      className="whatsapp-floating-btn" 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} />
      <span className="whatsapp-tooltip">¿Te ayudamos?</span>
    </a>
  );
};

export default WhatsAppButton;
