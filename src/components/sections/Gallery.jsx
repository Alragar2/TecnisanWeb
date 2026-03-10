import React, { useEffect, useRef, useState } from 'react';

const Gallery = () => {
  const images = [
    '/images/gallery-1.jpg',
    '/images/gallery-2.jpg',
    '/images/gallery-3.jpg',
    '/images/gallery-4.jpg',
    '/images/gallery-5.jpg',
    '/images/gallery-6.jpg',
  ];

  const length = images.length;
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef(null);
  const isPaused = useRef(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    // start autoplay once
    startAutoplay();
    // keyboard navigation
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      stopAutoplay();
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startAutoplay = () => {
    if (autoplayRef.current) return;
    autoplayRef.current = setInterval(() => {
      if (!isPaused.current) setCurrent((c) => (c + 1) % length);
    }, 4000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const next = () => setCurrent((c) => (c + 1) % length);
  const prev = () => setCurrent((c) => (c - 1 + length) % length);
  const goTo = (index) => setCurrent(index);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    isPaused.current = true;
  };

  const onTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const delta = touchStartX.current - endX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) next();
      else prev();
    }
    isPaused.current = false;
  };

  return (
    <section id="gallery" className="gallery" aria-roledescription="carousel" aria-label="Galería de proyectos">
      <h2>Galería</h2>

      <div
        className="carousel"
        onMouseEnter={() => (isPaused.current = true)}
        onMouseLeave={() => (isPaused.current = false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === current ? 'is-active' : ''}`}
              aria-hidden={index === current ? 'false' : 'true'}
            >
              <img src={image} alt={`Galería ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>

        <div className="carousel-controls">
          <button className="carousel-btn prev" onClick={prev} aria-label="Anterior">‹</button>
          <button className="carousel-btn next" onClick={next} aria-label="Siguiente">›</button>
        </div>

        <div className="carousel-dots" role="tablist" aria-label="Navegación de la galería">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot ${idx === current ? 'active' : ''}`}
              onClick={() => goTo(idx)}
              aria-label={`Ir a la imagen ${idx + 1}`}
              aria-selected={idx === current}
              role="tab"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;