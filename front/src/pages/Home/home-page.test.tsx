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
    expect(logo).toHaveAttribute('src', '/noBgColor.png');
  });

  test('renders main hero section', () => {
    render(<HomePageWrapper />);
    
    // Vérifier que le titre principal (actuel) est présent
    const mainTitle = screen.getByText(/Tips \/ Rappels/i);
    expect(mainTitle).toBeInTheDocument();

    // Vérifier qu'un extrait du sous-texte est présent
    const subtitleSnippet = screen.getByText(/petits rappels/i);
    expect(subtitleSnippet).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<HomePageWrapper />);
    
    const contactLink = screen.getByText('Contact');
    
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
  });

  test('renders latest prompts preview section', () => {
    render(<HomePageWrapper />);
    const previewText = screen.getByText(/Un aperçu des derniers prompts publiés/i);
    expect(previewText).toBeInTheDocument();
  });

  test('renders call-to-action buttons', () => {
    render(<HomePageWrapper />);
    
    // Boutons (icônes) menant aux pages tips et prompts (présents en haut des sections)
    const tipsCta = screen.getByLabelText('Voir tous les tips');
    expect(tipsCta).toBeInTheDocument();
    expect(tipsCta.closest('a')).toHaveAttribute('href', '/tips');

    const promptsCta = screen.getByLabelText('Voir tous les prompts');
    expect(promptsCta).toBeInTheDocument();
    expect(promptsCta.closest('a')).toHaveAttribute('href', '/prompts');
  });
});
