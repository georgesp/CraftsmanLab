import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Header } from './header';

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
    expect(logo).toHaveAttribute('src', '/noBgColor.png');
  });

  test('renders navigation links', () => {
    render(<HeaderWrapper />);
    
    const homeLink = screen.getByText('Accueil');
    const contactLink = screen.getByText('Contact');
    
    expect(homeLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
  });

  test('has proper accessibility attributes', () => {
    render(<HeaderWrapper />);
    
    const logo = screen.getByAltText('CraftsmanLab');
    expect(logo).toHaveAttribute('alt', 'CraftsmanLab');
    
    const navigation = screen.getByRole('banner');
    expect(navigation).toBeInTheDocument();
  });
});
