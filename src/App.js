import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import About from './components/About';
import Catalog from './components/Catalog';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <Features />
      <About />
      <Catalog />
      <Testimonials />
      <Pricing />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;