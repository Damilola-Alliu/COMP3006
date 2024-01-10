import React, { useState, useEffect } from "react";
import AdminSidebar from './components/AdminSidebar';
import './AllBooks.css'

const AllBooks = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [NewBook, setNewBook] = useState({
        Title: '',
        Author: '',
        ISBN: '',
        Description: '',
        Genre: '',
        PublicationYear: '',
        TotalCopies: '',
        AvailableCopies: ''
    });

    useEffect(() => {
        fetchBooks();
        
    }, []);

    const addBooksToServer = async (userData) => {
        try {
            const response = await fetch('http://localhost:3000/addbooks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            if (response.ok) {
                console.log('Book added successfully!');
                
            } else {
                console.error('Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleAddUser = () => {
        try {
            
            addBooksToServer(NewBook);
    
            
            setNewBook({
                
            });
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };


    const handleRemoveBook = (bookTitle) => {
        const confirmDelete = window.confirm(`Are you sure you want to remove the book "${bookTitle}" from the library?`);
        
        if (confirmDelete) {
            // If user confirms, proceed with deletion
            // Add logic here to delete the book from the database
            // You can use fetch or any library to send a DELETE request to your backend
            
            // Example of fetch DELETE request (replace URL with your endpoint)
            fetch(`http://localhost:3000/books/${bookTitle}`, {
                method: 'DELETE',
            })
            .then((response) => {
                if (response.ok) {
                    console.log(`Book "${bookTitle}" removed successfully`);
                    // After successful deletion, fetch books again to update the list
                    fetchBooks();
                } else {
                    console.error(`Failed to remove book "${bookTitle}"`);
                }
            })
            .catch((error) => {
                console.error('Error deleting book:', error);
            });
        }
        
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
                        Add Book +
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
                                <p><b>Author:</b> {book.Author}</p>
                                <p><b>ISBN:</b> {book.ISBN}</p>
                                <p><b>Description:</b> {book.Description}</p>
                                <p><b>Genre:</b> {book.Genre}</p>
                                <p><b>Publication Year:</b> {book.PublicationYear}</p>
                                <p><b>Total Copies:</b> {book.TotalCopies}</p>
                                <p><b>Available Copies:</b> {book.AvailableCopies}</p>
                                <br />
                                <button onClick={() => handleRemoveBook(book.Title)}>Remove book from library</button>
                                
                                
                            </div>
                        </div>
                    ))}
                </div>
                {showAddForm && (
    <div className="popup-form">
        <form>
            <input
                type="text"
                placeholder="Book Title..."
                name="Title"
                value={NewBook.Title}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Author"
                name="Author"
                value={NewBook.Author}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="ISBN"
                name="ISBN"
                value={NewBook.ISBN}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Description"
                name="Description"
                value={NewBook.Description}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Genre"
                name="Genre"
                value={NewBook.Genre}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Publication Year"
                name="PublicationYear"
                value={NewBook.PublicationYear}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Total Copies"
                name="TotalCopies"
                value={NewBook.TotalCopies}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Available Copies"
                name="AvailableCopies"
                value={NewBook.AvailableCopies}
                onChange={handleInputChange}
            />
            <div className="button-group">
                <button type="button" onClick={handleAddUser} className='add-btn'>
                    Add Book
                </button>
                <button type="button" onClick={() => setShowAddForm(false)} className='cancel-btn'>
                    Cancel
                </button>
            </div>
        </form>
    </div>
)}
            </div>
        </div>
    )
}

export default AllBooks;