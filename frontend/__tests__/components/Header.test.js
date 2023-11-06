import React from 'react';
import { render } from '@testing-library/react';
import { Header } from '@/components'

test('Header component renders without errors', () => {
  const { container } = render(<Header />);
  expect(container).toBeInTheDocument();
});

test('renders the viewport meta tag', () => {
  const { getByTestId } = render(<Header />);
  const viewportMetaElement = getByTestId('viewport-meta');
  expect(viewportMetaElement).toBeInTheDocument();
  expect(viewportMetaElement).toHaveAttribute(
    'content',
    'width=device-width, initial-scale=1, maximum-scale=5'
  );
});
