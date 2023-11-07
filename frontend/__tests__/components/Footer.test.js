import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from '/components'

test('renders the footer text correctly', () => {
  const { getByText } = render(<Footer />);
  const footerTextElement = getByText('Remitano Test - Made By Ngghai99');
  expect(footerTextElement).toBeInTheDocument();
});

test('renders the footer with the correct class names', () => {
  const { container } = render(<Footer />);
  const footerElement = container.querySelector('footer');
  expect(footerElement).toBeInTheDocument();
  expect(footerElement).toHaveClass('mt-5 position-fixed bottom-0 w-100');
});

test('renders the footer section with the correct class names', () => {
  const { container } = render(<Footer />);
  const footerSectionElement = container.querySelector('.section');
  expect(footerSectionElement).toBeInTheDocument();
  expect(footerSectionElement).toHaveClass('navbar-color footer-custom');
});
