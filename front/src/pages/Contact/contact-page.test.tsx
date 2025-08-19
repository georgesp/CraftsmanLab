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
  beforeEach(() => {
    // Nettoyer les mocks avant chaque test
    jest.clearAllMocks();
  });

  test('renders contact page with form', () => {
    render(<ContactPageWrapper />);
    
    expect(screen.getByText('Envoyez-moi un message')).toBeInTheDocument();
    // Vérifier que les champs du formulaire sont présents
    expect(screen.getByRole('textbox', { name: /nom complet/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  });

  test('renders contact information', () => {
    render(<ContactPageWrapper />);
    
    expect(screen.getByText('Mes réseaux sociaux')).toBeInTheDocument();
    expect(screen.getByText('Mes coordonnées')).toBeInTheDocument();
    expect(screen.getByText('contact@craftsmanlab.fr')).toBeInTheDocument();
  });

  test('form submission shows success message', async () => {
    // Mock fetch pour simuler un succès avec un objet Response complet
    const mockFetch = global.fetch as jest.Mock;
    const mockHeaders = new Map([
      ['content-type', 'application/json']
    ]);
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: {
        entries: () => mockHeaders.entries(),
        get: (key: string) => mockHeaders.get(key),
        has: (key: string) => mockHeaders.has(key)
      },
      json: async () => ({ success: true, message: 'Email envoyé avec succès' })
    });

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

    // Vérifier que fetch a été appelé avec les bonnes données
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'Test Subject',
          message: 'Test message content'
        })
      });
    });

    // Vérifier le message de succès
    await waitFor(() => {
      expect(screen.getByText(/Votre message a été envoyé avec succès/)).toBeInTheDocument();
    });
  });

  test('navigation links are present', () => {
    render(<ContactPageWrapper />);
    
    const contactLink = screen.getByText('Contact');
    
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
  });
});
