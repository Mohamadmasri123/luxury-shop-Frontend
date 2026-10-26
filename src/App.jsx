import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Register from './pages/Register';
import ProfilePage from './pages/Profile';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
<GoogleOAuthProvider clientId="660023648678-h2ivlgmqu3763esi388lgn8t27jqu2vn.apps.googleusercontent.com">      <Router>
        <div className="min-h-screen bg-gray-50 text-right">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<ProfilePage />} />

          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;