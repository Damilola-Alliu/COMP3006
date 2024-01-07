import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import './BorrowedBooks.css'; 

const BorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetchBorrowedBooks();
    }, []);

    const getUserEmail = async () => {
        try {
          const token = localStorage.getItem('token');
      
          if (token) {
            const response = await fetch('http://localhost:3000/profile', {
              method: 'GET',
              headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
              }
            });
      
            if (response.ok) {
              const userData = await response.json();
              return userData.email;
            } else {
              console.error('Failed to fetch user email');
              return null;
            }
          } else {
            console.error('Token not found');
            return null;
          }
        } catch (error) {
          console.error('Error fetching user email:', error);
          return null;
        }
      };
      
      const fetchBorrowedBooks = async () => {
        try {
          const userEmail = await getUserEmail();
      
          if (!userEmail) {
            console.error('User email not available');
            return;
          }
      
          const token = localStorage.getItem('token');
          const url = `http://localhost:3000/borrowed-books?userEmail=${encodeURIComponent(userEmail)}`;
      
          const borrowedBooksResponse = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
      
          if (borrowedBooksResponse.ok) {
            const borrowedBooksData = await borrowedBooksResponse.json();
            const books = borrowedBooksData.borrowedBooks;
      
            if (books && books.length > 0 && books[0].userEmail) {
              setBorrowedBooks(books);
              console.log('User Email:', books[0].userEmail);
            } else {
              console.error('No borrowed books found or missing userEmail property');
            }
          } else {
            console.error('Failed to fetch borrowed books');
          }
        } catch (error) {
          console.error('Error fetching borrowed books:', error);
        } finally {
          setLoading(false);
        }
      };
      
      
      
      
      

    return (
        <div className="borrowedbooks_page">
            <Sidebar />
            <div className="borrowedbooks_container">
                <h1>Borrowed Books</h1>
                <div className="book_list">
                    {loading ? ( 
                        <p>Loading...</p>
                    ) : (
                        borrowedBooks.length > 0 ? ( 
                            borrowedBooks.map(book => (
                                <div key={book.BookID} className="book_item_container">
                                    <div className="book_item">
                                        <img src={book.CoverImage} alt={book.Title} />
                                        <h3>{book.Title}</h3>
                                        <p>Author: {book.Author}</p>
                                        <p>ISBN: {book.ISBN}</p>
                                        <p>Description: {book.Description}</p>
                                        <p>Genre: {book.Genre}</p>
                                        <p>Publication Year: {book.PublicationYear}</p>
                                        
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No borrowed books</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default BorrowedBooks;
