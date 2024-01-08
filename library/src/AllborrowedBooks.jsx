import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';

const AllborrowedBooks = () => {
    return(
        <div className="AllborrowedBooks_page">
    <AdminSidebar />
    <div className="AllborrowedBooks">
        <h1>All Borrowed Books page</h1>
    </div>
</div>
    )
}

export default AllborrowedBooks;