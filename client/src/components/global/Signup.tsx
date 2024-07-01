import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import AlertSignUp from './notifications/AlertSignUp';
import AlertSignUpError from './notifications/AlertSignupError';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        email,
        username,
        password,
      });
      if (response.status === 200) {
        setSuccessMessage('Signup successful. You can now login.');
        setShowAlert(true);
        setTimeout(() => navigate('/login'), 500);
      }
    } catch (error) {
      setError('Email Already Used. Please use a new one!');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center text-orange-500 text-3xl font-bold mb-4">
        BridgeHub
      </div>
      {showAlert && <AlertSignUp message={successMessage} />}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>
          {error && <AlertSignUpError message={error} />}
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <a href="/login" className="underline">
              Login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
