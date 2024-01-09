import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import './AdminProfile.css'

const Adminprofile = () => {
    return(
        <div className="AdminProfile_page">
        <AdminSidebar />
        <div className="AdminProfile">
            <h1>Admins' Profile Page</h1>
        </div>
    </div>
    )
}

export default Adminprofile;