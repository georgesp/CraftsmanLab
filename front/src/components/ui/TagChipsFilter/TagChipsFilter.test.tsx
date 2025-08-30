import { render, screen, fireEvent } from '@testing-library/react';
import { TagChipsFilter } from './TagChipsFilter';

describe('TagChipsFilter', () => {
  test('renders chips and calls onToggle when clicked', () => {
    const onToggle = jest.fn();
    render(<TagChipsFilter tags={['a', 'b', 'c']} selected={[]} onToggle={onToggle} />);

    // All tags rendered
    expect(screen.getByRole('button', { name: 'a' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'b' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'c' })).toBeInTheDocument();

    // Click triggers toggle callback
    fireEvent.click(screen.getByRole('button', { name: 'b' }));
    expect(onToggle).toHaveBeenCalledWith('b');
  });

  test('selected chip has pressed state for a11y and selection', () => {
    const onToggle = jest.fn();
    render(<TagChipsFilter tags={['blue', 'grey']} selected={['blue']} onToggle={onToggle} />);

    const selected = screen.getByRole('button', { name: 'blue' });
    expect(selected).toHaveAttribute('aria-pressed', 'true');
  });
});
