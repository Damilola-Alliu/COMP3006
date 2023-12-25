import './App.css';
import Login from './Login';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './register';
import Home from './home';
import Profile from './Profile'
import Books from './Books';
import ReturnedBooks from './ReturnedBooks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/books" element={<Books />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/returnedbooks" element={<ReturnedBooks />} />
      </Routes>
    </Router>
  );
}

export default App;
