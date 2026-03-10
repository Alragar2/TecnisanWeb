import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Estados para el feedback del usuario
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      // IMPORTANTE: Asegúrate de que la URL coincida con tu servidor (ej. http://localhost:4000)
      const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

      const result = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: '¡Mensaje enviado con éxito!', error: null });
        setFormData({ name: '', email: '', message: '' }); // Limpiar formulario
      } else {
        throw new Error(result.message || 'Error al enviar el mensaje');
      }
    } catch (err) {
      console.error("Error en el envío:", err);
      setStatus({ loading: false, success: null, error: 'Hubo un error al conectar con el servidor.' });
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Asunto:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="message">Mensaje:</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
      </div>

      <button type="submit" disabled={status.loading}>
        {status.loading ? 'Enviando...' : 'Enviar'}
      </button>

      {/* Mensajes de feedback */}
      {status.success && <p className="success-msg" style={{color: 'green'}}>{status.success}</p>}
      {status.error && <p className="error-msg" style={{color: 'red'}}>{status.error}</p>}
    </form>
  );
};

export default ContactForm;