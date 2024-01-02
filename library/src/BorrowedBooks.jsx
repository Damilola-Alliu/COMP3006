import React from "react";
import Sidebar from "./components/sidebar";

const BorrowedBooks = () => {
    return(
        <div className="borrowedbooks_page">
            <Sidebar />
            <div className="borrowedbooks">
                <h1>This is the Borrowed Books page!</h1>
            </div>
        </div>
    )
}

export default BorrowedBooks;