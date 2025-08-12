import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock le moteur de recherche client
jest.mock('@/utils/search-client', () => ({
  searchAll: jest.fn((q: string) => {
    const query = q.toLowerCase().trim();
    if (!query) return [];
    if (query.includes('await')) {
      return [
        {
          kind: 'prompt',
          slug: 'dot-net-async-best-practices',
          title: '.NET Async Best Practices',
          shortDescription: 'Guide complet des bonnes pratiques asynchronisme .NET/ASP.NET Core',
        },
      ];
    }
    if (query.includes('coming')) {
      // 'more' est exclu par le moteur réel -> aucun résultat attendu
      return [];
    }
    if (query.includes('nsub')) {
      return [
        {
          kind: 'tip',
          slug: 'nsubstitute',
          title: 'NSubstitute basics',
          shortDescription: 'Mocks / stubs with NSubstitute',
        },
      ];
    }
    return [];
  }),
}));

// Mock partiel de react-router-dom pour intercepter useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Header } from './Header';
import { searchAll } from '@/utils/search-client';

describe('Header search integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const theme = createTheme({
    components: {
      MuiButtonBase: { defaultProps: { disableRipple: true } },
    },
  });

  test("'await' + Enter remonte le prompt .NET Async Best Practices et déclenche la navigation", async () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText(/Rechercher/i);
    await act(async () => {
      await userEvent.click(input);
    });
    await act(async () => {
      await userEvent.type(input, 'await');
    });

    // Le résultat doit s'afficher dans la liste
    const result = await screen.findByText(/\.NET Async Best Practices/i);
    expect(result).toBeInTheDocument();

    // Appui sur Enter -> navigate vers le premier résultat (prompt)
    await act(async () => {
      await userEvent.keyboard('{Enter}');
    });
    expect(mockNavigate).toHaveBeenCalledWith('/prompts/dot-net-async-best-practices');

    // Vérifie que le moteur a bien été appelé
    expect((searchAll as jest.Mock).mock.calls.length).toBeGreaterThan(0);
  });

  test("'coming' n'affiche aucun résultat (exclusion de 'more')", async () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText(/Rechercher/i);
    await act(async () => {
      await userEvent.type(input, 'coming');
    });

    // Affiche le panneau 'Aucun résultat'
    const empty = await screen.findByText(/Aucun résultat/i);
    expect(empty).toBeInTheDocument();

    // S'assure qu'aucun item de liste n'est présent
    const notFound = screen.queryByText(/More coming soon/i);
    expect(notFound).not.toBeInTheDocument();
  });

  test('clic sur un résultat tip navigue vers la page tip correspondante', async () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText(/Rechercher/i);
    await act(async () => {
      await userEvent.type(input, 'nsub');
    });

    const tipItem = await screen.findByText(/NSubstitute basics/i);
    await act(async () => {
      await userEvent.click(tipItem);
    });
    expect(mockNavigate).toHaveBeenCalledWith('/tips/nsubstitute');
  });

  test("navigation clavier avec flèches et Enter sélectionne l'élément surligné", async () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText(/Rechercher/i);
    await act(async () => {
      await userEvent.type(input, 'await');
    });

    // Deux appuis sur une touche : ArrowDown pour surligner le premier (index 0), puis Enter pour naviguer
    await act(async () => {
      await userEvent.keyboard('{ArrowDown}');
    });
    await act(async () => {
      await userEvent.keyboard('{Enter}');
    });

    expect(mockNavigate).toHaveBeenCalledWith('/prompts/dot-net-async-best-practices');
  });
});
