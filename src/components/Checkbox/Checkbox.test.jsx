import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('is labelled and toggles on click', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Accept terms" onChange={onChange} />);
    const box = screen.getByLabelText('Accept terms');
    expect(box).not.toBeChecked();
    await userEvent.click(box);
    expect(box).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not toggle when disabled', async () => {
    render(<Checkbox label="Nope" disabled />);
    await userEvent.click(screen.getByLabelText('Nope'));
    expect(screen.getByLabelText('Nope')).not.toBeChecked();
  });

  it('sets the indeterminate property', () => {
    render(<Checkbox label="Some" indeterminate />);
    expect(screen.getByLabelText('Some').indeterminate).toBe(true);
  });

  it('shows the error instead of helper text and links it via aria-describedby', () => {
    render(<Checkbox label="Agree" helperText="Help" error="Required" />);
    const box = screen.getByLabelText('Agree');
    expect(screen.queryByText('Help')).toBeNull();
    expect(box).toHaveAttribute('aria-invalid', 'true');
    expect(box).toHaveAccessibleDescription('Required');
  });

  it('forwards ref to the input', () => {
    const ref = createRef();
    render(<Checkbox ref={ref} label="x" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
