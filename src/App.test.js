import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

test('first test', () => {
  render(<App />);
  expect(screen.getByText('hello world!')).toHaveTextContent('hello world!');
});
