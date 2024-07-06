import React, { useState } from 'react';
import axios from '../axiosConfig'; // Use the configured axios instance

const Dashboard: React.FC = () => {
    const [name, setName] = useState('');
    const [hostname, setHostname] = useState('');
    const [ipAdresse, setIpAdresse] = useState('');
    const [password, setPassword] = useState('');

    const handleAddServer = async () => {
        try {
            const userId = parseInt(localStorage.getItem('userId') || '0', 10);
            if (userId === 0) {
                throw new Error("Invalid user ID");
            }

            await axios.post('/api/addserver', {
                name,
                hostname,
                ipAdresse,
                password,
                userId,
            });
            alert('Server added successfully');
        } catch (error) {
            console.error('There was an error adding the server!', error);
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Hostname"
                value={hostname}
                onChange={(e) => setHostname(e.target.value)}
            />
            <input
                type="text"
                placeholder="IP Address"
                value={ipAdresse}
                onChange={(e) => setIpAdresse(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleAddServer}>Add Server</button>
        </div>
    );
};

export default Dashboard;
