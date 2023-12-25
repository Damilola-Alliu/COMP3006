import React from "react";
import Sidebar from "./components/sidebar";
import { useNavigate } from "react-router-dom";
import './Profile.css'

const Profile = () => {
    return (
        <div className="profile-page">
            <Sidebar />
            <div className="profile_container">
                <h1>This is the profile page!</h1>
            </div>
        </div>
    );
};

export default Profile;