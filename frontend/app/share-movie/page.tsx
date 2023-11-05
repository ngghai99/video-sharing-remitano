'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ShareMovie() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken') || null;
    ((storedToken) && setLoggedIn(true))
  }, []);

  const handleSubmitVideo = async (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('accessToken') || null;
    const videoUrl = e.target.elements.videoUrl.value;

    try {
      const response = await fetch('http://localhost:3001/api/v1/videos', {
        method: 'POST',
        headers: {
          Authorization: storedToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: videoUrl }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Something went wrong.');
      }
    } catch (error) {
      console.error('Network error. Please try again.');
    }
  };

  return (
    <div className="row share-movie-custom">
      <div className="d-flex justify-content-center">
        <div className="col-md-5">
          <div className="card rounded-15">
            <div className="card-header border-0">
              <h3 className="d-flex justify-content-center mt-2">Share A Youtube Movie</h3>
              {
                (loggedIn) ? (
                  <form onSubmit={handleSubmitVideo}>
                    <div className="row mt-4">
                      <div className="col-md-3">
                        <label className="d-flex justify-content-center">Youtube URL:</label>
                      </div>
                      <div className="col-md-7">
                        <input
                          className="form-control"
                          required
                          name="videoUrl"
                        />
                        <button className="btn btn-outline-success w-100 mt-3" type="submit">
                          Share
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <p className="text-danger">**You Must Be Login To Use This</p>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
