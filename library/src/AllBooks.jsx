import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';

const AllBooks = () => {
    return(
        <div className="AllBooks_Page">
    <AdminSidebar />
    <div className="AllBooks">
        <h1>Books page</h1>
    </div>
</div>
    )
}

export default AllBooks;