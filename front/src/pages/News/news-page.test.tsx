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

  test('renders loading state initially', () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ items: [], lastUpdated: new Date().toISOString() }),
    });

    render(<NewsPageWrapper />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders news items when data is loaded', async () => {
    const mockData = {
      items: [
        {
          title: 'Test Article',
          link: 'https://example.com',
          pubDate: '2025-01-01',
          contentSnippet: 'Test content snippet',
          creator: 'Test Author',
          categories: ['Testing'],
          guid: 'test-123',
        },
      ],
      lastUpdated: '2025-01-01T00:00:00Z',
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    render(<NewsPageWrapper />);

    // Wait for loading to finish
    await screen.findByText('Test Article');
    expect(screen.getByText('Test Article')).toBeInTheDocument();
  });
});
