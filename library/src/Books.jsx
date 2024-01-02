import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import './Books.css';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [borrowDate, setBorrowDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [selectedBookID, setSelectedBookID] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

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

    const handleBorrowBook = (bookID) => {
        setSelectedBookID(bookID);
        setShowForm(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/borrow-book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookID: selectedBookID,
                    borrowDate,
                    returnDate,
                    
                }),
            });

            if (response.ok) {
                setShowForm(false);
                fetchBooks();
            } else {
                console.error('Failed to borrow book');
            }
        } catch (error) {
            console.error('Error borrowing book:', error);
        }
    };

    const filteredBooks = books.filter(book =>
        book.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="books_page">
            <Sidebar />
            <div className="books_container">
                <h1>Books</h1>
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
                            <img src={book.CoverImage} alt={book.Title} />
                                <h3>{book.Title}</h3>
                                <p>Author: {book.Author}</p>
                                <p>ISBN: {book.ISBN}</p>
                                <p>Description: {book.Description}</p>
                                <p>Genre: {book.Genre}</p>
                                <p>Publication Year: {book.PublicationYear}</p>
                                <p>Total Copies: {book.TotalCopies}</p>
                                <p>Available Copies: {book.AvailableCopies}</p>
                                <br />
                                <button onClick={() => handleBorrowBook(book.BookID)}>Borrow Book</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showForm && (
    <div className="popup_overlay">
        <div className={`popup_form ${showForm ? 'show' : ''}`}>
            <button className="closeButton" onClick={() => setShowForm(false)}>X</button>
            <form onSubmit={handleFormSubmit}>
            <label htmlFor="borrowDate">Borrow Date:</label>
                            <input
                                type="date"
                                id="borrowDate"
                                value={borrowDate}
                                onChange={(e) => setBorrowDate(e.target.value)}
                                required
                            />

                            <br />
                            <br />

                            <label htmlFor="returnDate">Intended Return Date:</label>
                            <input
                                type="date"
                                id="returnDate"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                                required
                            />

                            <br />
                            <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
)}
        </div>
    );
};

export default Books;