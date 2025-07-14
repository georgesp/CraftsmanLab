import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomePage } from './home-page';

describe('App Component', () => {
  test('affiche le nom de la société CraftsmanLab', () => {
    render(<HomePage />);
    
    // Vérifier que le nom "CraftsmanLab" apparaît dans la barre de navigation
    const navTitle = screen.getByText('CraftsmanLab');
    expect(navTitle).toBeInTheDocument();
    
    // Vérifier que le titre principal contient "CraftsmanLab"
    const mainTitle = screen.getByText(/Bienvenue chez CraftsmanLab/i);
    expect(mainTitle).toBeInTheDocument();
  });

  test('affiche le contenu principal de la page', () => {
    render(<HomePage />);
    
    // Vérifier que le sous-titre est présent
    const subtitle = screen.getByText(/Excellence en développement et innovation technologique/i);
    expect(subtitle).toBeInTheDocument();
    
    // Vérifier que la description est présente
    const description = screen.getByText(/CraftsmanLab est votre partenaire de confiance/i);
    expect(description).toBeInTheDocument();
  });
});
