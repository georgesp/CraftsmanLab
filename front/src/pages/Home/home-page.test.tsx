import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { HomePage } from './home-page';

const HomePageWrapper = () => (
  <BrowserRouter>
    <HomePage />
  </BrowserRouter>
);

describe('HomePage Component', () => {
  test('renders brand logo in header', () => {
    render(<HomePageWrapper />);

    // La marque = symbole décoratif + wordmark texte « CraftsmanLab » (lien accueil)
    const brandLink = screen.getAllByRole('link', { name: /CraftsmanLab/i })[0];
    expect(brandLink).toHaveAttribute('href', '/');
  });

  test('renders main hero section', () => {
    render(<HomePageWrapper />);

    // Vérifier que le lien de navigation vers la page tips est présent
    const tipsNav = screen.getByRole('link', { name: 'Tips' });
    expect(tipsNav).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<HomePageWrapper />);

    const contactLink = screen.getByText('Contact');

    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
  });

  test('renders latest prompts preview section', () => {
    render(<HomePageWrapper />);
    const previewText = screen.getByText(/Derniers prompts publiés :/i);
    expect(previewText).toBeInTheDocument();
  });

  test('renders call-to-action buttons', () => {
    render(<HomePageWrapper />);

    // Vérifier que les liens de navigation vers tips et prompts sont présents
    const tipsLink = screen.getByRole('link', { name: 'Tips' });
    expect(tipsLink).toBeInTheDocument();
    expect(tipsLink).toHaveAttribute('href', '/tips');

    const promptsLink = screen.getByRole('link', { name: 'Prompts' });
    expect(promptsLink).toBeInTheDocument();
    expect(promptsLink).toHaveAttribute('href', '/prompts');
  });
});
