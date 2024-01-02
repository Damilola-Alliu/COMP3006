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
        </Routes>
      </Router>
    
  );
}

export default App;
