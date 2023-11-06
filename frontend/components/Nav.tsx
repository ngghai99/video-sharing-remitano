"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LoadingSpinner } from '@/components'
import Link from 'next/link'

const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      const storedToken = localStorage.getItem('accessTokenRemi') || null;
      if (storedToken) {
        setLoggedIn(true);
        try {
          const secretKey = process.env.JWT_SECRET;
          const jwt = require('jsonwebtoken');
          const decoded = jwt.verify(storedToken, secretKey);
          const userId = decoded.user_id;

          const response = await axios.get(`${process.env.IP_SERVER}/api/v1/users/${userId}`, {
            headers: {
              Authorization: storedToken,
            },
          });

          const userEmail = response.data.user.email;
          setEmail(userEmail);
        } catch (error) {
          console.log('JWT Error:', error);
        }
      } else {
        setLoggedIn(false)
      }
      setIsLoading(false);
    };

    initializeUser();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.IP_SERVER}/api/v1/login`, {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem('accessTokenRemi', token);
      setLoggedIn(true);
      setEmail(user.email);
      window.location.reload();
    } catch (error) {
      console.log('Login Fail:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessTokenRemi');
    setLoggedIn(false);
    setEmail('');
    window.location.reload();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <nav data-testid="nav-component" className="navbar navbar-expand-lg navbar-color position-fixed top-0 w-100">
      <div className="container-fluid nav-custom">
        <a href="/">
          <img
            loading="eager"
            decoding="async"
            className="logo-nav me-1"
            src="/images/logo.svg"
            alt="Reporter Hugo"
            style={{ paddingBottom: '6px' }}
          />
        </a>
        <a className="navbar-brand pt-1" href="/">
          Funny Movies
        </a>
        <button
          className="navbar-toggler mb-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          onClick={() => setMenuVisible(!menuVisible)}
          data-testid="menu-button"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuVisible ? 'show' : ''}`} id="navbarNav" data-testid="menu-visible">
          {loggedIn ? (
            <div data-testid="wellcome-user">
              <span className="navbar-text">Hi, {email}!</span>
              <Link className="ms-2 btn btn-outline-success btn-share-movie" href="/share-movie">Share a movie</Link>
              <button data-testid="logout-button" className="ms-2 btn btn btn-success btn-signout" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <form onSubmit={handleLogin} data-testid="login-form" className="form-login-custom">
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
