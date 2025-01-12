import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';  // Import useDispatch and useSelector
import { registerUser } from '../../store/authSlice/index'; // Import login action


import { RootState } from '@/store';  // Import RootState for type checking

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  

  const handleRegister = () => {
   
    const formData = {name, email, password };
    dispatch(registerUser(formData));  // Dispatch the registerUser async action

    if (isAuthenticated) {
      navigate('/login'); // Redirect to login page after successful registration
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br bg-black">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-green-700 text-3xl">Create an Account</CardTitle>
          <CardDescription className="text-gray-600">
            Join ClimateGrow and explore a greener future!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            className="space-y-4"
          >
            <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <Input
                        type="name"
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
        
            <Button
              type="submit"
              variant="default"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
             
            >
              {isLoading ? 'Register' : 'Registerin....'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Button
                variant="link"
                className="text-green-600 hover:text-green-800"
                onClick={() => navigate('/login')}
              >
                Log in
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
