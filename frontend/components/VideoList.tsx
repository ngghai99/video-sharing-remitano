"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createConsumer } from '@rails/actioncable';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({
  autoClose: 2000,
  draggable: false,
  position: toast.POSITION.TOP_LEFT
})

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideoList();

    const cable = createConsumer('ws://localhost:3001/cable');

    cable.subscriptions.create({ channel: 'VideosChannel' }, {
      received: (data) => {
        if (data.video) {
          toast(`New Movie: ${data.video.title}`)
          fetchVideoList()
        }
      },
    });
  }, []);

  const fetchVideoList = () => {
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
  };

  return (
    <div className="video-list-custom">
      {videos.map(video => (
        <div className='row d-flex justify-content-center mt-3'>
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
              <p><strong>Share by:</strong> {video.email} </p>
              <p><strong>Description:</strong></p>
              <p className="description-custom">
                {video.description.split("\n").map((line, index) => (
                  <p key={index}>
                    {line}
                  </p>
                ))}
              </p>
            </div>
          </div>
          <div className='col-md-2'></div>
        </div>
      ))}
    </div>
  );
}

export default VideoList;
