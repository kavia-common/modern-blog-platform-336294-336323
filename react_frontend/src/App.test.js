import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the blog app', () => {
  render(<App />);
  // The app renders the NavBar with the BlogHub brand
  const brandElement = screen.getByText(/BlogHub/i);
  expect(brandElement).toBeInTheDocument();
});
