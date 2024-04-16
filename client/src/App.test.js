import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
});

test('renders home route', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const homeElement = screen.getByText(/home/i);
  expect(homeElement).toBeInTheDocument();
});

test('renders create post route', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const createPostElement = screen.getByText(/create post/i);
  expect(createPostElement).toBeInTheDocument();
});
