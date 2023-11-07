'use client'
import React, { useState, useEffect } from 'react';

export default function ShareMovie() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('accessTokenRemi') || null;
    if (storedToken) {
      setLoggedIn(true);
    }
  }, []);

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const handleSubmitVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('accessTokenRemi') || null;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (storedToken) {
      headers.Authorization = storedToken;
    }

    try {
      const response = await fetch(`${process.env.IP_SERVER}/api/v1/videos`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ link: videoUrl }),
      });

      if (response.ok) {
        setTimeout(function() {
          window.location.href = '/';
        }, 1000);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error. Please try again.');
    }
  };

  return (
    <div data-testid="share-movie" className="row share-movie-custom">
      <div className="d-flex justify-content-center">
        <div className="col-md-5">
          <div className="card rounded-15">
            <div className="card-header border-0">
              <h3 className="d-flex justify-content-center mt-2">Share A Youtube Movie</h3>
              {loggedIn ? (
                <form data-testid="share-form" onSubmit={handleSubmitVideo}>
                  <div className="row mt-4">
                    <div className="col-md-3">
                      <label htmlFor="videoUrl" className="d-flex justify-content-center">Youtube URL:</label>
                    </div>
                    <div className="col-md-7">
                      <input
                        className="form-control"
                        required
                        id="videoUrl"
                        name="videoUrl"
                        data-testid="video-url-input"
                        value={videoUrl}
                        onChange={handleVideoUrlChange}
                      />
                      <p className="text-danger">{error && '**Please Double Check Your Link'}</p>
                      <button data-testid="share-button" className="btn btn-outline-success w-100 mt-3" type="submit">
                        Share
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <p className="text-danger">**You Must Be Login To Use This</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



