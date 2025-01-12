import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming `shadcn` Button component

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm w-100 ">
      <div className="max-w-100 mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Increased size of logo and moved to the left */}
            <Leaf className="h-12 w-12 text-green-500" />
            <h1 className="text-3xl font-bold text-gray-900">ClimateGrow</h1>
          </div>
          <div className="flex items-center  gap-4">
            <Button variant="outline" onClick={() => navigate('/login')} className="flex items-center gap-1">
              <LogIn className="h-4 w-4 text-white" />
              Login
            </Button>
            <Button variant="outline" onClick={() => navigate('/signup')} className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              Signup
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
