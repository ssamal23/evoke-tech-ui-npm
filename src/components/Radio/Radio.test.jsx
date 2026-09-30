import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio, RadioGroup } from './Radio';

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma', disabled: true },
];

describe('RadioGroup', () => {
  it('renders a labelled group of radios sharing one name', () => {
    render(<RadioGroup label="Letters" options={options} />);
    const group = screen.getByRole('group', { name: 'Letters' });
    expect(group).toBeInTheDocument();
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    expect(new Set(radios.map((r) => r.name)).size).toBe(1);
  });

  it('is uncontrolled by default and reports the chosen value', async () => {
    const onChange = vi.fn();
    render(<RadioGroup options={options} defaultValue="a" onChange={onChange} />);
    expect(screen.getByLabelText('Alpha')).toBeChecked();
    await userEvent.click(screen.getByLabelText('Beta'));
    expect(screen.getByLabelText('Beta')).toBeChecked();
    expect(screen.getByLabelText('Alpha')).not.toBeChecked();
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('follows the value prop when controlled', async () => {
    const onChange = vi.fn();
    render(<RadioGroup options={options} value="a" onChange={onChange} />);
    await userEvent.click(screen.getByLabelText('Beta'));
    expect(onChange).toHaveBeenCalledWith('b');
    expect(screen.getByLabelText('Alpha')).toBeChecked();
  });

  it('does not select disabled options', async () => {
    const onChange = vi.fn();
    render(<RadioGroup options={options} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText('Gamma'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows the error message', () => {
    render(<RadioGroup label="Pick" options={options} error="Choose one" />);
    expect(screen.getByRole('group', { name: 'Pick' })).toHaveAccessibleDescription('Choose one');
  });

  it('works with a standalone Radio', async () => {
    render(<Radio name="x" value="1" label="Solo" />);
    await userEvent.click(screen.getByLabelText('Solo'));
    expect(screen.getByLabelText('Solo')).toBeChecked();
  });
});
