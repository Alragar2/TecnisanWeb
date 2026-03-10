import nodemailer from 'nodemailer';

// No necesitamos express ni cors aquí, Vercel lo gestiona
export default async function handler(req, res) {
  // Solo permitimos peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { name, email, subject = 'Contacto web', message } = req.body;

  // Validación básica
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Campos incompletos' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Web Contact" <${process.env.SMTP_USER}>`,
      to: process.env.DEST_EMAIL,
      subject: `${subject} — ${name}`,
      text: `De: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>De:</strong> ${name} &lt;${email}&gt;</p><p>${message}</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error en Vercel Function:", error);
    return res.status(500).json({ ok: false, error: error.message });
  }
}