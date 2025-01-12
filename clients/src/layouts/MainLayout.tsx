import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';

import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import LandingPage from '@/pages/Landing';
import Prediction from '@/pages/Prediction';
import SeasonalVegetable from '@/pages/SesonalVegetable';
import { Routes, Route } from 'react-router-dom';





export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
     
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/landing" element={<LandingPage />} >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          </Route>
         
          {/* Authenticated Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/recommendation" element={<SeasonalVegetable />} />
        </Routes>
      </main>
     
    </div>
  );
}
