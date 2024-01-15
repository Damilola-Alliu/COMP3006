import React, { useState, useEffect } from 'react';
import './Users.css';
import AdminSidebar from './components/AdminSidebar';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newUser, setNewUser] = useState({
        Name: '',
        Email: '',
        PhoneNumber: '',
        Password: '',
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/getusers');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleRemoveUser = async (_id) => {
        try {
           

            const confirmation = window.confirm('Are you sure you want to delete this user?');
    
            if (confirmation) {
                const response = await fetch(`http://localhost:3000/deleteusers/${_id}`, {
                    method: 'DELETE',
                });
    
                if (response.ok) {
                    fetchUsers(); // Fetch the updated user list after successful deletion
                } else {
                    console.error('Failed to delete user');
                }
            }
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };
    
    

    const filteredUsers = users.filter((user) =>
    user.Name?.toLowerCase().includes(searchTerm.toLowerCase())
);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const addUserToServer = async (userData) => {
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            if (response.ok) {
                console.log('User added successfully!');
                
            } else {
                console.error('Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };
    

    const handleAddUser = () => {
        try {
            // Perform validation here before adding the user
            // For simplicity, validation is not added in this example
            // You should add your own validation logic
            
            // Call the function to add user to server
            addUserToServer(newUser);
    
            // Clear the form and close the pop-up form
            setNewUser({
                Name: '',
                Email: '',
                PhoneNumber: '',
                Password: '',
            });
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };
    
    

    return (
        <div className="Users_page">
            <AdminSidebar />
            <div className="Users">
                <div className="button-container">
                    <button className="add-user-btn" onClick={() => setShowAddForm(true)}>
                        Add User +
                    </button>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search User..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="user-container">
                    {filteredUsers.map((user) => (
                        <div key={user._id} className="user-card">
                            <div>
                                <p>Email: {user.Email}</p>
                                <p>Name: {user.Name}</p>
                                <p>Phone Number: {user.PhoneNumber}</p>
                            </div>
                            <button onClick={() => handleRemoveUser(user._id)}>Delete User</button>
                        </div>
                    ))}
                </div>
                {showAddForm && (
    <div className="popup-form">
        <form>
            <input
                type="text"
                placeholder="Name"
                name="Name"
                value={newUser.Name}
                onChange={handleInputChange}
            />
            <input
                type="email"
                placeholder="Email"
                name="Email"
                value={newUser.Email}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Phone Number"
                name="PhoneNumber"
                value={newUser.PhoneNumber}
                onChange={handleInputChange}
            />
            <input
                type="password"
                placeholder="Password"
                name="Password"
                value={newUser.Password}
                onChange={handleInputChange}
            />
            <div className="button-group">
                <button type="button" onClick={handleAddUser} className='add-btn'>
                    Add
                </button>
                <button type="button" onClick={() => setShowAddForm(false)} className='cancel-btn'>
                    Cancel
                </button>
            </div>
        </form>
    </div>
)}

            </div>
        </div>
    );
};

export default Users;