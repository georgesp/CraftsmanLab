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
    expect(screen.getByLabelText('Nom complet')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Sujet')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
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
    
    // Remplir le formulaire
    fireEvent.change(screen.getByLabelText('Nom complet'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Sujet'), {
      target: { value: 'Test Subject' }
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Test message content' }
    });

    // Soumettre le formulaire
    fireEvent.click(screen.getByText('Envoyer le message'));

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
});
