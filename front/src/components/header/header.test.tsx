import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Header } from '.';

const HeaderWrapper: React.FC = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

describe('Header', () => {
  test('renders brand logo', () => {
    render(<HeaderWrapper />);
    // La marque = symbole décoratif (symbol.svg) + wordmark texte « CraftsmanLab ».
    // Le lien vers l'accueil porte le nom accessible via le wordmark.
    const brandLink = screen.getByRole('link', { name: /CraftsmanLab/i });
    expect(brandLink).toHaveAttribute('href', '/');
  });

  test('renders navigation links', () => {
    render(<HeaderWrapper />);
    const promptsLink = screen.getByText('Prompts');
    const contactLink = screen.getByText('Contact');
    expect(promptsLink.closest('a')).toHaveAttribute('href', '/prompts');
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
  });

  test('has proper accessibility attributes', () => {
    render(<HeaderWrapper />);
    const brandLink = screen.getByRole('link', { name: /CraftsmanLab/i });
    expect(brandLink).toBeInTheDocument();
    const navigation = screen.getByRole('banner');
    expect(navigation).toBeInTheDocument();
  });

  test('renders search input', () => {
    render(<HeaderWrapper />);
    const searchInput = screen.getByPlaceholderText('Rechercher...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('aria-label', 'Rechercher...');
  });
});
