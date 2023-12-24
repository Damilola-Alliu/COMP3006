import './App.css';
import Login from './Login';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
