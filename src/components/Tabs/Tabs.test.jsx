import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

const items = [
  { value: 'one', label: 'One', content: 'Panel one' },
  { value: 'two', label: 'Two', content: 'Panel two' },
  { value: 'three', label: 'Three', content: 'Panel three', disabled: true },
  { value: 'four', label: 'Four', content: 'Panel four' },
];

describe('Tabs', () => {
  it('selects the first enabled tab and shows its panel', () => {
    render(<Tabs items={items} aria-label="Demo" />);
    expect(screen.getByRole('tablist', { name: 'Demo' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel one');
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName('One');
  });

  it('switches panels on click and calls onChange', async () => {
    const onChange = vi.fn();
    render(<Tabs items={items} onChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel two');
    expect(onChange).toHaveBeenCalledWith('two');
  });

  it('moves with arrow keys, skipping disabled tabs, and wraps', async () => {
    render(<Tabs items={items} />);
    screen.getByRole('tab', { name: 'One' }).focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Four' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus();
    await userEvent.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Four' })).toHaveFocus();
    await userEvent.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus();
  });

  it('only the selected tab is in the tab order', () => {
    render(<Tabs items={items} defaultValue="two" />);
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('tabindex', '-1');
  });

  it('follows the value prop when controlled', async () => {
    const onChange = vi.fn();
    render(<Tabs items={items} value="one" onChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(onChange).toHaveBeenCalledWith('two');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel one');
  });
});
