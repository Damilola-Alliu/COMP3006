import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import './Profile.css';

const Profile = () => {
    const [isEditPictureModalOpen, setEditPictureModalOpen] = useState(false);
    const [userData, setUserData] = useState({ name: 'N/A', phoneNumber: 'N/A', email: 'N/A' });

    useEffect(() => {
        // Function to fetch user data from the server
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the JWT token from localStorage

                if (token) {
                    const response = await fetch('http://localhost:3000/profile', {
                        method: 'GET',
                        headers: {
                            'Authorization': token, // Send the token in the Authorization header
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const userDataFromServer = await response.json();
                        setUserData(userDataFromServer);
                    } else {
                        // Handle server response if not successful
                        console.error('Failed to fetch user data');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData(); // Call the function to fetch user data
    }, []);

    const handleEditPicture = () => {
        setEditPictureModalOpen(true);
    };

    const handleEditInfo = () => {
        // Logic to edit user info
    };

    return (
        <div className="profile-page">
            <Sidebar />
            <div className="content">
                <div className="profile-container">
                    
                    <h2>{userData.name}</h2>
                    <p>Email: {userData.email}</p>
                    <p>Phone Number: {userData.phoneNumber}</p>
                    <button className="edit-info-button" onClick={handleEditInfo}>Edit Info</button>
                    {/* Additional profile details here */}
                </div>
            </div>

            {isEditPictureModalOpen && (
                <div className="edit-picture-modal">
                    <p>Profile Picture Edit Form</p>
                    {/* Form elements to edit the profile picture */}
                    <button onClick={() => setEditPictureModalOpen(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default Profile;