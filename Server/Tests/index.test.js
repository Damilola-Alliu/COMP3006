const request = require('supertest');
const app = require('../index'); 



 const UserModel = require('../models/Users');
 
const BooksModel = require('../models/Books')
 const BorrowedBooksModel = require('../models/BorrowedBooks')




// const app = require('../index'); 
// jest.mock('express');


// // Other mocks for mongoose, cors, etc.




jest.mock('jsonwebtoken', () => ({
  verify: jest.fn((token, secretKey, callback) => callback(null, { userId: 'user123' })),
}));

// // jest.mock('../models/Books', () => ({
// //   find: jest.fn().mockResolvedValue([
// //     { title: 'Book 1', author: 'Author 1' },
// //     { title: 'Book 2', author: 'Author 2' },
// //   ]),
// // }));



it('should register a new user or handle existing user gracefully', async () => {
  const newUser = {
    Password: 'password123',
    Email: 'test@example.com',
    Name: 'Test User',
    PhoneNumber: '1234567890',
  };

  const response = await request(app).post('/register').send(newUser);
  console.log(response.body); 

  
  if (response.status === 200) {
    expect(response.body.status).toBe('ok');
  }
  
  else if (response.status === 409) {
    expect(response.body.status).toBe('error');
    expect(response.body.error).toBe('User Already Exists');
  }
  
  else {
    fail(`Unexpected response status: ${response.status}`);
  }
});

it('should successfully initiate a GET request to /getusers', async () => {
  
  const response = await request(app).get('/getusers');

  
  expect(response.status).toBe(200);
  expect(response.body).toEqual(expect.any(Array)); 
});



it('should handle errors when initiating a GET request to /getusers', async () => {
  
  jest.spyOn(UserModel, 'find').mockImplementationOnce(() => {
    throw new Error('Simulated error in UserModel.find');
  });

  
  const response = await request(app).get('/getusers');

  
  expect(response.status).toBe(500);
  expect(response.body).toEqual({ message: 'Simulated error in UserModel.find' });

 
  UserModel.find.mockRestore();
});


it('should retrieve the user profile correctly with a valid token', async () => {
  
  const mockUser = {
    _id: 'user123',
    Email: 'test@example.com',
    Name: 'Test User',
    PhoneNumber: '1234567890',
  };
  
  
  jest.spyOn(UserModel, 'findById').mockResolvedValueOnce(mockUser);

  
  const response = await request(app)
    .get('/profile')
    .set('Authorization', 'mockedToken');

  
  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    userId: 'user123',
    email: 'test@example.com',
    name: 'Test User',
    phoneNumber: '1234567890',
  });

  
  UserModel.findById.mockRestore();
});


it('should handle scenarios with missing or invalid tokens', async () => {
  
  const responseWithoutToken = await request(app).get('/profile');

  
  expect(responseWithoutToken.status).toBe(403);
  expect(responseWithoutToken.body).toEqual({ message: 'Token is required!' });

  
  const responseWithInvalidToken = await request(app)
    .get('/profile')
    .set('Authorization', 'invalidToken');

  
expect(responseWithInvalidToken.status).toBe(500); 
expect(responseWithInvalidToken.body).toEqual({ message: 'Error fetching user data' }); 

});




// it('should handle errors when fetching borrowed books', async () => {
  
//   const mockError = new Error('Simulated error in BorrowedBooksModel.find');
//   jest.spyOn(BorrowedBooksModel, 'find').mockRejectedValueOnce(mockError);

  
//   const response = await request(app).get('/AdminBorrowedBooks');
//   console.log('Response', response.body)

  
//   expect(response.status).toBe(500);
//   expect(response.body).toEqual({ message: 'Error fetching books', error: mockError.message });

  
//   BorrowedBooksModel.find.mockRestore();
// });

// jest.mock('../models/BorrowedBooks', () => ({
//   find: jest.fn().mockResolvedValue([
//     { BookName: 'Book 1', userEmail: 'Logged In User', BorrowDate: '2022-01-14', DueDate: ' 2022-01-14', ReturnDate: '2022-02-01' },
//     { BookName: 'Book 2', userEmail: 'Logged In User', BorrowDate: '2022-01-15', DueDate: ' 2022-01-14', ReturnDate: '2022-02-01' },
    
//   ]),
// }));



jest.mock('../models/BorrowedBooks', () => ({
  find: jest.fn(),
}));


describe('GET /borrowed-books', () => {
  it('should retrieve borrowed books for the specified user and send a status code of 200', async () => {
    
    const userEmail = 'test@example.com';
    const userBorrowedBooks = [
      { BookName: 'Book 1', userEmail },
      { BookName: 'Book 2', userEmail },
    ];

   
    BorrowedBooksModel.find.mockResolvedValue(userBorrowedBooks);

    
    const response = await request(app).get('/borrowed-books').query({ userEmail });

    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('borrowedBooks');
    const borrowedBooks = response.body.borrowedBooks;

    
    borrowedBooks.forEach(book => {
      expect(book).toHaveProperty('BookName');
      expect(book).toHaveProperty('userEmail', userEmail);
      
    });

   
    expect(BorrowedBooksModel.find).toHaveBeenCalledWith({ userEmail });
  });



it('should handle errors when fetching borrowed books', async () => {
  
  const mockError = new Error('Simulated error in BorrowedBooksModel.find');
  jest.spyOn(BorrowedBooksModel, 'find').mockRejectedValueOnce(mockError);

  
  const response = await request(app).get('/borrowed-books').query({ userEmail: 'user@example.com' });

  
  expect(response.status).toBe(500);
  expect(response.body).toEqual({ error: 'Failed to fetch borrowed books' });

  
  BorrowedBooksModel.find.mockRestore();
});

});


describe('POST /login', () => {
  it('should return status code 401 for a registered user with an incorrect password', async () => {
    
    const registeredUser = { Email: 'registered@example.com', Password: 'validpassword' };
     
    jest.spyOn(UserModel, 'findOne').mockResolvedValueOnce(registeredUser);
      
    const response = await request(app)
      .post('/')
      .send({ Email: 'registered@example.com', Password: 'incorrectpassword' });
      
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid password' });
      
    jest.spyOn(UserModel, 'findOne').mockRestore();
});
})
  

  it('should return status code 404 for an unregistered user', async () => {
    
    const unregisteredUser = {
      Email: 'nonexistent@example.com',
      Password: 'invalidpassword',
    };
  
    const response = await request(app)
      .post('/')
      .send(unregisteredUser);
      
    expect(response.status).toBe(404);       
    expect(response.body).toEqual(expect.any(Object));
  });
  
  it('should return status code 401 for a registered user with invalid password', async () => {
    
    const invalidCredentials = {
      Email: 'test@example.com',
      Password: 'wrongpassword',    };

    
    const response = await request(app)
      .post('/')
      .send(invalidCredentials);
    
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid password' });
  });

  it('should return status code 500 for internal server error', async () => {
    
    jest.spyOn(UserModel, 'findOne').mockImplementation(() => {
      throw new Error('Simulated internal server error');
    });
  
    
    const response = await request(app)
      .post('/')
      .send({ Email: 'test@example.com', Password: 'validpassword' });
  
    
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Login failed. Please try again later.' });
  
    jest.spyOn(UserModel, 'findOne').mockRestore();
  });
  



describe('POST /borrow-book', () => {
  it('should return status code 403 when token is not available', async () => {
    
    const response = await request(app).post('/borrow-book');

   
    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: 'Token is required!' });
  });

});

describe('PUT /profile', () => {
  it('should return error 403 if token is missing', async () => {
    
    const response = await request(app)
      .put('/profile')
      .send({ email: 'new@example.com', name: 'New User', phoneNumber: '1234567890' });

    // Assertions
    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: 'Token is required!' });
  });

  
});


describe('PUT /profile', () => {
  it('should return status code 500 when user ID is not found', async () => {
    
    const validToken = 'your_valid_token_here';
    
    const nonExistentUserId = 'non_existent_user_id';

    
    const response = await request(app)
      .put('/profile')
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        email: 'new@example.com',
        name: 'New User',
        phoneNumber: '1234567890',
        userId: nonExistentUserId,
      });

    
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error updating user data' });
  });

   
});







// describe('PUT /borrowedbooks/:bookName', () => {
//   it('should update ReturnDate and increment AvailableCopies', async () => {
    
//     const borrowedBook = new BorrowedBooksModel({
//       BookName: 'TestBook',
//       userEmail: 'test@example.com',
//       BorrowDate: '2022-01-14',
//       DueDate: '2022-01-21',
//       ReturnDate: null,
//     });

//     await borrowedBook.save();

    
//     const response = await request(app)
//       .put(`/borrowedbooks/${borrowedBook.BookName}`)
//       .send({ ReturnDate: '2022-01-20' });

    
//     expect(response.status).toBe(200);
//     expect(response.body.updatedBook.ReturnDate).toBe('2022-01-20');

//     const updatedBorrowedBook = await BorrowedBooksModel.findOne({ BookName: borrowedBook.BookName });
//     expect(updatedBorrowedBook.ReturnDate).toBe('2022-01-20');

//     const updatedBook = await BooksModel.findOne({ BookName: borrowedBook.BookName });
//     expect(updatedBook.AvailableCopies).toBe(borrowedBook.AvailableCopies + 1);
//   });
// });






// describe('POST /addbooks', () => {
  
  
//   it('should add a book to the database', async () => {
    
//     const bookData = {
//       Title: 'Test Book',
//       Author: 'Test Author',
//       ISBN: '1234567890',
//       Description: 'A test book description.',
//       Genre: 'Fiction',
//       PublicationYear: 2022,
//       CoverImage: 'test-cover.jpg',
//       TotalCopies: 5,
//       AvailableCopies: 5,
//       BorrowedBy: [],
//     };

    
//     const response = await request(app)
//       .post('/addbooks')
//       .send(bookData);

    
//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty('message', 'Book created successfully');
//     expect(response.body).toHaveProperty('Title');
//     expect(response.body).toHaveProperty('Author');
//     expect(response.body).toHaveProperty('ISBN');
//     expect(response.body).toHaveProperty('Description');
//     expect(response.body).toHaveProperty('Genre');
//     expect(response.body).toHaveProperty('Publication Year');
//     expect(response.body).toHaveProperty('TotalCopies');
//     expect(response.body).toHaveProperty('AvailableCopies');
//     const createdBook = response.body.book;

    
//     const fetchedBook = await BooksModel.findOne({ Title: 'Test Book' });
//     expect(fetchedBook).toBeTruthy();
//     expect(fetchedBook.Title).toBe(createdBook.Title);
    

    
    
//   });

 
 
// });



describe('GET /getusers', () => {
  it('should return a list of users', async () => {
    const response = await request(app).get('/getusers');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  
});

// describe('DELETE /deleteusers/:_id', () => {
//   it('should delete a user', async () => {
//     // Assuming you have a user ID to test deletion
//     const userId = 'someUserId';
//     const response = await request(app).delete(`/deleteusers/${userId}`);
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('message', 'User deleted successfully');
//   });

//   // Add more tests for the /deleteusers endpoint as needed
// });

// Add more describe blocks for other endpoints as needed
