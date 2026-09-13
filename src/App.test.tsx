import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Home Away From Home title', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/Home Away From Home/i);
  expect(brandElements.length).toBeGreaterThan(0);
});
