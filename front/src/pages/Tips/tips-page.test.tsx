import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TipsPage } from './tips-page';
import * as tipsRegistry from '../../components/tips/registry';

describe('TipsPage - tag filtering', () => {
  const original = { ...tipsRegistry } as any;

  beforeEach(() => {
    // Mock a tiny tipsList
    (tipsRegistry as any).tipsList = [
      {
        slug: 'a',
        title: 'A',
        shortDescription: '',
        writtenOn: '2025-01-01',
        keywords: ['C#'],
        metadata: { tags: ['x', 'y'] },
        load: async () => ({ default: () => null }),
      },
      {
        slug: 'b',
        title: 'B',
        shortDescription: '',
        writtenOn: '2025-01-02',
        keywords: ['C#'],
        metadata: { tags: ['y'] },
        load: async () => ({ default: () => null }),
      },
      {
        slug: 'c',
        title: 'C',
        shortDescription: '',
        writtenOn: '2025-01-03',
        keywords: ['C#'],
        metadata: { tags: ['z'] },
        load: async () => ({ default: () => null }),
      },
    ];
  });

  afterEach(() => {
    // restore
    (tipsRegistry as any).tipsList = original.tipsList;
  });

  test('shows all items by default and filters with AND logic', () => {
    render(
      <BrowserRouter>
        <TipsPage />
      </BrowserRouter>,
    );
    // All 3 titles present initially
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();

    // Click tag 'y' -> should keep A and B (both have y), hide C
    fireEvent.click(screen.getByRole('button', { name: 'y' }));
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.queryByText('C')).not.toBeInTheDocument();

  // Click tag 'x' -> new single-selection UX clears 'y' then selects 'x' => only A matches
  fireEvent.click(screen.getByRole('button', { name: 'x' }));
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.queryByText('B')).not.toBeInTheDocument();
  expect(screen.queryByText('C')).not.toBeInTheDocument();

  // Click 'y' again -> clears 'x' and selects 'y' => A and B
  fireEvent.click(screen.getByRole('button', { name: 'y' }));
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.getByText('B')).toBeInTheDocument();
  expect(screen.queryByText('C')).not.toBeInTheDocument();
  });
});
