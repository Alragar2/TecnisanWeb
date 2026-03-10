import React from 'react';

const Features = () => {
  const featuresList = [
    {
      title: 'Feature One',
      description: 'Description of feature one.',
      icon: '🔧',
    },
    {
      title: 'Feature Two',
      description: 'Description of feature two.',
      icon: '🚀',
    },
    {
      title: 'Feature Three',
      description: 'Description of feature three.',
      icon: '🌟',
    },
  ];

  return (
    <section id="features" className="features">
      <h2>Nuestras Características</h2>
      <div className="features-list">
        {featuresList.map((feature, index) => (
          <div key={index} className="feature-item">
            <span className="feature-icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;