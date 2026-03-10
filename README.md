# Tecnisan - Servicio Técnico Oficial

Landing page para Tecnisan, servicio técnico oficial de reparación de electrodomésticos. 

**Servicio técnico autorizado de:** Philips, Nutribullet, DeLonghi, BaByliss, Taurus, Russell Hobbs, Polti, Remington y Orbegozo.

Este proyecto está construido con React y Vite para crear una landing page rápida y moderna.

## 🚀 Características

- ✅ **Servicio Técnico Oficial** de 9 marcas reconocidas
- 📺 **Reparación de Televisores** de todas las marcas
- 🔥 **Reparación de Microondas** de todas las marcas
- 💼 Diseño moderno y responsivo
- ⚡ Rápido y optimizado con Vite
- 🎨 Fácil personalización

## 📋 Secciones

1. **Hero** - Presentación principal con llamada a la acción
2. **Brands** - Marcas oficiales autorizadas
3. **AllBrands** - Televisores y microondas de todas las marcas
4. **About** - Información sobre Tecnisan
5. **Testimonials** - Opiniones de clientes
6. **Gallery** - Galería de imágenes
7. **FAQ** - Preguntas frecuentes
8. **Contact** - Formulario de contacto

## 🛠️ Estructura del Proyecto

```
TecnisanWeb/
├── src/
│   ├── components/
│   │   ├── common/          # Header, Footer, Button, Modal
│   │   ├── sections/        # Secciones de la landing page
│   │   └── forms/           # Formularios de contacto
│   ├── styles/              # Estilos CSS organizados
│   ├── config/              # Configuración del sitio
│   ├── hooks/               # Hooks personalizados
│   └── utils/               # Utilidades
├── public/
│   └── images/              # Imágenes y logos
└── index.html
```

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa del build
npm run preview
```

## 🎨 Personalización

### Modificar contenido

Edita el archivo `src/config/sectionsConfig.js` para cambiar:
- Textos de las secciones
- Preguntas frecuentes
- Testimonios
- Información de contacto

### Modificar datos del sitio

Edita `src/config/siteConfig.js` para cambiar:
- Título y descripción del sitio
- Información de contacto
- Redes sociales
- Color principal

### Añadir logos de marcas

Coloca los logos en `public/images/brands/` con los nombres:
- `philips.png`
- `nutribullet.png`
- `delonghi.png`
- `babyliss.png`
- `taurus.png`
- `russell-hobbs.png`
- `polti.png`
- `remington.png`
- `orbegozo.png`

## 🌐 Despliegue

Este proyecto está configurado para desplegarse fácilmente en Vercel:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

## 📱 Responsive

La landing page está completamente optimizada para:
- 📱 Móviles
- 💻 Tablets
- 🖥️ Escritorio

## 🔧 Tecnologías

- React 18
- Vite
- CSS3 (CSS Modules)
- JavaScript ES6+

## 📄 Licencia

Este proyecto es de uso privado para Tecnisan.