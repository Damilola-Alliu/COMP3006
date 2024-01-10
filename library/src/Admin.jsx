import React, { useEffect, useState } from 'react';
import './Admin.css'
import AdminSidebar from './components/AdminSidebar'

const Admin = () => {

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
        <div className="Admin_page">
    <AdminSidebar />
    <div className="Admin">
        
            <h1>Hello {userName}!</h1>
        
    </div>
</div>
    )
}

export default Admin;