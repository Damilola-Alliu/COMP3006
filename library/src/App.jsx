import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from './Login';
import Register from './Register';
import Home from './home';
import Profile from './Profile';
import Books from './Books';
import ReturnedBooks from './ReturnedBooks';
import BorrowedBooks from './BorrowedBooks';
import Admin from './Admin'
import Adminprofile from './Adminprofile';
import AllborrowedBooks from './AllborrowedBooks';
import AllBooks from './AllBooks';
import Users from './Users';

function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/books" element={<Books />} />
          <Route path="/returnedbooks" element={<ReturnedBooks />} />
          <Route path="/borrowedbooks" element={<BorrowedBooks />} />

          <Route path="/admin" element={<Admin />} />        
          <Route path="/adminprofile" element={<Adminprofile />} />
          <Route path="/allborrowedbooks" element={<AllborrowedBooks />} />
          <Route path="/allbooks" element={<AllBooks />} />
          <Route path="/users" element={<Users />} />

        </Routes>
      </Router>
    
  );
}

export default App;
