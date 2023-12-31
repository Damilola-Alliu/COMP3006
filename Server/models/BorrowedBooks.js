const mongoose = require('mongoose');

const BorrowedBooksSchema = new mongoose.Schema({
    BorrowedID: Number,
    BookID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books'
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    BorrowDate: Date,
    DueDate: Date,
    ReturnDate: Date,
    FineAmount: String
});

const BorrowedBooksModel = mongoose.model("BorrowedBooks", BorrowedBooksSchema);
module.exports = BorrowedBooksModel;
