import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the blog app navbar with brand name', () => {
  render(<App />);
  // THE BLOG Figma design uses "John McLane" as the brand name in the Navbar
  const brandElement = screen.getByText(/John McLane/i);
  expect(brandElement).toBeInTheDocument();
});
