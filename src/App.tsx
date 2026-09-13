import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import BookCards from './components/BookCards/BookCards';
import StaysSection from './components/StaysSection/StaysSection';
import Amenities from './components/Amenities/Amenities';
import WhyUsSection from './components/WhyUsSection/WhyUsSection';
import ContactSection from './components/ContactSection/ContactSection';
import WhatsAppCTA from './components/WhatsAppCTA/WhatsAppCTA';
import Footer from './components/Footer/Footer';
import CheckAvailability from './components/CheckAvailability/CheckAvailability';
import styles from './App.module.scss';

const HomePage: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <Navbar />
      <Hero />
      <BookCards />
      <StaysSection />
      <Amenities />
      <WhyUsSection />
      <ContactSection />
      <WhatsAppCTA />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/check-availability" element={<CheckAvailability />} />
      </Routes>
    </Router>
  );
}

export default App;
