import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { NewsPage } from './news-page';

// Mock fetch API
global.fetch = jest.fn();

const NewsPageWrapper = () => (
  <BrowserRouter>
    <NewsPage />
  </BrowserRouter>
);

describe('NewsPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders page without crashing', () => {
    render(<NewsPageWrapper />);
    expect(document.body).not.toBeEmptyDOMElement();
  });

  test('renders news articles from static data', () => {
    render(<NewsPageWrapper />);
    // The news page renders article links from static RSS data
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});
