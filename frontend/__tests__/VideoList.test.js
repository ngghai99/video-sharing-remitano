import React from 'react';
import axios from 'axios';
import { render, act } from '@testing-library/react';
import { VideoList } from '@/components'

test('renders the correct number of videos', async () => {
  const mockVideos = [
    { uid: 'video1', title: 'Video 1', link: 'link1', description: 'Description 1', email: 'user1@example.com' },
    { uid: 'video2', title: 'Video 2', link: 'link2', description: 'Description 2', email: 'user2@example.com' },
  ];

  const axiosGetSpy = jest.spyOn(axios, 'get');
  axiosGetSpy.mockResolvedValue({ data: { success: true, videos: mockVideos } });

  let container;

  await act(async () => {
    const result = render(<VideoList />);
    container = result.container;
  });

  const videoElements = container.querySelectorAll('.video-list-custom div.row');
  expect(videoElements).toHaveLength(mockVideos.length);

  await axiosGetSpy.mock.results[0].value;
  await axiosGetSpy.mock.results[1].value;

  jest.clearAllMocks();
});
