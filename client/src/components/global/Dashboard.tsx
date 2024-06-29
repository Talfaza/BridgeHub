import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const Dashboard: React.FC = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return null;     }

    return (
        <div>
            <h1>Hello Dash</h1>
           
            <Button variant="outline">Edit Profile</Button>
           
            <p>Edit your profile here.</p>
        </div>
    );
};
