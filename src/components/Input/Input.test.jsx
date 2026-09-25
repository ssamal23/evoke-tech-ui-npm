import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('associates the label with the input', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInstanceOf(HTMLInputElement);
  });

  it('accepts typed text and calls onChange', async () => {
    const onChange = vi.fn();
    render(<Input label="Name" onChange={onChange} />);
    const input = screen.getByLabelText('Name');
    await userEvent.type(input, 'abc');
    expect(input).toHaveValue('abc');
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it('shows helper text linked via aria-describedby', () => {
    render(<Input label="Name" helperText="Your full name" />);
    const input = screen.getByLabelText('Name');
    expect(input).toHaveAccessibleDescription('Your full name');
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('shows error state instead of helper text', () => {
    render(<Input label="Name" helperText="hint" error="Required" />);
    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Required');
    expect(screen.queryByText('hint')).not.toBeInTheDocument();
  });

  it('marks required fields', () => {
    render(<Input label="Name" required />);
    expect(screen.getByRole('textbox')).toBeRequired();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('forwards ref and extra props', () => {
    const ref = createRef();
    render(<Input ref={ref} type="password" placeholder="secret" />);
    expect(ref.current).toHaveAttribute('type', 'password');
    expect(ref.current).toHaveAttribute('placeholder', 'secret');
  });
});
