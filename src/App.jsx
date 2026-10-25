import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Register from './pages/Register';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-right">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
                    <Route path="/register" element={<Register />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;