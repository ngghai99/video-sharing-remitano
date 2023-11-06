import React from 'react';
import ShareMovie from '../../app/share-movie/page';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('ShareMovie', () => {

  it('renders the page', () => {
    render(<ShareMovie />);
    const page = screen.getByTestId('share-movie');
    expect(page).toBeInTheDocument();
  });

  it('renders the component with a form when logged in', async () => {
    const accessToken = process.env.ACCESS_TOKEN;
    localStorage.setItem('accessTokenRemi', accessToken);

    const { getByText, getByLabelText } = render(<ShareMovie />);

    const youtubeUrlLabel = getByText('Youtube URL:');
    const videoUrlInput = getByLabelText('Youtube URL:');
    const shareButton = getByText('Share');

    expect(youtubeUrlLabel).toBeInTheDocument();
    expect(videoUrlInput).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
    localStorage.removeItem('accessTokenRemi');
  });

  it('displays an error message when not logged in', () => {
    const { getByText } = render(<ShareMovie />);

    const errorMessage = getByText('**You Must Be Login To Use This');
    expect(errorMessage).toBeInTheDocument();
  });

  it('submits the form and redirects when successful', async () => {
    const accessToken = process.env.ACCESS_TOKEN;
    localStorage.setItem('accessTokenRemi', accessToken);

    render(<ShareMovie />);
    const videoUrlInput = screen.getByTestId('video-url-input');
    const shareButton = screen.getByTestId('share-button');

    fireEvent.change(videoUrlInput, { target: { value: 'https://www.youtube.com/watch?v=ckDC_SzbHuI&list=RDckDC_SzbHuI&start_radio=1' } });
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(window.location.href).toBe(process.env.IP_CLIENT_NO_PORT);
    });
  });
});
