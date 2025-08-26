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
  test('renders logo image in header', () => {
    render(<HomePageWrapper />);

    // Vérifier que le logo CraftsmanLab est affiché
    const logo = screen.getByAltText('CraftsmanLab');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/noBgColorWhite.png');
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
