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
  test('renders logo image', () => {
    render(<HeaderWrapper />);
    const logo = screen.getByAltText('CraftsmanLab');
  expect(logo).toBeInTheDocument();
  // The header uses the white-background logo in the current implementation
  expect(logo).toHaveAttribute('src', '/noBgColorWhite.png');
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
    const logo = screen.getByAltText('CraftsmanLab');
    expect(logo).toHaveAttribute('alt', 'CraftsmanLab');
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
