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




require("./models/Users")

const User = mongoose.model("Users")

app.get('/getusers', async (req, res) => {
  try {
    const users = await UserModel.find({isAdmin: false}); 
    
    res.status(200).json(users); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
});


// DELETE endpoint to delete a user by Email
app.delete('/deleteusers/:_id', async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params._id); 
   
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
      // User already exists
      return res.status(409).send({ status: "error", error: "User Already Exists" });
    }

    // User does not exist, register the user
    await User.create({
      Password: encryptPassword,
      Email,
      Name,
      PhoneNumber,
      isAdmin: false,
    });

    // Successfully registered
    res.status(200).send({ status: "ok" });
  } catch (error) {
    // Error during registration
    res.status(500).send({ status: "error" });
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

    
    const isAdmin = user.isAdmin || false; 

   
    const token = jwt.sign({ userId: user._id, isAdmin }, secretKey, { expiresIn: '1h' });

    
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
        console.log(error)
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
 

  app.post('/addbooks', async (req, res) => {
    try {
      
      const { Title, Author, ISBN, Description, Genre, PublicationYear, CoverImage, TotalCopies, AvailableCopies, BorrowedBy } = req.body;
  
      
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
  
      
      await newBook.save();
  
      res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
      res.status(500).json({ message: 'Error creating book', error: error.message });
    }
  });

  app.delete('/books/:title', async (req, res) => {
    const bookTitle = req.params.title;

    try {
       
        const deletedBook = await BooksModel.findOneAndDelete({ Title: bookTitle });

        if (!deletedBook) {
            
            return res.status(404).json({ error: 'Book not found' });
        }

        console.log(`Book "${bookTitle}" deleted successfully`);
        
        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});
  
  
  app.post('/borrow-book', async (req, res) => {
    const { bookName, borrowDate, returnDate, userEmail } = req.body;
    const token = req.headers.authorization;

    try {
        if (!token) {
            return res.status(403).json({ message: 'Token is required!' });
        }

        
        
        const newBorrowedBook = new BorrowedBooksModel({
            BookName: bookName, 
            userEmail: userEmail,
            BorrowDate: borrowDate,
            DueDate: returnDate,
            ReturnDate: null,
        });

        await newBorrowedBook.save();

        
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
 
  try {
    if (!userEmail) {
      return res.status(400).json({ message: 'User email not provided!' });
    }

    const borrowedBooks = await BorrowedBooksModel.find({
      userEmail, 
       
    });

    res.status(200).json({ borrowedBooks });
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    res.status(500).json({ error: 'Failed to fetch borrowed books' });
  }
});


app.put('/borrowedbooks/:bookName', async (req, res) => {
  const { bookName } = req.params;
  const { ReturnDate } = req.body;

  try {
      const updatedBook = await BorrowedBooksModel.findOneAndUpdate(
          { BookName: bookName },
          { ReturnDate },
          { new: true }
      );

      if (!updatedBook) {
          return res.status(404).json({ message: 'Book not found' });
      }

      
      await BooksModel.updateOne(
          { BookName: updatedBook.BookName },
          { $inc: { AvailableCopies: 1 } }
      );

      return res.json({ message: 'Return date updated successfully', updatedBook });
  } catch (error) {
      console.error('Error updating return date:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/AdminBorrowedBooks', async (req, res) => {
  try {
      const books = await BorrowedBooksModel.find();
      res.json(books);
  } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
});

module.exports = app;
app.listen(3000, () => {
    console.log("Server is running")
})