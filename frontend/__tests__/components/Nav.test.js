import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Nav } from '/components'

describe('Nav', () => {
  it('renders the component', () => {
    render(<Nav />);
    const navComponent = screen.getByTestId('nav-component');
    expect(navComponent).toBeInTheDocument();
  });
});

test('displays the "Funny Movies" text in the navigation', () => {
  render(<Nav />);
  const funnyMoviesText = screen.getByText('Funny Movies');
  expect(funnyMoviesText).toBeInTheDocument();
});

test('displays login form when not logged in', () => {
  render(<Nav />);
  const loginForm = screen.getByTestId('login-form');
  expect(loginForm).toBeInTheDocument();
});

test('toggles menu when clicking the menu button', () => {
  render(<Nav />);
  const menuButton = screen.getByTestId('menu-button');
  fireEvent.click(menuButton);

  const menuVisible = screen.getByTestId('menu-visible');
  expect(menuVisible).toBeInTheDocument();
});

test('displays user information when logged in', async () => {
  const accessToken = process.env.ACCESS_TOKEN;
  localStorage.setItem('accessTokenRemi', accessToken);
  render(<Nav />);
  await waitFor(() => {
    const loadingSpinner = screen.queryByTestId('loading-spinner');
    if (loadingSpinner === null) {
      const wellcomeUser = screen.getByTestId('wellcome-user');
      expect(wellcomeUser).toBeInTheDocument();
    }
  });

  localStorage.removeItem('accessTokenRemi');
});

test('logs out and clears user information', async () => {
  const accessToken = process.env.ACCESS_TOKEN;
  localStorage.setItem('accessTokenRemi', accessToken);
  render(<Nav />);

  await waitFor(() => {
    const loadingSpinner = screen.queryByTestId('loading-spinner');
    if (loadingSpinner === null) {
      const logoutButton = screen.getByTestId('logout-button');
      fireEvent.click(logoutButton);
      expect(localStorage.getItem('accessTokenRemi')).toBeNull();
    }
  });
  localStorage.removeItem('accessTokenRemi');
});
