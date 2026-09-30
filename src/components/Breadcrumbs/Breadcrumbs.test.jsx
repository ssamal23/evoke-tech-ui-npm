import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Breadcrumbs } from './Breadcrumbs';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Library', href: '/lib' },
  { label: 'Data' },
];

describe('Breadcrumbs', () => {
  it('renders a breadcrumb nav with links and marks the last item as current', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Library' })).toHaveAttribute('href', '/lib');
    expect(screen.queryByRole('link', { name: 'Data' })).toBeNull();
    expect(screen.getByText('Data')).toHaveAttribute('aria-current', 'page');
  });

  it('does not make the current item a link even if it has an href', () => {
    render(<Breadcrumbs items={[{ label: 'A', href: '/a' }, { label: 'B', href: '/b' }]} />);
    expect(screen.queryByRole('link', { name: 'B' })).toBeNull();
  });

  it('calls onClick for interactive items', async () => {
    const onClick = vi.fn((e) => e.preventDefault());
    render(<Breadcrumbs items={[{ label: 'Home', onClick }, { label: 'Now' }]} />);
    await userEvent.click(screen.getByText('Home'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a custom separator between items only', () => {
    render(<Breadcrumbs items={items} separator="/" />);
    expect(screen.getAllByText('/')).toHaveLength(2);
  });
});
