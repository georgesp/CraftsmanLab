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
    
    // Vérifier que le titre principal est présent
    const mainTitle = screen.getByText(/Excellence en Développement Financier/i);
    expect(mainTitle).toBeInTheDocument();
    
    // Vérifier que le sous-titre est présent
    const subtitle = screen.getByText(/Accélérez votre développement avec la suite d'outils/i);
    expect(subtitle).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<HomePageWrapper />);
    
    const contactLink = screen.getByText('Contact');
    
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
  });

  test('renders key benefits section', () => {
    render(<HomePageWrapper />);
    
    // Vérifier que la section des avantages clés est présente
    const benefitsTitle = screen.getByText('Avantages Clés');
    expect(benefitsTitle).toBeInTheDocument();
    
    // Vérifier quelques avantages clés
    expect(screen.getByText('Solution Complète')).toBeInTheDocument();
    expect(screen.getByText('Productivité Inégalée')).toBeInTheDocument();
    expect(screen.getByText('Sécurité Avancée')).toBeInTheDocument();
  });

  test('renders call-to-action buttons', () => {
    render(<HomePageWrapper />);
    
    // Vérifier que les boutons d'appel à l'action sont présents
    const trialButtons = screen.getAllByText(/Essai Gratuit/i);
    expect(trialButtons.length).toBeGreaterThan(0);
    
    const contactButtons = screen.getAllByText(/Contactez-nous/i);
    expect(contactButtons.length).toBeGreaterThan(0);
  });
});
