import React from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Hero from './components/sections/Hero';
import Brands from './components/sections/Brands';
import AllBrands from './components/sections/AllBrands';
import About from './components/sections/About';
import FAQ from './components/sections/FAQ';
import Contact from './components/sections/Contact';

const App = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Brands />
      <AllBrands />
      <About />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;