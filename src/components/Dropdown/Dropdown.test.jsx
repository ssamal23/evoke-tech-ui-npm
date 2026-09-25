import { createRef, useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from './Dropdown';

const options = [
  { value: 'in', label: 'India' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom', disabled: true },
];

describe('Dropdown', () => {
  it('renders all options with the label associated', () => {
    render(<Dropdown label="Country" options={options} />);
    const select = screen.getByLabelText('Country');
    expect(select).toBeInstanceOf(HTMLSelectElement);
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('starts on the placeholder when given one', () => {
    render(<Dropdown label="Country" options={options} placeholder="Select a country" />);
    expect(screen.getByLabelText('Country')).toHaveValue('');
    expect(screen.getByRole('option', { name: 'Select a country' })).toBeDisabled();
  });

  it('lets the user select an option (uncontrolled)', async () => {
    const onChange = vi.fn();
    render(<Dropdown label="Country" options={options} placeholder="Pick" onChange={onChange} />);
    await userEvent.selectOptions(screen.getByLabelText('Country'), 'us');
    expect(screen.getByLabelText('Country')).toHaveValue('us');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('works as a controlled component', async () => {
    function Controlled() {
      const [value, setValue] = useState('in');
      return (
        <>
          <Dropdown label="Country" options={options} value={value} onChange={(e) => setValue(e.target.value)} />
          <span>selected:{value}</span>
        </>
      );
    }
    render(<Controlled />);
    await userEvent.selectOptions(screen.getByLabelText('Country'), 'us');
    expect(screen.getByText('selected:us')).toBeInTheDocument();
  });

  it('disables individual options', () => {
    render(<Dropdown options={options} />);
    expect(screen.getByRole('option', { name: 'United Kingdom' })).toBeDisabled();
  });

  it('shows the error message and forwards ref', () => {
    const ref = createRef();
    render(<Dropdown ref={ref} label="Country" options={options} error="Choose one" />);
    expect(ref.current).toHaveAttribute('aria-invalid', 'true');
    expect(ref.current).toHaveAccessibleDescription('Choose one');
  });
});
