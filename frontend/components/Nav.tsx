"use client"
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Nav = () => {
  const storedToken = localStorage.getItem('accessToken') || null;
  const [loggedIn, setLoggedIn] = useState(storedToken ? true : false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      if (storedToken) {
        setLoggedIn(true);
        try {
          const secretKey = process.env.JWT_SECRET;
          const jwt = require('jsonwebtoken');
          const decoded = jwt.verify(storedToken, secretKey);
          const userId = decoded.user_id;

          const response = await axios.get(`http://localhost:3001/api/v1/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          const userEmail = response.data.user.email;
          setEmail(userEmail);
        } catch (error) {
          console.error('JWT Error:', error);
        }
      }
    };

    initializeUser();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem('accessToken', token);
      setLoggedIn(true);
      setEmail(user.email);
    } catch (error) {
      console.error('Login Fail:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setLoggedIn(false);
    setEmail('');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid nav-custom">
        <img
          loading="eager"
          decoding="async"
          className="logo-nav me-1"
          src="/images/logo.svg"
          alt="Reporter Hugo"
          style={{ paddingBottom: '6px' }}
        />
        <a className="navbar-brand pt-1" href="#">
          Funny Movies
        </a>
        <button
          className="navbar-toggler mb-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          onClick={() => setMenuVisible(!menuVisible)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuVisible ? 'show' : ''}`} id="navbarNav">
          {loggedIn ? (
            <>
              <span className="navbar-text">Hi, {email}!</span>
              <button className="ms-2 btn btn-outline-success btn-signout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <form onSubmit={handleLogin} className="d-flex">
              <input
                className="form-control me-2"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="form-control me-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="btn btn-outline-success btn-login" type="submit">
                Login / Register
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
