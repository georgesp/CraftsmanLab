import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import { telerikTheme } from '../../theme/theme';
import { AtelierCard, Facets, IllusBadge, RUBRICS } from '.';
import type { FacetGroup } from '.';

const wrap = (ui: React.ReactNode) => (
  <ThemeProvider theme={telerikTheme}>{ui}</ThemeProvider>
);

describe('AtelierCard', () => {
  test('déclenche onClick au clic et à Enter', () => {
    const onClick = jest.fn();
    render(wrap(<AtelierCard onClick={onClick} accent={RUBRICS.tips.fg}>Contenu</AtelierCard>));
    const card = screen.getByRole('button');
    fireEvent.click(card);
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  test('non interactive sans onClick', () => {
    render(wrap(<AtelierCard>Statique</AtelierCard>));
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByText('Statique')).toBeInTheDocument();
  });
});

describe('IllusBadge', () => {
  test('rend le bon fichier SVG', () => {
    const { container } = render(wrap(<IllusBadge name="code" alt="Code" />));
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', '/illus-code.svg');
    expect(img).toHaveAttribute('alt', 'Code');
  });
});

describe('Facets', () => {
  const groups: FacetGroup[] = [
    { group: 'Langages', items: [{ label: 'C#', count: 8 }, { label: 'F#', count: 2 }] },
  ];

  test('coche une facette', () => {
    const onToggle = jest.fn();
    render(wrap(<Facets groups={groups} onToggle={onToggle} />));
    fireEvent.click(screen.getByText('C#'));
    expect(onToggle).toHaveBeenCalledWith('C#');
  });

  test('replie le groupe et masque les items', async () => {
    render(wrap(<Facets groups={groups} />));
    const item = screen.getByText('C#');
    expect(item).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /replier/i }));
    await waitForElementToBeRemoved(() => screen.queryByText('C#'));
    expect(screen.queryByText('C#')).toBeNull();
  });
});
