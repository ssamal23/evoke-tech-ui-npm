import type {
  ButtonHTMLAttributes,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  ReactNode,
  RefAttributes,
  SelectHTMLAttributes,
} from 'react';

export type ComponentSize = 'sm' | 'md' | 'lg';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default 'primary' */
  variant?: ButtonVariant;
  /** @default 'md' */
  size?: ComponentSize;
  /** Shows a spinner and disables the button. @default false */
  loading?: boolean;
  /** Stretch to the container width. @default false */
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  helperText?: ReactNode;
  /** Error message; switches to error styling and replaces helperText. */
  error?: ReactNode;
  /** @default 'md' */
  size?: ComponentSize;
  leftIcon?: ReactNode;
  /** @default true */
  fullWidth?: boolean;
  /** Class name for the wrapper element around label, input and message. */
  containerClassName?: string;
}

export interface DropdownOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface DropdownProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options?: DropdownOption[];
  /** Disabled first option shown until a value is chosen. */
  placeholder?: string;
  label?: ReactNode;
  helperText?: ReactNode;
  /** Error message; switches to error styling and replaces helperText. */
  error?: ReactNode;
  /** @default 'md' */
  size?: ComponentSize;
  /** @default true */
  fullWidth?: boolean;
  /** Class name for the wrapper element around label, select and message. */
  containerClassName?: string;
}

export declare const Button: ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>>;
export declare const Input: ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>>;
export declare const Dropdown: ForwardRefExoticComponent<DropdownProps & RefAttributes<HTMLSelectElement>>;

/** Joins truthy class names into a single string. */
export declare function cn(...classes: Array<string | false | null | undefined | 0>): string;
