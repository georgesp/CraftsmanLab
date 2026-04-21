import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { NewsPage } from './news-page';

// Suppress jsdom "not implemented" noise for scroll
window.scrollTo = jest.fn() as unknown as typeof window.scrollTo;

jest.mock('../../components/news/registry', () => {
  const mockSources = [
    {
      meta: { slug: 'source-alpha', feedUrl: '', maxItems: 10 },
      translations: {
        fr: { title: 'Source Alpha', description: '' },
        en: { title: 'Source Alpha EN', description: '' },
      },
      data: {
        source: 'source-alpha',
        lastUpdated: '2026-01-01T00:00:00Z',
        items: [
          {
            guid: 'alpha-1',
            title: 'Article Alpha One',
            link: 'https://example.com/alpha-1',
            pubDate: 'Wed, 01 Jan 2026 10:00:00 +0000',
            contentSnippet: 'Snippet A1',
            creator: 'Author A',
            categories: ['C#', '.NET'],
          },
          {
            guid: 'alpha-2',
            title: 'Article Alpha Two',
            link: 'https://example.com/alpha-2',
            pubDate: 'Tue, 31 Dec 2025 10:00:00 +0000',
            contentSnippet: 'Snippet A2',
            creator: 'Author A',
            categories: ['Azure'],
          },
        ],
      },
    },
    {
      meta: { slug: 'source-beta', feedUrl: '', maxItems: 10 },
      translations: {
        fr: { title: 'Source Beta', description: '' },
        en: { title: 'Source Beta EN', description: '' },
      },
      data: {
        source: 'source-beta',
        lastUpdated: '2026-01-01T00:00:00Z',
        items: [
          {
            guid: 'beta-1',
            title: 'Article Beta One',
            link: 'https://example.com/beta-1',
            pubDate: 'Mon, 30 Dec 2025 10:00:00 +0000',
            contentSnippet: 'Snippet B1',
            creator: 'Author B',
            categories: ['C#', 'Docker'],
          },
        ],
      },
    },
  ];
  return {
    rssSources: mockSources,
    getRssSourceBySlug: (slug: string) =>
      mockSources.find((s: { meta: { slug: string } }) => s.meta.slug === slug),
  };
});

const renderNews = (path = '/news') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <NewsPage />
    </MemoryRouter>,
  );

// Returns the h3 heading for an article title, or null if absent.
const articleHeading = (name: string) => screen.queryByRole('heading', { level: 3, name });

describe('NewsPage', () => {
  describe('initial render', () => {
    it('shows articles from all sources', () => {
      renderNews();
      expect(articleHeading('Article Alpha One')).toBeInTheDocument();
      expect(articleHeading('Article Alpha Two')).toBeInTheDocument();
      expect(articleHeading('Article Beta One')).toBeInTheDocument();
    });

    it('renders article links opening in a new tab', () => {
      renderNews();
      const link = screen.getByRole('link', { name: /article alpha one/i });
      expect(link).toHaveAttribute('href', 'https://example.com/alpha-1');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('does not show the selected-filters panel when no filter is active', () => {
      renderNews();
      expect(screen.queryByText(/news\.selectedCategories/)).not.toBeInTheDocument();
    });
  });

  describe('source filter via URL ?source=', () => {
    it('shows only articles from the given source', () => {
      renderNews('/news?source=source-alpha');
      expect(articleHeading('Article Alpha One')).toBeInTheDocument();
      expect(articleHeading('Article Alpha Two')).toBeInTheDocument();
      expect(articleHeading('Article Beta One')).not.toBeInTheDocument();
    });

    it('shows no-items message for an unrecognised source slug', () => {
      renderNews('/news?source=nonexistent');
      expect(screen.getByText('news.noItems')).toBeInTheDocument();
    });
  });

  describe('category filter via URL ?keywords=', () => {
    it('shows only articles that carry the keyword category', () => {
      renderNews('/news?keywords=C%23');
      expect(articleHeading('Article Alpha One')).toBeInTheDocument();
      expect(articleHeading('Article Beta One')).toBeInTheDocument();
      expect(articleHeading('Article Alpha Two')).not.toBeInTheDocument();
    });

    it('applies AND logic when multiple keywords are given', () => {
      renderNews('/news?keywords=C%23,.NET');
      expect(articleHeading('Article Alpha One')).toBeInTheDocument();
      expect(articleHeading('Article Alpha Two')).not.toBeInTheDocument();
      expect(articleHeading('Article Beta One')).not.toBeInTheDocument();
    });

    it('shows no-items message when no article matches all keywords', () => {
      renderNews('/news?keywords=Azure,.NET');
      expect(screen.getByText('news.noItems')).toBeInTheDocument();
    });
  });

  describe('source filter via sidebar chip click', () => {
    it('clicking a source chip shows only articles from that source', () => {
      renderNews();
      // Before any click: index 0 = sidebar chip for "Source Alpha"
      fireEvent.click(screen.getAllByText('Source Alpha')[0]);
      expect(articleHeading('Article Alpha One')).toBeInTheDocument();
      expect(articleHeading('Article Alpha Two')).toBeInTheDocument();
      expect(articleHeading('Article Beta One')).not.toBeInTheDocument();
    });

    it('clicking the active source chip a second time clears the filter', () => {
      renderNews();
      fireEvent.click(screen.getAllByText('Source Alpha')[0]); // select
      // After select the selected-panel renders "Source Alpha" as Typography at index 0;
      // the sidebar chip is now at index 1.
      fireEvent.click(screen.getAllByText('Source Alpha')[1]); // deselect
      expect(articleHeading('Article Beta One')).toBeInTheDocument();
    });
  });

  describe('category filter via sidebar chip click', () => {
    it('clicking a category chip filters to articles that carry it', () => {
      renderNews();
      // index 0 = sidebar chip for "C#"
      fireEvent.click(screen.getAllByText('C#')[0]);
      expect(articleHeading('Article Alpha One')).toBeInTheDocument();
      expect(articleHeading('Article Beta One')).toBeInTheDocument();
      expect(articleHeading('Article Alpha Two')).not.toBeInTheDocument();
    });

    it('selecting a second category applies AND logic', () => {
      renderNews();
      fireEvent.click(screen.getAllByText('C#')[0]);
      // After selecting C#, ".NET" chip is still in sidebar (alpha-1 has .NET and is shown)
      fireEvent.click(screen.getAllByText('.NET')[0]);
      expect(articleHeading('Article Alpha One')).toBeInTheDocument();
      expect(articleHeading('Article Beta One')).not.toBeInTheDocument();
      expect(articleHeading('Article Alpha Two')).not.toBeInTheDocument();
    });

    it('clicking an active category chip removes it from the filter', () => {
      renderNews();
      fireEvent.click(screen.getAllByText('C#')[0]); // select
      // After select the selected-panel renders "C#" as Typography at index 0;
      // the sidebar chip is now at index 1.
      fireEvent.click(screen.getAllByText('C#')[1]); // deselect
      expect(articleHeading('Article Alpha Two')).toBeInTheDocument();
    });
  });

  describe('active filter panel', () => {
    it('shows the selected-filters panel when a category filter is active', () => {
      renderNews();
      fireEvent.click(screen.getAllByText('C#')[0]);
      // The panel header text is "news.selectedCategories (1)" — match with regex
      expect(screen.getByText(/news\.selectedCategories/)).toBeInTheDocument();
    });

    it('shows the selected-filters panel when a source filter is active', () => {
      renderNews('/news?source=source-alpha');
      expect(screen.getByText(/news\.selectedCategories/)).toBeInTheDocument();
    });

    it('close button on selected source restores all articles', () => {
      renderNews('/news?source=source-alpha');
      expect(articleHeading('Article Beta One')).not.toBeInTheDocument();
      // Scope to the selected-filters panel to avoid matching the Header's search button.
      // The panel header Typography contains "news.selectedCategories"; its parentElement is
      // the outer Box div which also contains the per-filter close IconButtons.
      const panelHeader = screen.getByText(/news\.selectedCategories/);
      const panel = panelHeader.parentElement!;
      fireEvent.click(within(panel).getByRole('button'));
      expect(articleHeading('Article Beta One')).toBeInTheDocument();
    });
  });

  describe('article sort order', () => {
    it('shows articles sorted newest-first', () => {
      renderNews();
      const headings = screen.getAllByRole('heading', { level: 3 });
      const titles = headings.map((h) => h.textContent);
      expect(titles[0]).toBe('Article Alpha One'); // Jan 1 2026
      expect(titles[1]).toBe('Article Alpha Two'); // Dec 31 2025
      expect(titles[2]).toBe('Article Beta One'); // Dec 30 2025
    });
  });
});
