import React, { useState } from 'react';

const BrandCard = ({ brand }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="brand-card">
      <div className="brand-logo-container">
        {!imageError ? (
          <img
            src={brand.logo}
            alt={`Logo ${brand.name}`}
            className="brand-logo"
            onError={handleImageError}
          />
        ) : (
          <div className="brand-name-fallback">{brand.name}</div>
        )}
      </div>
    </div>
  );
};

export default BrandCard;
