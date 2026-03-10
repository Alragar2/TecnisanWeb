const sectionsConfig = {
  hero: {
    title: "Tecnisan - Servicio Técnico Oficial",
    subtitle: "Expertos en reparación de electrodomésticos",
    ctaText: "Solicitar Presupuesto",
    ctaLink: "#contact",
  },
  brands: {
    title: "Servicio Técnico Oficial",
    subtitle: "Somos servicio técnico autorizado de las siguientes marcas",
    officialBrands: [
      "Philips", "Nutribullet", "DeLonghi", "BaByliss", 
      "Taurus", "Russell Hobbs", "Polti", "Remington", "Orbegozo"
    ],
  },
  contact: {
    title: "Contacta con Nosotros",
    description: "¿Tienes un electrodoméstico averiado? Solicita tu presupuesto sin compromiso.",
    address: 'Camí de Montcada, 90, Rascanya, 46019 València, Valencia',
    phone: '+34 96 340 06 22',
    whatsapp: '+34 657 25 38 47',
    email: 'argcplus@gmail.com', // <- destinatario
    formEndpoint: 'http://localhost:4000/api/contact',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.441323830601!2d-0.3823752659373235!3d39.494333274293346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6045fb65be377d%3A0x9b6c2758d26b6ee4!2sTecnisan!5e0!3m2!1ses!2ses!4v1768036675657!5m2!1ses!2ses',
    openingHours: [
      { days: 'Lun - Vie ', time: '9:00 – 13:30 / 16:00 – 19:30' }
    ],
    phoneHours: 'Atención telefónica: Lunes–Viernes 9:00–13:30',
    whatsappHours: 'Atención por WhatsApp: Lunes–Viernes a partir de 18:30',
  },
  allBrands: {
    title: "Reparación de Televisores y Microondas",
    subtitle: "Trabajamos con todas las marcas",
    services: [
      {
        name: "Televisores",
        description: "Reparamos televisores de todas las marcas y modelos. LED, LCD, OLED, QLED y Smart TV.",
      },
      {
        name: "Microondas",
        description: "Reparación especializada de microondas de todas las marcas. Con o sin grill, combinados y empotrados.",
      },
    ],
  },
  about: {
    title: "Sobre Tecnisan",
    description: "Con más de 40 años de experiencia en el sector, en Tecnisan nos hemos consolidado como el centro de referencia para la reparación de pequeños electrodomésticos en Valencia. No somos solo un taller; somos Servicio Técnico Oficial de las marcas líderes del mercado (Grupo Delonghi, Philips, Polti, Orbegozo, Grupo Taurus, entre otras).",
    description2: "Como Centro de Servicio Oficial, garantizamos que tu cafetera, aspiradora o centro de planchado sea tratado bajo los estándares de calidad más exigentes de cada fabricante. Reparar no solo es más económico para ti, es mejor para el planeta. ¡Súmate al cambio con Tecnisan!",
    description3: "Sabemos lo importante que es para ti esa cafetera por la mañana o tu centro de planchado antes de una cita importante. Por eso, ofrecemos un trato cercano, presupuestos acordes y la seguridad de ser el servicio técnico oficial de confianza de miles de valencianos. Si tiene arreglo, nosotros lo encontraremos."
  },
  testimonials: [
    {
      name: "María González",
      feedback: "Excelente servicio. Repararon mi cafetera DeLonghi en dos días. Muy profesionales.",
    },
    {
      name: "Carlos Martínez",
      feedback: "Servicio rápido y eficiente. El presupuesto fue muy razonable y la reparación perfecta.",
    },
    {
      name: "Ana López",
      feedback: "Muy contentos con el servicio. Arreglaron nuestro televisor y funciona como nuevo.",
    },
  ],
  gallery: [
    "/images/gallery/taller.jpg",
    "/images/gallery/reparacion1.jpg",
    "/images/gallery/reparacion2.jpg",
    "/images/gallery/electrodomesticos.jpg",
  ],
  faq: [
    {
      question: "¿Cuánto tarda la reparación?",
      answer: "El tiempo de reparación depende del tipo de avería. Generalmente, las reparaciones más comunes se realizan entre 2 y 3 semanas.",
    },
    {
      question: "¿Tienen garantía las reparaciones?",
      answer: "Sí, todas nuestras reparaciones incluyen garantía oficial de 90 días si la causa de la avería es la misma.",
    },
    {
      question: "¿Hacen presupuestos gratuitos?",
      answer: "No, ofrecemos un diagnóstico con un depósito que se descuenta del presupuesto final en caso de aceptar la reparación. En caso contrario, el depósito cubre el diagnóstico realizado.",
    },
    {
      question: "¿Reparan electrodomésticos a domicilio?",
      answer: "No, todas las reparaciones se realizan en nuestro taller para garantizar la calidad y seguridad del servicio.",
    },
    {
      question: "¿Qué marcas reparan?",
      answer: "Somos servicio técnico oficial de Philips, Grupo DeLonghi, BaByliss, Grupo Taurus, Russell Hobbs, Polti, Remington, Orbegozo, Cavanova y demás. Además, reparamos televisores y microondas de todas las marcas.",
    },
    {
      question: "¿Qué debo llevar al taller para la reparación?",
      answer: "Para la reparación, debes llevar el electrodoméstico con todos sus accesorios y el comprobante de compra o garantía si está disponible.",
    }
  ],
};

export default sectionsConfig;