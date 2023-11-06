"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createConsumer } from '@rails/actioncable';
import 'react-toastify/dist/ReactToastify.css'

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideoList();

    const cable = createConsumer(process.env.CABLE);

    cable.subscriptions.create({ channel: 'VideosChannel' }, {
      received: (data) => {
        if (data.video) {
          fetchVideoList()
        }
      },
    });
  }, []);

  const fetchVideoList = () => {
    axios.get(`${process.env.IP_SERVER}/api/v1/videos`)
      .then(response => {
        if (response.data.success) {
          setVideos(response.data.videos);
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
        <div key={video.id} className='video-list row d-flex justify-content-center mt-3' data-testid="video">
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
