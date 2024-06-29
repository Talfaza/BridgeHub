import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

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
                navigate('/dashboard')
                console.log('Login successful');
            }
        } catch (error) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Log In</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
