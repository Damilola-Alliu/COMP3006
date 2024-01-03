const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
    Title: { type: String, unique: true },
    Author: String,
    ISBN: String,
    Description: String,
    Genre: String,
    PublicationYear: Number,
    CoverImage: String,
    TotalCopies: Number,
    AvailableCopies: Number,
    BorrowedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});

const BooksModel = mongoose.model("Books", BooksSchema);
module.exports = BooksModel;



