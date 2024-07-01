import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/login', { email, password });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token); // Store token in localStorage
                navigate('/dashboard');             
            } else {

                setError('Login failed. Please try again.');
            }
        } catch (error) {
            setError('Login failed. Please try again.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-orange-600 text-4xl font-bold mb-4">BridgeHub</div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Login</CardTitle>
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
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                    {error && <p className="mt-4 text-red-600">{error}</p>}
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <a href="/signup" className="underline">
                            Sign up
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
