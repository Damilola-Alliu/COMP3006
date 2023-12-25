import React from "react";
import Sidebar from "./components/sidebar";
import './Books.css'

const Books = () => {
    return(
        <div className="books_page">
            <Sidebar />
            <div className="books_container">
                <h1>This is the books page!</h1>
            </div>
        </div>
    )
}

export default Books;