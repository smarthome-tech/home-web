import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Landing from './Components/Landing';
import LandingProducts from './Components/LandingProducts';
import ProductDetails from './Components/ProductDetails';
import Products from './Components/Products';
import Contact from './Components/Contact';
import Basket from './Components/Basket';
import About from './Components/About';
import Trust from './Components/Trust'; // ADD THIS

// Home page component
function HomePage() {
  return (
    <>
      <Landing />
      <LandingProducts />
      <Trust /> {/* ADD THIS */}
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <Routes>
          {/* Home page - shows Landing and Products */}
          <Route path="/" element={<HomePage />} />
          {/* Product details page */}
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* Products page with filters */}
          <Route path="/products" element={<Products />} />
          {/* Contact page */}
          <Route path="/contact" element={<Contact />} />
          {/* Basket page */}
          <Route path="/basket" element={<Basket />} />
          {/* About page */}
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;