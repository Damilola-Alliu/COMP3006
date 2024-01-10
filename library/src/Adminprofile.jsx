import React, { useState, useEffect } from "react";
import AdminSidebar from './components/AdminSidebar';
import './AdminProfile.css'

const Adminprofile = () => {
    const [userData, setUserData] = useState({ name: 'N/A', phoneNumber: 'N/A', email: 'N/A' });
    const [editData, setEditData] = useState({ name: '', phoneNumber: '', email: '' }); 

    const [isEditPictureModalOpen, setEditPictureModalOpen] = useState(false);

    useEffect(() => {
        
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

    

    return(
        <div className="AdminProfile_page">
        <AdminSidebar />
        <div className="AdminProfile">
            <h1>Admins' Profile Page</h1>
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
                        <label> Email </label>
                        <input type="text" name="email" value={editData.email} onChange={handleInputChange} />
                        <label>Phone Number:</label>
                        <input type="text" name="phoneNumber" value={editData.phoneNumber} onChange={handleInputChange} />
                        <button onClick={handleSaveChanges}>Save Changes</button>
                        <br />
                        <button onClick={() => setEditPictureModalOpen(false)}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    </div>
    )
}

export default Adminprofile;