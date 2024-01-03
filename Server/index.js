const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const secretKey = 'SecretKey'; 
const BooksModel = require('./models/Books'); 
const BorrowedBooksModel = require('./models/BorrowedBooks')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/COMP3006db")


// app.get('/getUsers', (req, res) => {
//     UserModel.find()
//     .then(users => res.json(users))
//     .catch(err => res.join(err))
// })

require("./models/Users")

const User = mongoose.model("Users")
const Books = mongoose.model("Books")
const BorrowedBooks = mongoose.model("BorrowedBooks")

app.post("/register", async(req, res) => {
    const{  Password, Email, Name, PhoneNumber } = req.body;

    const encryptPassword = await bcrypt.hash(Password, 10)

    try {

        const olduser = await User.findOne({ Email })

        if(olduser){
            return res.send({error: "User Already Exists"});
        }

        await User.create({
            Password: encryptPassword,
            Email,
            Name,
            PhoneNumber,
        });
        res.send({status: "ok"})
    } catch (error) {
        res.send({status: "error"})
    }
})

app.post('/', async (req, res) => {
    const { Email, Password } = req.body;
  
    const user = await User.findOne({ Email });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    const validPassword = await bcrypt.compare(Password, user.Password);
  
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
  
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
  });

  app.get('/profile', async (req, res) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(403).json({ message: 'Token is required!' });
    }
  
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token!' });
      }
  
      const userId = decoded.userId;
  
      try {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.json({
          userId: user._id,
          email: user.Email,
          name: user.Name,
          phoneNumber: user.PhoneNumber,
        });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching user data' });
      }
    });
  });

  app.get('/books', async (req, res) => {
    try {
        const books = await BooksModel.find();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
});
;
  

  app.post('/books', async (req, res) => {
    try {
      // Destructure book details from the request body
      const { Title, Author, ISBN, Description, Genre, PublicationYear, CoverImage, TotalCopies, AvailableCopies, BorrowedBy } = req.body;
  
      // Create a new book instance using the Books model
      const newBook = new BooksModel({
        Title,
        Author,
        ISBN,
        Description,
        Genre,
        PublicationYear,
        CoverImage,
        TotalCopies,
        AvailableCopies,
        BorrowedBy
      });
  
      // Save the new book to the database
      await newBook.save();
  
      res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
      res.status(500).json({ message: 'Error creating book', error: error.message });
    }
  });
  
  
  app.post('/borrow-book', async (req, res) => {
    const { bookName, borrowDate, returnDate } = req.body;
    const token = req.headers.authorization;

    try {
        if (!token) {
            return res.status(403).json({ message: 'Token is required!' });
        }

        // Verify and decode the JWT token to extract user information
        const decodedToken = jwt.verify(token.split(' ')[1], secretKey);
        const userEmail = decodedToken.Email; // Extract user's email from the decoded token

        // Create a new entry in BorrowedBooks collection
        const newBorrowedBook = new BorrowedBooksModel({
            BookName: bookName, // Use the bookName received from the frontend
            userEmail: userEmail,
            BorrowDate: borrowDate,
            DueDate: returnDate,
            ReturnDate: null,
        });

        await newBorrowedBook.save();

        // Update the available copies count in the Books collection
        // This part will need to be adjusted to find the book by name instead of ID
        const borrowedBook = await BooksModel.findOne({ Title: bookName });
        if (borrowedBook) {
            borrowedBook.AvailableCopies -= 1;
            await borrowedBook.save();
        }

        res.status(200).json({ message: 'Book borrowed successfully!' });
    } catch (error) {
        console.error('Error borrowing book:', error);
        res.status(500).json({ error: 'Failed to borrow book' });
    }
});





app.listen(3000, () => {
    console.log("Server is running")
})