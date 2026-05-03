import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Smartphones from './pages/Smartphones';
import Laptops from './pages/Laptops';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';

export default function App() {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/smartphones" element={<Smartphones />} />
            <Route path="/laptops" element={<Laptops />} />
            <Route path="/smartphone/:id" element={<ProductDetail />} />
            <Route path="/laptop/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
