import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SideNav } from './SideNav';

const items = [
  { value: 'home', label: 'Home', href: '/' },
  { value: 'reports', label: 'Reports', badge: 3 },
  {
    value: 'settings',
    label: 'Settings',
    children: [
      { value: 'profile', label: 'Profile', href: '/profile' },
      { value: 'billing', label: 'Billing' },
    ],
  },
  { value: 'off', label: 'Archived', disabled: true },
];

describe('SideNav', () => {
  it('renders a labelled navigation with items', () => {
    render(<SideNav items={items} />);
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('button', { name: /Reports/ })).toBeInTheDocument();
  });

  it('marks the active item with aria-current', () => {
    render(<SideNav items={items} activeValue="home" />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: /Reports/ })).not.toHaveAttribute('aria-current');
  });

  it('calls onSelect with the value and item', async () => {
    const onSelect = vi.fn();
    render(<SideNav items={items} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole('button', { name: /Reports/ }));
    expect(onSelect).toHaveBeenCalledWith('reports', items[1]);
  });

  it('does not select disabled items', async () => {
    const onSelect = vi.fn();
    render(<SideNav items={items} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole('button', { name: 'Archived' }));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('expands and collapses groups', async () => {
    render(<SideNav items={items} />);
    const group = screen.getByRole('button', { name: 'Settings' });
    expect(group).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Profile')).toBeNull();
    await userEvent.click(group);
    expect(group).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument();
    await userEvent.click(group);
    expect(screen.queryByText('Profile')).toBeNull();
  });

  it('opens the group containing the active child initially', () => {
    render(<SideNav items={items} activeValue="profile" />);
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('aria-current', 'page');
  });

  it('renders header and footer', () => {
    render(<SideNav items={items} header={<span>Brand</span>} footer={<span>v1</span>} />);
    expect(screen.getByText('Brand')).toBeInTheDocument();
    expect(screen.getByText('v1')).toBeInTheDocument();
  });
});
