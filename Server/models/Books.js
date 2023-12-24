const mongoose = require('mongoose')

const BooksSchema = new mongoose.Schema({
    BookID: Number,
    Title: String,
    Authour: String,
    ISBN: String,
    Description: String,
    Genre: String,
    PublicationYear: Number,
    CoverImage: String,
    TotalCopies: Number,
    AvailableCopies: Number
})

const BooksModel = mongoose.model("Books", BooksSchema)
module.exports = BooksModel