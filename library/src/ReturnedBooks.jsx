import React from "react";
import Sidebar from "./components/sidebar";
import './ReturnedBooks.css'

const ReturnedBooks = () => {
    return(
        <div className="returned_books_page">
            <Sidebar />
            <div className="returned_books">
                <h1>This is the Returned Books page!</h1>
            </div>
        </div>
    )
}

export default ReturnedBooks;