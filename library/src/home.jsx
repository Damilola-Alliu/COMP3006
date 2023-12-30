import React, { useEffect, useState } from 'react';
import './home.css';
import Sidebar from './components/sidebar';

const Home = () => {
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token) {
                    const response = await fetch('http://localhost:3000/profile', {
                        method: 'GET',
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setUserName(userData.name);
                    } else {
                        console.error('Failed to fetch user data');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return(
        <div className="home_page">
            <Sidebar />
            <div className="home_container">
                <h1>Hello {userName}!</h1>
            </div>
        </div>
    )
};

export default Home;
