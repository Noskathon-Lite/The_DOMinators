import { Routes, Route } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import Home from '../pages/Home';
import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import Prediction from '../pages/Prediction';
import Contact from '../pages/Contact';
import SeasonalVegetable from '@/pages/SesonalVegetable';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/seasonal" element={<SeasonalVegetable />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}