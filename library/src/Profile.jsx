import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import './Profile.css';

const Profile = () => {
    const [isEditPictureModalOpen, setEditPictureModalOpen] = useState(false);
    const [userData, setUserData] = useState({ name: 'N/A', phoneNumber: 'N/A', email: 'N/A' });
    const [editData, setEditData] = useState({ name: '', phoneNumber: '', email: '' }); 

    useEffect(() => {
        
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token'); 

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
                        
                        console.error('Failed to fetch user data');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData(); 
    }, []);

    
    const handleEditInfo = () => {
        
        setEditData({ name: userData.name, phoneNumber: userData.phoneNumber, email: userData.email });
        setEditPictureModalOpen(true);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await fetch('http://localhost:3000/profile', {
                    method: 'PUT',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(editData)
                });

                if (response.ok) {
                    const updatedUserData = await response.json();
                    setUserData(updatedUserData);
                    setEditPictureModalOpen(false);
                } else {
                    console.error('Failed to update user data');
                }
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
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
                </div>

               
                {isEditPictureModalOpen && (
                    <div className="edit-modal">
                        <h3>Edit Info</h3>
                        
                        <label>Phone Number:</label>
                        <input type="text" name="phoneNumber" value={editData.phoneNumber} onChange={handleInputChange} />
                        <button onClick={handleSaveChanges}>Save Changes</button>
                        <br />
                        <button onClick={() => setEditPictureModalOpen(false)}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
