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

app.get('/getusers', async (req, res) => {
  try {
    const users = await UserModel.find({isAdmin: false}); // Retrieve all users from the database
    console.log(users)
    res.status(200).json(users); // Send the retrieved users as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
});

// POST endpoint to create a new user
app.post('/addusers', async (req, res) => {
  try {
      // Set isAdmin to false by default in the request body if it's not provided
      const userData = {
          ...req.body,
          isAdmin: req.body.isAdmin || false,
      };

      const newUser = await UserModel.create(userData);
      res.status(201).json(newUser);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});


// DELETE endpoint to delete a user by ID
app.delete('/deleteusers/:id', async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id); // Find user by ID and delete
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/register", async (req, res) => {
  const { Password, Email, Name, PhoneNumber } = req.body;

  const encryptPassword = await bcrypt.hash(Password, 10);

  try {
    const oldUser = await User.findOne({ Email });

    if (oldUser) {
      return res.send({ error: "User Already Exists" });
    }

    await User.create({
      Password: encryptPassword,
      Email,
      Name,
      PhoneNumber,
      isAdmin: false, 
    });

    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});


app.post('/', async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(Password, user.Password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Check if the user is an admin (you might have some criteria to determine this, e.g., user role)
    const isAdmin = user.isAdmin || false; // Assuming user.isAdmin determines admin status

    // If isAdmin is a boolean field in the User model, use it directly
    const token = jwt.sign({ userId: user._id, isAdmin }, secretKey, { expiresIn: '1h' });

    // Include isAdmin field in the response along with the token
    res.status(200).json({ token, isAdmin });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed. Please try again later.' });
  }
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


  app.put('/profile', async (req, res) => {
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
  
        // Assuming here that you are updating user data based on the PUT request body
        user.Email = req.body.email || user.Email;
        user.Name = req.body.name || user.Name;
        user.PhoneNumber = req.body.phoneNumber || user.PhoneNumber;
  
        await user.save();
  
        res.json({
          userId: user._id,
          email: user.Email,
          name: user.Name,
          phoneNumber: user.PhoneNumber,
        });
      } catch (error) {
        res.status(500).json({ message: 'Error updating user data' });
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
    const { bookName, borrowDate, returnDate, userEmail } = req.body;
    const token = req.headers.authorization;

    try {
        if (!token) {
            return res.status(403).json({ message: 'Token is required!' });
        }

        
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



app.get('/borrowed-books', async (req, res) => {
  const userEmail = req.query.userEmail;
  console.log('This is the user Email: ', userEmail)
  try {
    if (!userEmail) {
      return res.status(400).json({ message: 'User email not provided!' });
    }

    const borrowedBooks = await BorrowedBooksModel.find({
      userEmail, // Use the user's email to filter books
      ReturnDate: null, // Fetch books that haven't been returned yet
    });

    res.status(200).json({ borrowedBooks });
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    res.status(500).json({ error: 'Failed to fetch borrowed books' });
  }
});


// Inside your POST endpoint for creating admins


app.listen(3000, () => {
    console.log("Server is running")
})