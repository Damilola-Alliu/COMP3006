import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';

const Users = () => {
    return(
        <div className="Users_page">
    <AdminSidebar />
    <div className="Users">
        <h1>Users Page</h1>
    </div>
</div>
    )
}

export default Users;