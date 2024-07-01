import React, { useEffect } from 'react';

const Dashboard: React.FC = () => {
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            window.location.href = '/login'; 
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        window.location.href = '/login';     };

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
