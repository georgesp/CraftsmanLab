import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { AtelierTipsGrid } from '../AtelierTipsGrid';
import { AtelierPromptsGrid } from '../../prompts/AtelierPromptsGrid';

const tips = [
  {
    slug: 'dapper',
    title: 'Dapper',
    shortDescription: 'Micro ORM',
    writtenOn: '2026-01-01',
    categories: ['data'],
    searchKeywords: ['dapper'],
    load: async () => ({ default: () => null }),
  },
] as any;

const prompts = [
  {
    slug: 'craftsmanlab-rules',
    title: 'CraftsmanLab rules',
    shortDescription: 'Conventions',
    writtenOn: '2026-01-01',
    keywords: ['rules'],
    load: async () => ({ default: () => null }),
  },
] as any;

const wrap = (ui: React.ReactNode) => <BrowserRouter>{ui}</BrowserRouter>;

// Les moteurs de recherche ne suivent que les vraies balises <a href>.
// Une navigation par onClick rend les pages de detail invisibles au crawl.
describe('Grilles Atelier : liens crawlables', () => {
  test('chaque carte tip expose un <a href> vers la page de detail', () => {
    const { container } = render(wrap(<AtelierTipsGrid items={tips} />));
    const liens = container.querySelectorAll('a[href="/tips/dapper"]');
    expect(liens).toHaveLength(1);
  });

  test('chaque carte prompt expose un <a href> vers la page de detail', () => {
    const { container } = render(wrap(<AtelierPromptsGrid items={prompts} />));
    const liens = container.querySelectorAll('a[href="/prompts/craftsmanlab-rules"]');
    expect(liens).toHaveLength(1);
  });
});
