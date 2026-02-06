import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Landing from './Components/Landing';
import LandingProducts from './Components/LandingProducts';
import ProductDetails from './Components/ProductDetails';

// Home page component
function HomePage() {
  return (
    <>
      <Landing />
      <LandingProducts />
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
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;