import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login:', { email, password });
    navigate('/home'); // Redirect to home on successful login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br bg-black">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg text-4xl">
        <CardHeader>
          <CardTitle className="text-green-700 text-3xl">Welcome Back!</CardTitle>
          <CardDescription className="text-gray-600">Log in to explore ClimateGrow's features.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4"
          >
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
              Log In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don’t have an account?{' '}
              <Button
                variant="link"
                className="text-green-600 hover:text-green-800"
                onClick={() => navigate('/register')}
              >
                Create an account
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
