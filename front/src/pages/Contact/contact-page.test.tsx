import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { ContactPage } from './contact-page';

const ContactPageWrapper = () => (
  <BrowserRouter>
    <ContactPage />
  </BrowserRouter>
);

describe('ContactPage', () => {
  test('renders contact page with form', () => {
    render(<ContactPageWrapper />);
    
    expect(screen.getByText('Contactez-nous')).toBeInTheDocument();
    expect(screen.getByText('Envoyez-nous un message')).toBeInTheDocument();
    // Vérifier que les champs du formulaire sont présents
    expect(screen.getByRole('textbox', { name: /nom complet/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  });

  test('renders contact information', () => {
    render(<ContactPageWrapper />);
    
    expect(screen.getByText('Nos coordonnées')).toBeInTheDocument();
    expect(screen.getByText('contact@craftsmanlab.com')).toBeInTheDocument();
    expect(screen.getByText('+33 1 23 45 67 89')).toBeInTheDocument();
    expect(screen.getByText(/123 Rue de l'Innovation/)).toBeInTheDocument();
  });

  test('form submission shows success message', async () => {
    render(<ContactPageWrapper />);
    
    // Remplir le formulaire en utilisant les rôles et noms
    const nameInput = screen.getByRole('textbox', { name: /nom complet/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const subjectInput = screen.getByRole('textbox', { name: /sujet/i });
    const messageInput = screen.getByRole('textbox', { name: /message/i });
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(messageInput, { target: { value: 'Test message content' } });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /envoyer le message/i }));

    // Vérifier le message de succès
    await waitFor(() => {
      expect(screen.getByText(/Votre message a été envoyé avec succès/)).toBeInTheDocument();
    });
  });

  test('navigation links are present', () => {
    render(<ContactPageWrapper />);
    
    const homeLink = screen.getByText('Accueil');
    const contactLink = screen.getByText('Contact');
    
    expect(homeLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
  });

  test('renders opening hours section', () => {
    render(<ContactPageWrapper />);
    
    expect(screen.getByText('Horaires d\'ouverture')).toBeInTheDocument();
    expect(screen.getByText((_, element) => {
      return element?.textContent === 'Lundi - Vendredi: 9h00 - 18h00';
    })).toBeInTheDocument();
    expect(screen.getByText((_, element) => {
      return element?.textContent === 'Samedi: 10h00 - 16h00';
    })).toBeInTheDocument();
    expect(screen.getByText((_, element) => {
      return element?.textContent === 'Dimanche: Fermé';
    })).toBeInTheDocument();
  });

  test('renders call-to-action section', () => {
    render(<ContactPageWrapper />);
    
    expect(screen.getByText(/Prêt à démarrer votre projet/)).toBeInTheDocument();
    expect(screen.getByText(/Découvrez comment nos solutions peuvent transformer/)).toBeInTheDocument();
  });
});
