"use client"
import { useState, useEffect } from 'react';
import React from 'react'
import axios from 'axios';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/videos')
      .then(response => {
        if (response.data.success) {
          setVideos(response.data.videos);
          response.data.videos.forEach(video => {
            axios.get(`http://localhost:3001/api/v1/users/${video.user_id}`)
              .then(userResponse => {
                video.email = userResponse.data.user.email;
                setVideos(prevVideos => [...prevVideos]);
              })
              .catch(error => {
                console.error('Error fetching user info:', error);
              });
          });
        } else {
          console.error('API response is not an array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching video list:', error);
      });
  }, []);

  return (
    <>
      {videos.map(video => (
        <div className='row d-flex justify-content-center mt-5'>
          <div className='col-md-2'></div>
          <div className='col-md-4'>
            <div className='embed-responsive embed-responsive-16by9 mx-3'>
              <iframe
                className='embed-responsive-item custom-iframe'
                src={`https://www.youtube.com/embed/${video.uid}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className='video-info col-md-4 overflow-video'>
            <div className='mx-3'>
              <a href={video.link} className="text-title" target="_blank">
                <h2>{video.title}</h2>
              </a>
              <p>Share by: {video.email} </p>
              <p>{video.description}</p>
            </div>
          </div>
          <div className='col-md-2'></div>
        </div>
      ))}
    </>
  );
}

export default VideoList;
