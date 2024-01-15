import React, { useState, useEffect } from "react";
import AdminSidebar from './components/AdminSidebar';
import './AllborrowedBooks.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3000/borrowedbooks/${encodeURIComponent(selectedBook.BookName)}'); 


const AllborrowedBooks = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [returnDate, setReturnDate] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchBorrowedBooks();
    }, []);

    const fetchBorrowedBooks = async () => {
        try {
            const response = await fetch('http://localhost:3000/AdminBorrowedBooks');
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched data:', data);
                setBorrowedBooks(data);
                console.log('State after setting data:', borrowedBooks);
            } else {
                console.error('Failed to fetch borrowed books');
            }
        } catch (error) {
            console.error('Error fetching borrowed books:', error);
        }
    };
    

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredBooks = borrowedBooks.filter(book =>
        book.BookName && book.BookName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

      const handleReturnBook = (book) => {
        setSelectedBook(book);
        setShowPopup(true);
       
    };

    
const handleConfirmReturn = async () => {
    try {
        const response = await fetch(`http://localhost:3000/borrowedbooks/${encodeURIComponent(selectedBook.BookName)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ReturnDate: returnDate }),
        });

        if (response.ok) {
            console.log('Return date updated successfully!');
            setShowPopup(false);

            socket.emit('confirm return', selectedBook.BookName);

            fetchBorrowedBooks();
        } else {
            console.error('Failed to update return date');
        }
    } catch (error) {
        console.error('Error updating return date:', error);
    }
};

    
useEffect(() => {
    socket.on('return confirmation', ({ bookName, confirmation }) => {
      if (confirmation) {
        console.log(`Return confirmed for book: ${bookName}`);
        // You can add any additional logic here based on the confirmation
      }
    });

    return () => {
        socket.disconnect();
      };
    }, []);
    
    
    return (
        <div className="AllBorrowedBooks_Page">
            <AdminSidebar />
            <div className="AllBorrowedBooks">
                <h1>Borrowed Books</h1>
                <input
                    type="text"
                    placeholder="Search for books..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search_input"
                />
                <div className="books_list">
                    {filteredBooks.map(book => (
                        <div key={book._id} className="book_item_container">
                            <div className="book_item">
                                <h3>{book.BookName}</h3>
                                <p><b>Borrow Date:</b> {formatDate(book.BorrowDate)}</p>
                                <p><b>Due Date:</b> {formatDate(book.DueDate)}</p>
                                <p><b>Email:</b> {book.userEmail}</p>
                                {book.ReturnDate ? (
                                    <p><b>Book has been returned!</b></p>
                                ) : (
                                    <div>
                                        <p><b>Return Date:</b> {book.ReturnDate}</p>
                                        <p><b>Email:</b> {book.userEmail}</p>
                                        <br />
                                        <button onClick={() => handleReturnBook(book)}>Confirm Return</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                
                {showPopup && (
                <div className="popup-container">
                    <div className="popup">
                        <label>
                            Return Date:
                            <input
                                type="date"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                            />
                        </label>
                        <button onClick={handleConfirmReturn}>Confirm</button>
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}
                
            </div>
            
        </div>
    );
};

export default AllborrowedBooks;