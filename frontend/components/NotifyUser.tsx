"use client"
import React, { useEffect } from 'react';
import { createConsumer } from '@rails/actioncable';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

toast.configure({
  autoClose: 2000,
  draggable: false,
  position: toast.POSITION.TOP_LEFT
});

export default function NotifyUser() {
  useEffect(() => {
    const cable = createConsumer(process.env.CABLE);
    const storedToken = localStorage.getItem('accessTokenRemi') || null;
    const handleReceived = (data: { video: {
      email: any; title: any;
}; }) => {
      if (data.video && storedToken) {
        toast(`${data.video.email}: ${data.video.title}`);
      }
    };

    const videosChannel = cable.subscriptions.create({ channel: 'VideosChannel' }, {
      received: handleReceived
    });

    return () => {
      videosChannel.unsubscribe();
    };
  }, []);

  return null;
}
