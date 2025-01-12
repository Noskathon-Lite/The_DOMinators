import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming `shadcn` Button component
import { useSelector, useDispatch } from 'react-redux';

export default function Navbar() {
  const navigate = useNavigate();

  // Get the authentication status from the Redux store
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const handleLogout = () => {
    // Dispatch the logout action from authSlice (this part should be implemented in your authSlice)
    navigate('/'); // Redirect to home or login page after logout
  };

  return (
    <header className="bg-white shadow-sm w-100">
      <div className="max-w-100 mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo and title */}
            <Leaf className="h-12 w-12 text-green-500" />
            <h1 className="text-3xl font-bold text-gray-900">ClimateGrow</h1>
          </div>
          
          {/* Navigation Links */}
          <div className="flex space-x-6 text-black">
          {/* {isAuthenticated && ( */
              <div className="flex space-x-4 text-black">
                <Link to="/home" className="text-lg font-semibold hover:text-green-600">Home</Link>
                <Link to="/dashboard" className="text-lg font-semibold hover:text-green-600">Dashboard</Link>
                <Link to="/prediction" className="text-lg font-semibold hover:text-green-600">Prediction</Link>
                <Link to="/recommendation" className="text-lg font-semibold hover:text-green-600">Recommendation</Link>
              </div>
            }
          </div>

          {/* Authentication Buttons */}
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Button variant="outline" onClick={() => navigate('/login')} className="flex items-center gap-1">
                  <LogIn className="h-4 w-4 text-white" />
                  Login
                </Button>
                <Button variant="outline" onClick={() => navigate('/signup')} className="flex items-center gap-1">
                  <UserPlus className="h-4 w-4" />
                  Signup
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-1">
                <LogOut className="h-4 w-4 text-red-500" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
