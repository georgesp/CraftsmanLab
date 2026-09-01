import { render } from '@testing-library/react';
import { useSeo } from './useSeo';

const Page = () => {
  useSeo({ title: 'Dapper — CraftsmanLab', description: 'Micro ORM', path: '/tips/dapper' });
  return null;
};

test('useSeo pose title, description, canonical et og', () => {
  const { unmount } = render(<Page />);
  const get = (s: string) => document.head.querySelector(s)?.getAttribute('content');
  expect(document.title).toBe('Dapper — CraftsmanLab');
  expect(get('meta[name="description"]')).toBe('Micro ORM');
  expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
    'https://craftsmanlab.fr/tips/dapper',
  );
  expect(get('meta[property="og:title"]')).toBe('Dapper — CraftsmanLab');
  expect(get('meta[property="og:url"]')).toBe('https://craftsmanlab.fr/tips/dapper');
  unmount();
  expect(document.title).toBe('CraftsmanLab');
  expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
    'https://craftsmanlab.fr/',
  );
});
