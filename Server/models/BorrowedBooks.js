const mongoose = require('mongoose');

const borrowedBooksSchema = new mongoose.Schema({
  BookName: String,
  userEmail: String,
  BorrowDate: Date,
  DueDate: Date,
  ReturnDate: Date,
});

const BorrowedBooksModel = mongoose.model('BorrowedBooks', borrowedBooksSchema);

module.exports = BorrowedBooksModel;
