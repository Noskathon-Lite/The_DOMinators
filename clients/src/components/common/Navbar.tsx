import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming `shadcn` Button component
import { useSelector } from 'react-redux';

export default function Navbar() {
  const navigate = useNavigate(); // Use the useNavigate hook for navigation
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user1 = sessionStorage.getItem('isAuthenticated');

  useEffect(() => {
    console.log(user1);
  }, [user1]);

  const handleLogout = () => {
    // Clear session storage and navigate to landing
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole'); // Also remove user role if stored
    navigate('/landing'); // Use navigate instead of Navigate component
  };

  return (
    <header className="bg-white shadow-sm w-full">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/home')}>
            {/* Logo and title */}
            <Leaf className="h-12 w-12 text-green-500" />
            <h1 className="text-3xl font-bold text-gray-900">ClimateGrow</h1>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 flex justify-between">
          <div className="flex space-x-6 text-black">
            {(isAuthenticated || user1) && (
              <div className="flex space-x-4 text-black">
                <Link to="/home" className="text-lg font-semibold hover:text-green-600">Home</Link>
                <Link to="/dashboard" className="text-lg font-semibold hover:text-green-600">Dashboard</Link>
                <Link to="/prediction" className="text-lg font-semibold hover:text-green-600">Prediction</Link>
                <Link to="/recommendation" className="text-lg font-semibold hover:text-green-600">Recommendation</Link>
              </div>
            )}
          </div>

          {/* Authentication Buttons */}
          <div className="flex items-center gap-4">
            {!(isAuthenticated || user1) ? (
              <>
                <Button variant="outline" onClick={() => navigate('/auth/login')} className="flex items-center gap-1 bg-gray-400 border-none rounded-full">
                  <LogIn className="h-4 w-4 text-white" />
                  Login
                </Button>
                <Button variant="outline" onClick={() => navigate('/auth/register')} className="flex items-center gap-1 bg-gray-400 border-none rounded-full">
                  <UserPlus className="h-4 w-4" />
                  Signup
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-1 bg-white rounded-full hover:bg-gray-100">
                <LogOut className="h-4 w-4 text-black  " />
              </Button>
            )}
          </div>
          </div>
        </div>
      </div>
    </header>
  );
}
