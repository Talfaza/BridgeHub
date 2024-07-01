import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const Dashboard: React.FC = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <nav className="sticky top-0 z-10 bg-white shadow-md">
                <div className="max-w-19xl mx-auto px-4"> 
                    <div className="flex items-center justify-between h-16">
                        <span className="text-2xl text-orange-600 font-semibold">BridgeHub</span>
                       
                        <Button onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Dashboard;
