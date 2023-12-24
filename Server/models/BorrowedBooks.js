const mongoose = require('mongoose')

const BorrowedBooksSchema = new mongoose.Schema({
    BorrowedID: Number,
    BookID: Number,
    UserID: Number,
    BorrowDate: Date,
    DueDate: Date,
    ReturnDate: Date,
    FineAmount: String
})

const BorrowedBooksModel = mongoose.model("BorrowedBooks", BorrowedBooksSchema)
module.exports = BorrowedBooksModel