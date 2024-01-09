import React, { useState, useEffect } from "react";
import AdminSidebar from './components/AdminSidebar';
import './AllBooks.css'

const AllBooks = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetchBooks();
        
    }, []);

    const handleAddUser = () => {
        try {
            // Perform validation here before adding the user
            // For simplicity, validation is not added in this example
            // You should add your own validation logic
            
            // Call the function to add user to server
            addUserToServer(newUser);
    
            // Clear the form and close the pop-up form
            setNewUser({
                
            });
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };


    const handleRemoveBook = (bookName) => {
        
    };

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:3000/books');
            if (response.ok) {
                const data = await response.json();
                setBooks(data);
            } else {
                console.error('Failed to fetch books');
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredBooks = books.filter(book =>
        book.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        <div className="AllBooks_Page">
    <AdminSidebar />
    <div className="AllBooks">
                <h1>Books</h1>
                <div className="button-container">
                    <button className="add-user-btn" onClick={() => setShowAddForm(true)}>
                        Add User +
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Search for books..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search_input"
                />
                <div className="books_list">
                    {filteredBooks.map(book => (
                        <div key={book.BookID} className="book_item_container">
                            <div className="book_item">
                           
                                <h3>{book.Title}</h3>
                                <p>Author: {book.Author}</p>
                                <p>ISBN: {book.ISBN}</p>
                                <p>Description: {book.Description}</p>
                                <p>Genre: {book.Genre}</p>
                                <p>Publication Year: {book.PublicationYear}</p>
                                <p>Total Copies: {book.TotalCopies}</p>
                                <p>Available Copies: {book.AvailableCopies}</p>
                                <br />
                                <button onClick={() => handleRemoveBook(book.Title)}>Remove book from library</button>
                                
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllBooks;