const mongoose = require('mongoose');

const BorrowedBooksSchema = new mongoose.Schema({
    BookName: {
        type: String, 
    },
    userEmail: {
        type: String,
    },
    BorrowDate: Date,
    DueDate: Date,
    ReturnDate: Date,
});

const BorrowedBooksModel = mongoose.model("BorrowedBooks", BorrowedBooksSchema);
module.exports = BorrowedBooksModel;