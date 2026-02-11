import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Landing from './Components/Landing';
import ProductDetails from './Components/ProductDetails';
import Products from './Components/Products';
import Contact from './Components/Contact';
import Basket from './Components/Basket';
import About from './Components/About';
import Order from './Components/Order';
import Services from './Components/Services';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Scroll immediately
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Multiple backup attempts
    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    });

    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    }, 0);

    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    }, 10);

    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    }, 50);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/about" element={<About />} />
          <Route path="/order" element={<Order />} />
          <Route path="/services" element={<Services />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;