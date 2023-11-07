import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { VideoList } from './../components'

jest.mock('axios');
jest.mock('@rails/actioncable', () => {
  return {
    createConsumer: jest.fn(() => ({
      subscriptions: {
        create: jest.fn()
      }})
    ),
  };
});

const mockVideos = [
  {
    id: 1,
    uid: 'video1',
    title: 'Video 1',
    link: 'https://www.youtube.com/watch?v=ckDC_SzbHuI&list=RDckDC_SzbHuI&start_radio=1',
    description: 'Description 1',
    email: 'user1@example.com',
  },
  {
    id: 2,
    uid: 'video2',
    title: 'Video 2',
    link: 'https://www.youtube.com/watch?v=ckDC_SzbHuI&list=RDckDC_SzbHuI&start_radio=1',
    description: 'Description 2',
    email: 'user2@example.com',
  },
];

const axios = require('axios');
axios.get.mockResolvedValue({
  data: { success: true, videos: mockVideos },
});

test('renders the correct number of videos', async () => {
  render(<VideoList />);

  await waitFor(() => {
    const videoElements = screen.getAllByTestId('video');
    expect(videoElements).toHaveLength(mockVideos.length);

    expect(screen.getByText('Video 1')).toBeInTheDocument();
    expect(screen.getByText('Video 2')).toBeInTheDocument();
  });
});
